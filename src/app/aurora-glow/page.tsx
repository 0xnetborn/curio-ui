"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
    Layers, Heart, Copy, Check, ChevronDown, ChevronUp,
    Play
} from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import { AuroraGlow } from "@/registry/backgrounds";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Full component source code (abbreviated for display)
const COMPONENT_CODE = `"use client";

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export interface AuroraGlowProps {
  primaryColor?: string;
  secondaryColor?: string;
  intensity?: number;
  rotationSpeed?: number;
  interactive?: boolean;
  className?: string;
  glowAmount?: number;
  pillarWidth?: number;
  pillarHeight?: number;
  noiseIntensity?: number;
  mixBlendMode?: React.CSSProperties['mixBlendMode'];
  pillarRotation?: number;
  quality?: 'low' | 'medium' | 'high';
}

export const AuroraGlow: React.FC<AuroraGlowProps> = ({
  primaryColor = '#14B8A6',
  secondaryColor = '#0D9488',
  intensity = 1.0,
  rotationSpeed = 0.3,
  interactive = false,
  // ... props
}) => {
  // Three.js WebGL raymarching shader implementation
  // with ethereal light pillar effect
  
  // Full implementation includes:
  // - WebGL renderer setup
  // - Custom fragment shader with raymarching
  // - Mouse interaction
  // - Responsive resize handling
  // - Performance optimization with quality presets
};

export default AuroraGlow;`;

