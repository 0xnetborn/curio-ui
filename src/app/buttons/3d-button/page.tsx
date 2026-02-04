"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ThreeDButton from "@/registry/buttons/3d-button";

export default function ThreeDButtonPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/components/buttons" className="p-1 rounded-md hover:bg-secondary transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">3D Button</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">Button with 3D depth effect.</p>
      </motion.div>

      <div className="rounded-xl border border-border bg-card p-8">
        <div className="flex items-center justify-center min-h-[200px]">
          <ThreeDButton />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold">Usage</h3>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">{`import ThreeDButton from "@/registry/buttons/3d-button";

<ThreeDButton />`}</pre>
      </div>
    </div>
  );
}
