"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import CircularText from "@/registry/text/circular-text";
import { PreviewCodeUsageTabs, type PropItem } from "@/components/ui/tabs";

const componentCode = `"use client";

import { useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';

import './circular-text.css';

const getRotationTransition = (duration: number, from: number, loop = true) => ({
  from,
  to: from + 360,
  ease: 'linear' as const,
  duration,
  type: 'tween' as const,
  repeat: loop ? Infinity : 0
});

const getTransition = (duration: number, from: number) => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: 'spring' as const,
    damping: 20,
    stiffness: 300
  }
});

interface CircularTextProps {
  text?: string;
  spinDuration?: number;
  onHover?: 'speedUp' | 'slowDown' | 'pause' | 'goBonkers' | null;
  className?: string;
}

const CircularText = ({ 
  text = "CIRCULAR TEXT • SPINNING • ", 
  spinDuration = 20, 
  onHover = 'speedUp', 
  className = '' 
}: CircularTextProps) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation = useMotionValue(0);

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start)
    });
  }, [spinDuration, text, onHover, controls, rotation]);

  const handleHoverStart = () => {
    const start = rotation.get();
    if (!onHover) return;

    let transitionConfig;
    let scaleVal = 1;

    switch (onHover) {
      case 'slowDown':
        transitionConfig = getTransition(spinDuration * 2, start);
        break;
      case 'speedUp':
        transitionConfig = getTransition(spinDuration / 4, start);
        break;
      case 'pause':
        transitionConfig = {
          rotate: { type: 'spring', damping: 20, stiffness: 300 },
          scale: { type: 'spring', damping: 20, stiffness: 300 }
        };
        scaleVal = 1;
        break;
      case 'goBonkers':
        transitionConfig = getTransition(spinDuration / 20, start);
        scaleVal = 0.8;
        break;
      default:
        transitionConfig = getTransition(spinDuration, start);
    }

    controls.start({
      rotate: start + 360,
      scale: scaleVal,
      transition: transitionConfig
    });
  };

  const handleHoverEnd = () => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start)
    });
  };

  return (
    <motion.div
      className={\`circular-text \${className}\`}
      style={{ rotate: rotation }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const factor = Math.PI / letters.length;
        const x = factor * i;
        const y = factor * i;
        const transform = \`rotateZ(\${rotationDeg}deg) translate3d(\${x}px, \${y}px, 0)\`;

        return (
          <span key={i} style={{ transform, WebkitTransform: transform }}>
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;`;

const usageCode = `import CircularText from "@/registry/text/circular-text";

<CircularText
  text="CURIO UI • PREMIUM • "
  spinDuration={20}
  onHover="speedUp"
  className=""
/>`;

const cssCode = `.circular-text {
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 500;
}

.circular-text span {
  position: absolute;
  left: 50%;
  font-size: 1em;
  transform-origin: 0 100px;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}`;

const props: PropItem[] = [
  { name: "text", type: "string", default: '"CIRCULAR TEXT • SPINNING • "', description: "Text to display in circular format" },
  { name: "spinDuration", type: "number", default: "20", description: "Duration of one full rotation (seconds)" },
  { name: "onHover", type: "'speedUp' | 'slowDown' | 'pause' | 'goBonkers' | null", default: "'speedUp'", description: "Hover behavior" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

const dependencies = ["framer-motion"];

export default function CircularTextPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/text-animations" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Circular Text</h1>
        </div>
        <p className="text-muted-foreground max-w-lg pl-9">
          Continuously rotating text arranged in a circle with interactive hover effects.
        </p>
      </div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex items-center justify-center min-h-[300px] bg-card rounded-xl border border-border/50 p-8">
            <CircularText
              text="CURIO UI • PREMIUM • "
              spinDuration={20}
              onHover="speedUp"
            />
          </div>
        }
        code={componentCode}
        usage={usageCode}
        props={props}
        dependencies={dependencies}
      />

      {/* CSS Section */}
      <div className="space-y-4">
        <h2 className="font-display text-xl font-semibold">Required CSS</h2>
        <pre className="bg-secondary rounded-lg p-4 overflow-x-auto text-sm">
          <code>{cssCode}</code>
        </pre>
      </div>
    </div>
  );
}
