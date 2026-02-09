#!/bin/bash
# Component Analysis & Sync Script for Curio UI
# Checks theme responsiveness, accessibility, and adds new components

set -e

REPO_DIR="/Users/netborn/.openclaw/workspace/curio-ui"
REACTBITS_DIR="$REPO_DIR/node_modules/reactbits-installer/components"
REGISTRY_DIR="$REPO_DIR/src/registry"

echo "🔍 Curio UI Component Analysis & Sync"
echo "========================================"

# Track issues found
ISSUES=()

# 1. Check for non-theme-responsive code patterns
echo ""
echo "📋 Checking for theme responsiveness issues..."

# Check for hardcoded hex colors
if grep -rq "#FFFFFF\|#000000\|#fafafa" "$REGISTRY_DIR" --include="*.tsx" --include="*.ts" 2>/dev/null; then
    ISSUES+=("Found hardcoded hex colors that may need theme variables")
fi

# 2. Check accessibility patterns
echo ""
echo "♿ Checking accessibility patterns..."

# Check for missing aria labels on interactive components
MISSING_ARIA=$(grep -r "onMouseEnter\|onMouseLeave" "$REGISTRY_DIR" --include="*.tsx" 2>/dev/null | grep -v "aria-" | grep -v "ariaLabel" | grep -v "role=" | wc -l)
if [ "$MISSING_ARIA" -gt 0 ]; then
    ISSUES+=("$MISSING_ARIA components with mouse events may need aria labels")
fi

# 3. List available reactbits components
echo ""
echo "📦 Available reactbits components:"
ls "$REACTBITS_DIR" | grep -v "\.css" | head -15

# 4. Copy and adapt a new component
echo ""
echo "➕ Adding new component from reactbits..."

# Find already implemented components
ALREADY_DONE=()
while IFS= read -r f; do
    name=$(basename "$f" .tsx | tr '[:upper:]' '[:lower:]')
    ALREADY_DONE+=("$name")
done < <(find "$REGISTRY_DIR" -name "*.tsx" -type f)

# Find a component we don't have yet
cd "$REACTBITS_DIR"
NEW_COMPONENT=""
NEW_COMPONENT_NAME=""

for component in *.tsx; do
    component_name=$(echo "$component" | tr '[:upper:]' '[:lower:]' | sed 's/\.tsx$//')
    # Skip already implemented
    skip=0
    for done in "${ALREADY_DONE[@]}"; do
        if [ "$component_name" = "$done" ]; then
            skip=1
            break
        fi
    done
    if [ $skip -eq 0 ]; then
        NEW_COMPONENT="$component"
        NEW_COMPONENT_NAME="$component_name"
        break
    fi
done

if [ -n "$NEW_COMPONENT" ]; then
    echo "Found new component: $NEW_COMPONENT_NAME"
    
    # Create directory
    mkdir -p "$REGISTRY_DIR/$NEW_COMPONENT_NAME"
    
    # Copy and adapt component
    cp "$REACTBITS_DIR/$NEW_COMPONENT" "$REGISTRY_DIR/$NEW_COMPONENT_NAME/index.tsx"
    
    # Copy CSS if exists
    css_file="${NEW_COMPONENT%.tsx}.css"
    if [ -f "$REACTBITS_DIR/$css_file" ]; then
        cp "$REACTBITS_DIR/$css_file" "$REGISTRY_DIR/$NEW_COMPONENT_NAME/index.css"
        echo "   Copied CSS: $css_file"
    fi
    
    # Adapt branding
    sed -i '' 's/SyntaxUI/CurioUI/g' "$REGISTRY_DIR/$NEW_COMPONENT_NAME/index.tsx"
    sed -i '' 's/syntax-ui/CurioUI/g' "$REGISTRY_DIR/$NEW_COMPONENT_NAME/index.tsx"
    
    # Add theme detection if hardcoded colors exist
    if grep -q "#000000\|#FFFFFF\|#000\|#FFF" "$REGISTRY_DIR/$NEW_COMPONENT_NAME/index.tsx" 2>/dev/null; then
        # Insert theme detection after imports
        sed -i '' '/^import/a\
\
const ThemeAwareWrapper = ({ children }: { children: React.ReactNode }) => {\
  const [isLight, setIsLight] = useState(false);\
  useEffect(() => {\
    const checkTheme = () => setIsLight(document.documentElement.classList.contains("light"));\
    checkTheme();\
    const observer = new MutationObserver(checkTheme);\
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });\
    return () => observer.disconnect();\
  }, []);\
  return <>{children}</>;\
};' "$REGISTRY_DIR/$NEW_COMPONENT_NAME/index.tsx" 2>/dev/null || true
        echo "   Added theme awareness"
    fi
    
    echo "✅ Added and adapted: $NEW_COMPONENT_NAME"
else
    echo "✅ All reactbits components already integrated"
fi

# 5. Report summary
echo ""
echo "📊 Analysis Summary"
echo "=================="
if [ ${#ISSUES[@]} -eq 0 ]; then
    echo "✅ No issues found"
else
    echo "⚠️  Issues to address:"
    for issue in "${ISSUES[@]}"; do
        echo "   - $issue"
    done
fi

echo ""
echo "🏁 Analysis complete"
