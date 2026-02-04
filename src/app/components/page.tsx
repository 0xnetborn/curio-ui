"use client";

import Link from "next/link";
import { Terminal } from "lucide-react";
import { AsciiRenderer, DEFAULT_CHARSET } from "@/components/AsciiRenderer";
import { components, componentCategories, getComponentsByCategory } from "@/config/components";

function ComponentCard({ component }: { component: typeof components[0] }) {
  const isDark = false; // Simplified for now
  const bgColor = "#FAFAFA";
  const grad1 = "#14B8A6";

  return (
    <Link href={`/${component.slug}`} className="group block relative rounded-xl border border-border bg-card overflow-hidden h-[120px] transition-all hover:border-accent/30 hover:shadow-[0_0_20px_rgba(20,184,166,0.1)]">
      <div className="absolute inset-0" style={{ opacity: 0.4 }}>
        <AsciiRenderer
          videoSrc="/videos/nyla_bg_hero.mp4"
          asciiFontSize={6}
          charset={DEFAULT_CHARSET}
          backgroundColor="#0A0A0A"
          renderMode="gradient"
          gradientColor1="#14B8A6"
          gradientColor2="#FAFAFA"
          enableMouseInteraction
          interactionMode="repulsion"
          gravityStrength={0.3}
          brightness={1.2}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-card via-card/95 to-transparent">
        <span className="text-sm font-medium truncate">{component.name}</span>
      </div>
    </Link>
  );
}

export default function ComponentsPage() {
  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      <section className="relative -mx-8 lg:-mx-12 -mt-8 lg:-mt-12">
        <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-secondary/20 overflow-hidden">
          <AsciiRenderer
            videoSrc="/videos/nyla_bg_hero.mp4"
            asciiFontSize={10}
            charset={DEFAULT_CHARSET}
            renderMode="gradient"
            gradientColor1="#14B8A6"
            gradientColor2="#FAFAFA"
            enableMouseInteraction
            interactionMode="repulsion"
            gravityStrength={0.3}
            brightness={1.2}
          />
          <div className="relative z-10 text-center space-y-4">
            <h1 className="font-display text-4xl font-bold">Components</h1>
            <p className="text-muted-foreground">Premium animated UI components</p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      {Object.entries(componentCategories).map(([key, category]) => {
        const categoryComponents = getComponentsByCategory(key as keyof typeof componentCategories);
        if (categoryComponents.length === 0) return null;
        return (
          <section key={key} className="space-y-4">
            <h2 className="text-2xl font-bold">{category.name}</h2>
            <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {categoryComponents.map((comp) => (
                <ComponentCard key={comp.slug} component={comp} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
