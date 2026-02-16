"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Terminal, ArrowRight, LockKeyhole, Search, X } from "lucide-react";
import { AsciiRenderer, DEFAULT_CHARSET } from "@/components/AsciiRenderer";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { components, componentCategories, getComponentsByCategory } from "@/config/components";

// Compact Preview Card with hover-play video
function ComponentPreviewCard({
    component
}: {
    component: typeof components[0]
}) {
    const [isHovered, setIsHovered] = useState(false);
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    // Theme-aware gradient colors
    const bgColor = isDark ? "#0A0A0A" : "#FAFAFA";
    const grad1 = "#14B8A6"; // accent
    const grad2 = isDark ? "#FAFAFA" : "#0A0A0A"; // opposite of bg

    return (
        <Link
            href={`/${component.slug}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group block relative rounded-lg border border-border bg-card overflow-hidden h-[120px] transition-all duration-200 hover:border-accent/30 hover:shadow-[0_0_20px_rgba(20,184,166,0.1)]"
        >
            {/* Preview Area */}
            <div className="absolute inset-0" style={{ opacity: 0.4 }}>
                {isHovered && (
                    <AsciiRenderer
                        videoSrc="/videos/nyla_bg_hero.mp4"
                        asciiFontSize={6}
                        charset=" .:-+*#"
                        backgroundColor={bgColor}
                        renderMode="gradient"
                        gradientColor1={grad1}
                        gradientColor2={grad2}
                        enableMouseInteraction={isHovered}
                        interactionMode="repulsion"
                        gravityStrength={0.3}
                        brightness={1.2}
                    />
                )}
            </div>

            {/* Static placeholder when not hovering */}
            {!isHovered && (
                <div className="absolute inset-0 bg-secondary/30 flex items-center justify-center">
                    <Terminal className="w-6 h-6 text-muted-foreground/30" />
                </div>
            )}

            {/* Info bar at bottom */}
            <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-card via-card/95 to-transparent">
                <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-foreground truncate">
                        {component.name}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                        {component.isNew && (
                            <span className="px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider bg-accent text-accent-foreground rounded">
                                New
                            </span>
                        )}
                        {component.isPremium && (
                            <LockKeyhole className="w-3 h-3 text-muted-foreground" />
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default function ComponentsPage() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    // Search and filter state
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [showNewOnly, setShowNewOnly] = useState(false);
    const [showPremiumOnly, setShowPremiumOnly] = useState(false);

    // Filter components based on search and filters
    const filteredComponents = useMemo(() => {
        return components.filter((comp) => {
            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                if (!comp.name.toLowerCase().includes(query) && 
                    !comp.description.toLowerCase().includes(query)) {
                    return false;
                }
            }
            // Category filter
            if (selectedCategory && comp.category !== selectedCategory) {
                return false;
            }
            // New filter
            if (showNewOnly && !comp.isNew) {
                return false;
            }
            // Premium filter
            if (showPremiumOnly && !comp.isPremium) {
                return false;
            }
            return true;
        });
    }, [searchQuery, selectedCategory, showNewOnly, showPremiumOnly]);

    // Group filtered components by category
    const filteredCategories = useMemo(() => {
        const result: Record<string, typeof components> = {};
        filteredComponents.forEach((comp) => {
            if (!result[comp.category]) {
                result[comp.category] = [];
            }
            result[comp.category].push(comp);
        });
        return result;
    }, [filteredComponents]);

    // Theme-aware colors for ASCII
    const bgColor = isDark ? "#0A0A0A" : "#FAFAFA";
    const grad1 = "#14B8A6"; // accent
    const grad2 = isDark ? "#FAFAFA" : "#0A0A0A"; // opposite of bg

    return (
        <div className="space-y-16">
            {/* Hero Section with ASCII Background */}
            <section className="relative -mx-8 lg:-mx-12 -mt-8 lg:-mt-12">
                {/* ASCII Background */}
                <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
                    <div className="absolute inset-0" style={{ opacity: 0.5 }}>
                        <AsciiRenderer
                            videoSrc="/videos/nyla_bg_hero.mp4"
                            asciiFontSize={10}
                            charset={DEFAULT_CHARSET}
                            backgroundColor={bgColor}
                            renderMode="gradient"
                            gradientColor1={grad1}
                            gradientColor2={grad2}
                            enableMouseInteraction={true}
                            interactionMode="repulsion"
                            gravityStrength={0.3}
                            brightness={1.2}
                        />
                    </div>

                    {/* Gradient overlays for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />

                    {/* Hero Content */}
                    <div className="absolute inset-0 flex flex-col justify-center px-8 lg:px-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="max-w-3xl space-y-6"
                        >
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-sm">
                                <Terminal className="w-3.5 h-3.5 text-accent" />
                                <span className="text-accent text-xs font-semibold uppercase tracking-wider">
                                    Component Library
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
                                Build with{" "}
                                <span className="text-accent">
                                    premium components
                                </span>
                            </h1>

                            {/* Subtitle with background for contrast */}
                            <p className="max-w-xl text-lg leading-relaxed">
                                <span className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-muted-foreground shadow-sm">
                                    High-performance, animated UI components crafted for modern web experiences.
                                    Each component is optimized for speed and fully customizable.
                                </span>
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-3 pt-2">
                                <Link
                                    href="/ascii-media"
                                    className="group inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground font-medium rounded-lg transition-all hover:shadow-lg hover:shadow-accent/20"
                                >
                                    Explore ASCII Media
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                                </Link>
                                <a
                                    href="https://github.com/curiositas-studio"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-background/80 backdrop-blur-sm border border-border font-medium rounded-lg transition-all hover:bg-secondary"
                                >
                                    View on GitHub
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Search and Filter Controls */}
            <section className="space-y-4">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                    {/* Search Input & Theme Toggle */}
                    <div className="flex items-center gap-3 w-full lg:w-auto">
                        <div className="relative w-full lg:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search components..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-10 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Theme Toggle */}
                        <ThemeToggle />
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-2">
                        {/* Category Pills */}
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                                selectedCategory === null
                                    ? "bg-accent text-accent-foreground border-accent"
                                    : "border-border hover:border-accent/50"
                            }`}
                        >
                            All
                        </button>
                        {Object.entries(componentCategories).map(([key, category]) => (
                            <button
                                key={key}
                                onClick={() => setSelectedCategory(key)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                                    selectedCategory === key
                                        ? "bg-accent text-accent-foreground border-accent"
                                        : "border-border hover:border-accent/50"
                                }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Secondary Filters */}
                <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-xs text-muted-foreground mr-2">Filters:</span>
                    <button
                        onClick={() => setShowNewOnly(!showNewOnly)}
                        className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                            showNewOnly
                                ? "bg-accent text-accent-foreground border-accent"
                                : "border-border hover:border-accent/50"
                        }`}
                    >
                        New Only
                    </button>
                    <button
                        onClick={() => setShowPremiumOnly(!showPremiumOnly)}
                        className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors flex items-center gap-1 ${
                            showPremiumOnly
                                ? "bg-accent text-accent-foreground border-accent"
                                : "border-border hover:border-accent/50"
                        }`}
                    >
                        <LockKeyhole className="w-3 h-3" />
                        Premium
                    </button>

                    {/* Results count */}
                    <span className="text-xs text-muted-foreground ml-auto">
                        {filteredComponents.length} {filteredComponents.length === 1 ? "component" : "components"}
                        {searchQuery || selectedCategory || showNewOnly || showPremiumOnly ? " found" : ""}
                    </span>
                </div>
            </section>

            {/* Components Grid by Category */}
            {Object.keys(filteredCategories).length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No components match your filters.</p>
                    <button
                        onClick={() => {
                            setSearchQuery("");
                            setSelectedCategory(null);
                            setShowNewOnly(false);
                            setShowPremiumOnly(false);
                        }}
                        className="mt-4 text-sm text-accent hover:underline"
                    >
                        Clear all filters
                    </button>
                </div>
            ) : (
                Object.entries(filteredCategories).map(([key, categoryComponents]) => {
                    const category = componentCategories[key as keyof typeof componentCategories];
                    if (!category || categoryComponents.length === 0) return null;

                    return (
                        <section key={key} className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="font-display text-xl font-semibold">{category.name}</h2>
                                <span className="text-xs text-muted-foreground">{categoryComponents.length} components</span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                                {categoryComponents.map((comp, i) => (
                                    <motion.div
                                        key={comp.slug}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        viewport={{ once: true }}
                                    >
                                        <ComponentPreviewCard component={comp} />
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    );
                })
            )}
        </div>
    );
}
