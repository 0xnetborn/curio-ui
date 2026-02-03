"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SwitchProps {
    checked?: boolean
    onCheckedChange?: (checked: boolean) => void
    className?: string
}

const Switch = ({ checked, onCheckedChange, className }: SwitchProps) => {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onCheckedChange?.(!checked)}
            className={cn(
                "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50",
                checked ? "bg-neon" : "bg-white/10",
                className
            )}
        >
            <motion.span
                animate={{ x: checked ? 20 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={cn(
                    "pointer-events-none block h-5 w-5 rounded-full bg-black shadow-lg ring-0"
                )}
            />
        </button>
    )
}

export { Switch }
