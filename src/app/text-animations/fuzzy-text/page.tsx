"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PreviewCodeTabs } from "@/components/ui/tabs";
import FuzzyText from "@/registry/text/fuzzy-text";

const CODE = `"use client";

import React, { useEffect, useRef } from 'react';

interface FuzzyTextProps {
  children: React.ReactNode;
  fontSize?: number | string;
  fontWeight?: string | number;
  color?: string;
  enableHover?: boolean;
  baseIntensity?: number;
  hoverIntensity?: number;
  fuzzRange?: number;
  fps?: number;
  direction?: 'horizontal' | 'vertical' | 'both';
  clickEffect?: boolean;
  glitchMode?: boolean;
  glitchInterval?: number;
  glitchDuration?: number;
  gradient?: string[] | null;
  className?: string;
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
  fps = 60,
  direction = 'horizontal',
  clickEffect = false,
  glitchMode = false,
  glitchInterval = 2000,
  glitchDuration = 200,
  gradient = null,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Canvas-based fuzzy text animation with requestAnimationFrame
  // Supports hover, click, and glitch effects

  return <canvas ref={canvasRef} className={className} />;
};

export default FuzzyText;`;

const USAGE = `import FuzzyText from "@/registry/text/fuzzy-text";

// Basic usage
<FuzzyText>CurioUI</FuzzyText>

// With gradient
<FuzzyText
  gradient={["#0D9488", "#14B8A6", "#2DD4BF"]}
  fontSize="4rem"
>
  CurioUI
</FuzzyText>

// With glitch mode
<FuzzyText glitchMode glitchInterval={2000}>
  Glitch Effect
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
          <Link href="/components" className="p-1 rounded-md hover:bg-secondary transition-colors">
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
