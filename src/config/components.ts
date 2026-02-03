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
        isNew: false,
    },
    {
        slug: "aurora-glow",
        name: "Aurora Glow",
        description: "Ethereal light pillar effect with Three.js raymarching shaders",
        category: "backgrounds",
        isPremium: false,
        isNew: true,
        dependencies: ["three"],
    },
    // Buttons / Surfaces
    {
        slug: "glass-surface",
        name: "Glass Surface",
        description: "Glassmorphism container with chromatic aberration distortion",
        category: "buttons",
        isPremium: false,
        isNew: true,
    },
];

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
