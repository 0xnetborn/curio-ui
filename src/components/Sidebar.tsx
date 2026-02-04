"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Component, ExternalLink, Github, Menu, PanelLeftClose, PanelLeft, Layers, MousePointer, LayoutGrid, Type, Loader2, ChevronDown } from "lucide-react";
import { componentCategories, getComponentsByCategory } from "@/config/components";

const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Components", href: "/components", icon: Component },
];

const categoryIcons = {
    backgrounds: Layers,
    buttons: MousePointer,
    cards: LayoutGrid,
    text: Type,
    loaders: Loader2,
    headers: Menu,
};

const SidebarContent = ({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) => {
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    return (
        <>
            <nav className="flex-1 px-3 space-y-0.5">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={onNavigate}
                            className={`relative flex items-center gap-3 px-3 py-2 rounded-lg transition-all group cursor-pointer ${isActive ? "text-accent bg-accent/5" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
                        >
                            <item.icon className={`w-4 h-4 ${isActive ? "text-accent" : ""}`} />
                            <span className="text-sm font-medium">{item.name}</span>
                        </Link>
                    );
                })}

                <div className="pt-4">
                    <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                        Categories
                    </div>
                    {Object.entries(componentCategories).map(([key, category]) => {
                        const Icon = categoryIcons[key as keyof typeof categoryIcons];
                        const components = getComponentsByCategory(key as keyof typeof componentCategories);
                        const isExpanded = expandedCategory === key;

                        return (
                            <div key={key}>
                                <button
                                    onClick={() => setExpandedCategory(isExpanded ? null : key)}
                                    className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all cursor-pointer"
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className="w-4 h-4" />
                                        <span className="text-sm font-medium">{category.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-muted-foreground/60">{components.length}</span>
                                        <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                    </div>
                                </button>
                                {isExpanded && components.length > 0 && (
                                    <div className="overflow-hidden">
                                        {components.map((comp) => (
                                            <Link
                                                key={comp.slug}
                                                href={`/${comp.slug}`}
                                                onClick={onNavigate}
                                                className="flex items-center gap-2 pl-10 pr-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                {comp.name}
                                                {comp.isNew && (
                                                    <span className="px-1 py-0.5 text-[8px] font-semibold uppercase bg-accent text-accent-foreground rounded">New</span>
                                                )}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </nav>

            <div className="p-3 border-t border-border">
                <div className="bg-secondary rounded-xl p-3 space-y-2">
                    <div className="flex items-center gap-2">
                        <Github className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground font-medium">Curiositas OSS</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                        Exploring the boundaries of UI animation.
                    </p>
                    <a
                        href="https://curiositas.studio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between text-[10px] text-accent hover:underline font-semibold uppercase tracking-wider cursor-pointer"
                    >
                        Studio <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                </div>
            </div>
        </>
    );
};

const Sidebar = () => {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            {/* Mobile Hamburger Button */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="fixed top-3 left-3 z-50 lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* Mobile Menu Overlay */}
            {mobileOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div className="fixed inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
                    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border flex flex-col">
                        <div className="p-4 pt-12">
                            <Link href="/" className="flex items-center gap-2.5 group cursor-pointer" onClick={() => setMobileOpen(false)}>
                                <div className="w-7 h-7 bg-accent flex items-center justify-center rounded-lg overflow-hidden">
                                    <Image src="/imgs/logos/curiositas-logo.webp" alt="Curiositas" width={20} height={20} className="object-contain" unoptimized />
                                </div>
                                <span className="font-display text-xl font-bold tracking-tight">
                                    Curio<span className="text-accent">UI</span>
                                </span>
                            </Link>
                        </div>
                        <SidebarContent pathname={pathname} onNavigate={() => setMobileOpen(false)} />
                    </aside>
                </div>
            )}

            {/* Desktop Sidebar */}
            <aside
                className="hidden lg:flex fixed left-0 top-0 bottom-0 border-r border-border bg-sidebar text-sidebar-foreground z-50 flex-col w-60"
            >
                <div className="p-3 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
                        <div className="w-7 h-7 bg-accent flex items-center justify-center rounded-lg overflow-hidden">
                            <Image src="/imgs/logos/curiositas-logo.webp" alt="Curiositas" width={20} height={20} className="object-contain" unoptimized />
                        </div>
                        <span className="font-display text-xl font-bold tracking-tight">
                            Curio<span className="text-accent">UI</span>
                        </span>
                    </Link>
                </div>

                <SidebarContent pathname={pathname} />
            </aside>
        </>
    );
};

export default Sidebar;
