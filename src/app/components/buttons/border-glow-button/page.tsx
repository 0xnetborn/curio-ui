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
import BorderGlowButton from "@/registry/buttons/border-glow-button";

const COMPONENT_CODE = `"use client";

import React, { useEffect, useRef, useState } from 'react';

const BorderGlowButton = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: '-100%', y: '-100%' });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x: \\\`\${x}px\\\`, y: \\\`\${y}px\\\` });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <button
      className="relative overflow-hidden rounded-lg bg-[#e5e7eb] transform transition-transform ease-in-out active:scale-90 cursor-pointer"
      ref={ref}
    >
      <span
        className="absolute z-0 h-28 w-28 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(#14B8A6_0%,transparent_70%)]"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />
      <div className="relative z-10 m-[1px] rounded-[calc(0.5rem-1px)] bg-white/90 px-4 py-1 text-xs text-[#14B8A6] backdrop-blur-sm">
        CurioUI
      </div>
    </button>
  );
};

export default BorderGlowButton;`;

const USAGE_CODE = `import BorderGlowButton from "@/registry/buttons/border-glow-button";

<BorderGlowButton />`;

export default function BorderGlowButtonPage() {
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
              BORDER <span className="text-accent">GLOW</span>
            </h1>
            <p className="text-muted-foreground text-xs font-mono tracking-[0.2em] uppercase mt-1">
              Mouse-Tracking Glow
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
              <div className="flex-1 relative rounded-xl border border-border overflow-hidden bg-slate-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BorderGlowButton />
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
                    {codeTab === "usage" ? "Usage Example" : "BorderGlowButton.tsx"}
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={handleCopy}
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <Highlight
                    theme={themes.github}
                    code={codeTab === "usage" ? USAGE_CODE : COMPONENT_CODE}
                    language="tsx"
                  >
                    {({ style, tokens, getLineProps, getTokenProps }) => (
                      <pre
                        className="p-4 text-xs font-mono overflow-x-auto rounded-b-lg"
                        style={{ ...style, background: "#f6f8fa" }}
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
