"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import GradientText from "@/registry/text/gradient-text";
import "@/registry/text/gradient-text.css";
import { PreviewCodeTabs } from "@/components/ui/tabs";

const gradientTextCode = `"use client";

import { useState, useCallback, useEffect, useRef, ReactNode } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';

export interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  direction?: 'horizontal' | 'vertical' | 'diagonal';
  pauseOnHover?: boolean;
  yoyo?: boolean;
}

export default function GradientText({
  children,
  className = '',
  colors = ['#14B8A6', '#06b6d4', '#14B8A6', '#0d9488', '#14B8A6'],
  animationSpeed = 8,
  showBorder = false,
  direction = 'horizontal',
  pauseOnHover = false,
  yoyo = true
}: GradientTextProps) {
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef(null);

  const animationDuration = animationSpeed * 1000;

  useAnimationFrame((time) => {
    if (isPaused) {
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

    if (yoyo) {
      const fullCycle = animationDuration * 2;
      const cycleTime = elapsedRef.current % fullCycle;

      if (cycleTime < animationDuration) {
        progress.set((cycleTime / animationDuration) * 100);
      } else {
        progress.set(100 - ((cycleTime - animationDuration) / animationDuration) * 100);
      }
    } else {
      progress.set((elapsedRef.current / animationDuration) * 100);
    }
  });

  useEffect(() => {
    elapsedRef.current = 0;
    progress.set(0);
  }, [animationSpeed, yoyo]);

  const backgroundPosition = useTransform(progress, (p) => {
    if (direction === 'horizontal') {
      return p + '% 50%';
    } else if (direction === 'vertical') {
      return '50% ' + p + '%';
    } else {
      return p + '% 50%';
    }
  });

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  const gradientAngle =
    direction === 'horizontal' ? 'to right' : direction === 'vertical' ? 'to bottom' : 'to bottom right';
  const gradientColors = [...colors, colors[0]].join(', ');

  const gradientStyle = {
    backgroundImage: 'linear-gradient(' + gradientAngle + ', ' + gradientColors + ')',
    backgroundSize: direction === 'horizontal' ? '300% 100%' : direction === 'vertical' ? '100% 300%' : '300% 300%',
    backgroundRepeat: 'repeat'
  };

  return (
    <motion.div
      className={'relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-[1.25rem] font-medium backdrop-blur transition-shadow duration-500 overflow-hidden cursor-pointer ' + className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showBorder && (
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none rounded-[1.25rem]"
          style={{ ...gradientStyle, backgroundPosition }}
        >
          <div
            className="absolute bg-background rounded-[1.25rem] z-[-1]"
            style={{
              width: 'calc(100% - 2px)',
              height: 'calc(100% - 2px)',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        </motion.div>
      )}
      <motion.div
        className="inline-block relative z-2 text-transparent bg-clip-text"
        style={{ ...gradientStyle, backgroundPosition, WebkitBackgroundClip: 'text' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}`;

export default function GradientTextPage() {
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
          <h1 className="font-display text-4xl font-bold">Gradient Text</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">
          Animated gradient text with customizable colors, speed, and direction.
          Uses framer-motion for smooth animations.
        </p>
      </motion.div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Preview</h2>
        <PreviewCodeTabs
          preview={
            <div className="border border-border p-8 flex items-center justify-center min-h-[150px]">
              <GradientText
                className="text-5xl font-black"
                animationSpeed={8}
              >
                CurioUI
              </GradientText>
            </div>
          }
          code={gradientTextCode}
        />
      </div>

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
              <tr className="border-border/50">
                <td className="py-2 px-4 font-mono text-accent">children</td>
                <td className="py-2 px-4">ReactNode</td>
                <td className="py-2 px-4">-</td>
                <td className="py-2 px-4 text-muted-foreground">Text content</td>
              </tr>
              <tr className="border-border/50">
                <td className="py-2 px-4 font-mono text-accent">colors</td>
                <td className="py-2 px-4">string[]</td>
                <td className="py-2 px-4">['#14B8A6', ...]</td>
                <td className="py-2 px-4 text-muted-foreground">Gradient colors (Curio accent)</td>
              </tr>
              <tr className="border-border/50">
                <td className="py-2 px-4 font-mono text-accent">animationSpeed</td>
                <td className="py-2 px-4">number</td>
                <td className="py-2 px-4">8</td>
                <td className="py-2 px-4 text-muted-foreground">Animation duration (seconds)</td>
              </tr>
              <tr className="border-border/50">
                <td className="py-2 px-4 font-mono text-accent">direction</td>
                <td className="py-2 px-4">'horizontal' | 'vertical' | 'diagonal'</td>
                <td className="py-2 px-4">'horizontal'</td>
                <td className="py-2 px-4 text-muted-foreground">Gradient direction</td>
              </tr>
              <tr className="border-border/50">
                <td className="py-2 px-4 font-mono text-accent">showBorder</td>
                <td className="py-2 px-4">boolean</td>
                <td className="py-2 px-4">false</td>
                <td className="py-2 px-4 text-muted-foreground">Show gradient border</td>
              </tr>
              <tr className="border-border/50">
                <td className="py-2 px-4 font-mono text-accent">pauseOnHover</td>
                <td className="py-2 px-4">boolean</td>
                <td className="py-2 px-4">false</td>
                <td className="py-2 px-4 text-muted-foreground">Pause animation on hover</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono text-accent">yoyo</td>
                <td className="py-2 px-4">boolean</td>
                <td className="py-2 px-4">true</td>
                <td className="py-2 px-4 text-muted-foreground">Yoyo animation (back and forth)</td>
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
            <code className="text-accent">framer-motion</code>
            <span>— For smooth animations</span>
          </li>
        </ul>
      </div>

      {/* CSS Required */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold">CSS</h3>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">{`import '@/registry/text/gradient-text.css';`}</pre>
      </div>

      {/* Source */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Source:</span>
        <a
          href="https://reactbits.dev/text-animations/gradient-text"
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
