"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import BlurText from "@/registry/text/blur-text";
import { PreviewCodeUsageTabs, type PropItem } from "@/components/ui/tabs";

const componentCode = `"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";

const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);
  const keyframes = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

const BlurText = ({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = t => t,
}) => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () => direction === "top" 
      ? { filter: "blur(10px)", opacity: 0, y: -50 } 
      : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      { filter: "blur(5px)", opacity: 0.5, y: direction === "top" ? 5 : -5 },
      { filter: "blur(0px)", opacity: 1, y: 0 }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;
  const stepCount = toSnapshots.length + 1;
  const totalDuration = 0.35 * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  return (
    <p ref={ref} className={className} style={{ display: "flex", flexWrap: "wrap" }}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);
        const spanTransition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing
        };
        return (
          <motion.span
            className="inline-block will-change-transform"
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
          >
            {segment === " " ? "\u00A0" : segment}
            {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
          </motion.span>
        );
      })}
    </p>
  );
};

export default BlurText;`;

const usageCode = `import BlurText from "@/registry/text/blur-text";

<BlurText
  text="CurioUI Animation"
  delay={150}
  animateBy="words"
  direction="top"
  className="text-4xl font-bold"
/>`;

const props: PropItem[] = [
  { name: "text", type: "string", description: "Text content to animate" },
  { name: "delay", type: "number", default: "200", description: "Delay between each element (ms)" },
  { name: "animateBy", type: "'words' | 'letters'", default: "words", description: "Animate by words or letters" },
  { name: "direction", type: "'top' | 'bottom'", default: "top", description: "Animation direction" },
  { name: "threshold", type: "number", default: "0.1", description: "Intersection threshold" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

const dependencies = ["framer-motion"];

export default function BlurTextPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/text-animations" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Blur Text</h1>
        </div>
        <p className="text-muted-foreground max-w-lg pl-9">
          Text that reveals with a blur effect as it enters the viewport.
        </p>
      </div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex items-center justify-center min-h-[200px]">
            <BlurText
              text="CurioUI Animation"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-4xl font-bold"
            />
          </div>
        }
        code={componentCode}
        usage={usageCode}
        props={props}
        dependencies={dependencies}
      />
    </div>
  );
}
