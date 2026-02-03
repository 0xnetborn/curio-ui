"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { WetButton } from "@/registry/buttons/wet-button";

// Button components list for this category
const buttonComponents = [
  {
    name: "wet-button",
    displayName: "Wet Paint Button",
    description: "Dripping paint effect on hover",
    component: WetButton,
    href: "/components/buttons/wet-button",
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
