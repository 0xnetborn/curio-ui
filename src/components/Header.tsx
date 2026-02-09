"use client";

import React from "react";
import { useSidebarState } from "@/hooks/use-sidebar-state";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  const { isCollapsed } = useSidebarState();
  const { theme, setTheme } = useTheme();

  return (
    <header
      className={`fixed top-0 right-0 h-14 z-40 flex items-center px-6 transition-all duration-300 left-0 ${isCollapsed ? 'lg:left-16' : 'lg:left-64'}`}
    >
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl border-b border-border" />

      {/* Content */}
      <div className="relative z-10 flex items-center w-full justify-between">
        {/* Spacer for mobile hamburger */}
        <div className="w-12 lg:hidden" />

        <div className="flex items-center gap-4">
          <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase hidden sm:block">
            Animated UI Components
          </span>
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            <Sun className="w-4 h-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-foreground" />
            <Moon className="absolute top-2 left-2 w-4 h-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-foreground" />
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default Header;
