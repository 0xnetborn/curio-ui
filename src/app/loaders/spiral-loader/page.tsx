"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import SpiralLoader from "@/registry/loaders/spiral-loader";
import { PreviewCodeUsageTabs, type PropItem } from "@/components/ui/tabs";

const componentCode = `"use client";

import React from 'react';
import { motion } from 'framer-motion';

const SpiralLoader = () => {
  const dots = 8;
  const radius = 20;

  return (
    <div className="relative h-16 w-16">
      {[...Array(dots)].map((_, index) => {
        const angle = (index / dots) * (2 * Math.PI);
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        
        return (
          <motion.div
            key={index}
            className="absolute h-3 w-3 rounded-full bg-accent"
            style={{
              left: \`calc(50% + \${x}px)\`,
              top: \`calc(50% + \${y}px)\`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: (index / dots) * 1.5,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
};

export default SpiralLoader;`;

const usageCode = `import SpiralLoader from "@/registry/loaders/spiral-loader";

<SpiralLoader />`;

const props: PropItem[] = [
  { name: "dots", type: "number", default: "8", description: "Number of dots in the spiral" },
  { name: "radius", type: "number", default: "20", description: "Radius of the spiral" },
];

const dependencies = ["framer-motion"];

export default function SpiralLoaderPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2">
          <Link href="/components" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Spiral Loader</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">
          Animated spiral loader with pulsing dots.
        </p>
      </motion.div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex items-center justify-center min-h-[200px]">
            <SpiralLoader />
          </div>
        }
        code={componentCode}
        usage={usageCode}
        props={props}
        dependencies={dependencies}
      />
    </div>
  );
}
