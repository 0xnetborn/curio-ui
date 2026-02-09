#!/bin/bash
# Curio UI Component Analysis & Auto-Sync
# Runs every 10 minutes via cron

set -e

REPO_DIR="/Users/netborn/.openclaw/workspace/curio-ui"
REACTBITS_DIR="$REPO_DIR/node_modules/reactbits-installer/components"
REGISTRY_DIR="$REPO_DIR/src/registry"
LOG_FILE="/tmp/curio-analysis.log"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "🔍 Starting Curio UI component analysis..."

cd "$REPO_DIR"

# Find already implemented components
ALREADY_DONE=()
while IFS= read -r f; do
    name=$(basename "$f" .tsx | tr '[:upper:]' '[:lower:]')
    ALREADY_DONE+=("$name")
done < <(find "$REGISTRY_DIR" -name "*.tsx" -type f 2>/dev/null)

# Find a new component we haven't added yet
cd "$REACTBITS_DIR"
NEW_COMPONENT=""
NEW_COMPONENT_NAME=""

for component in *.tsx; do
    component_name=$(echo "$component" | tr '[:upper:]' '[:lower:]' | sed 's/\.tsx$//')
    # Skip if already implemented OR if it's the asciitext (already exists)
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
    log "📦 Adding new component: $NEW_COMPONENT_NAME"
    
    mkdir -p "$REGISTRY_DIR/$NEW_COMPONENT_NAME"
    cp "$REACTBITS_DIR/$NEW_COMPONENT" "$REGISTRY_DIR/$NEW_COMPONENT_NAME/index.tsx"
    
    # Copy CSS if exists
    css_file="${NEW_COMPONENT%.tsx}.css"
    if [ -f "$REACTBITS_DIR/$css_file" ]; then
        cp "$REACTBITS_DIR/$css_file" "$REGISTRY_DIR/$NEW_COMPONENT_NAME/index.css"
    fi
    
    # Adapt branding
    sed -i '' 's/SyntaxUI/CurioUI/g' "$REGISTRY_DIR/$NEW_COMPONENT_NAME/index.tsx"
    sed -i '' 's/syntax-ui/CurioUI/g' "$REGISTRY_DIR/$NEW_COMPONENT_NAME/index.tsx"
    
    # Add theme detection if hardcoded colors exist
    if grep -q "#000000\|#FFFFFF" "$REGISTRY_DIR/$NEW_COMPONENT_NAME/index.tsx" 2>/dev/null; then
        sed -i '' '/^import/a\
\
const [isLight, setIsLight] = useState(false);\
useEffect(() => {\
  const checkTheme = () => setIsLight(document.documentElement.classList.contains("light"));\
  checkTheme();\
  const observer = new MutationObserver(checkTheme);\
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });\
  return () => observer.disconnect();\
}, []);' "$REGISTRY_DIR/$NEW_COMPONENT_NAME/index.tsx" 2>/dev/null || true
    fi
    
    log "✅ Added $NEW_COMPONENT_NAME"
    
    # Check build
    cd "$REPO_DIR"
    if npm run build > /dev/null 2>&1; then
        log "✅ Build successful"
        
        # Auto-commit
        cd "$REPO_DIR"
        if git add -A && git commit -m "feat: auto-add $NEW_COMPONENT_NAME from reactbits" 2>/dev/null; then
            log "✅ Committed changes"
            if git push origin main > /dev/null 2>&1; then
                log "🚀 Pushed to GitHub"
            else
                log "⚠️  Push failed (may need pull first)"
            fi
        fi
    else
        log "❌ Build failed - reverting changes"
        rm -rf "$REGISTRY_DIR/$NEW_COMPONENT_NAME" 2>/dev/null || true
        git checkout -- "$REGISTRY_DIR" 2>/dev/null || true
    fi
else
    log "✅ No new components to add"
fi

log "🏁 Analysis complete"
