"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import DotExpandButton from "@/registry/buttons/dot-expand-button";
import { PreviewCodeTabs } from "@/components/ui/tabs";

const componentCode = `"use client";

import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

const DotExpandButton = () => {
  return (
    <button className="group flex h-10 items-center gap-2 rounded-full bg-neutral-200 pl-3 pr-4 transition-all duration-300 ease-in-out hover:bg-accent hover:pl-2 hover:text-white active:bg-neutral-700 cursor-pointer">
      <span className="rounded-full bg-black p-1 text-sm transition-colors duration-300 group-hover:bg-white">
        <FiArrowRight className="-translate-x-[200%] text-[0px] transition-all duration-300 group-hover:translate-x-0 group-hover:text-lg group-hover:text-black group-active:-rotate-45" />
      </span>
      <span>CurioUI</span>
    </button>
  );
};

export default DotExpandButton;`;

const usageCode = `import DotExpandButton from "@/registry/buttons/dot-expand-button";

<DotExpandButton />`;

export default function DotExpandButtonPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/components/buttons" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Dot Expand</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">Button with expanding dot on hover.</p>
      </motion.div>

      <PreviewCodeTabs
        preview={
          <div className="flex items-center justify-center min-h-[200px]">
            <DotExpandButton />
          </div>
        }
        code={componentCode}
      />

      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold">Usage</h3>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">{usageCode}</pre>
      </div>
    </div>
  );
}
