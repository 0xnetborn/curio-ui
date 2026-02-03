"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export interface GradientFillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

/**
 * Gradient Fill Button - From SyntaxUI
 * A button that fills with gradient from bottom on hover
 */
export const GradientFillButton = ({ children, className, ...props }: GradientFillButtonProps) => {
  return (
    <button
      className={cn(
        "group/button relative overflow-hidden rounded-md border border-red-500/20 bg-white px-4 py-1 text-xs font-medium text-red-500 transition-all duration-150 hover:border-red-500 active:scale-95",
        className
      )}
      {...props}
    >
      <span className="absolute bottom-0 left-0 z-0 h-0 w-full bg-gradient-to-t from-red-600 to-red-500 transition-all duration-500 group-hover/button:h-full" />
      <span className="relative z-10 transition-all duration-500 group-hover/button:text-white">
        {children}
      </span>
    </button>
  );
};

export default GradientFillButton;
