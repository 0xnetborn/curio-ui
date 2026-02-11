// Component Categories Configuration
// Central registry for all CurioUI components

export interface ComponentMeta {
    slug: string;
    name: string;
    description: string;
    category: keyof typeof componentCategories;
    isPremium: boolean;
    isNew?: boolean;
    dependencies?: string[];
}

export const componentCategories = {
    backgrounds: {
        name: "Backgrounds",
        description: "Animated backgrounds and visual effects",
        icon: "Layers",
    },
    buttons: {
        name: "Buttons",
        description: "Interactive button and surface components",
        icon: "MousePointer",
    },
    cards: {
        name: "Cards",
        description: "Card layouts with hover effects",
        icon: "LayoutGrid",
    },
    text: {
        name: "Text",
        description: "Typography animations and effects",
        icon: "Type",
    },
    loaders: {
        name: "Loaders",
        description: "Loading states and spinners",
        icon: "Loader2",
    },
    effects: {
        name: "Effects",
        description: "Cursor effects and interactive elements",
        icon: "Sparkles",
    },
} as const;

// Component Registry
export const components: ComponentMeta[] = [
    // Backgrounds
    {
        slug: "ascii-media",
        name: "ASCII Media",
        description: "Convert video and images to real-time ASCII art with WebGL",
        category: "backgrounds",
        isPremium: false,
        isNew: false,
    },
    {
        slug: "components/backgrounds/click-spark",
        name: "Click Spark",
        description: "Spark burst animation on click interactions",
        category: "backgrounds",
        isPremium: false,
        isNew: true,
    },
    // Buttons / Surfaces
    {
        slug: "buttons/3d-button",
        name: "3D Button",
        description: "Button with 3D depth effect and ripple on hover",
        category: "buttons",
        isPremium: false,
        isNew: false,
    },
    {
        slug: "buttons/shine-button",
        name: "Shine Button",
        description: "Button with diagonal light sweep effect on hover",
        category: "buttons",
        isPremium: false,
        isNew: false,
    },
    {
        slug: "buttons/gradient-fill-button",
        name: "Gradient Fill Button",
        description: "Button that fills with gradient from bottom on hover",
        category: "buttons",
        isPremium: false,
        isNew: false,
    },
    {
        slug: "components/buttons/wet-button",
        name: "Wet Paint Button",
        description: "Dripping paint effect on hover",
        category: "buttons",
        isPremium: false,
        isNew: false,
        dependencies: ["framer-motion"],
    },
    {
        slug: "components/buttons/dot-expand-button",
        name: "Dot Expand",
        description: "Button with expanding dot animation on hover",
        category: "buttons",
        isPremium: false,
        isNew: true,
    },
    // Cards
    {
        slug: "components/spotlight-card",
        name: "Spotlight Card",
        description: "Card with gradient spotlight effect on hover",
        category: "cards",
        isPremium: false,
        isNew: false,
    },
    {
        slug: "tilted-card",
        name: "Tilted Card",
        description: "Card with 3D tilt effect that follows mouse",
        category: "cards",
        isPremium: false,
        isNew: true,
        dependencies: ["framer-motion"],
    },
    // Text Animations
    {
        slug: "components/text/a-s-c-i-i-text",
        name: "ASCIIText",
        description: "ASCII art text effect",
        category: "text",
        isPremium: false,
        isNew: true,
    },
    {
        slug: "components/text/aurora",
        name: "Aurora",
        description: "Aurora borealis animated gradient effect",
        category: "text",
        isPremium: false,
        isNew: true,
    },
    {
        slug: "components/text/blur-text",
        name: "Blur Text",
        description: "Text that blurs in with staggered animation",
        category: "text",
        isPremium: false,
        isNew: true,
    },
    {
        slug: "components/text/circular-text",
        name: "Circular Text",
        description: "Text arranged in a circle with rotation",
        category: "text",
        isPremium: false,
        isNew: true,
    },
    {
        slug: "components/text/click-spark",
        name: "ClickSpark",
        description: "Spark burst animation on click interactions",
        category: "text",
        isPremium: false,
        isNew: true,
    },
    {
        slug: "components/text/counter",
        name: "Counter",
        description: "Animated number counter with easing",
        category: "text",
        isPremium: false,
        isNew: true,
    },
    {
        slug: "components/text/curved-loop",
        name: "Curved Loop",
        description: "Text following a curved path animation",
        category: "text",
        isPremium: false,
        isNew: true,
    },
    {
        slug: "components/text/decrypted-text",
        name: "Decrypted Text",
        description: "Text that decrypts character by character",
        category: "text",
        isPremium: false,
        isNew: true,
    },
    {
        slug: "components/text/electric-border",
        name: "Electric Border",
        description: "Turbulent electric border effect using SVG filters",
        category: "text",
        isPremium: false,
        isNew: true,
    },
    {
        slug: "components/text/folder",
        name: "Folder",
        description: "Folder animation effect",
        category: "text",
        isPremium: false,
        isNew: true,
    },
    {
        slug: "components/text/fuzzy-text",
        name: "Fuzzy Text",
        description: "Text that blurs and reveals on hover",
        category: "text",
        isPremium: false,
        isNew: false,
        dependencies: ["framer-motion"],
    },
    {
        slug: "components/text/ghost-cursor",
        name: "Ghost Cursor",
        description: "Animated cursor trail effect",
        category: "text",
        isPremium: false,
        isNew: true,
    },
    {
        slug: "components/text/glare-hover",
        name: "Glare Hover",
        description: "Glare effect that follows mouse hover",
        category: "text",
        isPremium: false,
        isNew: true,
    },
    {
        slug: "components/text/glitch-text",
        name: "Glitch Text",
        description: "Cyberpunk glitch text effect",
        category: "text",
        isPremium: false,
        isNew: true,
    },
    {
        slug: "components/text/gradient-text",
        name: "Gradient Text",
        description: "Animated gradient text with customizable colors",
        category: "text",
        isPremium: false,
        isNew: false,
        dependencies: ["framer-motion"],
    },
    {
        slug: "components/text/grid-pulse",
        name: "Grid Pulse",
        description: "Pulsing grid background effect",
        category: "text",
        isPremium: false,
        isNew: true,
    },
    {
        slug: "components/text/letter-glitch",
        name: "Letter Glitch",
        description: "Per-character glitch effect",
        category: "text",
        isPremium: false,
        isNew: true,
    },
    {
        slug: "components/text/lightning",
        name: "Lightning",
        description: "Lightning/thunder text effect",
        category: "text",
        isPremium: false,
        isNew: true,
    },
    {
        slug: "components/text/magnet",
        name: "Magnet",
        description: "Text that attracts towards mouse cursor",
        category: "text",
        isPremium: false,
        isNew: true,
    },
    {
        slug: "components/text/noise",
        name: "Noise",
        description: "Static/noise text overlay effect",
        category: "text",
        isPremium: false,
        isNew: true,
    },
    {
        slug: "components/text/profile-card",
        name: "Profile Card",
        description: "Animated profile card component",
        category: "text",
        isPremium: false,
        isNew: true,
    },
    {
        slug: "components/text/scroll-velocity",
        name: "Scroll Velocity",
        description: "Text responds to scroll speed",
        category: "text",
        isPremium: false,
        isNew: true,
    },
    {
        slug: "components/text/shape-blur",
        name: "Shape Blur",
        description: "Blurred shapes animation effect",
        category: "text",
        isPremium: false,
        isNew: true,
    },
    {
        slug: "components/text/shiny-text",
        name: "Shiny Text",
        description: "Text with animated shine effect",
        category: "text",
        isPremium: false,
        isNew: true,
        dependencies: ["framer-motion"],
    },
    {
        slug: "components/text/spotlight-card",
        name: "Spotlight Card",
        description: "Card with spotlight that follows cursor",
        category: "text",
        isPremium: false,
        isNew: true,
    },
    {
        slug: "components/text/squares",
        name: "Squares",
        description: "Animated square pattern effect",
        category: "text",
        isPremium: false,
        isNew: true,
    },
    {
        slug: "components/text/stack",
        name: "Stack",
        description: "Stack animation effect",
        category: "text",
        isPremium: false,
        isNew: true,
    },
    {
        slug: "components/text/star-border",
        name: "Star Border",
        description: "Animated star border effect",
        category: "text",
        isPremium: false,
        isNew: true,
    },
    {
        slug: "components/text/text-cursor",
        name: "Text Cursor",
        description: "Emoji/text trail that follows mouse cursor",
        category: "text",
        isPremium: false,
        isNew: true,
    },
    {
        slug: "components/text/text-pressure",
        name: "Text Pressure",
        description: "Text responds to mouse with variable font weights",
        category: "text",
        isPremium: false,
        isNew: true,
    },
    // Loaders
    {
        slug: "loaders/spiral-loader",
        name: "Spiral Loader",
        description: "Animated spiral loader with pulsing dots",
        category: "loaders",
        isPremium: false,
        isNew: true,
        dependencies: ["framer-motion"],
    },
    // Effects
    {
        slug: "components/effects/text-cursor",
        name: "Text Cursor",
        description: "Emoji/text trail that follows mouse cursor",
        category: "effects",
        isPremium: false,
        isNew: true,
        dependencies: ["framer-motion"],
    },
    {
        slug: "components/effects/electric-border",
        name: "Electric Border",
        description: "Turbulent electric border effect",
        category: "effects",
        isPremium: false,
        isNew: true,
    },
,
    {
        slug: "text-animations/threads",
        name: "Threads",
        description: "Threads animation effect",
        category: "text",
        isPremium: false,
        isNew: true,
    },,
    {
        slug: "text-animations/tilt-card",
        name: "TiltCard",
        description: "TiltCard animation effect",
        category: "text",
        isPremium: false,
        isNew: true,
    },,
    {
        slug: "text-animations/tilted-card",
        name: "TiltedCard",
        description: "TiltedCard animation effect",
        category: "text",
        isPremium: false,
        isNew: true,
    },];

// Helper functions
export function getComponentsByCategory(category: keyof typeof componentCategories) {
    return components.filter((c) => c.category === category);
}

export function getFreeComponents() {
    return components.filter((c) => !c.isPremium);
}

export function getPremiumComponents() {
    return components.filter((c) => c.isPremium);
}

export function getComponentBySlug(slug: string) {
    return components.find((c) => c.slug === slug);
}
