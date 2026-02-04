"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Animation components list
const animationComponents = [
  {
    name: "logo-loop",
    displayName: "Logo Loop",
    description: "Infinite scrolling animation for logos",
    href: "/animations/logo-loop",
  },
];

export default function AnimationsPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="font-display text-4xl font-bold">Animations</h1>
        <p className="text-muted-foreground max-w-lg">
          Animated UI components and visual effects.
        </p>
      </motion.div>

      {/* Components Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {animationComponents.map((component, i) => (
          <motion.div
            key={component.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={component.href}>
              <div className="group relative aspect-square rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10">
                <div className="absolute inset-0 flex items-center justify-center bg-background rounded-xl">
                  <span className="text-2xl font-bold text-white group-hover:blur-sm transition-all duration-300">
                    {component.displayName}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl">
                  <h3 className="font-medium text-sm text-white">{component.displayName}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {component.description}
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
