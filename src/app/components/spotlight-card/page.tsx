"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SpotlightCard } from "@/registry/spotlight-card";
import { PreviewCodeTabs } from "@/components/ui/tabs";

const componentCode = `"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: "blue" | "purple" | "teal" | "orange";
}

export function SpotlightCard({
  children,
  className,
  gradient = "teal",
}: SpotlightCardProps) {
  const gradients = {
    blue: "bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent",
    purple: "bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-transparent",
    teal: "bg-gradient-to-br from-teal-500/20 via-teal-500/10 to-transparent",
    orange: "bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-transparent",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/10 bg-slate-950 p-6",
        gradients[gradient],
        className
      )}
    >
      <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100" />
      {children}
    </div>
  );
}`;

const usageCode = `import { SpotlightCard } from "@/registry/spotlight-card";

<SpotlightCard gradient="teal">
  <h3 className="text-xl font-semibold text-white mb-2">Title</h3>
  <p className="text-slate-300">Description here.</p>
</SpotlightCard>`;

export default function SpotlightCardPage() {
  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="space-y-4"
      >
        <div className="flex items-center gap-2">
          <Link href="/components/buttons" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Spotlight Card</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">Card with gradient spotlight effect on hover.</p>
      </motion.div>

      <PreviewCodeTabs
        preview={
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <SpotlightCard gradient="teal">
              <h3 className="text-xl font-semibold text-white mb-2">Curiositas Studio</h3>
              <p className="text-slate-300">We build intelligent systems with craft.</p>
            </SpotlightCard>
            <SpotlightCard gradient="blue">
              <h3 className="text-xl font-semibold text-white mb-2">AI Automation</h3>
              <p className="text-slate-300">Eliminate manual work with AI-powered workflows.</p>
            </SpotlightCard>
            <SpotlightCard gradient="purple">
              <h3 className="text-xl font-semibold text-white mb-2">Custom Software</h3>
              <p className="text-slate-300">Tailored platforms engineered for your team.</p>
            </SpotlightCard>
            <SpotlightCard gradient="orange">
              <h3 className="text-xl font-semibold text-white mb-2">Digital Experiences</h3>
              <p className="text-slate-300">Modern, elegant digital products.</p>
            </SpotlightCard>
          </div>
        }
        code={componentCode}
      />

      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold">Usage</h3>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono">{usageCode}</pre>
      </div>
    </div>
  );
}
