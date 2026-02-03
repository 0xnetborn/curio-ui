"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ToggleGroupProps {
    value: string
    onValueChange: (value: string) => void
    options: { value: string; label: string }[]
    className?: string
}

const ToggleGroup = ({ value, onValueChange, options, className }: ToggleGroupProps) => {
    return (
        <div className={cn("grid gap-2 p-1 bg-black/40 rounded-2xl border border-white/5 dark:bg-black/40 dark:border-white/5", className)} style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}>
            {options.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    onClick={() => onValueChange(option.value)}
                    className={cn(
                        "py-3 rounded-[14px] text-[8px] font-black uppercase transition-all tracking-widest cursor-pointer",
                        value === option.value
                            ? "bg-neon text-black shadow-lg shadow-neon/10"
                            : "text-white/30 hover:text-white dark:text-white/30 dark:hover:text-white"
                    )}
                >
                    {option.label}
                </button>
            ))}
        </div>
    )
}

export { ToggleGroup }
