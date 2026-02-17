"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { getComponentsByCategory } from "@/config/components";

export default function ComponentsTextPage() {
  const textComponents = getComponentsByCategory("text");

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <h1 className="font-display text-4xl font-bold">Text</h1>
        <p className="text-muted-foreground max-w-lg">Typography animations and text effects.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {textComponents.map((comp, i) => (
          <motion.div key={comp.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link href={`/${comp.slug}`}>
              <div className="group relative aspect-square rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-background">
                  <span className="text-muted-foreground text-sm">{comp.name}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="font-medium text-sm text-white">{comp.name}</h3>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
