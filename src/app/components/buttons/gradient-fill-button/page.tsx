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
  ArrowUp,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GradientFillButton from "@/registry/buttons/gradient-fill-button";

const COMPONENT_CODE = `"use client";

import React from "react";

interface GradientFillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
}

const GradientFillButton = ({
  children = "Gradient Fill",
  className = "",
  gradientFrom = "#14B8A6",
  gradientTo = "#3B82F6",
  ...props
}: GradientFillButtonProps) => {
  return (
    <button
      className={\\\`relative overflow-hidden rounded-lg bg-slate-900 px-6 py-2.5 font-semibold text-white transition-all hover:shadow-lg \${className}\\\`}
      {...props}
    >
      <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-[\${gradientFrom}] to-[\${gradientTo}] transition-transform duration-300 ease-in-out hover:translate-y-0" />
      <span className="relative">{children}</span>
    </button>
  );
};

export default GradientFillButton;`;

const USAGE_CODE = `import GradientFillButton from "@/registry/buttons/gradient-fill-button";

<GradientFillButton>Gradient Fill</GradientFillButton>`;

export default function GradientFillButtonPage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

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
          <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl">
            <ArrowUp className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl lg:text-6xl font-black italic tracking-tighter uppercase leading-[0.8]">
              GRADIENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">FILL</span>
            </h1>
            <p className="text-muted-foreground text-xs font-mono tracking-[0.2em] uppercase mt-1">
              Gradient Fill from Bottom
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 p-1 bg-muted rounded-lg w-fit mx-auto lg:mx-0">
          <Button variant={activeTab === "preview" ? "default" : "ghost"} size="sm" onClick={() => setActiveTab("preview")} className="text-[10px] uppercase tracking-widest font-bold cursor-pointer">
            <Play className="w-3 h-3 mr-1" />Preview
          </Button>
          <Button variant={activeTab === "code" ? "default" : "ghost"} size="sm" onClick={() => setActiveTab("code")} className="text-[10px] uppercase tracking-widest font-bold cursor-pointer">
            <FileCode className="w-3 h-3 mr-1" />Code
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "preview" ? (
          <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col lg:flex-row lg:overflow-hidden px-6 lg:px-10 pb-6 lg:pb-10 gap-6">
            <div className="flex-1 flex flex-col min-h-[400px] lg:min-h-0">
              <div className="flex-1 relative rounded-xl border border-border overflow-hidden bg-slate-950">
                <div className="absolute inset-0 flex items-center justify-center">
                  <GradientFillButton>Gradient Fill</GradientFillButton>
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
                    {codeTab === "usage" ? <Play className="w-4 h-4 text-cyan-500" /> : <FileCode className="w-4 h-4 text-muted-foreground" />}
                    {codeTab === "usage" ? "Usage Example" : "GradientFillButton.tsx"}
                  </CardTitle>
                  <Button variant="outline" size="icon-sm" onClick={handleCopy}>
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
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
