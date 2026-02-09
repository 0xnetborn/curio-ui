"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import DotExpandButton from "@/registry/buttons/dot-expand-button";
import { PreviewCodeUsageTabs, type PropItem } from "@/components/ui/tabs";

const componentCode = `"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface DotExpandButtonProps {
  children?: React.ReactNode;
  className?: string;
}

const DotExpandButton = ({
  children = "Hover me",
  className = "",
}: DotExpandButtonProps) => {
  return (
    <div className={\`grid place-content-center py-8 \${className}\`}>
      <button className="group flex h-10 items-center gap-2 rounded-full bg-secondary pl-3 pr-4 transition-all duration-300 ease-in-out hover:bg-accent hover:pl-2 hover:text-accent-foreground active:scale-95 cursor-pointer">
        <span className="rounded-full bg-accent p-1 text-sm transition-all duration-300 group-hover:bg-accent-foreground group-hover:text-accent">
          <ArrowRight className="-translate-x-[200%] text-[0px] transition-all duration-300 group-hover:translate-x-0 group-hover:text-sm group-hover:rotate-0" />
        </span>
        <span className="transition-all duration-300 group-hover:translate-x-1">{children}</span>
      </button>
    </div>
  );
};

export default DotExpandButton;`;

const usageCode = `import DotExpandButton from "@/registry/buttons/dot-expand-button";

<DotExpandButton>CurioUI</DotExpandButton>`;

const props: PropItem[] = [
  { name: "children", type: "ReactNode", default: "Hover me", description: "Button text content" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

export default function DotExpandButtonPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/components/buttons" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Dot Expand</h1>
        </div>
        <p className="text-muted-foreground max-w-lg pl-9">
          Button with expanding dot animation on hover.
        </p>
      </div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex items-center justify-center min-h-[200px] bg-card rounded-xl border border-border/50 p-8">
            <DotExpandButton>CurioUI</DotExpandButton>
          </div>
        }
        code={componentCode}
        usage={usageCode}
        props={props}
      />
    </div>
  );
}
