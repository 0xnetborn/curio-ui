"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface WetButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

/**
 * Wet Paint Button - From hover.dev
 * A button with dripping paint effect on hover
 */
export const WetButton = ({
  children = "CurioUI",
  className,
  ...props
}: WetButtonProps) => {
  return (
    <button
      className={cn(
        "group relative rounded bg-accent px-6 py-3 font-semibold text-accent-foreground transition-colors hover:bg-accent/90",
        className
      )}
      {...props}
    >
      {children}
      {/* Drip effects */}
      <Drip left="10%" height={24} delay={0.5} colorClass="bg-accent" groupHoverClass="group-hover:bg-accent/90" />
      <Drip left="30%" height={20} delay={3} colorClass="bg-accent" groupHoverClass="group-hover:bg-accent/90" />
      <Drip left="57%" height={10} delay={4.25} colorClass="bg-accent" groupHoverClass="group-hover:bg-accent/90" />
      <Drip left="85%" height={16} delay={1.5} colorClass="bg-accent" groupHoverClass="group-hover:bg-accent/90" />
    </button>
  );
};

interface DripProps {
  left: string;
  height: number;
  delay: number;
  colorClass: string;
  groupHoverClass: string;
}

const Drip = ({ left, height, delay, colorClass, groupHoverClass }: DripProps) => {
  return (
    <motion.div
      className={cn("absolute top-[99%] origin-top z-10", colorClass)}
      style={{ left }}
      initial={{ scaleY: 0.75 }}
      animate={{ scaleY: [0.75, 1, 0.75] }}
      transition={{
        duration: 2,
        times: [0, 0.25, 1],
        delay,
        ease: "easeIn",
        repeat: Infinity,
        repeatDelay: 2,
      }}
    >
      {/* Main drip column */}
      <div
        style={{ height }}
        className={cn(
          "w-2 rounded-b-full transition-colors",
          groupHoverClass
        )}
      />

      {/* Left SVG drip tip */}
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("absolute left-full top-0", colorClass, groupHoverClass)}
      >
        <g clipPath="url(#clip0_1077_28)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
          />
        </g>
        <defs>
          <clipPath id="clip0_1077_28">
            <rect width="6" height="6" fill="white" />
          </clipPath>
        </defs>
      </svg>

      {/* Right SVG drip tip */}
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("absolute right-full top-0 rotate-90", colorClass, groupHoverClass)}
      >
        <g clipPath="url(#clip0_1077_28_2)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
          />
        </g>
        <defs>
          <clipPath id="clip0_1077_28_2">
            <rect width="6" height="6" fill="white" />
          </clipPath>
        </defs>
      </svg>

      {/* Falling droplet */}
      <motion.div
        initial={{ y: -8, opacity: 1 }}
        animate={{ y: [-8, 50], opacity: [1, 0] }}
        transition={{
          duration: 2,
          times: [0, 1],
          delay,
          ease: "easeIn",
          repeat: Infinity,
          repeatDelay: 2,
        }}
        className={cn(
          "absolute top-full h-2 w-2 rounded-full",
          colorClass,
          groupHoverClass
        )}
      />
    </motion.div>
  );
};

export default WetButton;
