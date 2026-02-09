"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import TextCursor from "@/registry/effects/text-cursor";
import { PreviewCodeUsageTabs } from "@/components/ui/tabs";

const componentCode = `"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrailPoint {
  id: number;
  x: number;
  y: number;
  angle: number;
  randomX?: number;
  randomY?: number;
  randomRotate?: number;
}

interface TextCursorProps {
  text?: string;
  spacing?: number;
  followMouseDirection?: boolean;
  randomFloat?: boolean;
  exitDuration?: number;
  removalInterval?: number;
  maxPoints?: number;
  className?: string;
  children?: React.ReactNode;
}

const TextCursor = ({
  text = '⚛️',
  spacing = 100,
  followMouseDirection = true,
  randomFloat = true,
  exitDuration = 0.5,
  removalInterval = 30,
  maxPoints = 5,
  className = '',
  children
}: TextCursorProps) => {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMoveTimeRef = useRef(Date.now());
  const idCounter = useRef(0);

  // Mouse tracking and trail logic...
  // (See full source in registry)

  return (
    <div ref={containerRef} className={\`relative w-full h-full overflow-hidden \${className}\`}>
      {children}
      <AnimatePresence>
        {trail.map(item => (
          <motion.div key={item.id} /* ... */ >
            {text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TextCursor;`;

const usageCode = `import TextCursor from "@/registry/effects/text-cursor";

// Basic usage - emoji trail follows cursor
<TextCursor text="✨" />

// With custom settings
<TextCursor 
  text="🔥" 
  spacing={80}
  maxPoints={8}
  exitDuration={0.3}
/>

// Wrap content - trail appears over children
<TextCursor text="⭐">
  <h1>Hover over me!</h1>
</TextCursor>`;

export default function TextCursorPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/components" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">TextCursor</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">
          Creates a trail of text or emoji that follows the mouse cursor with smooth animations.
          Perfect for adding playful interactivity to hero sections or landing pages.
        </p>
      </motion.div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex items-center justify-center min-h-[400px] w-full bg-secondary/20 rounded-lg">
            <TextCursor text="✨" spacing={80} maxPoints={10}>
              <span className="text-4xl font-bold text-muted-foreground/50 pointer-events-none">
                Move your cursor here
              </span>
            </TextCursor>
          </div>
        }
        code={componentCode}
        usage={usageCode}
      />

      {/* Variations */}
      <div className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">Variations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-sm font-medium mb-2 text-muted-foreground">Fire Trail</h3>
            <div className="h-[200px] bg-secondary/20 rounded">
              <TextCursor text="🔥" spacing={60} maxPoints={8} />
            </div>
          </div>
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-sm font-medium mb-2 text-muted-foreground">Hearts</h3>
            <div className="h-[200px] bg-secondary/20 rounded">
              <TextCursor text="💜" spacing={50} maxPoints={12} exitDuration={0.8} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
