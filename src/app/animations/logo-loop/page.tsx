"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import LogoLoop from "@/registry/animations/logo-loop";
import "@/registry/animations/logo-loop.css";
import { PreviewCodeTabs } from "@/components/ui/tabs";

const sampleLogos = [
  { node: <span className="text-2xl font-bold text-accent">Curio</span>, href: "#", ariaLabel: "Curio" },
  { node: <span className="text-2xl font-bold text-white">UI</span>, href: "#", ariaLabel: "UI" },
  { node: <span className="text-2xl font-bold text-muted-foreground">Design</span>, href: "#", ariaLabel: "Design" },
  { node: <span className="text-2xl font-bold text-white">Components</span>, href: "#", ariaLabel: "Components" },
  { node: <span className="text-2xl font-bold text-accent">Animation</span>, href: "#", ariaLabel: "Animation" },
];

const logoLoopCode = `"use client";

import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';
import '@/registry/animations/logo-loop.css';

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 };

const useResizeObserver = (callback, elements, dependencies) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener('resize', handleResize);
      callback();
      return () => window.removeEventListener('resize', handleResize);
    }
    const observers = elements.map(ref => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });
    callback();
    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, [callback, elements, dependencies]);
};

const useImageLoader = (seqRef, onLoad, dependencies) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll('img') ?? [];
    if (images.length === 0) {
      onLoad();
      return;
    }
    let remainingImages = images.length;
    const handleImageLoad = () => {
      remainingImages -= 1;
      if (remainingImages === 0) onLoad();
    };
    images.forEach(img => {
      const htmlImg = img;
      if (htmlImg.complete) {
        handleImageLoad();
      } else {
        htmlImg.addEventListener('load', handleImageLoad, { once: true });
        htmlImg.addEventListener('error', handleImageLoad, { once: true });
      }
    });
    return () => {
      images.forEach(img => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageLoad);
      });
    };
  }, [onLoad, seqRef, dependencies]);
};

const useAnimationLoop = (trackRef, targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical) => {
  const rafRef = useRef(null);
  const lastTimestampRef = useRef(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const seqSize = isVertical ? seqHeight : seqWidth;

    if (seqSize > 0) {
      offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
      const transformValue = isVertical
        ? \`translate3d(0, \${-offsetRef.current}px, 0)\`
        : \`translate3d(\${-offsetRef.current}px, 0, 0)\`;
      track.style.transform = transformValue;
    }

    const animate = (timestamp) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;

      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (seqSize > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
        nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize;
        offsetRef.current = nextOffset;

        const transformValue = isVertical
          ? \`translate3d(0, \${-offsetRef.current}px, 0)\`
          : \`translate3d(\${-offsetRef.current}px, 0, 0)\`;
        track.style.transform = transformValue;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical, trackRef]);
};

export interface LogoItem {
  src?: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
  alt?: string;
  title?: string;
  href?: string;
  ariaLabel?: string;
  node?: React.ReactNode;
}

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  width?: string | number;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoItem, key: string | number) => React.ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const LogoLoop = memo(
  ({
    logos,
    speed = 120,
    direction = 'left',
    width = '100%',
    logoHeight = 28,
    gap = 32,
    pauseOnHover,
    hoverSpeed,
    fadeOut = false,
    fadeOutColor,
    scaleOnHover = false,
    renderItem,
    ariaLabel = 'Partner logos',
    className,
    style
  }: LogoLoopProps) => {
    // ... component implementation
    return (
      <div className="logoloop" role="region" aria-label={ariaLabel}>
        <div className="logoloop__track">
          {/* logo lists */}
        </div>
      </div>
    );
  }
);

export default LogoLoop;`;

