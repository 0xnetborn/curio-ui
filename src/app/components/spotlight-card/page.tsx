"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SpotlightCard } from "@/registry/spotlight-card";
import { CodeBlock } from "@/components/ui/code-block";
import { PreviewCodeTabs } from "@/components/ui/tabs";

const componentCode = `"use client";

import React, { useRef, useState } from "react";

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current || isFocused) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(0.6);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={\`relative rounded-3xl border border-white/10 bg-slate-950 overflow-hidden p-8 \${className}\`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: \`radial-gradient(circle at \${position.x}px \${position.y}px, \${spotlightColor}, transparent 80%)\`,
        }}
      />
      {children}
    </div>
  );
}

export default SpotlightCard;`;

const usageCode = `import { SpotlightCard } from "@/registry/spotlight-card";

<SpotlightCard>
  <h3 className="text-xl font-semibold text-white mb-2">Title</h3>
  <p className="text-slate-300">Description here.</p>
</SpotlightCard>`;

export default function SpotlightCardPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2">
          <Link
            href="/components"
            className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Spotlight Card</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">
          Card with spotlight effect that follows mouse cursor.
        </p>
      </motion.div>

      <PreviewCodeTabs
        preview={
          <div className="grid gap-6 md:grid-cols-3">
            <SpotlightCard>
              <h3 className="text-xl font-semibold text-white mb-2">Curiositas Studio</h3>
              <p className="text-slate-300">We build intelligent systems with craft.</p>
            </SpotlightCard>
            <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.25)">
              <h3 className="text-xl font-semibold text-white mb-2">AI Automation</h3>
              <p className="text-slate-300">Eliminate manual work with AI-powered workflows.</p>
            </SpotlightCard>
            <SpotlightCard spotlightColor="rgba(168, 85, 247, 0.25)">
              <h3 className="text-xl font-semibold text-white mb-2">Custom Software</h3>
              <p className="text-slate-300">Tailored platforms engineered for your team.</p>
            </SpotlightCard>
          </div>
        }
        code={componentCode}
      />

      <div className="space-y-4">
        <h3 className="font-semibold">Usage</h3>
        <CodeBlock code={usageCode} language="tsx" />
      </div>
    </div>
  );
}
