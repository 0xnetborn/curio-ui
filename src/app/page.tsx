"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Terminal, Palette, Box, Copy, Check } from "lucide-react";
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

// Animated preview buttons for the hero showcase
function ButtonShowcase() {
  const [copied, setCopied] = useState<string | null>(null);

  const buttons = [
    { name: "3D Button", slug: "buttons/3d-button" },
    { name: "Border Glow", slug: "buttons/border-glow-button" },
    { name: "Gradient Fill", slug: "buttons/gradient-fill-button" },
    { name: "Shine", slug: "buttons/shine-button" },
  ];

  const copyCode = (slug: string) => {
    const code = `import { ${slug.split('-').map((w, i) => i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)).join('')} } from "@curio-ui/buttons";`;
    navigator.clipboard.writeText(code);
    setCopied(slug);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {buttons.map((btn, i) => (
        <motion.div
          key={btn.name}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.1 }}
          className="group relative p-3 rounded-lg border border-border bg-card/50 backdrop-blur-sm hover:border-accent/30 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium">{btn.name}</span>
            <button
              onClick={() => copyCode(btn.slug)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-secondary rounded"
            >
              {copied === btn.slug ? (
                <Check className="w-3 h-3 text-green-500" />
              ) : (
                <Copy className="w-3 h-3 text-muted-foreground" />
              )}
            </button>
          </div>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 text-xs font-medium bg-foreground text-background rounded-md hover:opacity-90 transition-opacity">
              Preview
            </button>
            <Link href={`/${btn.slug}`} className="px-3 py-1.5 text-xs font-medium border border-border rounded-md hover:bg-secondary transition-colors">
              Demo
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Animated text preview
function TextShowcase() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="space-y-2"
    >
      <div className="text-xs text-muted-foreground mb-2">Text Animations</div>
      <div className="flex flex-wrap gap-2">
        {["Gradient", "Spotlight", "Marquee", "Reveal"].map((text, i) => (
          <motion.span
            key={text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + i * 0.1 }}
            className="px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded"
          >
            {text}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

// Stats counter
function StatsShowcase() {
  const stats = [
    { value: "50+", label: "Components" },
    { value: "10k+", label: "Downloads" },
    { value: "99%", label: "TypeScript" },
  ];

  return (
    <div className="flex gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 + i * 0.1 }}
          className="text-center"
        >
          <div className="text-xl font-bold text-accent">{stat.value}</div>
          <div className="text-xs text-muted-foreground">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

// Featured components with live previews
function FeaturedSection() {
  const components = [
    {
      name: "3D Button",
      category: "Buttons",
      description: "Interactive 3D button with press effect",
      slug: "buttons/3d-button",
      preview: (
        <button className="px-6 py-3 bg-gradient-to-b from-gray-100 to-gray-300 border border-gray-400 rounded-lg shadow-[0_4px_0_rgb(100,100,100),0_6px_10px_rgba(0,0,0,0.2)] active:shadow-[0_2px_0_rgb(100,100,100),0_2px_5px_rgba(0,0,0,0.2)] active:translate-y-1 transition-all font-medium text-gray-800">
          Click Me
        </button>
      ),
    },
    {
      name: "Border Glow",
      category: "Buttons",
      description: "Button with animated border glow effect",
      slug: "buttons/border-glow-button",
      preview: (
        <button className="relative px-6 py-3 bg-black text-white rounded-lg overflow-hidden group">
          <span className="relative z-10 font-medium">Hover Me</span>
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-[1px] rounded-lg bg-black" />
        </button>
      ),
    },
    {
      name: "Shine Text",
      category: "Text Effects",
      description: "Text with sweeping shine animation",
      slug: "text/shiny-text",
      preview: (
        <div className="text-2xl font-bold bg-gradient-to-r from-gray-700 via-white to-gray-700 bg-[length:200%_auto] bg-clip-text text-transparent animate-pulse">
          CurioKit
        </div>
      ),
    },
    {
      name: "Star Border",
      category: "Cards",
      description: "Card with animated star border effect",
      slug: "cards/star-border",
      preview: (
        <div className="relative p-4 rounded-lg bg-gray-900">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-50 blur-sm animate-pulse" />
          <div className="relative bg-gray-900 rounded p-4 text-white text-sm font-medium text-center">
            Featured
          </div>
        </div>
      ),
    },
  ];

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="font-display text-2xl font-bold mb-2">Featured Components</h2>
        <p className="text-muted-foreground">Explore our most popular animated components</p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {components.map((component, i) => (
          <motion.div
            key={component.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="group p-6 rounded-xl border border-border bg-card hover:border-accent/30 transition-all hover:shadow-lg hover:shadow-accent/5"
          >
            {/* Live Preview */}
            <div className="h-32 flex items-center justify-center mb-4 rounded-lg bg-background/50 border border-border/50">
              {component.preview}
            </div>
            {/* Component Info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-accent">{component.category}</span>
                <Link
                  href={`/${component.slug}`}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  View <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <h3 className="font-medium">{component.name}</h3>
              <p className="text-xs text-muted-foreground">{component.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link
          href="/components"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-border font-medium rounded-lg transition-all hover:bg-secondary"
        >
          View All Components <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col justify-center">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-accent text-xs font-medium">
                v0.1.0 Alpha
              </span>
            </motion.div>

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

            {/* Stats */}
            <div className="pt-4">
              <StatsShowcase />
            </div>
          </motion.div>

          {/* Right: Component Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-6"
          >
            {/* Buttons showcase */}
            <div className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <Box className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Button Components</span>
              </div>
              <ButtonShowcase />
            </div>

            {/* Text animations showcase */}
            <div className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
              <TextShowcase />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Components */}
      <FeaturedSection />

      {/* Features Grid */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-2xl font-bold mb-2">Why CurioKit?</h2>
          <p className="text-muted-foreground">Built for modern web developers</p>
        </motion.div>
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
