"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import BorderGlowButton from "@/registry/buttons/border-glow-button";
import { PreviewCodeUsageTabs } from "@/components/ui/tabs";

const componentCode = `"use client";

import { useEffect, useRef, useState } from "react";

interface BorderGlowButtonProps {
  children?: React.ReactNode;
  glowColor?: string;
  className?: string;
}

const BorderGlowButton = ({
  children = "SyntaxUI",
  glowColor = "#fb3b53",
  className = "",
}: BorderGlowButtonProps) => {
  // ... component implementation
};

export default BorderGlowButton;`;

const usageCode = `import BorderGlowButton from "@/registry/buttons/border-glow-button";

<BorderGlowButton glowColor="#fb3b53" />`;

export default function BorderGlowButtonPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/components/buttons" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Border Glow Button</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">Button with glowing border animation that follows mouse cursor.</p>
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
