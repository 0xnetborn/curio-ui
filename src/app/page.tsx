"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Terminal, Palette, Box } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Zap,
    title: "Optimized",
    description: "Built for performance with minimal bundle size",
  },
  {
    icon: Sparkles,
    title: "Animated",
    description: "Smooth Framer Motion powered animations",
  },
  {
    icon: Palette,
    title: "Themeable",
    description: "Full dark/light mode with CSS variables",
  },
  {
    icon: Terminal,
    title: "TypeScript",
    description: "Fully typed components and utilities",
  },
];

export default function Home() {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-accent text-xs font-medium">
              v0.1.0 Alpha
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
            Beautiful animated
            <br />
            <span className="text-accent">components</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-lg text-lg text-muted-foreground leading-relaxed">
            A collection of high-quality, animated UI components
            designed for modern web experiences. Built with React,
            Framer Motion, and Tailwind CSS.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/components"
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background font-medium rounded-lg transition-all hover:opacity-90"
            >
              Browse Components
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="https://github.com/curiositas-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border font-medium rounded-lg transition-all hover:bg-secondary"
            >
              GitHub
            </a>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="p-5 rounded-xl border border-border bg-card"
            >
              <feature.icon className="w-5 h-5 text-accent mb-3" />
              <h3 className="font-medium text-sm mb-1">{feature.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
