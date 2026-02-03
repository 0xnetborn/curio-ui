"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ThreeDButton } from "@/registry/buttons/3d-button";
import { ComponentPageTabs } from "@/components/ui/tabs";

const buttonCode = "use client";

import React from 'react';

export const ThreeDButton = ({
  children = 'Button',
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={\`group relative m-1 inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-b-2 border-l-2 border-r-2 border-accent bg-gradient-to-tr from-accent to-accent-foreground px-4 py-1 text-white shadow-lg transition duration-100 ease-in-out active:translate-y-0.5 active:border-accent-foreground active:shadow-none \${className || ''}\`}
      {...props}
    >
      <span className="absolute h-0 w-0 rounded-full bg-white opacity-10 transition-all duration-300 ease-out group-hover:h-32 group-hover:w-32"></span>
      <span className="relative font-medium">{children}</span>
    </button>
  );
};

export type ThreeDButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;";

export default function ThreeDButtonPage() {
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
          <h1 className="font-display text-4xl font-bold">3D Button</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">
          Button with 3D depth effect that presses on click with ripple animation on hover.
        </p>
      </motion.div>

      <ComponentPageTabs
        preview={
          <ThreeDButton onClick={() => console.log("3D Button clicked!")}>
            3D Button
          </ThreeDButton>
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
