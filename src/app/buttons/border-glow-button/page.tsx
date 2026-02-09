"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import BorderGlowButton from "@/registry/buttons/border-glow-button";
import { PreviewCodeUsageTabs } from "@/components/ui/tabs";

const componentCode = `"use client";

import React, { useEffect, useRef, useState } from 'react';

const BorderGlowButton = () => {
  const ref = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: '-100%', y: '-100%' });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x: x + 'px', y: y + 'px' });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <button
      className="relative overflow-hidden rounded-lg bg-[#e5e7eb] transform transition-transform ease-in-out active:scale-90 cursor-pointer"
      ref={ref}
    >
      <span
        className="absolute z-0 h-28 w-28 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(#14B8A6_0%,transparent_70%)]"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />
      <div className="relative z-10 m-[1px] rounded-[calc(0.5rem-1px)] bg-white/90 px-4 py-1 text-xs text-[#14B8A6] backdrop-blur-sm">
        CurioUI
      </div>
    </button>
  );
};

export default BorderGlowButton;`;

const usageCode = `import BorderGlowButton from "@/registry/buttons/border-glow-button";

<BorderGlowButton />`;

export default function BorderGlowButtonPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2">
          <Link
            href="/components/buttons"
            className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Border Glow</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">
          Button with mouse-tracking glow.
        </p>
      </motion.div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex items-center justify-center min-h-[200px]">
            <BorderGlowButton />
          </div>
        }
        code={componentCode}
        usage={usageCode}
      />
    </div>
  );
}
