"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Orb } from "@/registry/backgrounds/orb";
import { PreviewCodeUsageTabs } from "@/components/ui/tabs";

const componentCode = `"use client";

import { Orb } from "@/registry/backgrounds/orb";

// Basic usage
<Orb />

// With custom settings
<Orb 
  hue={180}
  hoverIntensity={0.3}
  rotateOnHover={true}
  forceHoverState={false}
/>`;

const usageCode = `import { Orb } from "@/registry/backgrounds/orb";

// Wrap any content with Orb background
<div className="relative w-full h-[400px]">
  <Orb />
  <div className="absolute inset-0 flex items-center justify-center">
    Your content here
  </div>
</div>

// With custom hue rotation
<Orb hue={45} />

// With forced hover state for demos
<Orb forceHoverState={true} />`;

export default function OrbPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/components" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Orb</h1>
          <span className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider bg-accent text-accent-foreground rounded">
            New
          </span>
        </div>
        <p className="text-muted-foreground max-w-lg">
          A mesmerizing WebGL orb with fluid noise animation. Hover to trigger rotation and wave distortion effects.
        </p>
      </motion.div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex flex-col items-center justify-center min-h-[300px] gap-6">
            <div className="w-full h-[300px] rounded-xl border border-border overflow-hidden relative">
              <Orb hue={0} hoverIntensity={0.25} rotateOnHover={true} />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-lg font-medium text-white drop-shadow-lg">Hover me!</p>
              </div>
            </div>
          </div>
        }
        code={componentCode}
        usage={usageCode}
      />

      {/* Props Reference */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="font-display text-2xl font-semibold">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium">Prop</th>
                <th className="text-left py-3 px-4 font-medium">Type</th>
                <th className="text-left py-3 px-4 font-medium">Default</th>
                <th className="text-left py-3 px-4 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="py-3 px-4"><code>hue</code></td>
                <td className="py-3 px-4"><code>number</code></td>
                <td className="py-3 px-4"><code>0</code></td>
                <td className="py-3 px-4">Hue rotation in degrees (0-360)</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4"><code>hoverIntensity</code></td>
                <td className="py-3 px-4"><code>number</code></td>
                <td className="py-3 px-4"><code>0.2</code></td>
                <td className="py-3 px-4">Intensity of wave distortion on hover</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4"><code>rotateOnHover</code></td>
                <td className="py-3 px-4"><code>boolean</code></td>
                <td className="py-3 px-4"><code>true</code></td>
                <td className="py-3 px-4">Enable rotation animation when hovering</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4"><code>forceHoverState</code></td>
                <td className="py-3 px-4"><code>boolean</code></td>
                <td className="py-3 px-4"><code>false</code></td>
                <td className="py-3 px-4">Force hover state for demo purposes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
