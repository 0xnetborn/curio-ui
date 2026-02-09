"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import TextPressure from "@/registry/text/text-pressure";
import { PreviewCodeUsageTabs, type PropItem } from "@/components/ui/tabs";

const componentCode = `"use client";

import { useEffect, useRef, useState, useMemo } from "react";

interface TextPressureProps {
  text?: string;
  className?: string;
  minFontSize?: number;
}

const TextPressure = ({
  text = "CurioUI",
  className = "",
  minFontSize = 24,
}: TextPressureProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);
  const cursorRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);

  const chars = useMemo(() => text.split(""), [text]);

  const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    mouseRef.current.x = left + width / 2;
    mouseRef.current.y = top + height / 2;
    cursorRef.current.x = mouseRef.current.x;
    cursorRef.current.y = mouseRef.current.y;
  }, []);

  useEffect(() => {
    const setSize = () => {
      if (!containerRef.current || !titleRef.current) return;
      const { width: containerW } = containerRef.current.getBoundingClientRect();
      let newFontSize = containerW / (chars.length / 2);
      newFontSize = Math.max(newFontSize, minFontSize);
      setFontSize(newFontSize);
      setScaleY(1);
    };
    setSize();
    window.addEventListener("resize", setSize);
    return () => window.removeEventListener("resize", setSize);
  }, [chars.length, minFontSize]);

  useEffect(() => {
    let rafId: number;
    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

      if (titleRef.current && spansRef.current[0]) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = titleRect.width / 2;

        spansRef.current.forEach((span) => {
          if (!span) return;
          const rect = span.getBoundingClientRect();
          const charCenter = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
          const d = dist(mouseRef.current, charCenter);
          const getVal = (distance: number, minVal: number, maxVal: number) => {
            const val = maxVal - Math.abs((maxVal * distance) / maxDist);
            return Math.max(minVal, val + minVal);
          };
          const wdth = Math.floor(getVal(d, 50, 200));
          const wght = Math.floor(getVal(d, 100, 900));
          const alphaVal = getVal(d, 0.5, 1).toFixed(2);
          span.style.opacity = alphaVal;
          span.style.fontVariationSettings = \`'wght' \${wght}, 'wdth' \${wdth}\`;
        });
      }
      rafId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(rafId);
  }, [chars.length]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <h1 ref={titleRef} className={className} style={{ fontSize, margin: 0 }}>
        {chars.map((char, i) => (
          <span key={i} ref={(el) => (spansRef.current[i] = el)}>{char}</span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;`;

const usageCode = `import TextPressure from "@/registry/text/text-pressure";

<TextPressure 
  text="CurioUI"
  className="text-4xl font-bold"
/>`;

const props: PropItem[] = [
  { name: "text", type: "string", default: "CurioUI", description: "Text content" },
  { name: "minFontSize", type: "number", default: "24", description: "Minimum font size" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

export default function TextPressurePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/text-animations" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Text Pressure</h1>
        </div>
        <p className="text-muted-foreground max-w-lg pl-9">
          Text that responds to mouse movement with variable font weights.
        </p>
      </div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex items-center justify-center min-h-[200px] bg-card rounded-xl border border-border/50 p-8">
            <TextPressure text="CurioUI" className="text-4xl font-bold" />
          </div>
        }
        code={componentCode}
        usage={usageCode}
        props={props}
      />
    </div>
  );
}
