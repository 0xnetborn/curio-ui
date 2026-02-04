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
import { cn } from "@/lib/utils";

export default function WetButtonPage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [codeTab, setCodeTab] = useState<"usage" | "component">("usage");
  const [copiedUsage, setCopiedUsage] = useState(false);
  const [copiedComponent, setCopiedComponent] = useState(false);
  const [buttonText, setButtonText] = useState("Wet Paint Button");

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

const Example = () => {
  return (
    <div className="grid min-h-[200px] place-content-center bg-slate-900 p-4">
      <WetPaintButton />
    </div>
  );
};

const WetPaintButton = () => {
  return (
    <button className="group relative rounded bg-violet-500 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-violet-600">
      Wet Paint Button
      <Drip left="10%" height={24} delay={0.5} />
      <Drip left="30%" height={20} delay={3} />
      <Drip left="57%" height={10} delay={4.25} />
      <Drip left="85%" height={16} delay={1.5} />
    </button>
  );
};

interface DripProps {
  left: string;
  height: number;
  delay: number;
}

const Drip = ({ left, height, delay }: DripProps) => {
  const clipId = \`clip-\${Math.random().toString(36).substr(2, 9)}\`;
  
  return (
    <motion.div
      className="absolute top-[99%] origin-top"
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
      <div
        style={{ height }}
        className="w-2 rounded-b-full bg-violet-500 transition-colors group-hover:bg-violet-600"
      />
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-full top-0"
      >
        <g clipPath={\`url(#\${clipId}-left)\`}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
            className="fill-violet-500 transition-colors group-hover:bg-violet-600"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
            className="fill-violet-500 transition-colors group-hover:bg-violet-600"
          />
        </g>
        <defs>
          <clipPath id={\`\${clipId}-left\`}>
            <rect width="6" height="6" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-full top-0 rotate-90"
      >
        <g clipPath={\`url(#\${clipId}-right)\`}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
            className="fill-violet-500 transition-colors group-hover:bg-violet-600"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
            className="fill-violet-500 transition-colors group-hover:bg-violet-600"
          />
        </g>
        <defs>
          <clipPath id={\`\${clipId}-right\`}>
            <rect width="6" height="6" fill="white" />
          </clipPath>
        </defs>
      </svg>
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
        className="absolute top-full h-2 w-2 rounded-full bg-violet-500 transition-colors group-hover:bg-violet-600"
      />
    </motion.div>
  );
};

export default Example;`, []);

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

  // Internal WetPaintButton component (violet colors as per hover.dev)
  const WetPaintButton = () => {
    const [drips] = useState([
      { left: "10%", height: 24, delay: 0.5 },
      { left: "30%", height: 20, delay: 3 },
      { left: "57%", height: 10, delay: 4.25 },
      { left: "85%", height: 16, delay: 1.5 },
    ]);

    return (
      <button className="group relative rounded bg-violet-500 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-violet-600">
        {buttonText}
        {drips.map((d, i) => (
          <Drip key={i} left={d.left} height={d.height} delay={d.delay} />
        ))}
      </button>
    );
  };

  const Drip = ({ left, height, delay }: DripProps) => {
    const clipId = `clip-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <motion.div
        className="absolute top-[99%] origin-top"
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
        <div
          style={{ height }}
          className="w-2 rounded-b-full bg-violet-500 transition-colors group-hover:bg-violet-600"
        />
        <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-full top-0">
          <g clipPath={`url(#${clipId}-left)`}>
            <path fillRule="evenodd" clipRule="evenodd" d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z" className="fill-violet-500" />
          </g>
          <defs><clipPath id={`${clipId}-left`}><rect width="6" height="6" fill="white" /></clipPath></defs>
        </svg>
        <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-full top-0 rotate-90">
          <g clipPath={`url(#${clipId}-right)`}>
            <path fillRule="evenodd" clipRule="evenodd" d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z" className="fill-violet-500" />
          </g>
          <defs><clipPath id={`${clipId}-right`}><rect width="6" height="6" fill="white" /></clipPath></defs>
        </svg>
        <motion.div
          initial={{ y: -8, opacity: 1 }}
          animate={{ y: [-8, 50], opacity: [1, 0] }}
          transition={{ duration: 2, times: [0, 1], delay, ease: "easeIn", repeat: Infinity, repeatDelay: 2 }}
          className="absolute top-full h-2 w-2 rounded-full bg-violet-500"
        />
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col -m-8 lg:-m-12">
      {/* Header */}
      <div className="shrink-0 p-6 lg:p-10 pb-4 lg:pb-5 space-y-3">
        <div className="flex flex-col lg:flex-row items-center gap-4 text-center lg:text-left">
          <Link href="/components/buttons" className="p-2 rounded-lg hover:bg-secondary transition-colors self-center lg:self-auto">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-2xl text-violet-500">
            <Droplets className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl lg:text-6xl font-black italic tracking-tighter uppercase leading-[0.8]">
              WET <span className="text-violet-500">PAINT</span>
            </h1>
            <p className="text-muted-foreground text-xs font-mono tracking-[0.2em] uppercase mt-1">
              Dripping Paint Effect
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 p-1 bg-muted rounded-lg w-fit mx-auto lg:mx-0">
          <Button variant={activeTab === "preview" ? "default" : "ghost"} size="sm" onClick={() => setActiveTab("preview")} className="text-[10px] uppercase tracking-widest font-bold cursor-pointer">
            Preview
          </Button>
          <Button variant={activeTab === "code" ? "default" : "ghost"} size="sm" onClick={() => setActiveTab("code")} className="text-[10px] uppercase tracking-widest font-bold cursor-pointer">
            Code
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "preview" ? (
          <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col lg:flex-row lg:overflow-hidden px-6 lg:px-10 pb-6 lg:pb-10 gap-6">
            {/* Controls */}
            <div className="order-2 lg:order-1 w-full lg:w-[320px] shrink-0 lg:overflow-y-auto space-y-4">
              <Card>
                <CardHeader className="py-3 px-4">
                  <CardTitle className="flex items-center gap-2 text-xs">
                    <Palette className="w-4 h-4 text-violet-500" />
                    Button Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-4 pb-4">
                  <div className="space-y-2">
                    <Label className="text-xs">Button Text</Label>
                    <input type="text" value={buttonText} onChange={(e) => setButtonText(e.target.value)} className="w-full px-3 py-2 text-sm bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-violet-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-amber-500/30 bg-amber-500/5">
                <CardContent className="py-3 px-4">
                  <div className="flex items-center gap-2 text-xs">
                    <Terminal className="w-4 h-4 text-amber-500" />
                    <span className="text-amber-500 font-semibold">Dependencies:</span>
                  </div>
                  <code className="block bg-amber-500/10 px-3 py-2 rounded text-xs text-amber-500 mt-2 font-mono">framer-motion</code>
                </CardContent>
              </Card>
            </div>

            {/* Preview */}
            <div className="order-1 lg:order-2 flex-1 flex flex-col min-h-[400px] lg:min-h-0">
              <div className="flex-1 relative rounded-xl border border-border overflow-hidden bg-slate-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <WetPaintButton />
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="code" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 overflow-auto px-6 lg:px-10 pb-6 lg:pb-10">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center gap-1 p-1 bg-muted rounded-lg w-fit">
                <Button variant={codeTab === "usage" ? "default" : "ghost"} size="sm" onClick={() => setCodeTab("usage")} className="text-[9px] uppercase cursor-pointer">
                  <Play className="w-3 h-3 mr-1" />Usage
                </Button>
                <Button variant={codeTab === "component" ? "default" : "ghost"} size="sm" onClick={() => setCodeTab("component")} className="text-[9px] uppercase cursor-pointer">
                  <FileCode className="w-3 h-3 mr-1" />Component
                </Button>
              </div>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
                  <CardTitle className="flex items-center gap-2 text-xs">
                    {codeTab === "usage" ? <Play className="w-4 h-4 text-violet-500" /> : <FileCode className="w-4 h-4 text-muted-foreground" />}
                    {codeTab === "usage" ? "Usage Example" : "WetPaintButton.tsx"}
                  </CardTitle>
                  <Button variant="outline" size="icon-sm" onClick={() => handleCopy(codeTab === "usage" ? USAGE_CODE : COMPONENT_CODE, codeTab)}>
                    {(codeTab === "usage" ? copiedUsage : copiedComponent) ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <Highlight theme={isDark ? themes.nightOwl : themes.github} code={codeTab === "usage" ? USAGE_CODE : COMPONENT_CODE} language="tsx">
                    {({ style, tokens, getLineProps, getTokenProps }) => (
                      <pre className="p-4 text-xs font-mono overflow-x-auto rounded-b-lg" style={{ ...style, background: isDark ? "#0d1117" : "#f6f8fa" }}>
                        {tokens.map((line, i) => (
                          <div key={i} {...getLineProps({ line })}>
                            <span className="inline-block w-6 text-right mr-4 text-muted-foreground/40 select-none text-[10px]">{i + 1}</span>
                            {line.map((token, key) => (<span key={key} {...getTokenProps({ token })} />))}
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

interface DripProps {
  left: string;
  height: number;
  delay: number;
}
