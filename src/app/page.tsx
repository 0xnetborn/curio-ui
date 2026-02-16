"use client";

import { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Terminal, Palette, Box, Copy, Check, Layers, CreditCard, MousePointer2, Sparkle, Crown, Lock, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";

// Lazy load heavy sections for performance
const FeaturedSection = lazy(() => import("./_components/FeaturedSection"));

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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
    <div className="flex flex-wrap gap-4 sm:gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 + i * 0.1 }}
          className="text-center"
        >
          <div className="text-lg sm:text-xl font-bold text-accent">{stat.value}</div>
          <div className="text-xs text-muted-foreground">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] flex flex-col justify-center py-12 sm:py-16">
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
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1]">
              Beautiful animated
              <br />
              <span className="text-accent">components</span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-lg text-base sm:text-lg text-muted-foreground leading-relaxed">
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

      {/* Featured Components - Lazy Loaded */}
      <Suspense fallback={
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      }>
        <FeaturedSection />
      </Suspense>

      {/* Component Categories */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="font-display text-2xl font-bold mb-2">Component Categories</h2>
          <p className="text-muted-foreground">Browse components by category</p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {[
            { icon: MousePointer2, name: "Buttons", count: 12, color: "from-blue-500 to-cyan-500", href: "/components/buttons" },
            { icon: Sparkle, name: "Text Effects", count: 8, color: "from-purple-500 to-pink-500", href: "/components/text" },
            { icon: Layers, name: "Backgrounds", count: 6, color: "from-orange-500 to-red-500", href: "/components/backgrounds" },
            { icon: CreditCard, name: "Cards", count: 5, color: "from-green-500 to-emerald-500", href: "/components/spotlight-card" },
            { icon: Zap, name: "Effects", count: 4, color: "from-violet-500 to-indigo-500", href: "/components/effects" },
          ].map((category, i) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link
                href={category.href}
                className="group block p-5 rounded-xl border border-border bg-card hover:border-accent/30 transition-all hover:shadow-lg hover:shadow-accent/5"
              >
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} mb-3`}>
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm">{category.name}</h3>
                  <span className="text-xs text-muted-foreground">{category.count}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="font-display text-2xl font-bold mb-2">Trusted by Developers</h2>
          <p className="text-muted-foreground">Used by teams building beautiful web experiences</p>
        </motion.div>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-16 opacity-60">
          {[
            { name: "Vercel", slug: "vercel" },
            { name: "Stripe", slug: "stripe" },
            { name: "Linear", slug: "linear" },
            { name: "Notion", slug: "notion" },
            { name: "Figma", slug: "figma" },
          ].map((company, i) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-lg font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-default"
            >
              {company.name}
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm">
            <span className="text-sm text-muted-foreground">Join</span>
            <span className="text-sm font-medium text-accent">2,500+ developers</span>
            <span className="text-sm text-muted-foreground">building with CurioKit</span>
          </div>
        </motion.div>
      </section>

      {/* Pricing / Pro Components */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-2xl font-bold mb-2">Free & Pro Components</h2>
          <p className="text-muted-foreground">Open-source core with premium advanced components</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl border border-border bg-card"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">Free</h3>
                  <p className="text-xs text-muted-foreground">Open Source</p>
                </div>
              </div>
              <span className="text-2xl font-bold">$0</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Perfect for getting started with beautiful animations</p>
            <ul className="space-y-2">
              {["50+ Core Components", "Framer Motion animations", "Dark/Light mode", "TypeScript support", "MIT License"].map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href="/components"
              className="mt-6 block w-full py-2.5 text-center border border-border font-medium rounded-lg transition-all hover:bg-secondary"
            >
              Get Started Free
            </Link>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="relative p-6 rounded-2xl border border-accent/30 bg-card overflow-hidden"
          >
            <div className="absolute top-0 right-0 px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-bl-lg">
              PRO
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Pro</h3>
                  <p className="text-xs text-muted-foreground">Premium Collection</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold">$19</span>
                <span className="text-xs text-muted-foreground">/one-time</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Advanced components for professional projects</p>
            <ul className="space-y-2">
              {[
                "Everything in Free",
                "100+ Premium Components",
                "Advanced 3D Effects",
                "Exclusive UI Patterns",
                "Priority Support",
                "Early Access to New Components",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="mt-6 block w-full py-2.5 text-center bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium rounded-lg transition-all hover:opacity-90">
              Coming Soon
            </button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            <Lock className="w-4 h-4 inline mr-1" />
            Pro components will be available via separate npm package
          </p>
        </motion.div>
      </section>

      {/* Documentation / Getting Started */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-2xl font-bold mb-2">Getting Started</h2>
          <p className="text-muted-foreground">Install CurioKit in your project</p>
        </motion.div>
        
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="p-4 sm:p-6 rounded-2xl border border-border bg-card"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Install with npm</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('npm install curio-kit');
                }}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
                aria-label="Copy install command"
              >
                <Copy className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="p-3 sm:p-4 rounded-lg bg-muted font-mono text-sm overflow-x-auto">
              <code className="text-accent">npm install curio-kit</code>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 grid sm:grid-cols-2 gap-4"
          >
            {[
              { title: "Browse Components", desc: "Explore our collection of animated components", href: "/components" },
              { title: "Read the Docs", desc: "Learn how to customize and theme components", href: "/docs" },
            ].map((item, i) => (
              <Link
                key={item.title}
                href={item.href}
                className="group p-4 rounded-xl border border-border bg-card hover:border-accent/30 transition-all hover:shadow-lg hover:shadow-accent/5"
              >
                <h3 className="font-medium mb-1 group-hover:text-accent transition-colors">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
