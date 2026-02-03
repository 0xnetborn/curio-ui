"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ShineButton } "@/registry/buttons/shine-button";
import { ComponentPageTabs } from "@/components/ui/tabs";

const buttonCode = "use client";

import React from 'react';

const ShineButton = ({
  children = 'Button',
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={\`group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-accent px-4 py-1.5 text-xs font-normal text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-accent/30 \${className || ''}\`}
      {...props}
    >
      <span className="text-sm">{children}</span>
      <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
        <div className="relative h-full w-8 bg-white/20" />
      </div>
    </button>
  );
};

export default ShineButton;";

export default function ShineButtonPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2">
          <Link href="/components/buttons" className="p-1 rounded-md hover:bg-secondary transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Shine Button</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">
          Button with diagonal light sweep animation on hover.
        </p>
      </motion.div>

      <ComponentPageTabs
        preview={
          <ShineButton onClick={() => console.log("Shine Button clicked!")}>
            Shine
          </ShineButton>
        }
        code={buttonCode}
      />

      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold">Props</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-4 font-medium">Prop</th>
                <th className="text-left py-2 px-4 font-medium">Type</th>
                <th className="text-left py-2 px-4 font-medium">Default</th>
                <th className="text-left py-2 px-4 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="py-2 px-4 font-mono text-accent">children</td>
                <td className="py-2 px-4">ReactNode</td>
                <td className="py-2 px-4">"Button"</td>
                <td className="py-2 px-4 text-muted-foreground">Button label</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 px-4 font-mono text-accent">className</td>
                <td className="py-2 px-4">string</td>
                <td className="py-2 px-4">undefined</td>
                <td className="py-2 px-4 text-muted-foreground">Additional CSS classes</td>
              </tr>
              <tr>
                <td colSpan={4} className="py-2 px-4 text-muted-foreground text-center">
                  Inherits all native button props
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
