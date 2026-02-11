"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import TiltCard from "@/registry/text/tilt-card";
import { PreviewCodeUsageTabs } from "@/components/ui/tabs";

const componentCode = `"use client";

import { useRef, ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  glareOpacity?: number;
  glareColor?: string;
}

const TiltCard = ({
  children,
  className = "",
  tiltAmount = 10,
  glareOpacity = 0.2,
  glareColor = "rgba(255, 255, 255, 0.4)",
}: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -tiltAmount;
    const rotateY = ((x - centerX) / centerX) * tiltAmount;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    card.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;
    card.style.setProperty("--glare-x", \`\${glareX}%\`);
    card.style.setProperty("--glare-y", \`\${glareY}%\`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={\`relative transition-transform duration-200 ease-out \${className}\`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
      <div
        className="absolute inset-0 pointer-events-none rounded-inherit"
        style={{
          background: \`radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), \${glareColor}, transparent 50%)\`,
          opacity: glareOpacity,
          borderRadius: "inherit",
        }}
      />
    </div>
  );
};

export default TiltCard;
`;

const usageCode = `import TiltCard from "@/registry/text/tilt-card";

<TiltCard text="CurioUI" />`;

export default function TiltCardPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/components/text" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">TiltCard</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">TiltCard animation effect.</p>
      </motion.div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex items-center justify-center min-h-[200px]">
            <TiltCard text="CurioUI" />
          </div>
        }
        code={componentCode}
        usage={usageCode}
      />
    </div>
  );
}
