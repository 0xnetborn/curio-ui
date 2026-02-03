"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <button
                className={cn(
                    "w-10 h-10 rounded-xl bg-muted border border-border",
                    className
                )}
            />
        )
    }

    const isDark = theme === "dark"

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={cn(
                "relative w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center cursor-pointer",
                "transition-all duration-300 hover:bg-accent hover:border-neon/20 active:scale-95",
                "overflow-hidden",
                className
            )}
            aria-label="Toggle theme"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={isDark ? "dark" : "light"}
                    initial={{ y: -20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: 90 }}
                    transition={{
                        duration: 0.25,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                    className="absolute"
                >
                    {isDark ? (
                        <Sun className="w-5 h-5 text-neon" />
                    ) : (
                        <Moon className="w-5 h-5 text-foreground" />
                    )}
                </motion.div>
            </AnimatePresence>
        </button>
    )
}
