"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ThreeDButton from "@/registry/buttons/3d-button";
import { PreviewCodeUsageTabs } from "@/components/ui/tabs";

const componentCode = `"use client";

import React from "react";

const ThreeDButton = () => {
  return (
    <button className="group relative m-1 inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-b-2 border-l-2 border-r-2 border-accent bg-gradient-to-tr from-accent to-accent-foreground px-4 py-1 text-white shadow-lg transition duration-100 ease-in-out active:translate-y-0.5 active:border-accent-foreground active:shadow-none">
      <span className="absolute h-0 w-0 rounded-full bg-white opacity-10 transition-all duration-300 ease-out group-hover:h-32 group-hover:w-32"></span>
      <span className="relative font-medium">CurioUI</span>
    </button>
  )
}

export default ThreeDButton;`;

const usageCode = `import ThreeDButton from "@/registry/buttons/3d-button";

<ThreeDButton />`;

export default function ThreeDButtonPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/components/buttons" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">3D Button</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">Button with 3D depth effect.</p>
      </motion.div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex items-center justify-center min-h-[200px]">
            <ThreeDButton />
          </div>
        }
        code={componentCode}
        usage={usageCode}
      />
    </div>
  );
}
