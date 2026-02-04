"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import FuzzyText from "@/registry/text/fuzzy-text";
import { PreviewCodeTabs } from "@/components/ui/tabs";

const fuzzyTextCode = `"use client";

import React, { useEffect, useRef } from 'react';

export interface FuzzyTextProps {
  children: React.ReactNode;
  fontSize?: string | number;
  fontWeight?: string | number;
  fontFamily?: string;
  color?: string;
  enableHover?: boolean;
  baseIntensity?: number;
  hoverIntensity?: number;
  className?: string;
}

const FuzzyText = ({
  children,
  fontSize = 'clamp(2rem, 10vw, 10rem)',
  fontWeight = 900,
  fontFamily = 'inherit',
  color = '#fff',
  enableHover = true,
  baseIntensity = 0.18,
  hoverIntensity = 0.5,
  className = ''
}: FuzzyTextProps) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    let isCancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const init = async () => {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
      if (isCancelled) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const computedFontFamily =
        fontFamily === 'inherit' ? window.getComputedStyle(canvas).fontFamily || 'sans-serif' : fontFamily;

      const fontSizeStr = typeof fontSize === 'number' ? \`\${fontSize}px\` : fontSize;
      let numericFontSize;
      if (typeof fontSize === 'number') {
        numericFontSize = fontSize;
      } else {
        const temp = document.createElement('span');
        temp.style.fontSize = fontSize;
        document.body.appendChild(temp);
        const computedSize = window.getComputedStyle(temp).fontSize;
        numericFontSize = parseFloat(computedSize);
        document.body.removeChild(temp);
      }

      const text = React.Children.toArray(children).join('');

      // ... canvas rendering logic
    };

    init();
    // ... cleanup
  }, [children, fontSize, fontWeight, fontFamily, color, enableHover, baseIntensity, hoverIntensity]);

  return <canvas ref={canvasRef} className={className} />;
};

export default FuzzyText;`;

export default function FuzzyTextPage() {
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
          <h1 className="font-display text-4xl font-bold">Fuzzy Text</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">
          A canvas-based text effect that creates a fuzzy/glitch blur effect on hover.
          Uses performant canvas rendering for smooth animations.
        </p>
      </motion.div>

      {/* Default Fuzzy Text */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Default Effect</h2>
        <PreviewCodeTabs
          preview={
            <div className="bg-slate-950 p-8 rounded-lg flex items-center justify-center min-h-[200px]">
              <FuzzyText
                className="text-5xl font-black text-white"
                baseIntensity={0.18}
                hoverIntensity={0.5}
              >
                Hover Me
              </FuzzyText>
            </div>
          }
          code={fuzzyTextCode}
        />
      </div>

      {/* High Intensity */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">High Intensity</h2>
        <PreviewCodeTabs
          preview={
            <div className="bg-slate-950 p-8 rounded-lg flex items-center justify-center min-h-[200px]">
              <FuzzyText
                className="text-5xl font-black text-accent"
                baseIntensity={0.4}
                hoverIntensity={0.8}
              >
                Glitch Effect
              </FuzzyText>
            </div>
          }
          code={fuzzyTextCode}
        />
      </div>

      {/* With Custom Colors */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Custom Color</h2>
        <PreviewCodeTabs
          preview={
            <div className="bg-slate-950 p-8 rounded-lg flex items-center justify-center min-h-[200px]">
              <FuzzyText
                className="text-5xl font-black"
                color="#14B8A6"
                baseIntensity={0.25}
                hoverIntensity={0.6}
              >
                Curio UI
              </FuzzyText>
            </div>
          }
          code={fuzzyTextCode}
        />
      </div>

      {/* Props Table */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold">FuzzyText Props</h3>
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
              <tr className="border-border/50">
                <td className="py-2 px-4 font-mono text-accent">children</td>
                <td className="py-2 px-4">ReactNode</td>
                <td className="py-2 px-4">-</td>
                <td className="py-2 px-4 text-muted-foreground">Text content</td>
              </tr>
              <tr className="border-border/50">
                <td className="py-2 px-4 font-mono text-accent">fontSize</td>
                <td className="py-2 px-4">string | number</td>
                <td className="py-2 px-4">'clamp(2rem, 10vw, 10rem)'</td>
                <td className="py-2 px-4 text-muted-foreground">Font size (px or CSS)</td>
              </tr>
              <tr className="border-border/50">
                <td className="py-2 px-4 font-mono text-accent">fontWeight</td>
                <td className="py-2 px-4">string | number</td>
                <td className="py-2 px-4">900</td>
                <td className="py-2 px-4 text-muted-foreground">Font weight</td>
              </tr>
              <tr className="border-border/50">
                <td className="py-2 px-4 font-mono text-accent">color</td>
                <td className="py-2 px-4">string</td>
                <td className="py-2 px-4">'#fff'</td>
                <td className="py-2 px-4 text-muted-foreground">Text color</td>
              </tr>
              <tr className="border-border/50">
                <td className="py-2 px-4 font-mono text-accent">baseIntensity</td>
                <td className="py-2 px-4">number</td>
                <td className="py-2 px-4">0.18</td>
                <td className="py-2 px-4 text-muted-foreground">Blur intensity when idle (0-1)</td>
              </tr>
              <tr className="border-border/50">
                <td className="py-2 px-4 font-mono text-accent">hoverIntensity</td>
                <td className="py-2 px-4">number</td>
                <td className="py-2 px-4">0.5</td>
                <td className="py-2 px-4 text-muted-foreground">Blur intensity on hover (0-1)</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono text-accent">enableHover</td>
                <td className="py-2 px-4">boolean</td>
                <td className="py-2 px-4">true</td>
                <td className="py-2 px-4 text-muted-foreground">Enable hover interaction</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Source */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Source:</span>
        <a
          href="https://reactbits.dev/text-animations/fuzzy-text"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-accent hover:underline cursor-pointer"
        >
          reactbits.dev <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
