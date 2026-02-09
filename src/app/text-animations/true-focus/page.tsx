"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import TrueFocus from "@/registry/text/true-focus";
import { PreviewCodeUsageTabs, type PropItem } from "@/components/ui/tabs";

const componentCode = `"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './true-focus.css';

export interface TrueFocusProps {
  sentence?: string;
  separator?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  className?: string;
}

const TrueFocus = ({
  sentence = 'True Focus',
  separator = ' ',
  manualMode = false,
  blurAmount = 5,
  borderColor = '#14B8A6',
  glowColor = 'rgba(20, 184, 166, 0.6)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  className = ''
}: TrueFocusProps) => {
  const words = sentence.split(separator);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(
        () => {
          setCurrentIndex(prev => (prev + 1) % words.length);
        },
        (animationDuration + pauseBetweenAnimations) * 1000
      );

      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    if (currentIndex === null || currentIndex === -1) return;
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height
    });
  }, [currentIndex, words.length]);

  // ... rest of implementation
};

export default TrueFocus;`;

const usageCode = `import TrueFocus from "@/registry/text/true-focus";

// Auto-cycling mode (default)
<TrueFocus
  sentence="Build Amazing Interfaces"
  className="text-4xl font-bold"
/>

// Manual mode - hover to focus
<TrueFocus
  sentence="Hover Over Me"
  manualMode={true}
  blurAmount={8}
  borderColor="#14B8A6"
  glowColor="rgba(20, 184, 166, 0.6)"
  className="text-3xl font-semibold"
/>`;

const props: PropItem[] = [
  { name: "sentence", type: "string", default: '"True Focus"', description: "Text to display and animate" },
  { name: "separator", type: "string", default: '" "', description: "Character to split words by" },
  { name: "manualMode", type: "boolean", default: "false", description: "Enable hover-to-focus mode" },
  { name: "blurAmount", type: "number", default: "5", description: "Blur amount in pixels for unfocused words" },
  { name: "borderColor", type: "string", default: '"#14B8A6"', description: "Color of focus frame border" },
  { name: "glowColor", type: "string", default: '"rgba(20, 184, 166, 0.6)"', description: "Glow color for focus frame" },
  { name: "animationDuration", type: "number", default: "0.5", description: "Duration of focus transition in seconds" },
  { name: "pauseBetweenAnimations", type: "number", default: "1", description: "Pause between word switches in seconds" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

export default function TrueFocusPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/text-animations" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">True Focus</h1>
        </div>
        <p className="text-muted-foreground max-w-lg pl-9">
          Word-by-word focus animation with blur effect and animated corner brackets.
        </p>
      </div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex flex-col items-center justify-center gap-12 min-h-[300px] bg-card rounded-xl border border-border/50 p-8">
            <div>
              <p className="text-xs text-muted-foreground mb-4 text-center">Auto Mode</p>
              <TrueFocus
                sentence="Build Amazing Interfaces"
                className="text-4xl font-bold"
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-4 text-center">Manual Mode (hover)</p>
              <TrueFocus
                sentence="Hover Over Me"
                manualMode={true}
                blurAmount={8}
                className="text-3xl font-semibold"
              />
            </div>
          </div>
        }
        code={componentCode}
        usage={usageCode}
        props={props}
      />
    </div>
  );
}
