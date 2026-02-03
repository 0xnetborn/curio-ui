"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
    MousePointer, Heart, Copy, Check, ChevronDown, ChevronUp,
    Layers, Play
} from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import { GlassSurface } from "@/registry/buttons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Full component source code
const COMPONENT_CODE = `"use client";

import React, { useEffect, useRef, useState, useId } from 'react';

export interface GlassSurfaceProps {
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  backgroundOpacity?: number;
  saturation?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  xChannel?: 'R' | 'G' | 'B';
  yChannel?: 'R' | 'G' | 'B';
  mixBlendMode?: React.CSSProperties['mixBlendMode'];
  className?: string;
  style?: React.CSSProperties;
}

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkDark = () => document.documentElement.classList.contains('dark');
    setIsDark(checkDark());
    const observer = new MutationObserver(() => setIsDark(checkDark()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  return isDark;
};

export const GlassSurface: React.FC<GlassSurfaceProps> = ({
  children,
  width = 200,
  height = 80,
  borderRadius = 20,
  // ... full implementation
}) => {
  // Full SVG filter implementation with chromatic aberration
  // See component source for complete code
};`;

export default function GlassSurfacePage() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    // Controls
    const [borderRadius, setBorderRadius] = useState(20);
    const [brightness, setBrightness] = useState(50);
    const [opacity, setOpacity] = useState(0.93);
    const [distortionScale, setDistortionScale] = useState(-180);
    const [displace, setDisplace] = useState(0.5);
    const [showDemoContent, setShowDemoContent] = useState(true);

    // UI state
    const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
    const [copiedUsage, setCopiedUsage] = useState(false);
    const [copiedComponent, setCopiedComponent] = useState(false);
    const [codeExpanded, setCodeExpanded] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    // Dynamic usage code
    const USAGE_CODE = useMemo(() => `import { GlassSurface } from "@/registry/buttons";

export default function Demo() {
  return (
    <GlassSurface
      width={300}
      height={200}
      borderRadius={${borderRadius}}
      brightness={${brightness}}
      opacity={${opacity.toFixed(2)}}
      distortionScale={${distortionScale}}
      displace={${displace.toFixed(1)}}
      mixBlendMode="screen"
    >
      <h2>Glass Surface Content</h2>
    </GlassSurface>
  );
}`, [borderRadius, brightness, opacity, distortionScale, displace]);

    const handleCopyUsage = () => {
        navigator.clipboard.writeText(USAGE_CODE);
        setCopiedUsage(true);
        setTimeout(() => setCopiedUsage(false), 2000);
    };

    const handleCopyComponent = () => {
        navigator.clipboard.writeText(COMPONENT_CODE);
        setCopiedComponent(true);
        setTimeout(() => setCopiedComponent(false), 2000);
    };

    return (
        <div className="min-h-screen flex flex-col -m-8 lg:-m-12">
            {/* Header */}
            <div className="shrink-0 p-6 lg:p-10 pb-4 lg:pb-5 space-y-3">
                <div className="flex flex-col lg:flex-row items-center gap-4 text-center lg:text-left">
                    <div className="p-3 bg-accent/10 border border-accent/20 rounded-2xl text-accent">
                        <MousePointer className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-4xl lg:text-6xl font-black italic tracking-tighter uppercase leading-[0.8]">
                            GLASS <span className="text-accent">SURFACE</span>
                        </h1>
                        <p className="text-muted-foreground text-xs font-mono tracking-[0.2em] uppercase mt-1">
                            Chromatic Aberration Glassmorphism
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsFavorite(!isFavorite)}
                            className={isFavorite ? "text-red-500" : "text-muted-foreground"}
                        >
                            <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
                        </Button>
                        <span className="px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded">
                            New
                        </span>
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
                    <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col lg:flex-row lg:overflow-hidden px-6 lg:px-10 pb-6 lg:pb-10 gap-6">
                        {/* Controls */}
                        <div className="order-2 lg:order-1 w-full lg:w-[340px] shrink-0 lg:overflow-y-auto custom-scrollbar space-y-4">
                            <Card>
                                <CardHeader className="py-3 px-4">
                                    <CardTitle className="flex items-center gap-2 text-xs">
                                        <Layers className="w-4 h-4 text-accent" />
                                        Customize
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 px-4 pb-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <Label>Border Radius</Label>
                                            <span className="font-mono text-accent">{borderRadius}px</span>
                                        </div>
                                        <Slider value={[borderRadius]} onValueChange={(v) => setBorderRadius(v[0])} min={0} max={50} step={2} />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <Label>Brightness</Label>
                                            <span className="font-mono text-accent">{brightness}%</span>
                                        </div>
                                        <Slider value={[brightness]} onValueChange={(v) => setBrightness(v[0])} min={0} max={100} step={5} />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <Label>Opacity</Label>
                                            <span className="font-mono text-accent">{(opacity * 100).toFixed(0)}%</span>
                                        </div>
                                        <Slider value={[opacity]} onValueChange={(v) => setOpacity(v[0])} min={0.5} max={1} step={0.01} />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <Label>Distortion Scale</Label>
                                            <span className="font-mono text-accent">{distortionScale}</span>
                                        </div>
                                        <Slider value={[distortionScale]} onValueChange={(v) => setDistortionScale(v[0])} min={-300} max={0} step={10} />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <Label>Displacement</Label>
                                            <span className="font-mono text-accent">{displace.toFixed(1)}</span>
                                        </div>
                                        <Slider value={[displace]} onValueChange={(v) => setDisplace(v[0])} min={0} max={2} step={0.1} />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Preview */}
                        <div className="order-1 lg:order-2 flex-1 flex flex-col min-h-[400px] lg:min-h-0">
                            <div className="flex-1 relative rounded-xl border border-border overflow-hidden">
                                {/* Animated gradient background */}
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background: isDark
                                            ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 25%, #312e81 50%, #1e1b4b 75%, #0f172a 100%)'
                                            : 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 25%, #c7d2fe 50%, #e0e7ff 75%, #f0f9ff 100%)',
                                        backgroundSize: '400% 400%',
                                        animation: 'gradientShift 10s ease infinite'
                                    }}
                                />

                                {/* Demo Content */}
                                {showDemoContent && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-6 text-center"
                                        >
                                            <GlassSurface
                                                width={320}
                                                height={200}
                                                borderRadius={borderRadius}
                                                brightness={brightness}
                                                opacity={opacity}
                                                distortionScale={distortionScale}
                                                displace={displace}
                                                mixBlendMode="screen"
                                                className="mx-auto"
                                            >
                                                <div className="text-center space-y-2">
                                                    <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                        Glass Surface
                                                    </h2>
                                                    <p className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                                                        With chromatic aberration
                                                    </p>
                                                </div>
                                            </GlassSurface>
                                        </motion.div>
                                    </div>
                                )}

                                {/* Demo Toggle */}
                                <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 z-20">
                                    <Label className="text-xs text-white/70">Demo Content</Label>
                                    <Switch checked={showDemoContent} onCheckedChange={setShowDemoContent} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div key="code" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 overflow-auto px-6 lg:px-10 pb-6 lg:pb-10 space-y-6">
                        {/* Usage */}
                        <Card>
                            <CardHeader className="py-4 flex flex-row items-center justify-between">
                                <CardTitle className="text-sm">Usage</CardTitle>
                                <Button variant="outline" size="sm" onClick={handleCopyUsage}>
                                    {copiedUsage ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <Highlight theme={isDark ? themes.nightOwl : themes.github} code={USAGE_CODE} language="tsx">
                                    {({ style, tokens, getLineProps, getTokenProps }) => (
                                        <pre
                                            className="text-xs p-4 rounded-lg overflow-auto"
                                            style={{ ...style, background: isDark ? "#1a1a2e" : "#f6f8fa" }}
                                        >
                                            {tokens.map((line, i) => (
                                                <div key={i} {...getLineProps({ line })}>
                                                    <span className="inline-block w-8 text-muted-foreground/50 select-none">{i + 1}</span>
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

                        {/* Component Code - Expandable */}
                        <Card>
                            <CardHeader className="py-4 flex flex-row items-center justify-between">
                                <CardTitle className="text-sm">Component Code</CardTitle>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" onClick={handleCopyComponent}>
                                        {copiedComponent ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCodeExpanded(!codeExpanded)}
                                    >
                                        {codeExpanded ? (
                                            <>Collapse Snippet</>
                                        ) : (
                                            <>Expand Snippet</>
                                        )}
                                        {codeExpanded ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className={`overflow-hidden transition-all duration-300 ${codeExpanded ? "max-h-[800px]" : "max-h-[200px]"}`}>
                                    <Highlight theme={isDark ? themes.nightOwl : themes.github} code={COMPONENT_CODE} language="tsx">
                                        {({ style, tokens, getLineProps, getTokenProps }) => (
                                            <pre
                                                className="text-xs p-4 rounded-lg overflow-auto"
                                                style={{ ...style, background: isDark ? "#1a1a2e" : "#f6f8fa" }}
                                            >
                                                {tokens.map((line, i) => (
                                                    <div key={i} {...getLineProps({ line })}>
                                                        <span className="inline-block w-8 text-muted-foreground/50 select-none">{i + 1}</span>
                                                        {line.map((token, key) => (
                                                            <span key={key} {...getTokenProps({ token })} />
                                                        ))}
                                                    </div>
                                                ))}
                                            </pre>
                                        )}
                                    </Highlight>
                                </div>
                                {!codeExpanded && (
                                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-card to-transparent pointer-events-none" />
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CSS for gradient animation */}
            <style jsx global>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
        </div>
    );
}
