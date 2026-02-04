"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface WetPaintButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

/**
 * Wet Paint Button - From hover.dev
 * A button with dripping paint effect on hover using SVG filters
 */
export const WetPaintButton = ({
  children = "Wet Paint",
  className,
  ...props
}: WetPaintButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* SVG Filters for liquid effect */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="wet-paint-filter">
            <feTurbulence
              id="turbulence"
              baseFrequency="0.8"
              numOctaves="3"
              result="noise"
              seed={isHovered ? 1 : 0}
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={isHovered ? 12 : 0}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <button
        className={cn(
          "group relative rounded-lg bg-accent px-8 py-3 font-semibold text-accent-foreground transition-all duration-300",
          "hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/30",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {children}

        {/* Drip effects - mimicking hover.dev wet paint */}
        <Drip
          left="15%"
          delay={0}
          duration={1.5}
          width={8}
          height={24}
        />
        <Drip
          left="35%"
          delay={0.3}
          duration={2}
          width={6}
          height={18}
        />
        <Drip
          left="55%"
          delay={0.6}
          duration={1.8}
          width={10}
          height={28}
        />
        <Drip
          left="75%"
          delay={0.2}
          duration={2.2}
          width={7}
          height={20}
        />
        <Drip
          left="90%"
          delay={0.9}
          duration={1.6}
          width={5}
          height={16}
        />
      </button>
    </div>
  );
};

interface DripProps {
  left: string;
  delay: number;
  duration: number;
  width: number;
  height: number;
}

/**
 * Drip component for the wet paint effect
 * Creates animated dripping paint drops
 */
const Drip = ({ left, delay, duration, width, height }: DripProps) => {
  return (
    <motion.div
      className="absolute top-full origin-top z-10"
      style={{ left }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scaleY: [0, 1, 1.2, 1],
      }}
      transition={{
        duration: 4,
        times: [0, 0.1, 0.8, 1],
        delay,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 2,
      }}
    >
      {/* Main drip body */}
      <div
        className="bg-accent"
        style={{
          width: width,
          height: height,
          borderRadius: `0 0 ${width}px ${width}px`,
        }}
      />

      {/* Drip tip on left */}
      <svg
        width={width}
        height={width}
        viewBox="0 0 10 10"
        className="absolute top-0 left-full"
        style={{ transform: "translateX(-50%)" }}
      >
        <path
          d={`M0,${width / 2} Q${width / 2},0 ${width},${width / 2}`}
          fill="currentColor"
          className="text-accent"
        />
      </svg>

      {/* Falling droplet */}
      <motion.div
        className="absolute left-1/2 top-full -translate-x-1/2"
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: [0, 40],
          opacity: [1, 0],
        }}
        transition={{
          duration: duration,
          times: [0, 1],
          delay: delay,
          ease: "easeIn",
          repeat: Infinity,
          repeatDelay: 2,
        }}
      >
        <div
          className="bg-accent rounded-full"
          style={{
            width: width * 0.6,
            height: width * 0.6,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default WetPaintButton;
