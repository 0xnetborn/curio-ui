"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import VariableProximity from "@/registry/text/variable-proximity";
import { PreviewCodeUsageTabs, type PropItem } from "@/components/ui/tabs";

const componentCode = `"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface VariableProximityProps {
  label: string;
  fromFontVariationSettings?: string;
  toFontVariationSettings?: string;
  className?: string;
}

const VariableProximity = ({
  label = "Variable Proximity",
  fromFontVariationSettings = "'wght' 100",
  toFontVariationSettings = "'wght' 900",
  className = "",
}: VariableProximityProps) => {
  return (
    <motion.span
      className={className}
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
  className="text-4xl font-bold"
/>`;

const props: PropItem[] = [
  { name: "label", type: "string", default: "Variable Proximity", description: "Text content" },
  { name: "fromFontVariationSettings", type: "string", default: "'wght' 100", description: "Font variation when far" },
  { name: "toFontVariationSettings", type: "string", default: "'wght' 900", description: "Font variation when close" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

export default function VariableProximityPage() {
  const containerRef = useRef(null);
  
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/text-animations" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">VariableProximity</h1>
        </div>
        <p className="text-muted-foreground max-w-lg pl-9">
          Text effect that responds to mouse proximity with font variations.
        </p>
      </div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex items-center justify-center min-h-[200px]" ref={containerRef}>
            <VariableProximity 
              label="CurioUI"
              fromFontVariationSettings="'wght' 100"
              toFontVariationSettings="'wght' 900"
              className="text-4xl font-bold"
            />
          </div>
        }
        code={componentCode}
        usage={usageCode}
        props={props}
      />
    </div>
  );
}
