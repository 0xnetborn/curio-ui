"use client";

import { ButtonHTMLAttributes } from "react";

export interface ShineButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const ShineButton = ({
  children = "CurioUI",
  className,
  ...props
}: ShineButtonProps) => {
  return (
    <button
      className={`group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-accent px-4 py-1.5 text-xs font-normal text-accent-foreground transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-accent/30 ${className || ""}`}
      {...props}
    >
      <span className="text-sm">{children}</span>
      <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
        <div className="relative h-full w-8 bg-white/20" />
      </div>
    </button>
  );
};

export default ShineButton;
