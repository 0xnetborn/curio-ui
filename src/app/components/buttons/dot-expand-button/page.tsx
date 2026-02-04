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
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import DotExpandButton from "@/registry/buttons/dot-expand-button";

export default function DotExpandButtonPage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [codeTab, setCodeTab] = useState<"usage" | "component">("usage");
  const [copiedUsage, setCopiedUsage] = useState(false);
  const [copiedComponent, setCopiedComponent] = useState(false);
  const [buttonText, setButtonText] = useState("Hover this link");

  const USAGE_CODE = useMemo(() => `import DotExpandButton from "@/registry/buttons/dot-expand-button";

export default function MyPage() {
  return (
    <DotExpandButton>
      ${buttonText}
    </DotExpandButton>
  );
}`, [buttonText]);

  const COMPONENT_CODE = useMemo(() => `"use client";

import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

interface DotExpandButtonProps {
  children?: React.ReactNode;
  className?: string;
}

const DotExpandButton = ({
  children = "Hover this link",
  className = "",
}: DotExpandButtonProps) => {
  return (
    <div className={\\\`grid place-content-center py-24 \${className}\\\`}>
      <button className="group flex h-10 items-center gap-2 rounded-full bg-neutral-200 pl-3 pr-4 transition-all duration-300 ease-in-out hover:bg-black hover:pl-2 hover:text-white active:bg-neutral-700">
        <span className="rounded-full bg-black p-1 text-sm transition-colors duration-300 group-hover:bg-white">
          <FiArrowRight className="-translate-x-[200%] text-[0px] transition-all duration-300 group-hover:translate-x-0 group-hover:text-lg group-hover:text-black group-active:-rotate-45" />
        </span>
        <span>{children}</span>
      </button>
    </div>
  );
};

export default DotExpandButton;`, []);

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
          <div className="p-3 bg-neutral-200 dark:bg-neutral-800 rounded-2xl">
            <ArrowRight className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl lg:text-6xl font-black italic tracking-tighter uppercase leading-[0.8]">
              DOT <span className="text-neutral-600 dark:text-neutral-400">EXPAND</span>
            </h1>
            <p className="text-muted-foreground text-xs font-mono tracking-[0.2em] uppercase mt-1">
              Icon Expands on Hover
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
                    <Palette className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                    Button Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-4 pb-4">
                  <div className="space-y-2">
                    <Label className="text-xs">Button Text</Label>
                    <input type="text" value={buttonText} onChange={(e) => setButtonText(e.target.value)} className="w-full px-3 py-2 text-sm bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-neutral-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-amber-500/30 bg-amber-500/5">
                <CardContent className="py-3 px-4">
                  <div className="flex items-center gap-2 text-xs">
                    <Terminal className="w-4 h-4 text-amber-500" />
                    <span className="text-amber-500 font-semibold">Dependencies:</span>
                  </div>
                  <code className="block bg-amber-500/10 px-3 py-2 rounded text-xs text-amber-500 mt-2 font-mono">react-icons</code>
                </CardContent>
              </Card>
            </div>

            {/* Preview */}
            <div className="order-1 lg:order-2 flex-1 flex flex-col min-h-[400px] lg:min-h-0">
              <div className="flex-1 relative rounded-xl border border-border overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                <DotExpandButton>{buttonText}</DotExpandButton>
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
                    {codeTab === "usage" ? <Play className="w-4 h-4 text-neutral-600" /> : <FileCode className="w-4 h-4 text-muted-foreground" />}
                    {codeTab === "usage" ? "Usage Example" : "DotExpandButton.tsx"}
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
