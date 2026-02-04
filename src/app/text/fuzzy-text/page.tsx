"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PreviewCodeTabs } from "@/components/ui/tabs";
import FuzzyText from "@/registry/text/fuzzy-text";

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
  fps?: number;
  direction?: 'horizontal' | 'vertical' | 'both';
  transitionDuration?: number;
  clickEffect?: boolean;
  glitchMode?: boolean;
  glitchInterval?: number;
  glitchDuration?: number;
  gradient?: string[] | null;
  letterSpacing?: number;
  className?: string;
}

const FuzzyText: React.FC<FuzzyTextProps> = ({
  children,
  fontSize = 'clamp(2rem, 8vw, 8rem)',
  fontWeight = 900,
  fontFamily = 'inherit',
  color = '#fff',
  enableHover = true,
  baseIntensity = 0.18,
  hoverIntensity = 0.5,
  fuzzRange = 30,
  fps = 60,
  direction = 'horizontal',
  transitionDuration = 0,
  clickEffect = false,
  glitchMode = false,
  glitchInterval = 2000,
  glitchDuration = 200,
  gradient = null,
  letterSpacing = 0,
  className = ''
}) => {
  // ... (full implementation in registry)
  return <canvas ref={canvasRef} className={className} />;
};

export default FuzzyText;`;

const USAGE = `import FuzzyText from "@/registry/text/fuzzy-text";

// Basic usage
<FuzzyText>CurioUI</FuzzyText>

// With custom color
<FuzzyText color="#0D9488">Teal Text</FuzzyText>

// With gradient
<FuzzyText gradient={["#0D9488", "#14B8A6", "#2DD4BF"]}>
  Gradient
</FuzzyText>

// With glitch mode
<FuzzyText glitchMode glitchInterval={3000}>
  Glitch
</FuzzyText>

// With click effect
<FuzzyText clickEffect enableHover>
  Click Me
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
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/components" className="p-1 rounded-md hover:bg-secondary transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Fuzzy Text</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">
          Canvas-based text effect with fuzzy/glitch animation. Supports hover, click, and glitch modes.
        </p>
        <div className="flex flex-wrap gap-2">
          <TechBadge>React</TechBadge>
          <TechBadge>TypeScript</TechBadge>
          <TechBadge>Canvas</TechBadge>
        </div>
      </div>

      {/* Preview + Code */}
      <PreviewCodeTabs
        preview={
          <div className="flex items-center justify-center min-h-[200px] bg-background">
            <FuzzyText color="#0D9488" enableHover>CurioUI</FuzzyText>
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

      {/* Props */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold text-lg">Props</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-4">Prop</th>
                <th className="text-left py-2 px-4">Type</th>
                <th className="text-left py-2 px-4">Default</th>
              </tr>
            </thead>
            <tbody className="font-mono text-xs">
              <tr className="border-b border-border/50"><td className="py-2 px-4">children</td><td className="py-2 px-4">ReactNode</td><td className="py-2 px-4">-</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 px-4">fontSize</td><td className="py-2 px-4">number | string</td><td className="py-2 px-4">clamp(2rem, 8vw, 8rem)</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 px-4">color</td><td className="py-2 px-4">string</td><td className="py-2 px-4">#fff</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 px-4">enableHover</td><td className="py-2 px-4">boolean</td><td className="py-2 px-4">true</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 px-4">baseIntensity</td><td className="py-2 px-4">number</td><td className="py-2 px-4">0.18</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 px-4">hoverIntensity</td><td className="py-2 px-4">number</td><td className="py-2 px-4">0.5</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 px-4">glitchMode</td><td className="py-2 px-4">boolean</td><td className="py-2 px-4">false</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 px-4">clickEffect</td><td className="py-2 px-4">boolean</td><td className="py-2 px-4">false</td></tr>
              <tr><td className="py-2 px-4">gradient</td><td className="py-2 px-4">string[] | null</td><td className="py-2 px-4">null</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
