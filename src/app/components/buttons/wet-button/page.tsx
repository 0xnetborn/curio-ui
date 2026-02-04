"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Highlight, themes } from "prism-react-renderer";
import { useTheme } from "next-themes";
import {
  ArrowLeft,
  Copy,
  Check,
  Play,
  FileCode,
  Terminal,
  Palette,
  Droplets,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { WetPaintButton } from "@/registry/buttons/wet-paint-button";

export default function WetButtonPage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [codeTab, setCodeTab] = useState<"usage" | "component">("usage");
  const [copiedUsage, setCopiedUsage] = useState(false);
  const [copiedComponent, setCopiedComponent] = useState(false);
  const [buttonText, setButtonText] = useState("Wet Paint");

  const USAGE_CODE = useMemo(() => `import { WetPaintButton } from "@/registry/buttons/wet-paint-button";

export default function MyPage() {
  return (
    <WetPaintButton>
      ${buttonText}
    </WetPaintButton>
  );
}`, [buttonText]);

  const COMPONENT_CODE = useMemo(() => `"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface WetPaintButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

/**
 * Wet Paint Button - From hover.dev by Tommy
 * A button with dripping paint effect on hover using accent colors
 */
export const WetPaintButton = ({
  children = "Wet Paint",
  className,
  ...props
}: WetPaintButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative inline-flex items-center justify-center">
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

        {/* Drip effects with framer-motion animations */}
        <Drip left="15%" delay={0} duration={1.5} width={8} height={24} />
        <Drip left="35%" delay={0.3} duration={2} width={6} height={18} />
        <Drip left="55%" delay={0.6} duration={1.8} width={10} height={28} />
        <Drip left="75%" delay={0.2} duration={2.2} width={7} height={20} />
        <Drip left="90%" delay={0.9} duration={1.6} width={5} height={16} />
      </button>
    </div>
  );
};

// Drip component with animated dripping paint effect
const Drip = ({ left, delay, duration, width, height }: DripProps) => {
  return (
    <motion.div
      className="absolute top-full origin-top z-10"
      style={{ left }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0], scaleY: [0, 1, 1.2, 1] }}
      transition={{ duration: 4, times: [0, 0.1, 0.8, 1], delay, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 }}
    >
      <div className="bg-accent" style={{ width, height, borderRadius: \`0 0 \${width}px \${width}px\` }} />
      {/* Falling droplet */}
      <motion.div
        className="absolute left-1/2 top-full -translate-x-1/2"
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: [0, 40], opacity: [1, 0] }}
        transition={{ duration, times: [0, 1], delay, ease: "easeIn", repeat: Infinity, repeatDelay: 2 }}
      >
        <div className="bg-accent rounded-full" style={{ width: width * 0.6, height: width * 0.6 }} />
      </motion.div>
    </motion.div>
  );
};`, []);

  const handleCopy = (text: string, type: "usage" | "component") => {
    navigator.clipboard.writeText(text);
    if (type === "usage") {
      setCopiedUsage(true);
      setTimeout(() => setCopiedUsage(false), 2000);
    } else {
      setCopiedComponent(true);
      setTimeout(() => setCopiedComponent(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col -m-8 lg:-m-12">
      {/* Header */}
      <div className="shrink-0 p-6 lg:p-10 pb-4 lg:pb-5 space-y-3">
        <div className="flex flex-col lg:flex-row items-center gap-4 text-center lg:text-left">
          <Link href="/components/buttons" className="p-2 rounded-lg hover:bg-secondary transition-colors self-center lg:self-auto">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="p-3 bg-accent/10 border border-accent/20 rounded-2xl text-accent">
            <Droplets className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl lg:text-6xl font-black italic tracking-tighter uppercase leading-[0.8]">
              WET <span className="text-accent">PAINT</span>
            </h1>
            <p className="text-muted-foreground text-xs font-mono tracking-[0.2em] uppercase mt-1">
              Dripping Paint Effect
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 p-1 bg-muted rounded-lg w-fit mx-auto lg:mx-0">
          <Button
            variant={activeTab === "preview" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("preview")}
            className="text-[10px] uppercase tracking-widest font-bold cursor-pointer"
          >
            Preview
          </Button>
          <Button
            variant={activeTab === "code" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("code")}
            className="text-[10px] uppercase tracking-widest font-bold cursor-pointer"
          >
            Code
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "preview" ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col lg:flex-row lg:overflow-hidden px-6 lg:px-10 pb-6 lg:pb-10 gap-6"
          >
            {/* Controls */}
            <div className="order-2 lg:order-1 w-full lg:w-[320px] shrink-0 lg:overflow-y-auto space-y-4">
              <Card>
                <CardHeader className="py-3 px-4">
                  <CardTitle className="flex items-center gap-2 text-xs">
                    <Palette className="w-4 h-4 text-accent" />
                    Button Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-4 pb-4">
                  <div className="space-y-2">
                    <Label className="text-xs">Button Text</Label>
                    <input
                      type="text"
                      value={buttonText}
                      onChange={(e) => setButtonText(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-amber-500/30 bg-amber-500/5">
                <CardContent className="py-3 px-4">
                  <div className="flex items-center gap-2 text-xs">
                    <Terminal className="w-4 h-4 text-amber-500" />
                    <span className="text-amber-500 font-semibold">Dependencies:</span>
                  </div>
                  <code className="block bg-amber-500/10 px-3 py-2 rounded text-xs text-amber-500 mt-2 font-mono">
                    framer-motion
                  </code>
                </CardContent>
              </Card>
            </div>

            {/* Preview */}
            <div className="order-1 lg:order-2 flex-1 flex flex-col min-h-[400px] lg:min-h-0">
              <div className="flex-1 relative rounded-xl border border-border overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-muted/50 via-background to-background">
                <div className="absolute inset-0 flex items-center justify-center">
                  <WetPaintButton>{buttonText}</WetPaintButton>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="code"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 overflow-auto px-6 lg:px-10 pb-6 lg:pb-10"
          >
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Tab selector for code */}
              <div className="flex items-center gap-1 p-1 bg-muted rounded-lg w-fit">
                <Button
                  variant={codeTab === "usage" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCodeTab("usage")}
                  className="text-[9px] uppercase cursor-pointer"
                >
                  <Play className="w-3 h-3 mr-1" />
                  Usage
                </Button>
                <Button
                  variant={codeTab === "component" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCodeTab("component")}
                  className="text-[9px] uppercase cursor-pointer"
                >
                  <FileCode className="w-3 h-3 mr-1" />
                  Component
                </Button>
              </div>

              {/* Code display */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
                  <CardTitle className="flex items-center gap-2 text-xs">
                    {codeTab === "usage" ? (
                      <Play className="w-4 h-4 text-accent" />
                    ) : (
                      <FileCode className="w-4 h-4 text-muted-foreground" />
                    )}
                    {codeTab === "usage" ? "Usage Example" : "WetPaintButton.tsx"}
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => handleCopy(codeTab === "usage" ? USAGE_CODE : COMPONENT_CODE, codeTab)}
                  >
                    {codeTab === "usage" ? (
                      copiedUsage ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />
                    ) : (
                      copiedComponent ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />
                    )}
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <Highlight
                    theme={isDark ? themes.nightOwl : themes.github}
                    code={codeTab === "usage" ? USAGE_CODE : COMPONENT_CODE}
                    language="tsx"
                  >
                    {({ style, tokens, getLineProps, getTokenProps }) => (
                      <pre
                        className="p-4 text-xs font-mono overflow-x-auto rounded-b-lg"
                        style={{ ...style, background: isDark ? "#0d1117" : "#f6f8fa" }}
                      >
                        {tokens.map((line, i) => (
                          <div key={i} {...getLineProps({ line })}>
                            <span className="inline-block w-6 text-right mr-4 text-muted-foreground/40 select-none text-[10px]">
                              {i + 1}
                            </span>
                            {line.map((token, key) => (
                              <span key={key} {...getTokenProps({ token })} />
                            ))}
                          </div>
                        ))}
                      </pre>
                    )}
                  </Highlight>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
