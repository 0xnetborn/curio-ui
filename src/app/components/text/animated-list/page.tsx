"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import AnimatedList from "@/registry/text/animated-list";

const items = [
  "Getting Started",
  "Installation",
  "Components",
  "Hooks",
  "Examples",
  "API Reference",
  "Configuration",
  "Theming",
  "Animations",
  "Performance",
  "Accessibility",
  "Changelog",
  "Contributing",
  "Support",
  "FAQ"
];

export default function AnimatedListPage() {
  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="space-y-4"
      >
        <div className="flex items-center gap-2">
          <Link href="/components/text" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">AnimatedList</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">
          An animated list component with hover effects, keyboard navigation, and scroll gradients.
        </p>
      </motion.div>

      <div className="p-8 border border-border rounded-xl bg-card">
        <h2 className="text-sm font-medium text-muted-foreground mb-4">Preview</h2>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-full max-w-md">
            <AnimatedList 
              items={items}
              showGradients={true}
              enableArrowNavigation={true}
              displayScrollbar={true}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground">Usage</h2>
        <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
          <code>{`import AnimatedList from "@/registry/text/animated-list";

const items = [
  "Getting Started",
  "Installation", 
  "Components",
  "Hooks",
  // ... more items
];

<AnimatedList 
  items={items}
  showGradients={true}
  enableArrowNavigation={true}
/>`}</code>
        </pre>
      </div>
    </div>
  );
}