export default function AuroraGlowPage() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    // Controls
    const [primaryColor, setPrimaryColor] = useState("#14B8A6");
    const [secondaryColor, setSecondaryColor] = useState("#0D9488");
    const [intensity, setIntensity] = useState(1);
    const [rotationSpeed, setRotationSpeed] = useState(0.3);
    const [interactive, setInteractive] = useState(true);
    const [glowAmount, setGlowAmount] = useState(0.005);
    const [pillarWidth, setPillarWidth] = useState(3);
    const [pillarHeight, setPillarHeight] = useState(0.4);
    const [noiseIntensity, setNoiseIntensity] = useState(0.5);
    const [pillarRotation, setPillarRotation] = useState(25);
    const [quality, setQuality] = useState<"low" | "medium" | "high">("high");
    const [showDemoContent, setShowDemoContent] = useState(true);

    // UI state
    const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
    const [copiedUsage, setCopiedUsage] = useState(false);
    const [copiedComponent, setCopiedComponent] = useState(false);
    const [codeExpanded, setCodeExpanded] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    // Dynamic usage code
    const USAGE_CODE = useMemo(() => `import { AuroraGlow } from "@/registry/backgrounds";

export default function Hero() {
  return (
    <div className="relative h-screen">
      <AuroraGlow
        primaryColor="${primaryColor}"
        secondaryColor="${secondaryColor}"
        intensity={${intensity}}
        rotationSpeed={${rotationSpeed.toFixed(1)}}
        pillarWidth={${pillarWidth}}
        pillarHeight={${pillarHeight.toFixed(1)}}
        glowAmount={${glowAmount.toFixed(3)}}
        noiseIntensity={${noiseIntensity.toFixed(1)}}
        pillarRotation={${pillarRotation}}
        quality="${quality}"
        interactive={${interactive}}
      />
      <div className="relative z-10">
        {/* Your content here */}
      </div>
    </div>
  );
}`, [primaryColor, secondaryColor, intensity, rotationSpeed, pillarWidth, pillarHeight, glowAmount, noiseIntensity, pillarRotation, quality, interactive]);

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
                        <Layers className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-4xl lg:text-6xl font-black italic tracking-tighter uppercase leading-[0.8]">
                            AURORA <span className="text-accent">GLOW</span>
                        </h1>
                        <p className="text-muted-foreground text-xs font-mono tracking-[0.2em] uppercase mt-1">
                            Ethereal Light Pillar Effect
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
                            {/* Dependencies */}
                            <Card className="border-amber-500/30 bg-amber-500/5">
                                <CardContent className="py-3 px-4">
                                    <div className="flex items-center gap-2 text-xs">
                                        <span className="text-amber-500 font-semibold">Dependencies:</span>
                                        <code className="bg-amber-500/10 px-2 py-0.5 rounded text-amber-500">npm install three</code>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="py-3 px-4">
                                    <CardTitle className="flex items-center gap-2 text-xs">
                                        Colors
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 px-4 pb-4">
                                    <div className="space-y-1">
                                        <Label className="text-xs">Primary Color</Label>
                                        <div className="flex items-center gap-2">
                                            <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent border border-border" />
                                            <span className="text-xs font-mono text-muted-foreground">{primaryColor}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Secondary Color</Label>
                                        <div className="flex items-center gap-2">
                                            <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent border border-border" />
                                            <span className="text-xs font-mono text-muted-foreground">{secondaryColor}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="py-3 px-4">
                                    <CardTitle className="flex items-center gap-2 text-xs">
                                        Effect Settings
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 px-4 pb-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <Label>Intensity</Label>
                                            <span className="font-mono text-accent">{intensity.toFixed(1)}</span>
                                        </div>
                                        <Slider value={[intensity]} onValueChange={(v) => setIntensity(v[0])} min={0.1} max={2} step={0.1} />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <Label>Rotation Speed</Label>
                                            <span className="font-mono text-accent">{rotationSpeed.toFixed(1)}</span>
                                        </div>
                                        <Slider value={[rotationSpeed]} onValueChange={(v) => setRotationSpeed(v[0])} min={0} max={1} step={0.1} />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <Label>Glow Amount</Label>
                                            <span className="font-mono text-accent">{glowAmount.toFixed(3)}</span>
                                        </div>
                                        <Slider value={[glowAmount]} onValueChange={(v) => setGlowAmount(v[0])} min={0.001} max={0.02} step={0.001} />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <Label>Pillar Width</Label>
                                            <span className="font-mono text-accent">{pillarWidth}</span>
                                        </div>
                                        <Slider value={[pillarWidth]} onValueChange={(v) => setPillarWidth(v[0])} min={1} max={6} step={0.5} />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <Label>Pillar Height</Label>
                                            <span className="font-mono text-accent">{pillarHeight.toFixed(1)}</span>
                                        </div>
                                        <Slider value={[pillarHeight]} onValueChange={(v) => setPillarHeight(v[0])} min={0.1} max={1} step={0.1} />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <Label>Noise Intensity</Label>
                                            <span className="font-mono text-accent">{noiseIntensity.toFixed(1)}</span>
                                        </div>
                                        <Slider value={[noiseIntensity]} onValueChange={(v) => setNoiseIntensity(v[0])} min={0} max={1} step={0.1} />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <Label>Pillar Rotation</Label>
                                            <span className="font-mono text-accent">{pillarRotation}°</span>
                                        </div>
                                        <Slider value={[pillarRotation]} onValueChange={(v) => setPillarRotation(v[0])} min={0} max={360} step={5} />
                                    </div>

                                    <div className="flex items-center justify-between py-2">
                                        <Label className="text-xs">Interactive</Label>
                                        <Switch checked={interactive} onCheckedChange={setInteractive} />
                                    </div>

                                    <div className="space-y-1">
                                        <Label className="text-xs">Quality</Label>
                                        <div className="flex gap-1">
                                            {(["low", "medium", "high"] as const).map((q) => (
                                                <Button
                                                    key={q}
                                                    variant={quality === q ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => setQuality(q)}
                                                    className="flex-1 text-[9px] uppercase"
                                                >
                                                    {q}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Preview */}
                        <div className="order-1 lg:order-2 flex-1 flex flex-col min-h-[400px] lg:min-h-0">
                            <div className="flex-1 relative rounded-xl border border-border overflow-hidden bg-black">
                                <AuroraGlow
                                    primaryColor={primaryColor}
                                    secondaryColor={secondaryColor}
                                    intensity={intensity}
                                    rotationSpeed={rotationSpeed}
                                    interactive={interactive}
                                    glowAmount={glowAmount}
                                    pillarWidth={pillarWidth}
                                    pillarHeight={pillarHeight}
                                    noiseIntensity={noiseIntensity}
                                    pillarRotation={pillarRotation}
                                    quality={quality}
                                    mixBlendMode="screen"
                                />

                                {/* Demo Content */}
                                {showDemoContent && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-6 text-center"
                                        >
                                            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-accent/20 text-accent rounded-full">
                                                New Background
                                            </span>
                                            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg">
                                                Ethereal light pillar for<br />your hero sections.
                                            </h2>
                                            <div className="flex gap-3 justify-center">
                                                <Button className="bg-white text-black hover:bg-white/90">
                                                    Get Started
                                                </Button>
                                                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                                                    Learn More
                                                </Button>
                                            </div>
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
                        {/* Dependencies */}
                        <Card className="border-amber-500/30 bg-amber-500/5">
                            <CardContent className="py-4 px-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-amber-500">
                                        <Play className="w-4 h-4" />
                                        Install Dependencies
                                    </div>
                                    <code className="block bg-black/30 px-4 py-2 rounded text-sm text-white/90 font-mono">
                                        npm install three @types/three
                                    </code>
                                </div>
                            </CardContent>
                        </Card>

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
                                        {codeExpanded ? "Collapse Snippet" : "Expand Snippet"}
                                        {codeExpanded ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="relative">
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
                                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent pointer-events-none" />
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
