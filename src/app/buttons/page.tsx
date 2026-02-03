"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { buttons, ButtonName } from "@/registry/buttons";
import { ThreeDButton } from "@/registry/buttons/3d-button";
import { ShineButton } from "@/registry/buttons/shine-button";
import { BorderGlowButton } from "@/registry/buttons/border-glow-button";
import { GradientFillButton } from "@/registry/buttons/gradient-fill-button";
import { WetButton } from "@/registry/buttons/wet-button";

const buttonPreviews: Partial<Record<ButtonName, React.ReactNode>> = {
  "3d-button": <ThreeDButton onClick={() => {}}>3D Button</ThreeDButton>,
  "shine-button": <ShineButton onClick={() => {}}>Shine</ShineButton>,
  "border-glow-button": <BorderGlowButton onClick={() => {}}>Border Glow</BorderGlowButton>,
  "gradient-fill-button": <GradientFillButton onClick={() => {}}>Gradient Fill</GradientFillButton>,
  "wet-button": <WetButton onClick={() => {}}>Wet Paint</WetButton>,
};

export default function ButtonsPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="font-display text-4xl font-bold">Buttons</h1>
        <p className="text-muted-foreground max-w-lg">
          Beautiful animated buttons with hover effects. Click any button to view the code and preview.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {buttons.map((button, i) => (
          <motion.div
            key={button.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={`/components/buttons/${button.name}`}>
              <div className="group relative aspect-square rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  {buttonPreviews[button.name]}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-card to-transparent rounded-b-xl">
                  <h3 className="font-medium text-sm">{button.displayName}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{button.description}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
