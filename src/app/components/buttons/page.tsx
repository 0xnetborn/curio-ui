"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ThreeDButton from "@/registry/buttons/3d-button";
import ShineButton from "@/registry/buttons/shine-button";
import BorderGlowButton from "@/registry/buttons/border-glow-button";
import GradientFillButton from "@/registry/buttons/gradient-fill-button";
import WetPaintButton from "@/registry/buttons/wet-paint-button";
import DotExpandButton from "@/registry/buttons/dot-expand-button";

const buttons = [
  { name: "3d-button", displayName: "3D Button", component: ThreeDButton, href: "/components/buttons/3d-button" },
  { name: "shine-button", displayName: "Shine Button", component: ShineButton, href: "/components/buttons/shine-button" },
  { name: "border-glow-button", displayName: "Border Glow", component: BorderGlowButton, href: "/components/buttons/border-glow-button" },
  { name: "gradient-fill-button", displayName: "Gradient Fill", component: GradientFillButton, href: "/components/buttons/gradient-fill-button" },
  { name: "wet-button", displayName: "Wet Paint", component: WetPaintButton, href: "/components/buttons/wet-button" },
  { name: "dot-expand-button", displayName: "Dot Expand", component: DotExpandButton, href: "/components/buttons/dot-expand-button" },
];

export default function ComponentsButtonsPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <h1 className="font-display text-4xl font-bold">Buttons</h1>
        <p className="text-muted-foreground max-w-lg">Interactive button components with hover effects and animations.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {buttons.map((button, i) => (
          <motion.div key={button.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Link href={button.href}>
              <div className="group relative aspect-square rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950">
                  <button.component />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="font-medium text-sm text-white">{button.displayName}</h3>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
