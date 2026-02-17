"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import WetPaintButton from "@/registry/buttons/wet-paint-button";
import { PreviewCodeUsageTabs } from "@/components/ui/tabs";

const componentCode = `"use client";

import { motion } from "framer-motion";

const WetPaintButton = () => {
  return (
    <button className="group relative rounded bg-accent px-4 py-2.5 font-semibold text-white transition-colors hover:bg-accent/90 cursor-pointer">
      Wet Paint Button
      {/* Drip animations */}
    </button>
  );
};

export default WetPaintButton;`;

const usageCode = `import WetPaintButton from "@/registry/buttons/wet-paint-button";

<WetPaintButton />`;

export default function WetPaintButtonPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/components/buttons" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Wet Paint Button</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">Button with dripping paint effect on hover.</p>
      </motion.div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex items-center justify-center min-h-[200px]">
            <WetPaintButton />
          </div>
        }
        code={componentCode}
        usage={usageCode}
      />
    </div>
  );
}
