"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import RotatingText from "@/registry/text/rotating-text";
import { PreviewCodeUsageTabs } from "@/components/ui/tabs";

const componentCode = `import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RotatingTextProps {
  texts: string[];
  transition?: object;
  initial?: object;
  animate?: object;
  exit?: object;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: 'first' | 'last' | 'center' | 'random' | number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: 'characters' | 'words' | 'lines' | string;
  onNext?: (index: number) => void;
  mainClassName?: string;
}

const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>((props, ref) => {
  // ... component implementation
});

export default RotatingText;`;

const usageCode = `import RotatingText from "@/registry/text/rotating-text";

// Basic usage
<RotatingText 
  texts={["CurioUI", "Beautiful", "Animated"]} 
/>

// With custom settings
<RotatingText 
  texts={["React", "Next.js", "Framer Motion"]}
  rotationInterval={3000}
  staggerDuration={0.05}
  staggerFrom="first"
/>`;

export default function RotatingTextPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/text-animations" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Rotating Text</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">
          Animated text that rotates through an array of strings with smooth character-by-character transitions.
        </p>
      </motion.div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-4xl font-bold">
              <RotatingText 
                texts={["CurioUI", "Beautiful", "Animated", "Rotating"]} 
                staggerDuration={0.03}
                staggerFrom="first"
              />
            </div>
          </div>
        }
        code={componentCode}
        usage={usageCode}
      />

      {/* Additional examples */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="font-display text-2xl font-semibold">Examples</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Word Split</h3>
            <div className="text-2xl font-bold text-accent">
              <RotatingText 
                texts={["Hello World", "Good Morning", "Welcome Back"]} 
                splitBy="words"
                staggerDuration={0.1}
              />
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Slow Rotation</h3>
            <div className="text-2xl font-bold">
              <RotatingText 
                texts={["Design", "Develop", "Deploy"]} 
                rotationInterval={4000}
                staggerDuration={0.05}
                staggerFrom="center"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
