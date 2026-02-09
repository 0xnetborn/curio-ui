"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { StarBorder } from "@/registry/star-border";
import { PreviewCodeUsageTabs, type PropItem } from "@/components/ui/tabs";

const starBorderCode = `"use client";

import React from "react";
import { cn } from "@/lib/utils";

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  className?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: React.CSSProperties["animationDuration"];
  thickness?: number;
};

export function StarBorder<T extends React.ElementType = "button">({
  as,
  className = "",
  color = "white",
  speed = "6s",
  thickness = 1,
  children,
  ...rest
}: StarBorderProps<T>) {
  const Component = as || "button";

  return (
    <Component
      className={cn("relative inline-block overflow-hidden rounded-[20px]", className)}
      style={{ padding: \`\${thickness}px 0\` }}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{ background: \`radial-gradient(circle, \${color}, transparent 10%)\`, animationDuration: speed }}
      />
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{ background: \`radial-gradient(circle, \${color}, transparent 10%)\`, animationDuration: speed }}
      />
      <div className="relative z-1 bg-gradient-to-b from-black to-gray-900 border border-gray-800 text-white rounded-[20px]">
        {children}
      </div>
    </Component>
  );
}

export default StarBorder;`;

const starBorderCSS = `/* globals.css */
@keyframes star-movement-bottom {
  0% { transform: translate(0%, 0%); opacity: 1; }
  100% { transform: translate(-100%, 0%); opacity: 0; }
}

@keyframes star-movement-top {
  0% { transform: translate(0%, 0%); opacity: 1; }
  100% { transform: translate(100%, 0%); opacity: 0; }
}

.animate-star-movement-bottom {
  animation: star-movement-bottom linear infinite alternate;
}

.animate-star-movement-top {
  animation: star-movement-top linear infinite alternate;
}`;

const usageCode = `import { StarBorder } from "@/registry/star-border";

<StarBorder color="#14B8A6" speed="4s">
  CurioUI
</StarBorder>`;

const props: PropItem[] = [
  { name: "as", type: "ElementType", default: "button", description: "Component type to render" },
  { name: "children", type: "ReactNode", description: "Button content" },
  { name: "color", type: "string", default: "white", description: "Star border color" },
  { name: "speed", type: "AnimationDuration", default: "6s", description: "Animation speed" },
  { name: "thickness", type: "number", default: "1", description: "Border thickness" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

export default function StarBorderPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2">
          <Link
            href="/components/buttons"
            className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Star Border</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">
          Button with animated star border effect.
        </p>
      </motion.div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex flex-wrap gap-4">
            <StarBorder color="white" speed="6s">
              CurioUI
            </StarBorder>
            <StarBorder color="#14B8A6" speed="4s">
              Teal
            </StarBorder>
            <StarBorder color="#9945FF" speed="3s">
              Purple
            </StarBorder>
          </div>
        }
        code={starBorderCode}
        cssCode={starBorderCSS}
        usage={usageCode}
        props={props}
      />
    </div>
  );
}
