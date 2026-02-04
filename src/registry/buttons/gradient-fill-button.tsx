"use client";

import { ButtonHTMLAttributes } from "react";

export interface GradientFillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const GradientFillButton = ({
  children = "CurioUI",
  className,
  ...props
}: GradientFillButtonProps) => {
  return (
    <button
      className={`group/button relative overflow-hidden rounded-md border border-accent/20 bg-background px-4 py-1 text-xs font-medium text-accent transition-all duration-150 hover:border-accent active:scale-95 ${className || ""}`}
      {...props}
    >
      <span className="absolute bottom-0 left-0 z-0 h-0 w-full bg-gradient-to-t from-accent to-accent/80 transition-all duration-500 group-hover/button:h-full" />
      <span className="relative z-10 transition-all duration-500 group-hover/button:text-accent-foreground">
        {children}
      </span>
    </button>
  );
};

export default GradientFillButton;
