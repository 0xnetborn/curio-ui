"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { BorderGlowButton } from "@/registry/buttons/border-glow-button";
import { ComponentPageTabs } from "@/components/ui/tabs";

const buttonCode = `"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface BorderGlowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

/**
 * Border Glow Button - From SyntaxUI
 * A button with mouse-tracking glow effect on the border
 */
export const BorderGlowButton = ({
  children,
  className,
  ...props
}: BorderGlowButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState({
    x: "-100%",
    y: "-100%",
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x: \`\${x}px\`, y: \`\${y}px\` });
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <button
      className={cn(
        "relative overflow-hidden rounded-lg bg-[#e5e7eb] transform transition-transform ease-in-out active:scale-90",
        className
      )}
      ref={ref}
      {...props}
    >
      <span
        className="absolute z-0 h-28 w-28 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(#fb3b53_0%,transparent_70%)]"
        style={{ left: mousePosition.x, top: mousePosition.y } as React.CSSProperties}
      />
      <div className="relative z-10 m-[1px] rounded-[calc(0.5rem-1px)] bg-white/90 px-4 py-1 text-xs text-[#fb3b53] backdrop-blur-sm">
        {children}
      </div>
    </button>
  );
};

export default BorderGlowButton;
`;

export default function BorderGlowButtonPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2">
          <Link
            href="/components/buttons"
            className="p-1 rounded-md hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Border Glow Button</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">
          A button with a mouse-tracking cyan glow effect on the border. The glow
          follows your cursor around the button edges.
        </p>
      </motion.div>

      {/* Component Tabs */}
      <ComponentPageTabs
        preview={
          <BorderGlowButton onClick={() => console.log("Border Glow clicked!")}>
            Border Glow
          </BorderGlowButton>
        }
        code={buttonCode}
      />

      {/* Props Table */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold">Props</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-4 font-medium">Prop</th>
                <th className="text-left py-2 px-4 font-medium">Type</th>
                <th className="text-left py-2 px-4 font-medium">Default</th>
                <th className="text-left py-2 px-4 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="py-2 px-4 font-mono text-accent">children</td>
                <td className="py-2 px-4">ReactNode</td>
                <td className="py-2 px-4">-</td>
                <td className="py-2 px-4 text-muted-foreground">
                  Button label or content
                </td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 px-4 font-mono text-accent">className</td>
                <td className="py-2 px-4">string</td>
                <td className="py-2 px-4">undefined</td>
                <td className="py-2 px-4 text-muted-foreground">
                  Additional CSS classes
                </td>
              </tr>
              <tr>
                <td colSpan={4} className="py-2 px-4 text-muted-foreground text-center">
                  Inherits all native button props (onClick, disabled, etc.)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Source */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Source:</span>
        <a
          href="https://syntaxui.com/components/button"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-accent hover:underline"
        >
          SyntaxUI <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
