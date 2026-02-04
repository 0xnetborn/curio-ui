"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export interface FuzzyTextProps {
  children: string;
  className?: string;
  /**
   * Blur intensity when not hovered (default: 10)
   */
  baseBlur?: number;
  /**
   * Blur intensity on hover (default: 0)
   */
  hoverBlur?: number;
  /**
   * Duration of the transition in ms (default: 400)
   */
  duration?: number;
}

/**
 * Fuzzy Text - A text effect that transitions from blurred to sharp on hover
 * Inspired by reactbits.dev text animations
 */
export const FuzzyText = ({
  children,
  className,
  baseBlur = 10,
  hoverBlur = 0,
  duration = 400,
}: FuzzyTextProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const blurValue = isHovered ? hoverBlur : baseBlur;

  return (
    <motion.span
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        filter: `blur(${blurValue}px)`,
      }}
      animate={{
        filter: `blur(${blurValue}px)`,
      }}
      transition={{
        duration: duration / 1000,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.span>
  );
};

// Alternative: Animated character-by-character fuzzy reveal
export interface FuzzyTextCharsProps {
  text: string;
  className?: string;
  /**
   * Stagger delay between characters in ms (default: 50)
   */
  staggerDelay?: number;
  /**
   * Duration of each character's reveal in ms (default: 300)
   */
  revealDuration?: number;
}

export const FuzzyTextChars = ({
  text,
  className,
  staggerDelay = 50,
  revealDuration = 300,
}: FuzzyTextCharsProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const characters = text.split("");

  return (
    <div
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          style={{
            display: "inline-block",
            filter: isHovered ? "blur(0px)" : "blur(8px)",
            opacity: isHovered ? 1 : 0.5,
          }}
          animate={{
            filter: isHovered ? "blur(0px)" : "blur(8px)",
            opacity: isHovered ? 1 : 0.5,
          }}
          transition={{
            duration: revealDuration / 1000,
            delay: index * (staggerDelay / 1000),
            ease: "easeOut",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
};

export default FuzzyText;
