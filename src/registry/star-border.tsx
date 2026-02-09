"use client";

import React from "react";
import { cn } from "@/lib/utils";

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  className?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: React.CSSProperties["animationDuration"];
  thickness?: number;
};

export function StarBorder<T extends React.ElementType = "button">({
  className = "",
  color = "hsl(var(--accent))",
  speed = "6s",
  thickness = 1,
  children,
  ...rest
}: StarBorderProps<T>) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-[20px] cursor-pointer",
        className
      )}
      style={{
        padding: `${thickness}px 0`,
      }}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className="relative z-1 bg-gradient-to-b from-accent/10 to-accent/5 border border-accent/30 text-accent-foreground text-center text-[16px] font-medium py-[16px] px-[26px] rounded-[20px]">
        {children}
      </div>
    </button>
  );
}

export default StarBorder;
