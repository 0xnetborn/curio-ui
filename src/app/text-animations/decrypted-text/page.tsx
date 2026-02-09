"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import DecryptedText from "@/registry/text/decrypted-text";
import { PreviewCodeUsageTabs } from "@/components/ui/tabs";

const componentCode = `"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  reveal?: number;
  characters?: string;
  className?: string;
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";

const DecryptedText = ({
  text,
  speed = 30,
  maxIterations = 10,
  reveal = 3,
  characters: charset = characters,
  className = "",
}: DecryptedTextProps) => {
  const [displayedText, setDisplayedText] = useState(text);

  const scramble = useCallback(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayedText(
        text
          .split("")
          .map((letter, index) => {
            if (index < reveal) return text[index];
            return letters[index % letters.length];
          })
          .join("")
      );
      if (iterations >= maxIterations) {
        clearInterval(interval);
      } else {
        iterations++;
      }
    }, speed);
    return interval;
  }, [text, speed, maxIterations, reveal]);

  return (
    <motion.span
      className={className}
      onMouseEnter={scramble}
    >
      {displayedText}
    </motion.span>
  );
};

export default DecryptedText;`;

const usageCode = `import DecryptedText from "@/registry/text/decrypted-text";

<DecryptedText text="CurioUI" speed={30} />`;

export default function DecryptedTextPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2">
          <Link href="/text-animations" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">DecryptedText</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">
          DecryptedText animation effect.
        </p>
      </motion.div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex flex-wrap gap-6">
            <DecryptedText text="CurioUI" className="text-4xl font-bold" />
          </div>
        }
        code={componentCode}
        usage={usageCode}
      />
    </div>
  );
}
