"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import GlassSurface from "@/registry/buttons/glass-surface";
import { CodeBlock } from "@/components/ui/code-block";

const glassSurfaceCode = `"use client";

import React, { useEffect, useRef, useState, useId } from 'react';
import { cn } from '@/lib/utils';

export interface GlassSurfaceProps {
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  backgroundOpacity?: number;
  saturation?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  xChannel?: 'R' | 'G' | 'B';
  yChannel?: 'R' | 'G' | 'B';
  mixBlendMode?: React.CSSProperties['mixBlendMode'];
  className?: string;
  style?: React.CSSProperties;
}

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkDark = () => document.documentElement.classList.contains('dark');
    setIsDark(checkDark());
    const observer = new MutationObserver(() => setIsDark(checkDark()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return isDark;
};

const GlassSurface: React.FC<GlassSurfaceProps> = ({
  children,
  width = 200,
  height = 80,
  borderRadius = 20,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 11,
  displace = 0,
  backgroundOpacity = 0,
  saturation = 1,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  xChannel = 'R',
  yChannel = 'G',
  mixBlendMode = 'difference',
  className = '',
  style = {}
}) => {
  const uniqueId = useId().replace(/:/g, '-');
  const filterId = \`glass-filter-\${uniqueId}\`;
  const redGradId = \`red-grad-\${uniqueId}\`;
  const blueGradId = \`blue-grad-\${uniqueId}\`;

  const [svgSupported, setSvgSupported] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const feImageRef = useRef<SVGFEImageElement>(null);
  const redChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const greenChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const blueChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const gaussianBlurRef = useRef<SVGFEGaussianBlurElement>(null);
  const isDarkMode = useDarkMode();

  // ... (SVG filter implementation for chromatic aberration)
  // Full implementation available in registry

  return (
    <div ref={containerRef} className={cn("relative flex items-center justify-center overflow-hidden", className)} style={style}>
      {/* Glass surface content */}
      {children}
    </div>
  );
};

export default GlassSurface;`;

const usageCode = `import GlassSurface from "@/registry/buttons/glass-surface";

<GlassSurface width={300} height={200} borderRadius={24}>
  <h2>Glass Surface Content</h2>
</GlassSurface>`;

export default function GlassSurfacePage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2">
          <Link
            href="/components/buttons"
            className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Glass Surface</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">
          Premium glassmorphism container with chromatic aberration distortion effect.
          Full SVG filter implementation for advanced glass effects.
        </p>
      </motion.div>

      <CodeBlock code={glassSurfaceCode} language="tsx" title="glass-surface.tsx" />

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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <GlassSurface width={300} height={200} borderRadius={24}>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Curiositas</h3>
              <p className="text-slate-300">Glassmorphism</p>
            </div>
          </GlassSurface>
          <GlassSurface width={300} height={200} borderRadius={24} blur={20}>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Frosted</h3>
              <p className="text-slate-300">More blur</p>
            </div>
          </GlassSurface>
          <GlassSurface width={300} height={200} borderRadius={24} distort={50}>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Distorted</h3>
              <p className="text-slate-300">With distortion</p>
            </div>
          </GlassSurface>
        </div>
      </div>
    </div>
  );
}
