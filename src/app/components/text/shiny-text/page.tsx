"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ShinyText } from "@/registry/text/shiny-text";
import { PreviewCodeUsageTabs } from "@/components/ui/tabs";

const shinyTextCode = `"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number;
}

export function ShinyText({
  text,
  disabled = false,
  speed = 2,
  className = "",
  color = "#b5b5b5",
  shineColor = "#ffffff",
  spread = 120,
}: ShinyTextProps) {
  // Animation logic using framer-motion
  return (
    <motion.span className={cn("inline-block", className)}>
      {text}
    </motion.span>
  );
}

export default ShinyText;`;

const usageCode = `import { ShinyText } from "@/registry/text/shiny-text";

<ShinyText text="CurioUI" speed={2} />`;

export default function ShinyTextPage() {
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
          <h1 className="font-display text-4xl font-bold">Shiny Text</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">
          Text with animated shine effect.
        </p>
      </motion.div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex flex-wrap gap-6">
            <ShinyText text="CurioUI" className="text-4xl font-bold" />
          </div>
        }
        code={shinyTextCode}
        usage={usageCode}
      />
    </div>
  );
}
