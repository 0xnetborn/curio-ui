"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const components = [
  {
    name: "3D Button",
    category: "Buttons",
    description: "Interactive 3D button with press effect",
    slug: "buttons/3d-button",
    preview: (
      <button className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-b from-gray-100 to-gray-300 border border-gray-400 rounded-lg shadow-[0_4px_0_rgb(100,100,100),0_6px_10px_rgba(0,0,0,0.2)] active:shadow-[0_2px_0_rgb(100,100,100),0_2px_5px_rgba(0,0,0,0.2)] active:translate-y-1 transition-all text-xs sm:text-sm font-medium text-gray-800">
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
      <button className="relative px-4 sm:px-6 py-2 sm:py-3 bg-black text-white rounded-lg overflow-hidden group text-xs sm:text-sm font-medium">
        <span className="relative z-10">Hover Me</span>
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
      <div className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-gray-700 via-white to-gray-700 bg-[length:200%_auto] bg-clip-text text-transparent animate-pulse">
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
      <div className="relative p-2 sm:p-4 rounded-lg bg-gray-900">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-50 blur-sm animate-pulse" />
        <div className="relative bg-gray-900 rounded p-2 sm:p-4 text-white text-xs sm:text-sm font-medium text-center">
          Featured
        </div>
      </div>
    ),
  },
];

export default function FeaturedSection() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-6 sm:mb-8"
      >
        <h2 className="font-display text-2xl font-bold mb-2">Featured Components</h2>
        <p className="text-muted-foreground">Explore our most popular animated components</p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
