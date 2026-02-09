"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import ClickSpark from "@/registry/backgrounds/click-spark";
import { PreviewCodeUsageTabs } from "@/components/ui/tabs";

const componentCode = `"use client";

import { useRef, useEffect, useCallback, ReactNode } from 'react';

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  extraScale?: number;
  children?: ReactNode;
}

const ClickSpark = ({
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  extraScale = 1.0,
  children
}: ClickSparkProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Array<{ x: number; y: number; angle: number; startTime: number }>>([]);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let resizeTimeout: NodeJS.Timeout;

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(parent);

    resizeCanvas();

    return () => {
      ro.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

  const easeFunc = useCallback(
    (t: number) => {
      switch (easing) {
        case 'linear':
          return t;
        case 'ease-in':
          return t * t;
        case 'ease-in-out':
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    },
    [easing]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const draw = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter(spark => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) {
          return false;
        }

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easeFunc, extraScale]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const now = performance.now();
    const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: now
    }));

    sparksRef.current.push(...newSparks);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          userSelect: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none'
        }}
      />
      {children}
    </div>
  );
};

export default ClickSpark;`;

const usageCode = `import ClickSpark from "@/registry/backgrounds/click-spark";

// Basic usage - wrap any content
<ClickSpark>
  <button className="btn">Click anywhere!</button>
</ClickSpark>

// With custom colors and settings
<ClickSpark
  sparkColor="#14B8A6"
  sparkCount={12}
  sparkRadius={25}
  sparkSize={12}
  duration={500}
>
  <div className="p-8">Click for teal sparks!</div>
</ClickSpark>`;

export default function ClickSparkPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/components" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Click Spark</h1>
          <span className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider bg-accent text-accent-foreground rounded">
            New
          </span>
        </div>
        <p className="text-muted-foreground max-w-lg">
          Add satisfying spark animations that burst from click locations. Perfect for buttons, cards, or any interactive element.
        </p>
      </motion.div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex flex-col items-center justify-center min-h-[300px] gap-6">
            <ClickSpark sparkColor="#14B8A6" sparkCount={10} sparkRadius={30}>
              <div className="w-full h-[300px] flex flex-col items-center justify-center gap-4 bg-secondary/30 rounded-xl border border-border">
                <Sparkles className="w-8 h-8 text-accent" />
                <p className="text-lg font-medium">Click anywhere in this area!</p>
                <p className="text-sm text-muted-foreground">Watch the sparks fly ✨</p>
              </div>
            </ClickSpark>
          </div>
        }
        code={componentCode}
        usage={usageCode}
      />

      {/* Props Reference */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="font-display text-2xl font-semibold">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium">Prop</th>
                <th className="text-left py-3 px-4 font-medium">Type</th>
                <th className="text-left py-3 px-4 font-medium">Default</th>
                <th className="text-left py-3 px-4 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="py-3 px-4"><code>sparkColor</code></td>
                <td className="py-3 px-4"><code>string</code></td>
                <td className="py-3 px-4"><code>'#fff'</code></td>
                <td className="py-3 px-4">Color of the spark lines</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4"><code>sparkSize</code></td>
                <td className="py-3 px-4"><code>number</code></td>
                <td className="py-3 px-4"><code>10</code></td>
                <td className="py-3 px-4">Length of each spark line</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4"><code>sparkRadius</code></td>
                <td className="py-3 px-4"><code>number</code></td>
                <td className="py-3 px-4"><code>15</code></td>
                <td className="py-3 px-4">How far sparks travel from origin</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4"><code>sparkCount</code></td>
                <td className="py-3 px-4"><code>number</code></td>
                <td className="py-3 px-4"><code>8</code></td>
                <td className="py-3 px-4">Number of sparks per click</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4"><code>duration</code></td>
                <td className="py-3 px-4"><code>number</code></td>
                <td className="py-3 px-4"><code>400</code></td>
                <td className="py-3 px-4">Animation duration in ms</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4"><code>easing</code></td>
                <td className="py-3 px-4"><code>string</code></td>
                <td className="py-3 px-4"><code>'ease-out'</code></td>
                <td className="py-3 px-4">Easing function for animation</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4"><code>children</code></td>
                <td className="py-3 px-4"><code>ReactNode</code></td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4">Content to wrap with spark effect</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
