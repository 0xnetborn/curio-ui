"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SpotlightCard } from "@/registry/spotlight-card";
import { PreviewCodeUsageTabs, type PropItem } from "@/components/ui/tabs";

const componentCode = `"use client";

import React, { useRef, useState } from "react";

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "hsl(var(--accent) / 0.4)",
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={() => { setIsFocused(true); setOpacity(0.6); }}
      onBlur={() => { setIsFocused(false); setOpacity(0); }}
      onMouseEnter={() => setOpacity(0.6)}
      onMouseLeave={() => setOpacity(0)}
      className={\`relative rounded-3xl border border-accent/20 bg-card overflow-hidden p-8 \${className}\`}
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
  <h3 className="text-xl font-semibold">Title</h3>
  <p className="text-muted-foreground">Description here.</p>
</SpotlightCard>`;

const props: PropItem[] = [
  { name: "children", type: "ReactNode", description: "Card content" },
  { name: "spotlightColor", type: "string", default: "hsl(var(--accent) / 0.4)", description: "Spotlight gradient color" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

const dependencies = ["framer-motion"];

export default function SpotlightCardPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/components" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Spotlight Card</h1>
        </div>
        <p className="text-muted-foreground max-w-lg pl-9">
          Card with gradient spotlight effect that follows your cursor.
        </p>
      </div>

      <PreviewCodeUsageTabs
        preview={
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <SpotlightCard>
              <h3 className="text-xl font-semibold mb-2">Curiositas Studio</h3>
              <p className="text-muted-foreground">We build intelligent systems with craft.</p>
            </SpotlightCard>
            <SpotlightCard spotlightColor="hsl(var(--accent) / 0.3)">
              <h3 className="text-xl font-semibold mb-2">AI Automation</h3>
              <p className="text-muted-foreground">Eliminate manual work with AI-powered workflows.</p>
            </SpotlightCard>
            <SpotlightCard spotlightColor="hsl(var(--accent) / 0.2)">
              <h3 className="text-xl font-semibold mb-2">Custom Software</h3>
              <p className="text-muted-foreground">Tailored platforms engineered for your team.</p>
            </SpotlightCard>
          </div>
        }
        code={componentCode}
        usage={usageCode}
        props={props}
        dependencies={dependencies}
      />
    </div>
  );
}
