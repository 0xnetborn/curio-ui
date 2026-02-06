import React from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: "blue" | "purple" | "teal" | "orange";
}

export function SpotlightCard({
  children,
  className,
  gradient = "teal",
}: SpotlightCardProps) {
  const gradients = {
    blue: "bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent",
    purple: "bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-transparent",
    teal: "bg-gradient-to-br from-teal-500/20 via-teal-500/10 to-transparent",
    orange: "bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-transparent",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/10 bg-slate-950 p-6",
        gradients[gradient],
        className
      )}
    >
      {/* Spotlight effect */}
      <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100" />
      {children}
    </div>
  );
}
