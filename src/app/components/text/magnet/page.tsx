"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Magnet from "@/registry/text/magnet";
import { PreviewCodeUsageTabs } from "@/components/ui/tabs";

const componentCode = `"use client";

import { useRef, useState, ReactNode, MouseEvent } from "react";

interface MagnetProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

const Magnet = ({
  children,
  className = "",
  strength = 0.3,
}: MagnetProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;

    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform: \`translate(\${position.x}px, \${position.y}px)\`,
        transition: position.x === 0 && position.y === 0 
          ? "transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)" 
          : "transform 0.1s ease-out",
      }}
    >
      {children}
    </div>
  );
};

export default Magnet;
`;

const usageCode = `import Magnet from "@/registry/text/magnet";

<Magnet text="CurioUI" />`;

export default function MagnetPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/components/text" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Magnet</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">Magnet animation effect.</p>
      </motion.div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex items-center justify-center min-h-[200px]">
            <Magnet text="CurioUI" />
          </div>
        }
        code={componentCode}
        usage={usageCode}
      />
    </div>
  );
}
