"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-24 pb-20">
      <section className="relative min-h-[60vh] flex flex-col justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-accent text-xs font-medium">v0.1.0 Alpha</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
            Beautiful animated<br />
            <span className="text-accent">components</span>
          </h1>

          <p className="max-w-lg text-lg text-muted-foreground leading-relaxed">
            A collection of high-quality, animated UI components designed for modern web experiences.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/buttons" className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background font-medium rounded-lg hover:opacity-90">
              Browse Components
            </Link>
          </div>
        </motion.div>
      </section>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Optimized", desc: "Minimal bundle size" },
            { title: "Animated", desc: "Framer Motion powered" },
            { title: "Themeable", desc: "Dark/light mode support" },
            { title: "TypeScript", desc: "Fully typed" },
          ].map((feature, i) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="p-5 rounded-xl border border-border bg-card">
              <h3 className="font-medium text-sm mb-1">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
