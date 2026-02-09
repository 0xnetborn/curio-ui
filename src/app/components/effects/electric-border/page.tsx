"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ElectricBorder from "@/registry/effects/electric-border";
import { PreviewCodeUsageTabs } from "@/components/ui/tabs";

const componentCode = `"use client";

import { useEffect, useId, useLayoutEffect, useRef } from 'react';
import './electric-border.css';

interface ElectricBorderProps {
  children: React.ReactNode;
  color?: string;
  speed?: number;
  chaos?: number;
  thickness?: number;
  className?: string;
  style?: React.CSSProperties;
}

const ElectricBorder = ({ 
  children, 
  color = '#14B8A6', 
  speed = 1, 
  chaos = 1, 
  thickness = 2, 
  className, 
  style 
}: ElectricBorderProps) => {
  // ... SVG filter animation logic
  return (
    <div className="electric-border" style={{ '--electric-border-color': color }}>
      <svg className="eb-svg">
        {/* Turbulence filter with animated displacement */}
      </svg>
      <div className="eb-layers">
        <div className="eb-stroke" />
        <div className="eb-glow-1" />
        <div className="eb-glow-2" />
      </div>
      <div className="eb-content">{children}</div>
    </div>
  );
};

export default ElectricBorder;`;

const usageCode = `import ElectricBorder from "@/registry/effects/electric-border";

// Basic usage
<ElectricBorder>
  <div className="p-6">
    Electric Content
  </div>
</ElectricBorder>

// With custom options
<ElectricBorder 
  color="#FF6B6B" 
  speed={2} 
  chaos={1.5}
  thickness={3}
>
  <button className="px-8 py-4">
    Submit
  </button>
</ElectricBorder>`;

export default function ElectricBorderPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/components" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Electric Border</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">
          A turbulent, electric border effect using SVG filters. The border animates with configurable speed and chaos intensity.
        </p>
      </motion.div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex flex-col items-center justify-center gap-8 min-h-[300px] p-8">
            <ElectricBorder className="rounded-xl">
              <div className="px-8 py-6 text-lg font-medium">
                Electric Border Effect
              </div>
            </ElectricBorder>

            <div className="flex gap-6">
              <ElectricBorder color="#FF6B6B" speed={2} thickness={3} className="rounded-lg">
                <button className="px-6 py-3 font-medium">
                  Fast & Red
                </button>
              </ElectricBorder>

              <ElectricBorder color="#A855F7" chaos={2} className="rounded-lg">
                <button className="px-6 py-3 font-medium">
                  Chaotic Purple
                </button>
              </ElectricBorder>
            </div>
          </div>
        }
        code={componentCode}
        usage={usageCode}
      />
    </div>
  );
}
