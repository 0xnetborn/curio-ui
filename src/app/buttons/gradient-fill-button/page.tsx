"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { GradientFillButton } from "@/registry/buttons/gradient-fill-button";
import { ComponentPageTabs } from "@/components/ui/tabs";

const buttonCode = 
`"use client";

import React from 'react';

export const GradientFillButton = ({
  children = 'Button',
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={\`group/button relative overflow-hidden rounded-md border border-accent/20 bg-white px-4 py-1 text-xs font-medium text-accent transition-all duration-150 hover:border-accent active:scale-95 \${className || ''}\`}
      {...props}
    >
      <span className="absolute bottom-0 left-0 z-0 h-0 w-full bg-gradient-to-t from-accent to-accent-foreground transition-all duration-500 group-hover/button:h-full" />
      <span className="relative z-10 transition-all duration-500 group-hover/button:text-white">{children}</span>
    </button>
  );
};

export type GradientFillButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;`;

export default function GradientFillButtonPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/components/buttons" className="p-1 rounded-md hover:bg-secondary transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Gradient Fill Button</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">Button that fills with gradient from bottom on hover.</p>
      </motion.div>

      <ComponentPageTabs
        preview={<GradientFillButton onClick={() => console.log("Gradient Fill clicked!")}>Gradient Fill</GradientFillButton>}
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
                <td colSpan={4} className="py-2 px-4 text-muted-foreground text-center">Inherits all native button props</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
