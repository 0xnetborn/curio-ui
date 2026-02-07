"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import GradientFillButton from "@/registry/buttons/gradient-fill-button";
import { CodeBlock } from "@/components/ui/code-block";

const componentCode = `const GradientFillButton = () => {
  return (
    <button className="group/button relative overflow-hidden rounded-md border border-accent/20 bg-white px-4 py-1 text-xs font-medium text-accent transition-all duration-150 hover:border-accent active:scale-95 cursor-pointer">
      <span className="absolute bottom-0 left-0 z-0 h-0 w-full bg-gradient-to-t from-accent to-accent-foreground transition-all duration-500 group-hover/button:h-full"></span>
      <span className="relative z-10 transition-all duration-500 group-hover/button:text-white">CurioUI</span>
    </button>
  )
}

export default GradientFillButton;`;

const usageCode = `import GradientFillButton from "@/registry/buttons/gradient-fill-button";

<GradientFillButton />`;

export default function GradientFillButtonPage() {
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
          <h1 className="font-display text-4xl font-bold">Gradient Fill</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">
          Button with gradient fill from bottom.
        </p>
      </motion.div>

      <CodeBlock
        code={componentCode}
        language="tsx"
        title="gradient-fill-button.tsx"
      />

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
          <GradientFillButton />
        </div>
      </div>
    </div>
  );
}
