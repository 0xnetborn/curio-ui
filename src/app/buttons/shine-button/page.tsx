"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ShineButton from "@/registry/buttons/shine-button";
import { CodeBlock } from "@/components/ui/code-block";

const componentCode = `const ShineButton = () => {
  return (
    <button className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-accent px-4 py-1.5 text-xs font-normal text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-accent/30 cursor-pointer">
      <span className="text-sm">CurioUI</span>
      <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
        <div className="relative h-full w-8 bg-white/20"></div>
      </div>
    </button>
  )
}

export default ShineButton;`;

const usageCode = `import ShineButton from "@/registry/buttons/shine-button";

<ShineButton />`;

export default function ShineButtonPage() {
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
          <h1 className="font-display text-4xl font-bold">Shine Button</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">
          Button with diagonal light sweep.
        </p>
      </motion.div>

      <CodeBlock code={componentCode} language="tsx" title="shine-button.tsx" />

      <div className="space-y-4">
        <h3 className="font-semibold">Usage</h3>
        <div className="rounded-xl border border-border bg-card p-4">
          <pre className="text-sm font-mono text-muted-foreground overflow-x-auto">
            {usageCode}
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Preview</h3>
        <div className="flex items-center justify-center min-h-[200px] rounded-xl border border-border bg-card p-8">
          <ShineButton />
        </div>
      </div>
    </div>
  );
}
