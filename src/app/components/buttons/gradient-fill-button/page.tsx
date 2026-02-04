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
import GradientFillButton from "@/registry/buttons/gradient-fill-button";

const COMPONENT_CODE = `"use client";

import React from "react";

const GradientFillButton = () => {
  return (
    <button className="group/button relative overflow-hidden rounded-md border border-accent/20 bg-white px-4 py-1 text-xs font-medium text-accent transition-all duration-150 hover:border-accent active:scale-95 cursor-pointer">
      <span className="absolute bottom-0 left-0 z-0 h-0 w-full bg-gradient-to-t from-accent to-accent-foreground transition-all duration-500 group-hover/button:h-full"></span>
      <span className="relative z-10 transition-all duration-500 group-hover/button:text-white">CurioUI</span>
    </button>
  )
}

export default GradientFillButton;`;

const USAGE_CODE = `import GradientFillButton from "@/registry/buttons/gradient-fill-button";

<GradientFillButton />`;

export default function GradientFillButtonPage() {
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
              GRADIENT <span className="text-accent">FILL</span>
            </h1>
            <p className="text-muted-foreground text-xs font-mono tracking-[0.2em] uppercase mt-1">
              Gradient Fill from Bottom
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
                  <GradientFillButton />
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
                    {codeTab === "usage" ? "Usage Example" : "GradientFillButton.tsx"}
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
