"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { WetButton } from "@/registry/buttons/wet-button";
import { BorderGlowButton } from "@/registry/buttons/border-glow-button";
import { GradientFillButton } from "@/registry/buttons/gradient-fill-button";
import { ThreeDButton } from "@/registry/buttons/3d-button";
import { ShineButton } from "@/registry/buttons/shine-button";

// Button components list for this category
const buttonComponents = [
  {
    name: "wet-button",
    displayName: "Wet Paint Button",
    description: "Dripping paint effect on hover",
    component: WetButton,
    href: "/components/buttons/wet-button",
  },
  {
    name: "border-glow-button",
    displayName: "Border Glow Button",
    description: "Mouse-tracking glow effect on border",
    component: BorderGlowButton,
    href: "/components/buttons/border-glow-button",
  },
  {
    name: "gradient-fill-button",
    displayName: "Gradient Fill Button",
    description: "Animated gradient fill from bottom on hover",
    component: GradientFillButton,
    href: "/components/buttons/gradient-fill-button",
  },
  {
    name: "3d-button",
    displayName: "3D Button",
    description: "3D depth effect with press animation",
    component: ThreeDButton,
    href: "/components/buttons/3d-button",
  },
  {
    name: "shine-button",
    displayName: "Shine Button",
    description: "Diagonal light sweep animation",
    component: ShineButton,
    href: "/components/buttons/shine-button",
  },
];

export default function ComponentsButtonsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="font-display text-4xl font-bold">Buttons</h1>
        <p className="text-muted-foreground max-w-lg">
          Interactive button components with hover effects, animations, and
          playful interactions.
        </p>
      </motion.div>

      {/* Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {buttonComponents.map((button, i) => (
          <motion.div
            key={button.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={button.href}>
              <div className="group relative aspect-square rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10">
                {/* Center the button preview */}
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 rounded-xl">
                  <button.component onClick={() => {}} />
                </div>

                {/* Info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-card to-transparent rounded-b-xl">
                  <h3 className="font-medium text-sm">{button.displayName}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {button.description}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
