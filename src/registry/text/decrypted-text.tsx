"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  reveal?: number;
  className?: string;
}

const DecryptedText = ({
  text,
  speed = 30,
  maxIterations = 10,
  reveal = 3,
  className = "",
}: DecryptedTextProps) => {
  const [displayedText, setDisplayedText] = useState(text);

  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayedText(
        text
          .split("")
          .map((letter, index) => {
            if (index < reveal) return text[index];
            return CHARS[index % CHARS.length];
          })
          .join("")
      );
      if (iterations >= maxIterations) {
        clearInterval(interval);
      } else {
        iterations++;
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, maxIterations, reveal]);

  return (
    <motion.span className={className}>
      {displayedText}
    </motion.span>
  );
};

export default DecryptedText;
