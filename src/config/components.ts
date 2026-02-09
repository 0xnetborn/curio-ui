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
    headers: {
        name: "Headers",
        description: "Navigation and header components",
        icon: "Menu",
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
        slug: "buttons/border-glow-button",
        name: "Border Glow Button",
        description: "Button with mouse-tracking glow effect on border",
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
        slug: "star-border",
        name: "Star Border",
        description: "Button with animated star border effect",
        category: "buttons",
        isPremium: false,
        isNew: true,
    },
    // Text Animations
    {
        slug: "text-animations/fuzzy-text",
        name: "Fuzzy Text",
        description: "Text that blurs and reveals on hover",
        category: "text",
        isPremium: false,
        isNew: false,
        dependencies: ["framer-motion"],
    },
    {
        slug: "text-animations/gradient-text",
        name: "Gradient Text",
        description: "Animated gradient text with customizable colors",
        category: "text",
        isPremium: false,
        isNew: false,
        dependencies: ["framer-motion"],
    },
    {
        slug: "shiny-text",
        name: "Shiny Text",
        description: "Text with animated shine effect",
        category: "text",
        isPremium: false,
        isNew: true,
        dependencies: ["framer-motion"],
    },
    {
        slug: "text-animations/blur-text",
        name: "Blur Text",
        description: "Text that blurs in with staggered animation",
        category: "text",
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
    // Text
    {
        slug: "components/text/decrypted-text",
        name: "DecryptedText",
        description: "DecryptedText animation effect",
        category: "text",
        isPremium: false,
        isNew: true,
    },
    {
        slug: "components/text/variable-proximity",
        name: "VariableProximity",
        description: "VariableProximity animation effect",
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
,
    {
        slug: "text-animations/blur-text",
        name: "BlurText",
        description: "BlurText animation effect",
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
