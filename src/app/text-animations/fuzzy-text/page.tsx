"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { FuzzyText, FuzzyTextChars } from "@/registry/text/fuzzy-text";
import { ComponentPageTabs } from "@/components/ui/tabs";

const fuzzyTextCode = `"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

export interface FuzzyTextProps {
  children: string;
  className?: string;
  baseBlur?: number;
  hoverBlur?: number;
  duration?: number;
  easing?: string;
}

export const FuzzyText = ({
  children,
  className,
  baseBlur = 10,
  hoverBlur = 0,
  duration = 400,
  easing = "easeOut",
}: FuzzyTextProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const blurValue = isHovered ? hoverBlur : baseBlur;

  return (
    <motion.span
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ filter: \`blur(\${blurValue}px)\` }}
      animate={{ filter: \`blur(\${blurValue}px)\` }}
      transition={{ duration: duration / 1000, ease: easing }}
    >
      {children}
    </motion.span>
  );
};

export default FuzzyText;`;

const fuzzyTextCharsCode = `"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export interface FuzzyTextCharsProps {
  text: string;
  className?: string;
  staggerDelay?: number;
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
          style={{ display: "inline-block", filter: isHovered ? "blur(0px)" : "blur(8px)", opacity: isHovered ? 1 : 0.5 }}
          animate={{ filter: isHovered ? "blur(0px)" : "blur(8px)", opacity: isHovered ? 1 : 0.5 }}
          transition={{ duration: revealDuration / 1000, delay: index * (staggerDelay / 1000), ease: "easeOut" }}
        >
          {char === " " ? "\\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
};

export default FuzzyTextChars;`;

export default function FuzzyTextPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2">
          <Link
            href="/text-animations"
            className="p-1 rounded-md hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Fuzzy Text</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">
          A text effect that transitions from blurred to sharp on hover.
          Includes both simple blur and character-by-character reveal variants.
        </p>
      </motion.div>

      {/* Simple Fuzzy Text */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Simple Blur</h2>
        <ComponentPageTabs
          preview={
            <div className="bg-slate-900 p-8 rounded-lg flex items-center justify-center">
              <FuzzyText
                className="text-4xl font-bold text-white"
                baseBlur={10}
                hoverBlur={0}
              >
                Hover Me
              </FuzzyText>
            </div>
          }
          code={fuzzyTextCode}
        />
      </div>

      {/* Character Reveal */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Character Reveal</h2>
        <ComponentPageTabs
          preview={
            <div className="bg-slate-900 p-8 rounded-lg flex items-center justify-center">
              <FuzzyTextChars
                className="text-4xl font-bold text-white"
                text="Fuzzy Text"
                staggerDelay={30}
                revealDuration={200}
              />
            </div>
          }
          code={fuzzyTextCharsCode}
        />
      </div>

      {/* Props Table */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold">FuzzyText Props</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-4 font-medium">Prop</th>
                <th className="text-left py-2 px-4 font-medium">Type</th>
                <th className="text-left py-2 px-4 font-medium">Default</th>
                <th className="text-left py-2 px-4 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="py-2 px-4 font-mono text-accent">children</td>
                <td className="py-2 px-4">string</td>
                <td className="py-2 px-4">-</td>
                <td className="py-2 px-4 text-muted-foreground">Text content</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 px-4 font-mono text-accent">baseBlur</td>
                <td className="py-2 px-4">number</td>
                <td className="py-2 px-4">10</td>
                <td className="py-2 px-4 text-muted-foreground">Blur when not hovered (px)</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 px-4 font-mono text-accent">hoverBlur</td>
                <td className="py-2 px-4">number</td>
                <td className="py-2 px-4">0</td>
                <td className="py-2 px-4 text-muted-foreground">Blur on hover (px)</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 px-4 font-mono text-accent">duration</td>
                <td className="py-2 px-4">number</td>
                <td className="py-2 px-4">400</td>
                <td className="py-2 px-4 text-muted-foreground">Transition duration (ms)</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono text-accent">easing</td>
                <td className="py-2 px-4">string</td>
                <td className="py-2 px-4">"easeOut"</td>
                <td className="py-2 px-4 text-muted-foreground">Easing function</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Dependencies */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold">Dependencies</h3>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li className="flex items-center gap-2">
            <code className="text-accent">framer-motion</code>
            <span>— For smooth blur transitions</span>
          </li>
        </ul>
      </div>

      {/* Source */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Source:</span>
        <a
          href="https://reactbits.dev/text-animations/fuzzy-text"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-accent hover:underline"
        >
          reactbits.dev <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
