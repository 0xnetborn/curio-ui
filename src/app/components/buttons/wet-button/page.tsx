"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { WetButton } from "@/registry/buttons/wet-button";
import { ComponentPageTabs } from "@/components/ui/tabs";

const buttonCode = `"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface WetButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const WetButton = ({
  children = "Wet Paint",
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
      <div style={{ height }} className={cn("w-2 rounded-b-full transition-colors", groupHoverClass)} />
      <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("absolute left-full top-0", colorClass, groupHoverClass)}>
        <g clipPath="url(#clip0_1077_28)">
          <path fillRule="evenodd" clipRule="evenodd" d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z" />
        </g>
        <defs>
          <clipPath id="clip0_1077_28">
            <rect width="6" height="6" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("absolute right-full top-0 rotate-90", colorClass, groupHoverClass)}>
        <g clipPath="url(#clip0_1077_28_2)">
          <path fillRule="evenodd" clipRule="evenodd" d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z" />
        </g>
        <defs>
          <clipPath id="clip0_1077_28_2">
            <rect width="6" height="6" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <motion.div
        initial={{ y: -8, opacity: 1 }}
        animate={{ y: [-8, 50], opacity: [1, 0] }}
        transition={{ duration: 2, times: [0, 1], delay, ease: "easeIn", repeat: Infinity, repeatDelay: 2 }}
        className={cn("absolute top-full h-2 w-2 rounded-full", colorClass, groupHoverClass)}
      />
    </motion.div>
  );
};

export default WetButton;`;

export default function WetButtonPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2">
          <Link
            href="/components/buttons"
            className="p-1 rounded-md hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Wet Paint Button</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">
          A button with dripping paint effect on hover. Each drip has unique timing
          and creates a playful wet paint animation.
        </p>
      </motion.div>

      <ComponentPageTabs
        preview={
          <div className="bg-slate-900 p-8 rounded-lg">
            <WetButton onClick={() => console.log("Wet Button clicked!")} />
          </div>
        }
        code={buttonCode}
      />

      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold">Props</h3>
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
                <td className="py-2 px-4">ReactNode</td>
                <td className="py-2 px-4">"Wet Paint"</td>
                <td className="py-2 px-4 text-muted-foreground">
                  Button label
                </td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 px-4 font-mono text-accent">className</td>
                <td className="py-2 px-4">string</td>
                <td className="py-2 px-4">undefined</td>
                <td className="py-2 px-4 text-muted-foreground">
                  Additional CSS classes
                </td>
              </tr>
              <tr>
                <td colSpan={4} className="py-2 px-4 text-muted-foreground text-center">
                  Inherits all native button props
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold">Dependencies</h3>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li className="flex items-center gap-2">
            <code className="text-accent">framer-motion</code>
            <span>— For drip animations</span>
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Source:</span>
        <a
          href="https://hover.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-accent hover:underline"
        >
          hover.dev <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
