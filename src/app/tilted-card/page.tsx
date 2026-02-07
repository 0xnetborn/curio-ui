"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { TiltedCard } from "@/registry/tilted-card";
import { CodeBlock } from "@/components/ui/code-block";

const tiltedCardCode = `"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  containerHeight?: React.CSSProperties["height"];
  containerWidth?: React.CSSProperties["width"];
  imageHeight?: React.CSSProperties["height"];
  imageWidth?: React.CSSProperties["width"];
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
  className?: string;
}

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
  className,
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;
    rotateX.set(rotationX);
    rotateY.set(rotationY);
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      className={cn("relative w-full h-full [perspective:800px]", className)}
      style={{ height: containerHeight, width: containerWidth }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative [transform-style:preserve-3d]"
        style={{ width: imageWidth, height: imageHeight, rotateX, rotateY, scale }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          className="absolute top-0 left-0 object-cover rounded-[15px]"
        />
      </motion.div>
      {showTooltip && (
        <motion.figcaption
          className="pointer-events-none absolute bg-white text-[#2d2d2d] rounded text-[10px] px-[10px] py-[4px] hidden sm:block"
          style={{ x, y, opacity, rotate: rotateFigcaption }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}

export default TiltedCard;`;

const usageCode = `import { TiltedCard } from "@/registry/tilted-card";

<TiltedCard
  imageSrc="/path/to/image.jpg"
  captionText="CurioUI"
  containerHeight="300px"
  imageWidth="300px"
/>`;

export default function TiltedCardPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2">
          <Link
            href="/components"
            className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Tilted Card</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">
          Card with 3D tilt effect that follows mouse movement.
          Uses framer-motion springs for smooth animations.
        </p>
      </motion.div>

      <CodeBlock code={tiltedCardCode} language="tsx" title="tilted-card.tsx" />

      <div className="space-y-4">
        <h3 className="font-semibold">Usage</h3>
        <div className="rounded-xl border border-border bg-card p-4">
          <pre className="text-sm font-mono text-muted-foreground overflow-x-auto">
            {usageCode}
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Preview</h3>
        <div className="flex items-center justify-center min-h-[400px] rounded-xl border border-border bg-card p-8">
          <TiltedCard
            imageSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop"
            altText="Abstract gradient"
            captionText="CurioUI"
            containerHeight="400px"
            containerWidth="100%"
            imageWidth="300px"
            imageHeight="400px"
            rotateAmplitude={12}
          />
        </div>
      </div>
    </div>
  );
}
