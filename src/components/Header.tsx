"use client";

import React from "react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useSidebarState } from "@/hooks/use-sidebar-state";

const Header = () => {
  const { isCollapsed } = useSidebarState();

  return (
    <header
      className={`fixed top-0 right-0 h-14 z-40 flex items-center px-6 transition-all duration-300 left-0 ${isCollapsed ? 'lg:left-16' : 'lg:left-64'}`}
    >
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl border-b border-border" />

      {/* Content */}
      <div className="relative z-10 flex items-center w-full">
        {/* Spacer for mobile hamburger */}
        <div className="w-12 lg:hidden" />

        <div className="flex items-center gap-4">
          <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase hidden sm:block">
            Animated UI Components
          </span>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <AnimatedThemeToggler
            className="w-9 h-9 rounded-lg bg-secondary hover:bg-muted flex items-center justify-center transition-colors cursor-pointer [&_svg]:w-4 [&_svg]:h-4 [&_svg]:text-foreground"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
