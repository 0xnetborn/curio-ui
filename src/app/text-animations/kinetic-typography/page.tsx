"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import KineticTypography from "@/registry/text/kinetic-typography";
import { PreviewCodeUsageTabs, type PropItem } from "@/components/ui/tabs";

const componentCode = `"use client";

import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

interface KineticTypographyProps {
  text?: string;
  className?: string;
}

const KineticTypography: React.FC<KineticTypographyProps> = ({ 
  text = "ELEGANCE", 
  className = "" 
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const textWrapper = textRef.current;
    textWrapper.innerHTML = textWrapper.textContent!.replace(/\\S/g, "<span class='letter' style='display:inline-block;'>$&</span>");

    anime.timeline({loop: true})
      .add({
        targets: '.kinetic-text .letter',
        translateY: [100,0],
        translateZ: 0,
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 1400,
        delay: (el, i) => 300 + 30 * i
      }).add({
        targets: '.kinetic-text .letter',
        translateY: [0,-100],
        opacity: [1,0],
        easing: "easeInExpo",
        duration: 1200,
        delay: (el, i) => 100 + 30 * i
      });
  }, [text]);

  return (
    <div className={\`kinetic-text overflow-hidden \${className}\`}>
      <h1 
        ref={textRef} 
        className="text-6xl md:text-8xl font-bold tracking-tighter text-foreground"
        style={{ lineHeight: '1.1' }}
      >
        {text}
      </h1>
    </div>
  );
};

export default KineticTypography;`;

const usageCode = `import KineticTypography from "@/registry/text/kinetic-typography";

<KineticTypography text="DESIGN" />`;

const props: PropItem[] = [
  { name: "text", type: "string", default: "ELEGANCE", description: "Text to animate" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

export default function KineticTypographyPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/components" className="p-1 rounded-md hover:bg-secondary transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Kinetic Typography</h1>
        </div>
        <p className="text-muted-foreground max-w-lg pl-9">
          Smooth, high-end text reveal animation using Anime.js. Perfect for hero sections.
        </p>
      </div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex items-center justify-center min-h-[400px] w-full bg-background border border-border/50 rounded-xl overflow-hidden">
            <KineticTypography text="AESTHETIC" />
          </div>
        }
        code={componentCode}
        usage={usageCode}
        props={props}
        dependencies={["animejs"]}
      />
    </div>
  );
}
