"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PreviewCodeTabs } from "@/components/ui/tabs";
import GlassSurface from "@/registry/effects/glass-surface";

const CODE = `import GlassSurface from '@/registry/effects/glass-surface';

<GlassSurface width={300} height={200} borderRadius={20}>
  <h2>Glass Surface Content</h2>
</GlassSurface>

// With custom effects
<GlassSurface
  displace={0.5}
  distortionScale={-180}
  brightness={50}
  opacity={0.93}
  mixBlendMode="screen"
>
  <span>Advanced Glass Distortion</span>
</GlassSurface>`;

const USAGE = `import GlassSurface from '@/registry/effects/glass-surface';

// Basic usage
<GlassSurface width={300} height={200} borderRadius={20}>
  Content here
</GlassSurface>

// Full props
<GlassSurface
  width={300}
  height={200}
  borderRadius={20}
  brightness={50}
  opacity={0.93}
  blur={11}
  displace={0.5}
  distortionScale={-180}
  mixBlendMode="screen"
>
  Advanced Glass
</GlassSurface>`;

function TechBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-secondary text-secondary-foreground">
      {children}
    </span>
  );
}

export default function GlassSurfacePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2">
          <Link href="/effects" className="p-1 rounded-md hover:bg-secondary transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Glass Surface</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">
          Glassmorphism effect with SVG displacement and backdrop blur.
        </p>
        <div className="flex flex-wrap gap-2">
          <TechBadge>React</TechBadge>
          <TechBadge>TypeScript</TechBadge>
          <TechBadge>Tailwind</TechBadge>
          <TechBadge>SVG Filters</TechBadge>
        </div>
      </motion.div>

      {/* Preview + Code */}
      <PreviewCodeTabs
        preview={
          <div className="space-y-6 p-8">
            <GlassSurface width={200} height={80} borderRadius={20}>
              <span className="font-semibold text-foreground">CurioUI</span>
            </GlassSurface>
          </div>
        }
        code={CODE}
        codeLanguage="tsx"
      />

      {/* Usage */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold text-lg">Usage</h3>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono">{USAGE}</pre>
      </div>
    </div>
  );
}
