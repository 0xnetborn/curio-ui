"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Highlight, themes } from "prism-react-renderer";
import {
  ArrowLeft,
  Copy,
  Check,
  Play,
  FileCode,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WetPaintButton from "@/registry/buttons/wet-paint-button";

const COMPONENT_CODE = `"use client";

import { motion } from "framer-motion";

const WetPaintButton = () => {
  return (
    <button className="group relative rounded bg-accent px-4 py-2.5 font-semibold text-white transition-colors hover:bg-accent/90 cursor-pointer">
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
        className="w-2 rounded-b-full bg-accent transition-colors group-hover:bg-accent/90"
      />
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-full top-0"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
          className="fill-accent transition-colors group-hover:bg-accent/90"
        />
      </svg>
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-full top-0 rotate-90"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
          className="fill-accent transition-colors group-hover:bg-accent/90"
        />
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
        className="absolute top-full h-2 w-2 rounded-full bg-accent transition-colors group-hover:bg-accent/90"
      />
    </motion.div>
  );
};

export default WetPaintButton;`;

const USAGE_CODE = `import WetPaintButton from "@/registry/buttons/wet-paint-button";

<WetPaintButton />`;

export default function WetButtonPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [codeTab, setCodeTab] = useState<"usage" | "component">("usage");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeTab === "usage" ? USAGE_CODE : COMPONENT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col -m-8 lg:-m-12">
      {/* Header */}
      <div className="shrink-0 p-6 lg:p-10 pb-4 lg:pb-5 space-y-3">
        <div className="flex flex-col lg:flex-row items-center gap-4 text-center lg:text-left">
          <Link href="/components/buttons" className="p-2 rounded-lg hover:bg-secondary transition-colors self-center lg:self-auto">
            <ArrowLeft className="w-5 h-5" />
          </Link>
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
        <div className="flex items-center gap-1 p-1 bg-secondary rounded-lg w-fit mx-auto lg:mx-0">
          <Button
            variant={activeTab === "preview" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("preview")}
            className="text-[10px] uppercase tracking-widest font-bold cursor-pointer"
          >
            <Play className="w-3 h-3 mr-1" />
            Preview
          </Button>
          <Button
            variant={activeTab === "code" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("code")}
            className="text-[10px] uppercase tracking-widest font-bold cursor-pointer"
          >
            <FileCode className="w-3 h-3 mr-1" />
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
            {/* Preview */}
            <div className="flex-1 flex flex-col min-h-[400px] lg:min-h-0">
              <div className="flex-1 relative rounded-xl border border-border overflow-hidden bg-background">
                <div className="absolute inset-0 flex items-center justify-center">
                  <WetPaintButton />
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
              <div className="flex items-center gap-1 p-1 bg-secondary rounded-lg w-fit">
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
              <Card className="bg-slate-900/50 border-border">
                <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b border-border">
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
                    onClick={handleCopy}
                    className="cursor-pointer"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <Highlight
                    theme={themes.nightOwl}
                    code={codeTab === "usage" ? USAGE_CODE : COMPONENT_CODE}
                    language="tsx"
                  >
                    {({ style, tokens, getLineProps, getTokenProps }) => (
                      <pre
                        className="p-4 text-xs font-mono overflow-x-auto rounded-b-lg"
                        style={{ ...style, background: "#0d1117" }}
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