export default function LogoLoopPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2">
          <Link
            href="/animations"
            className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Logo Loop</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">
          An infinite scrolling animation for logos. Smooth, customizable, and performant.
        </p>
      </motion.div>

      {/* Default Logo Loop */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Default Loop</h2>
        <PreviewCodeTabs
          preview={
            <div className="bg-slate-900 p-8 rounded-lg flex items-center justify-center w-full overflow-hidden">
              <div className="w-full max-w-4xl">
                <LogoLoop logos={sampleLogos} speed={80} />
              </div>
            </div>
          }
          code={logoLoopCode}
        />
      </div>

      {/* Pause on Hover */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Pause on Hover</h2>
        <PreviewCodeTabs
          preview={
            <div className="bg-slate-900 p-8 rounded-lg flex items-center justify-center w-full overflow-hidden">
              <div className="w-full max-w-4xl">
                <LogoLoop logos={sampleLogos} speed={100} pauseOnHover />
              </div>
            </div>
          }
          code={logoLoopCode}
        />
      </div>

      {/* Vertical Direction */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Vertical Loop</h2>
        <PreviewCodeTabs
          preview={
            <div className="bg-slate-900 p-8 rounded-lg flex items-center justify-center w-full overflow-hidden">
              <div className="w-full max-w-md h-64">
                <LogoLoop logos={sampleLogos} direction="up" speed={60} />
              </div>
            </div>
          }
          code={logoLoopCode}
        />
      </div>

      {/* Fade Effect */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">With Fade Effect</h2>
        <PreviewCodeTabs
          preview={
            <div className="bg-slate-900 p-8 rounded-lg flex items-center justify-center w-full overflow-hidden">
              <div className="w-full max-w-4xl">
                <LogoLoop logos={sampleLogos} speed={90} fadeOut fadeOutColor="#020617" />
              </div>
            </div>
          }
          code={logoLoopCode}
        />
      </div>

      {/* Props Table */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold">LogoLoop Props</h3>
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
                <td className="py-2 px-4 font-mono text-accent">logos</td>
                <td className="py-2 px-4">LogoItem[]</td>
                <td className="py-2 px-4">[]</td>
                <td className="py-2 px-4 text-muted-foreground">Array of logo items</td>
              </tr>
              <tr className="border-border/50">
                <td className="py-2 px-4 font-mono text-accent">speed</td>
                <td className="py-2 px-4">number</td>
                <td className="py-2 px-4">120</td>
                <td className="py-2 px-4 text-muted-foreground">Animation speed (px/sec)</td>
              </tr>
              <tr className="border-border/50">
                <td className="py-2 px-4 font-mono text-accent">direction</td>
                <td className="py-2 px-4">'left' | 'right' | 'up' | 'down'</td>
                <td className="py-2 px-4">'left'</td>
                <td className="py-2 px-4 text-muted-foreground">Scroll direction</td>
              </tr>
              <tr className="border-border/50">
                <td className="py-2 px-4 font-mono text-accent">pauseOnHover</td>
                <td className="py-2 px-4">boolean</td>
                <td className="py-2 px-4">undefined</td>
                <td className="py-2 px-4 text-muted-foreground">Pause animation on hover</td>
              </tr>
              <tr className="border-border/50">
                <td className="py-2 px-4 font-mono text-accent">fadeOut</td>
                <td className="py-2 px-4">boolean</td>
                <td className="py-2 px-4">false</td>
                <td className="py-2 px-4 text-muted-foreground">Enable fade gradient</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono text-accent">logoHeight</td>
                <td className="py-2 px-4">number</td>
                <td className="py-2 px-4">28</td>
                <td className="py-2 px-4 text-muted-foreground">Height of logo items (px)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Dependencies */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold">Dependencies</h3>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li className="flex items-center gap-2">
            <code className="text-accent">react</code>
            <span>— Core React</span>
          </li>
        </ul>
      </div>

      {/* CSS Required */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold">CSS Required</h3>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">{`import '@/registry/animations/logo-loop.css';`}</pre>
      </div>

      {/* Source */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Source:</span>
        <a
          href="https://reactbits.dev/animations/logo-loop"
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
