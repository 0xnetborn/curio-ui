"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import SpotlightCard from "@/registry/text/spotlight-card";
import { PreviewCodeUsageTabs } from "@/components/ui/tabs";

const componentCode = `"use client";

import { useRef, MouseEvent, ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "rgba(0, 255, 153, 0.15)",
}: SpotlightCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    container.style.setProperty("--spotlight-x", \`\${x}px\`);
    container.style.setProperty("--spotlight-y", \`\${y}px\`);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={\`relative overflow-hidden \${className}\`}
      style={{
        background: \`radial-gradient(
          400px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%),
          \${spotlightColor},
          transparent 60%
        )\`,
      }}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;
`;

const usageCode = `import SpotlightCard from "@/registry/text/spotlight-card";

<SpotlightCard text="CurioUI" />`;

export default function SpotlightCardPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/components/text" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">SpotlightCard</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">SpotlightCard animation effect.</p>
      </motion.div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex items-center justify-center min-h-[200px]">
            <SpotlightCard text="CurioUI" />
          </div>
        }
        code={componentCode}
        usage={usageCode}
      />
    </div>
  );
}
