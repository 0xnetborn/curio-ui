"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ShinyText } from "@/registry/shiny-text";
import { CodeBlock } from "@/components/ui/code-block";

const shinyTextCode = `"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, useMotionValue, useAnimationFrame, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number;
  yoyo?: boolean;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
  delay?: number;
}

export function ShinyText({
  text,
  disabled = false,
  speed = 2,
  className = "",
  color = "#b5b5b5",
  shineColor = "#ffffff",
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = "left",
  delay = 0,
}: ShinyTextProps) {
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const directionRef = useRef(direction === "left" ? 1 : -1);

  useAnimationFrame((time) => {
    if (disabled || isPaused) {
      lastTimeRef.current = null;
      return;
    }
    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }
    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    elapsedRef.current += deltaTime;
    // Animation logic...
  });

  const gradientStyle: React.CSSProperties = {
    backgroundImage: \`linear-gradient(\${spread}deg, \${color} 0%, \${color} 35%, \${shineColor} 50%, \${color} 65%, \${color} 100%)\`,
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <motion.span
      className={cn("inline-block", className)}
      style={gradientStyle}
    >
      {text}
    </motion.span>
  );
}

export default ShinyText;`;

const usageCode = `import { ShinyText } from "@/registry/shiny-text";

<ShinyText text="CurioUI" speed={2} />`;

export default function ShinyTextPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2">
          <Link
            href="/text-animations"
            className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Shiny Text</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">
          Text with animated shine effect that passes through.
          Uses framer-motion for smooth animations.
        </p>
      </motion.div>

      <CodeBlock code={shinyTextCode} language="tsx" title="shiny-text.tsx" />

      <div className="space-y-4">
        <h3 className="font-semibold">Usage</h3>
        <div className="rounded-xl border border-border bg-card p-4">
          <pre className="text-sm font-mono text-muted-foreground overflow-x-auto">
            {usageCode}
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Preview</h3>
        <div className="flex flex-wrap gap-6 rounded-xl border border-border bg-card p-8">
          <ShinyText text="CurioUI" className="text-4xl font-bold" />
          <ShinyText text="Shiny" className="text-4xl font-bold" speed={3} />
          <ShinyText text="Premium" className="text-4xl font-bold" shineColor="#14B8A6" />
        </div>
      </div>
    </div>
  );
}
