"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import VariableProximity from "@/registry/text/variable-proximity";
import { PreviewCodeUsageTabs } from "@/components/ui/tabs";

const componentCode = `"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface VariableProximityProps {
  label: string;
  fromFontVariationSettings?: string;
  toFontVariationSettings?: string;
  containerRef?: React.RefObject<HTMLElement>;
}

const VariableProximity = ({
  label = "Variable Proximity",
  fromFontVariationSettings = "'wght' 100",
  toFontVariationSettings = "'wght' 900",
  containerRef,
}: VariableProximityProps) => {
  return (
    <motion.span
      style={{
        fontVariationSettings: fromFontVariationSettings,
      }}
    >
      {label}
    </motion.span>
  );
};

export default VariableProximity;`;

const usageCode = `import VariableProximity from "@/registry/text/variable-proximity";

<VariableProximity 
  label="CurioUI"
  fromFontVariationSettings="'wght' 100"
  toFontVariationSettings="'wght' 900"
/>`;

export default function VariableProximityPage() {
  const containerRef = useRef(null);
  
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/text-animations" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">VariableProximity</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">VariableProximity animation effect.</p>
      </motion.div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex items-center justify-center min-h-[200px]" ref={containerRef}>
            <VariableProximity 
              label="CurioUI"
              fromFontVariationSettings="'wght' 100"
              toFontVariationSettings="'wght' 900"
              containerRef={containerRef}
            />
          </div>
        }
        code={componentCode}
        usage={usageCode}
      />
    </div>
  );
}
