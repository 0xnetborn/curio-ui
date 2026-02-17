"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Crosshair from "@/registry/effects/crosshair";
import { PreviewCodeUsageTabs } from "@/components/ui/tabs";

const componentCode = `"use client";

import Crosshair from "@/registry/effects/crosshair";

// Basic usage - full screen crosshair
<Crosshair color="white" />

// Inside a container
<div ref={containerRef}>
  <Crosshair containerRef={containerRef} color="#14B8A6" />
</div>`;

const usageCode = `import Crosshair from "@/registry/effects/crosshair";

// Full screen crosshair
<Crosshair color="white" />

// With custom color
<Crosshair color="#14B8A6" />

// Container-relative crosshair
const containerRef = useRef(null);

<div ref={containerRef} className="relative">
  <Crosshair containerRef={containerRef} color="red" />
  <a href="/">Hover links</a>
</div>`;

export default function CrosshairPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/components" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Crosshair</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">
          Animated crosshair lines that follow the mouse cursor with smooth GSAP animations.
          Perfect for creating an immersive, cinematic effect on landing pages or portfolios.
        </p>
      </motion.div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex items-center justify-center min-h-[400px] w-full bg-secondary/20 rounded-lg overflow-hidden relative">
            <Crosshair color="#14B8A6" />
            <span className="text-4xl font-bold text-muted-foreground/50 pointer-events-none z-10">
              Move your cursor
            </span>
          </div>
        }
        code={componentCode}
        usage={usageCode}
      />

      {/* Variations */}
      <div className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">Variations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-sm font-medium mb-2 text-muted-foreground">White Crosshair</h3>
            <div className="h-[200px] bg-zinc-900 rounded relative overflow-hidden">
              <Crosshair color="white" />
            </div>
          </div>
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-sm font-medium mb-2 text-muted-foreground">Accent Color</h3>
            <div className="h-[200px] bg-secondary/20 rounded relative overflow-hidden">
              <Crosshair color="#14B8A6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
