"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Component, Terminal, ExternalLink, Github, Menu, PanelLeftClose, PanelLeft, Layers, MousePointer, LayoutGrid, Type, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useSidebarState } from "@/hooks/use-sidebar-state";
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
    // Keep all categories expanded by default
    const expandedCategory = useRef<string | null>(Object.keys(componentCategories)[0]);

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

                {/* Categories Section */}
                <div className="pt-4">
                    <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                        Categories
                    </div>
                    {Object.entries(componentCategories).map(([key, category]) => {
                        const Icon = categoryIcons[key as keyof typeof categoryIcons];
                        const components = getComponentsByCategory(key as keyof typeof componentCategories);
                        // All categories are always expanded
                        const isExpanded = true;

                        return (
                            <div key={key}>
                                {/* Category header - no toggle needed since always expanded */}
                                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground bg-secondary/50">
                                    <Icon className="w-4 h-4 text-accent" />
                                    <span className="text-sm font-medium">{category.name}</span>
                                    <span className="text-[10px] text-muted-foreground/60 ml-auto">{components.length}</span>
                                </div>
                                {/* Always show components */}
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    className="overflow-hidden"
                                >
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
                                </motion.div>
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
    const { isCollapsed, setIsCollapsed } = useSidebarState();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <TooltipProvider delayDuration={100}>
            {/* Mobile Hamburger Button */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="fixed top-3 left-3 z-50 lg:hidden"
                    >
                        <Menu className="w-5 h-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0 flex flex-col">
                    <div className="p-4">
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
                </SheetContent>
            </Sheet>

            {/* Desktop Sidebar */}
            <aside
                className={`hidden lg:flex fixed left-0 top-0 bottom-0 border-r border-border bg-sidebar text-sidebar-foreground z-50 flex-col transition-all duration-300 ${isCollapsed ? 'w-14' : 'w-60'}`}
            >
                <div className={`p-3 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                    {!isCollapsed && (
                        <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
                            <div className="w-7 h-7 bg-accent flex items-center justify-center rounded-lg overflow-hidden">
                                <Image src="/imgs/logos/curiositas-logo.webp" alt="Curiositas" width={20} height={20} className="object-contain" unoptimized />
                            </div>
                            <span className="font-display text-xl font-bold tracking-tight">
                                Curio<span className="text-accent">UI</span>
                            </span>
                        </Link>
                    )}
                    {isCollapsed && (
                        <Link href="/" className="flex items-center justify-center cursor-pointer">
                            <div className="w-7 h-7 bg-accent flex items-center justify-center rounded-lg overflow-hidden">
                                <Image src="/imgs/logos/curiositas-logo.webp" alt="Curiositas" width={20} height={20} className="object-contain" unoptimized />
                            </div>
                        </Link>
                    )}
                    {!isCollapsed && (
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => setIsCollapsed(true)}
                            className="shrink-0"
                        >
                            <PanelLeftClose className="w-4 h-4" />
                        </Button>
                    )}
                </div>

                {isCollapsed ? (
                    <nav className="flex-1 px-2 space-y-1 pt-2">
                        {[...navItems].map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Tooltip key={item.name}>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={item.href}
                                            className={`flex items-center justify-center p-2 rounded-lg transition-all cursor-pointer ${isActive ? "text-accent bg-accent/5" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
                                        >
                                            <item.icon className="w-4 h-4" />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        <p>{item.name}</p>
                                    </TooltipContent>
                                </Tooltip>
                            );
                        })}
                        <div className="pt-3">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        onClick={() => setIsCollapsed(false)}
                                        className="w-full"
                                    >
                                        <PanelLeft className="w-4 h-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>Expand</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </nav>
                ) : (
                    <SidebarContent pathname={pathname} />
                )}
            </aside>
        </TooltipProvider>
    );
};

export default Sidebar;
