"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import FuzzyText from "@/registry/text/fuzzy-text";
import { PreviewCodeTabs } from "@/components/ui/tabs";

const CODE = `import React, { useEffect, useRef } from 'react';

interface FuzzyTextProps {
  children: React.ReactNode;
  fontSize?: number | string;
  fontWeight?: string | number;
  fontFamily?: string;
  color?: string;
  enableHover?: boolean;
  baseIntensity?: number;
  hoverIntensity?: number;
  fuzzRange?: number;
  // ... more props
}

const FuzzyText: React.FC<FuzzyTextProps> = ({
  children,
  fontSize = 'clamp(2rem, 8vw, 8rem)',
  fontWeight = 900,
  color = '#fff',
  enableHover = true,
  baseIntensity = 0.18,
  hoverIntensity = 0.5,
  fuzzRange = 30,
  // ... more props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Canvas-based fuzzy text animation
    // Uses requestAnimationFrame for smooth animation
    // Supports hover, click, and glitch effects
  }, []);

  return <canvas ref={canvasRef} />;
};

export default FuzzyText;`;

const USAGE = `import FuzzyText from "@/registry/text/fuzzy-text";

// Basic usage
<FuzzyText>CurioUI</FuzzyText>

// With gradient
<FuzzyText gradient={["#0D9488", "#14B8A6", "#2DD4BF"]}>
  CurioUI
</FuzzyText>

// With glitch mode
<FuzzyText glitchMode glitchInterval={2000}>
  CurioUI
</FuzzyText>

// Full customization
<FuzzyText
  fontSize="4rem"
  fontWeight={900}
  color="#0D9488"
  enableHover
  baseIntensity={0.2}
  hoverIntensity={0.6}
  fuzzRange={40}
  clickEffect
>
  Hover Me
</FuzzyText>`;

function TechBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-secondary text-secondary-foreground">
      {children}
    </span>
  );
}

export default function FuzzyTextPage() {
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
            href="/text-animations"
            className="p-1 rounded-md hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Fuzzy Text</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">
          Canvas-based fuzzy text effect with hover, click, and glitch animations.
        </p>
        <div className="flex flex-wrap gap-2">
          <TechBadge>React</TechBadge>
          <TechBadge>TypeScript</TechBadge>
          <TechBadge>Canvas</TechBadge>
        </div>
      </motion.div>

      {/* Preview + Code */}
      <PreviewCodeTabs
        preview={
          <div className="bg-slate-900 p-8 rounded-lg flex items-center justify-center min-h-[200px]">
            <FuzzyText
              fontSize="clamp(2rem, 8vw, 4rem)"
              fontWeight={900}
              color="#0D9488"
              enableHover
              baseIntensity={0.18}
              hoverIntensity={0.5}
            >
              CurioUI
            </FuzzyText>
          </div>
        }
        code={CODE}
        codeLanguage="tsx"
      />

      {/* Usage */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold text-lg">Usage</h3>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono">{USAGE}</pre>
      </div>
    </div>
  );
}
