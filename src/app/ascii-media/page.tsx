"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Highlight, themes } from "prism-react-renderer";
import { useTheme } from "next-themes";
import {
  Terminal,
  Copy,
  Check,
  MousePointer2,
  Play,
  FlipHorizontal,
  Layers,
  Type,
  Palette,
  Magnet,
  Layout,
  FileCode,
  Cpu,
  Eye,
} from "lucide-react";
import { AsciiRenderer, DEFAULT_CHARSET } from "@/components/AsciiRenderer";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Custom ToggleGroup
const ToggleGroup = ({ value, onValueChange, options, className = "" }: {
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}) => (
  <div className={`grid gap-1 ${className || `grid-cols-${options.length}`}`}>
    {options.map((option) => (
      <Button
        key={option.value}
        variant={value === option.value ? "default" : "outline"}
        size="sm"
        onClick={() => onValueChange(option.value)}
        className={`text-[9px] font-bold uppercase tracking-wider cursor-pointer ${value === option.value ? "bg-primary text-primary-foreground" : ""}`}
      >
        {option.label}
      </Button>
    ))}
  </div>
);

const getInteractionLabel = (mode: string) => {
  switch (mode) {
    case "repulsion": return "REPULSION";
    case "blackhole": return "BLACKHOLE";
    default: return "REPULSION";
  }
};

export default function AsciiVideoPage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [codeTab, setCodeTab] = useState<"usage" | "component">("usage");
  const [asciiFontSize, setAsciiFontSize] = useState(8);
  const [charset, setCharset] = useState(DEFAULT_CHARSET);
  const [customCharset, setCustomCharset] = useState("");

  // Theme-aware defaults: text opposite of background
  const defaultBgColor = isDark ? "#000000" : "#ffffff";
  const defaultTextColor = isDark ? "#ffffff" : "#000000";
  const [backgroundColor, setBackgroundColor] = useState(defaultBgColor);
  const [color, setColor] = useState(defaultTextColor);
  const [grad1, setGrad1] = useState("#14F195");
  const [grad2, setGrad2] = useState("#9945FF");
  const [enableMouse, setEnableMouse] = useState(true);
  const [renderMode, setRenderMode] = useState<"classic" | "gradient">("classic");
  const [brightness, setBrightness] = useState(1.1);
  const [opacity, setOpacity] = useState(1.0);
  const [invert, setInvert] = useState(false);
  const [useEdges, setUseEdges] = useState(false);
  const [gravity, setGravity] = useState(0.4);
  const [interactionMode, setInteractionMode] = useState<"repulsion" | "blackhole">("repulsion");
  const [gradientType, setGradientType] = useState<"linear" | "radial">("linear");
  const [gradientAngle, setGradientAngle] = useState(135);
  const [showOverlay, setShowOverlay] = useState(false);
  const [copiedUsage, setCopiedUsage] = useState(false);
  const [copiedComponent, setCopiedComponent] = useState(false);

  // Update colors when theme changes
  React.useEffect(() => {
    setBackgroundColor(isDark ? "#000000" : "#ffffff");
    setColor(isDark ? "#ffffff" : "#000000");
  }, [isDark]);

  const activeCharset = customCharset || charset;

  // Generate dynamic usage code with current settings
  const USAGE_CODE = useMemo(() => `import { AsciiRenderer } from "@/components/AsciiRenderer";

export default function MyPage() {
  return (
    <AsciiRenderer 
      videoSrc="/videos/your-video.mp4"
      asciiFontSize={${asciiFontSize}}
      charset="${activeCharset}"
      backgroundColor="${backgroundColor}"
      ${renderMode === "gradient" ? `renderMode="gradient"
      gradientType="${gradientType}"
      gradientColor1="${grad1}"
      gradientColor2="${grad2}"${gradientType === "linear" ? `
      gradientAngle={${gradientAngle}}` : ""}` : `renderMode="classic"
      color="${color}"`}
      brightness={${brightness.toFixed(2)}}
      enableMouseInteraction={${enableMouse}}
      interactionMode="${interactionMode}"
      gravityStrength={${gravity.toFixed(2)}}${invert ? `
      invert={true}` : ""}${useEdges ? `
      useEdges={true}` : ""}
    />
  );
}`, [asciiFontSize, activeCharset, backgroundColor, renderMode, gradientType, grad1, grad2, gradientAngle, color, brightness, enableMouse, interactionMode, gravity, invert, useEdges]);

  // Full component code - inline constant (no fetch needed)
  const FULL_COMPONENT_CODE = `"use client";

import React, { useEffect, useRef, useCallback } from "react";

export interface AsciiRendererProps {
    /** Video source URL */
    videoSrc?: string;
    /** Size of each ASCII character in pixels */
    asciiFontSize?: number;
    /** Character set from darkest to brightest */
    charset?: string;
    /** Optional class name for the container */
    className?: string;
    /** Color of the ASCII characters (Classic mode) */
    color?: string;
    /** Background color (hex) */
    backgroundColor?: string;
    /** First color for gradient mode */
    gradientColor1?: string;
    /** Second color for gradient mode */
    gradientColor2?: string;
    /** Playback speed (0.5 to 2.0) */
    playbackRate?: number;
    /** Mouse interaction enable */
    enableMouseInteraction?: boolean;
    /** Render mode: "classic", "original", or "gradient" */
    renderMode?: "classic" | "original" | "gradient";
    /** Brightness multiplier (0.5 to 2.0) */
    brightness?: number;
    /** Invert character mapping */
    invert?: boolean;
    /** Enable Sobel Edge Detection */
    useEdges?: boolean;
    /** Interaction strength (0.0 to 1.0) */
    gravityStrength?: number;
    /** Interaction mode: "repulsion" | "blackhole" */
    interactionMode?: "repulsion" | "blackhole";
    /** Gradient type: "linear" | "radial" */
    gradientType?: "linear" | "radial";
    /** Gradient angle in degrees (for linear) */
    gradientAngle?: number;
}

export const DEFAULT_CHARSET = " .:-=+*#%@";

/**
 * AsciiRenderer
 * High-performance WebGL-based ASCII media renderer with Gravity Distortion.
 */
export const AsciiRenderer: React.FC<AsciiRendererProps> = ({
    videoSrc = "/videos/nyla_bg_hero.mp4",
    asciiFontSize = 10,
    charset = DEFAULT_CHARSET,
    className = "",
    color = "#32ff9f",
    backgroundColor,
    gradientColor1 = "#32ff9f",
    gradientColor2 = "#32a8ff",
    playbackRate = 1,
    enableMouseInteraction = false,
    renderMode = "classic",
    brightness = 1.0,
    invert = false,
    useEdges = false,
    gravityStrength = 0.0,
    interactionMode = "repulsion",
    gradientType = "linear",
    gradientAngle = 0,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const glRef = useRef<WebGLRenderingContext | null>(null);
    const programRef = useRef<WebGLProgram | null>(null);
    const mousePos = useRef({ x: -1000, y: -1000 });
    const texturesRef = useRef<{ video: WebGLTexture; charset: WebGLTexture } | null>(null);
    const buffersRef = useRef<{ pos: WebGLBuffer; tex: WebGLBuffer } | null>(null);
    const isInitialized = useRef(false);
    const bgColorRef = useRef(backgroundColor || '#000000');
    bgColorRef.current = backgroundColor || '#000000';

    const hexToRgb = useCallback((hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;
        return [r, g, b];
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || isInitialized.current) return;

        const gl = canvas.getContext("webgl", { preserveDrawingBuffer: false, antialias: false });
        if (!gl) return;
        glRef.current = gl;
        isInitialized.current = true;

        // Enable alpha blending so transparent pixels don't overwrite the background
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        const vsSource = \`
      attribute vec2 a_position;
      attribute vec2 a_texCoord;
      varying vec2 v_texCoord;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_texCoord = a_texCoord;
      }
    \`;

        const fsSource = \`
      precision mediump float;
      uniform sampler2D u_video;
      uniform sampler2D u_charset;
      uniform float u_charsetCount;
      uniform vec2 u_resolution;
      uniform float u_charSize;
      uniform vec2 u_mouse;
      uniform float u_enableMouse;
      uniform int u_renderMode;
      uniform vec3 u_color;
      uniform vec3 u_grad1;
      uniform vec3 u_grad2;
      uniform int u_gradientType;
      uniform float u_gradientAngle;
      uniform float u_brightness;
      uniform float u_invert;
      uniform float u_useEdges;
      uniform float u_gravity;
      uniform int u_interactionMode;
      varying vec2 v_texCoord;

      float getLuminance(vec3 color) {
        return dot(color, vec3(0.299, 0.587, 0.114));
      }

      void main() {
        float u_brightness_mod = 1.0;
        float accretionGlow = 0.0;
        vec2 uv = v_texCoord;
        vec2 res = u_resolution;
        vec2 pixel = 1.0 / res;
        
        // --- INTERACTION PHYSICS ---
        if (u_enableMouse > 0.5 && u_gravity > 0.0) {
            float aspect = u_resolution.x / u_resolution.y;
            vec2 mouseUV = u_mouse / res;
            
            vec2 diff = (uv - mouseUV);
            diff.x *= aspect;
            float dist = length(diff);
            
            if (u_interactionMode == 0) { // VORTEX (PULL)
                float influence = pow(smoothstep(0.5, 0.0, dist), 3.0);
                float pull = influence * u_gravity * 0.12;
                uv -= normalize(uv - mouseUV) * pull;
            } else if (u_interactionMode == 1) { // REPULSION (PUSH)
                float influence = pow(smoothstep(0.5, 0.0, dist), 3.0);
                float push = influence * u_gravity * 0.15;
                uv += normalize(uv - mouseUV) * push;
            } else if (u_interactionMode == 2) { // BLACK HOLE
                float rs = 0.08 * u_gravity;
                float photonSphere = rs * 1.5;
                float accretionOuter = rs * 4.0;
                
                float bend = (rs * rs) / (dist * dist + 0.001);
                bend = min(bend, 0.5);
                
                vec2 direction = normalize(diff);
                direction.x /= aspect;
                uv -= direction * bend * 0.3;
                
                float eventHorizonMask = smoothstep(rs * 0.5, rs * 1.2, dist);
                u_brightness_mod = eventHorizonMask;
                
                float innerGlow = smoothstep(rs * 0.8, photonSphere, dist);
                float outerFade = smoothstep(accretionOuter, photonSphere * 1.5, dist);
                accretionGlow = innerGlow * outerFade * 1.5 * u_gravity;
            }
        }

        vec2 charGrid = floor(uv * res / u_charSize);
        vec2 charCoord = (charGrid * u_charSize + u_charSize * 0.5) / res;
        
        vec4 videoColor = texture2D(u_video, vec2(charCoord.x, 1.0 - charCoord.y));
        vec3 rgb = videoColor.rgb * u_brightness * u_brightness_mod;
        float luminance = getLuminance(clamp(rgb, 0.0, 1.0));

        if (u_useEdges > 0.5) {
            float s00 = getLuminance(texture2D(u_video, vec2(charCoord.x - pixel.x, 1.0 - (charCoord.y - pixel.y))).rgb);
            float s01 = getLuminance(texture2D(u_video, vec2(charCoord.x,           1.0 - (charCoord.y - pixel.y))).rgb);
            float s02 = getLuminance(texture2D(u_video, vec2(charCoord.x + pixel.x, 1.0 - (charCoord.y - pixel.y))).rgb);
            float s10 = getLuminance(texture2D(u_video, vec2(charCoord.x - pixel.x, 1.0 - charCoord.y)).rgb);
            float s12 = getLuminance(texture2D(u_video, vec2(charCoord.x + pixel.x, 1.0 - charCoord.y)).rgb);
            float s20 = getLuminance(texture2D(u_video, vec2(charCoord.x - pixel.x, 1.0 - (charCoord.y + pixel.y))).rgb);
            float s21 = getLuminance(texture2D(u_video, vec2(charCoord.x,           1.0 - (charCoord.y + pixel.y))).rgb);
            float s22 = getLuminance(texture2D(u_video, vec2(charCoord.x + pixel.x, 1.0 - (charCoord.y + pixel.y))).rgb);
            float sx = s00 + 2.0*s10 + s20 - (s02 + 2.0*s12 + s22);
            float sy = s00 + 2.0*s01 + s02 - (s20 + 2.0*s21 + s22);
            luminance = clamp(sqrt(sx*sx + sy*sy) * 2.5, 0.0, 1.0);
        }
        
        float distToMouse = distance(v_texCoord * res, u_mouse);
        float mouseGlow = (u_enableMouse > 0.5) ? smoothstep(150.0, 0.0, distToMouse) * 0.3 : 0.0;
        
        float finalLuminance = clamp(luminance + mouseGlow + accretionGlow, 0.0, 1.0);
        if (u_invert > 0.5) finalLuminance = 1.0 - finalLuminance;
        
        float charIndex = floor(finalLuminance * (u_charsetCount - 0.0001));
        vec2 uvInChar = fract(uv * res / u_charSize);
        float atlasX = (charIndex + uvInChar.x) / u_charsetCount;
        float atlasY = 1.0 - uvInChar.y;
        
        vec4 charAlpha = texture2D(u_charset, vec2(atlasX, atlasY));
        
        if (u_renderMode == 2) { // Gradient
           float gFactor = 0.0;
           if (u_gradientType == 0) { // Linear
              float rad = u_gradientAngle * 0.0174533;
              vec2 dir = vec2(cos(rad), sin(rad));
              gFactor = dot(v_texCoord - 0.5, dir) + 0.5;
           } else { // Radial
              gFactor = distance(v_texCoord, vec2(0.5)) * 1.414;
           }
           vec3 gradColor = mix(u_grad1, u_grad2, clamp(gFactor, 0.0, 1.0));
           gl_FragColor = charAlpha * vec4(gradColor * (1.5 + mouseGlow), 1.0);
        } else { // Classic
           gl_FragColor = charAlpha * vec4(u_color * (1.2 + mouseGlow), 1.0);
        }
      }
    \`;

        const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
            const shader = gl.createShader(type)!;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            return shader;
        };

        const program = gl.createProgram()!;
        gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vsSource));
        gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fsSource));
        gl.linkProgram(program);
        programRef.current = program;

        const posBuffer = gl.createBuffer()!;
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

        const texBuffer = gl.createBuffer()!;
        gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]), gl.STATIC_DRAW);
        buffersRef.current = { pos: posBuffer, tex: texBuffer };

        const vTex = gl.createTexture()!;
        gl.bindTexture(gl.TEXTURE_2D, vTex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        const cTex = gl.createTexture()!;
        gl.bindTexture(gl.TEXTURE_2D, cTex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        texturesRef.current = { video: vTex, charset: cTex };

        const resize = () => {
            const parent = canvas.parentElement;
            if (parent && canvas) {
                const dpr = window.devicePixelRatio || 1;
                canvas.width = parent.clientWidth * dpr;
                canvas.height = parent.clientHeight * dpr;
                gl.viewport(0, 0, canvas.width, canvas.height);
            }
        };
        window.addEventListener("resize", resize);
        resize();

        return () => {
            window.removeEventListener("resize", resize);
            isInitialized.current = false;
            if (gl) {
                gl.deleteProgram(program);
                gl.deleteBuffer(posBuffer);
                gl.deleteBuffer(texBuffer);
                gl.deleteTexture(vTex);
                gl.deleteTexture(cTex);
            }
        };
    }, []);

    useEffect(() => {
        const gl = glRef.current;
        if (!gl || !texturesRef.current) return;
        const atlasCanvas = document.createElement("canvas");
        const ctx = atlasCanvas.getContext("2d")!;
        const size = 64;
        atlasCanvas.width = size * charset.length;
        atlasCanvas.height = size;
        ctx.clearRect(0, 0, atlasCanvas.width, atlasCanvas.height);
        ctx.fillStyle = "white";
        ctx.font = \`bold \${size * 0.8}px monospace\`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        for (let i = 0; i < charset.length; i++) {
            ctx.fillText(charset[i], i * size + size / 2, size / 2);
        }
        gl.bindTexture(gl.TEXTURE_2D, texturesRef.current.charset);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlasCanvas);
        if (videoRef.current) videoRef.current.playbackRate = playbackRate;
    }, [charset, playbackRate]);

    useEffect(() => {
        let animationFrameId: number;
        const gl = glRef.current;
        const video = videoRef.current;
        const program = programRef.current;
        const canvas = canvasRef.current;

        if (!gl || !video || !program || !canvas || !texturesRef.current || !buffersRef.current) return;

        const uVideoLoc = gl.getUniformLocation(program, "u_video");
        const uCharsetLoc = gl.getUniformLocation(program, "u_charset");
        const uCharsetCountLoc = gl.getUniformLocation(program, "u_charsetCount");
        const uResLoc = gl.getUniformLocation(program, "u_resolution");
        const uCharSizeLoc = gl.getUniformLocation(program, "u_charSize");
        const uMouseLoc = gl.getUniformLocation(program, "u_mouse");
        const uEnableMouseLoc = gl.getUniformLocation(program, "u_enableMouse");
        const uRenderModeLoc = gl.getUniformLocation(program, "u_renderMode");
        const uColorLoc = gl.getUniformLocation(program, "u_color");
        const uGrad1Loc = gl.getUniformLocation(program, "u_grad1");
        const uGrad2Loc = gl.getUniformLocation(program, "u_grad2");
        const uGradientTypeLoc = gl.getUniformLocation(program, "u_gradientType");
        const uGradientAngleLoc = gl.getUniformLocation(program, "u_gradientAngle");
        const uBrightnessLoc = gl.getUniformLocation(program, "u_brightness");
        const uInvertLoc = gl.getUniformLocation(program, "u_invert");
        const uUseEdgesLoc = gl.getUniformLocation(program, "u_useEdges");
        const uGravityLoc = gl.getUniformLocation(program, "u_gravity");
        const uInteractionModeLoc = gl.getUniformLocation(program, "u_interactionMode");

        const handleMouseMove = (e: MouseEvent) => {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            mousePos.current = {
                x: (e.clientX - rect.left) * dpr,
                y: (canvas.height - (e.clientY - rect.top) * dpr)
            };
        };
        if (enableMouseInteraction) window.addEventListener("mousemove", handleMouseMove);

        const render = () => {
            if (!canvas || !texturesRef.current || !buffersRef.current) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            if (video.readyState >= video.HAVE_CURRENT_DATA) {
                const bgRgb = hexToRgb(bgColorRef.current);
                gl.clearColor(bgRgb[0], bgRgb[1], bgRgb[2], 1.0);
                gl.clear(gl.COLOR_BUFFER_BIT);

                gl.useProgram(program);
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, texturesRef.current.video);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
                gl.uniform1i(uVideoLoc, 0);
                gl.activeTexture(gl.TEXTURE1);
                gl.bindTexture(gl.TEXTURE_2D, texturesRef.current.charset);
                gl.uniform1i(uCharsetLoc, 1);
                gl.uniform1f(uCharsetCountLoc, charset.length);
                gl.uniform2f(uResLoc, canvas.width, canvas.height);
                gl.uniform1f(uCharSizeLoc, asciiFontSize * (window.devicePixelRatio || 1));
                gl.uniform2f(uMouseLoc, mousePos.current.x, mousePos.current.y);
                gl.uniform1f(uEnableMouseLoc, enableMouseInteraction ? 1.0 : 0.0);
                let mode = 0;
                if (renderMode === "gradient") mode = 2;
                gl.uniform1i(uRenderModeLoc, mode);
                gl.uniform3fv(uColorLoc, hexToRgb(color));
                gl.uniform3fv(uGrad1Loc, hexToRgb(gradientColor1));
                gl.uniform3fv(uGrad2Loc, hexToRgb(gradientColor2));
                gl.uniform1i(uGradientTypeLoc, gradientType === "radial" ? 1 : 0);
                gl.uniform1f(uGradientAngleLoc, gradientAngle);
                gl.uniform1f(uBrightnessLoc, brightness);
                gl.uniform1f(uInvertLoc, invert ? 1.0 : 0.0);
                gl.uniform1f(uUseEdgesLoc, useEdges ? 1.0 : 0.0);
                gl.uniform1f(uGravityLoc, gravityStrength);

                let modeInt = 0;
                if (interactionMode === "repulsion") modeInt = 1;
                else if (interactionMode === "blackhole") modeInt = 2;
                gl.uniform1i(uInteractionModeLoc, modeInt);

                gl.bindBuffer(gl.ARRAY_BUFFER, buffersRef.current.pos);
                const posLoc = gl.getAttribLocation(program, "a_position");
                gl.enableVertexAttribArray(posLoc);
                gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
                gl.bindBuffer(gl.ARRAY_BUFFER, buffersRef.current.tex);
                const texLoc = gl.getAttribLocation(program, "a_texCoord");
                gl.enableVertexAttribArray(texLoc);
                gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0);
                gl.drawArrays(gl.TRIANGLES, 0, 6);
            }
            animationFrameId = requestAnimationFrame(render);
        };
        video.play().catch(() => { });
        render();
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [asciiFontSize, charset, color, gradientColor1, gradientColor2, enableMouseInteraction, renderMode, brightness, invert, useEdges, gravityStrength, interactionMode, gradientType, gradientAngle, hexToRgb]);

    return (
        <div
            className={\`relative w-full h-full overflow-hidden \${className}\`}
            style={{ backgroundColor: backgroundColor || undefined }}
        >
            <video ref={videoRef} src={videoSrc} loop muted playsInline crossOrigin="anonymous" className="hidden" />
            <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
    );
};`;

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

  // Color presets - theme aware
  const colorPresets = isDark
    ? ["#ffffff", "#32ff9f", "#ff6b6b"]
    : ["#000000", "#32ff9f", "#ff6b6b"];

  return (
    <div className="min-h-screen lg:h-[calc(100vh-4rem)] flex flex-col lg:overflow-hidden -m-8 lg:-m-12">
      {/* Header */}
      <div className="shrink-0 p-6 lg:p-10 pb-4 lg:pb-5 space-y-3">
        <div className="flex flex-col lg:flex-row items-center gap-4 text-center lg:text-left">
          <div className="p-3 bg-primary/10 border border-primary/20 rounded-2xl text-primary">
            <Terminal className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl lg:text-6xl font-black italic tracking-tighter uppercase leading-[0.8]">
              ASCII <span className="text-primary">MEDIA</span>
            </h1>
            <p className="text-muted-foreground text-xs font-mono tracking-[0.2em] uppercase mt-1">
              Interactive Media Pipeline
            </p>
          </div>
        </div>

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
            {/* Controls - Scrollable with custom scrollbar */}
            <div className="order-2 lg:order-1 w-full lg:w-[340px] shrink-0 lg:overflow-y-auto custom-scrollbar space-y-4">

              {/* Typography */}
              <Card>
                <CardHeader className="py-3 px-4">
                  <CardTitle className="flex items-center gap-2 text-xs">
                    <Type className="w-4 h-4 text-primary" />
                    Typography
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-4 pb-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <Label>Glyph Size</Label>
                      <span className="font-mono text-primary">{asciiFontSize}px</span>
                    </div>
                    <Slider value={[asciiFontSize]} onValueChange={(v) => setAsciiFontSize(v[0])} min={5} max={20} step={1} />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">Charset</Label>
                    <div className="grid grid-cols-2 gap-1">
                      {[
                        { name: "Default", value: DEFAULT_CHARSET },
                        { name: "Minimal", value: " .:+*#" },
                        { name: "Dense", value: " .:-=+*#%@$&" },
                        { name: "Blocks", value: " ░▒▓█" },
                      ].map((preset) => (
                        <Button
                          key={preset.name}
                          variant={charset === preset.value && !customCharset ? "default" : "outline"}
                          size="sm"
                          onClick={() => { setCharset(preset.value); setCustomCharset(""); }}
                          className="text-[9px] uppercase cursor-pointer"
                        >
                          {preset.name}
                        </Button>
                      ))}
                    </div>
                    <Input
                      placeholder="Custom charset..."
                      value={customCharset}
                      onChange={(e) => setCustomCharset(e.target.value)}
                      className="text-xs h-8"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <Label>Brightness</Label>
                      <span className="font-mono text-primary">{(brightness * 100).toFixed(0)}%</span>
                    </div>
                    <Slider value={[brightness]} onValueChange={(v) => setBrightness(v[0])} min={0.2} max={2} step={0.05} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <Label className="flex items-center gap-2">
                        <Eye className="w-3 h-3" />
                        Opacity
                      </Label>
                      <span className="font-mono text-primary">{(opacity * 100).toFixed(0)}%</span>
                    </div>
                    <Slider value={[opacity]} onValueChange={(v) => setOpacity(v[0])} min={0} max={1} step={0.01} />
                  </div>
                </CardContent>
              </Card>

              {/* Physics */}
              <Card>
                <CardHeader className="py-3 px-4">
                  <CardTitle className="flex items-center gap-2 text-xs">
                    <Magnet className="w-4 h-4 text-primary" />
                    Physics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-4 pb-4">
                  <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${enableMouse ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                        <MousePointer2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-medium">Interaction</div>
                        <div className={`text-[9px] uppercase font-bold ${enableMouse ? "text-primary" : "text-muted-foreground"}`}>
                          {getInteractionLabel(interactionMode)}
                        </div>
                      </div>
                    </div>
                    <Switch checked={enableMouse} onCheckedChange={setEnableMouse} />
                  </div>

                  <ToggleGroup
                    value={interactionMode}
                    onValueChange={(v) => setInteractionMode(v as typeof interactionMode)}
                    options={[
                      { value: "repulsion", label: "Repel" },
                      { value: "blackhole", label: "B-Hole" },
                    ]}
                    className="grid-cols-2"
                  />

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <Label>Intensity</Label>
                      <span className="font-mono text-primary">{(gravity * 100).toFixed(0)}%</span>
                    </div>
                    <Slider value={[gravity]} onValueChange={(v) => setGravity(v[0])} min={0} max={1} step={0.01} />
                  </div>
                </CardContent>
              </Card>

              {/* Style */}
              <Card>
                <CardHeader className="py-3 px-4">
                  <CardTitle className="flex items-center gap-2 text-xs">
                    <Palette className="w-4 h-4 text-primary" />
                    Style
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-4 pb-4">
                  <ToggleGroup
                    value={renderMode}
                    onValueChange={(v) => setRenderMode(v as typeof renderMode)}
                    options={[
                      { value: "classic", label: "Classic" },
                      { value: "gradient", label: "Gradient" },
                    ]}
                    className="grid-cols-2"
                  />

                  {renderMode === "gradient" ? (
                    <div className="space-y-3">
                      {/* Background Color */}
                      <div className="space-y-1">
                        <Label className="text-[10px]">Background</Label>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setBackgroundColor("#000000")} className={`w-6 h-6 rounded-lg border-2 transition-all hover:scale-110 cursor-pointer bg-black ${backgroundColor === "#000000" ? "border-primary scale-110" : "border-border"}`} />
                          <button onClick={() => setBackgroundColor("#ffffff")} className={`w-6 h-6 rounded-lg border-2 transition-all hover:scale-110 cursor-pointer bg-white ${backgroundColor === "#ffffff" ? "border-primary scale-110" : "border-border"}`} />
                          <div className="flex-1 flex items-center gap-2 p-1.5 bg-muted rounded-lg">
                            <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="w-5 h-5 rounded cursor-pointer bg-transparent" />
                            <span className="text-[9px] font-mono text-muted-foreground">{backgroundColor}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <Label className="text-[10px]">Start</Label>
                          <div className="flex items-center gap-2 p-1.5 bg-muted rounded-lg">
                            <input type="color" value={grad1} onChange={(e) => setGrad1(e.target.value)} className="w-5 h-5 rounded cursor-pointer bg-transparent" />
                            <span className="text-[9px] font-mono text-muted-foreground">{grad1}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px]">End</Label>
                          <div className="flex items-center gap-2 p-1.5 bg-muted rounded-lg">
                            <input type="color" value={grad2} onChange={(e) => setGrad2(e.target.value)} className="w-5 h-5 rounded cursor-pointer bg-transparent" />
                            <span className="text-[9px] font-mono text-muted-foreground">{grad2}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-[10px]">Orientation</Label>
                          <ToggleGroup
                            value={gradientType}
                            onValueChange={(v) => setGradientType(v as typeof gradientType)}
                            options={[
                              { value: "linear", label: "Lin" },
                              { value: "radial", label: "Rad" },
                            ]}
                            className="grid-cols-2 w-20"
                          />
                        </div>
                        <div className={`transition-opacity ${gradientType === "linear" ? "" : "opacity-30 pointer-events-none"}`}>
                          <div className="flex gap-0.5">
                            {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
                              <button
                                key={angle}
                                onClick={() => setGradientAngle(angle)}
                                className={`flex-1 h-4 rounded transition-all cursor-pointer ${gradientAngle === angle ? "bg-primary" : "bg-muted hover:bg-muted/80"}`}
                              />
                            ))}
                          </div>
                          <div className="text-center text-[9px] text-muted-foreground mt-1">{gradientAngle}°</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {/* Background Color */}
                      <div className="space-y-1">
                        <Label className="text-[10px]">Background</Label>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setBackgroundColor("#000000")} className={`w-6 h-6 rounded-lg border-2 transition-all hover:scale-110 cursor-pointer bg-black ${backgroundColor === "#000000" ? "border-primary scale-110" : "border-border"}`} />
                          <button onClick={() => setBackgroundColor("#ffffff")} className={`w-6 h-6 rounded-lg border-2 transition-all hover:scale-110 cursor-pointer bg-white ${backgroundColor === "#ffffff" ? "border-primary scale-110" : "border-border"}`} />
                          <div className="flex-1 flex items-center gap-2 p-1.5 bg-muted rounded-lg">
                            <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="w-5 h-5 rounded cursor-pointer bg-transparent" />
                            <span className="text-[9px] font-mono text-muted-foreground">{backgroundColor}</span>
                          </div>
                        </div>
                      </div>
                      {/* Text Color */}
                      <div className="space-y-1">
                        <Label className="text-[10px]">Text Color</Label>
                        <div className="flex items-center gap-2">
                          {colorPresets.map((c) => (
                            <button key={c} onClick={() => setColor(c)} className={`w-6 h-6 rounded-lg border-2 transition-all hover:scale-110 cursor-pointer ${color === c ? "border-primary scale-110" : "border-border"}`} style={{ backgroundColor: c }} />
                          ))}
                          <div className="flex-1 flex items-center gap-2 p-1.5 bg-muted rounded-lg">
                            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-5 h-5 rounded cursor-pointer bg-transparent" />
                            <span className="text-[9px] font-mono text-muted-foreground">{color}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Filters */}
              <Card>
                <CardHeader className="py-3 px-4">
                  <CardTitle className="flex items-center gap-2 text-xs">
                    <Cpu className="w-4 h-4 text-primary" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={invert ? "default" : "outline"}
                      size="sm"
                      onClick={() => setInvert(!invert)}
                      className="flex flex-col gap-1 h-auto py-2 cursor-pointer"
                    >
                      <FlipHorizontal className="w-4 h-4" />
                      <span className="text-[8px] uppercase">Invert</span>
                    </Button>
                    <Button
                      variant={useEdges ? "default" : "outline"}
                      size="sm"
                      onClick={() => setUseEdges(!useEdges)}
                      className="flex flex-col gap-1 h-auto py-2 cursor-pointer"
                    >
                      <Layers className="w-4 h-4" />
                      <span className="text-[8px] uppercase">Sobel</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

            </div>

            {/* Preview - 16:9 Aspect Ratio */}
            <div className="order-1 lg:order-2 flex-1 relative min-w-0">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <div className="absolute inset-0 rounded-2xl overflow-hidden border border-border shadow-2xl" style={{ opacity }}>
                  <AsciiRenderer
                    videoSrc="/videos/nyla_bg_hero.mp4"
                    asciiFontSize={asciiFontSize}
                    charset={activeCharset}
                    color={color}
                    backgroundColor={backgroundColor}
                    gradientColor1={grad1}
                    gradientColor2={grad2}
                    enableMouseInteraction={enableMouse}
                    renderMode={renderMode}
                    brightness={brightness}
                    invert={invert}
                    useEdges={useEdges}
                    gravityStrength={gravity}
                    interactionMode={interactionMode}
                    gradientType={gradientType}
                    gradientAngle={gradientAngle}
                  />
                </div>

                {/* Overlay - NOT affected by opacity */}
                <AnimatePresence>
                  {showOverlay && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center p-6 pointer-events-none z-10"
                    >
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.05 }}
                        className="max-w-sm text-center space-y-3 pointer-events-auto"
                      >
                        <span className="inline-block px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest border border-primary/30 text-primary bg-background/50 rounded">
                          Coming Soon
                        </span>
                        <h2 className="text-2xl lg:text-3xl font-black text-foreground italic leading-tight tracking-tight">
                          YOUR <span className="text-primary">TITLE</span>
                        </h2>
                        <p className="text-[11px] text-muted-foreground leading-relaxed max-w-xs mx-auto">
                          Perfect for hero sections and landing pages.
                        </p>
                        <div className="flex items-center justify-center gap-2 pt-2">
                          <Button size="sm" className="text-[9px]">Get Started</Button>
                          <Button variant="outline" size="sm" className="text-[9px]">Learn More</Button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="absolute top-3 right-3 z-20">
                  <Button
                    variant={showOverlay ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowOverlay(!showOverlay)}
                    className="text-[8px] cursor-pointer"
                  >
                    <Layout className="w-3 h-3 mr-1" />
                    {showOverlay ? "Hide" : "Overlay"}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="code" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 overflow-y-auto scrollbar-hide px-6 lg:px-10 pb-6 lg:pb-10">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center gap-1 p-1 bg-muted rounded-lg w-fit">
                <Button variant={codeTab === "usage" ? "default" : "ghost"} size="sm" onClick={() => setCodeTab("usage")} className="text-[9px] uppercase cursor-pointer">
                  Usage
                </Button>
                <Button variant={codeTab === "component" ? "default" : "ghost"} size="sm" onClick={() => setCodeTab("component")} className="text-[9px] uppercase cursor-pointer">
                  Component
                </Button>
              </div>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
                  <CardTitle className="flex items-center gap-2 text-xs">
                    {codeTab === "usage" ? <Play className="w-4 h-4 text-primary" /> : <FileCode className="w-4 h-4 text-muted-foreground" />}
                    {codeTab === "usage" ? "Usage Example" : "AsciiRenderer.tsx"}
                  </CardTitle>
                  <Button variant="outline" size="icon-sm" onClick={() => handleCopy(codeTab === "usage" ? USAGE_CODE : FULL_COMPONENT_CODE, codeTab)}>
                    {(codeTab === "usage" ? copiedUsage : copiedComponent) ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <Highlight theme={isDark ? themes.nightOwl : themes.github} code={codeTab === "usage" ? USAGE_CODE : FULL_COMPONENT_CODE} language="tsx">
                    {({ style, tokens, getLineProps, getTokenProps }) => (
                      <pre className="p-4 text-xs font-mono overflow-x-auto rounded-b-lg" style={{ ...style, background: 'transparent' }}>
                        {tokens.map((line, i) => (
                          <div key={i} {...getLineProps({ line })}>
                            <span className="inline-block w-6 text-right mr-4 text-muted-foreground/40 select-none text-[10px]">{i + 1}</span>
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

              <Card>
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-xs">Props Reference</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 px-4 pb-4">
                  {[
                    { prop: "videoSrc", type: "string", desc: "Video file path" },
                    { prop: "asciiFontSize", type: "number", desc: "Character size (4-24)" },
                    { prop: "charset", type: "string", desc: "Custom character set" },
                    { prop: "color", type: "string", desc: "Classic mode color" },
                    { prop: "enableMouseInteraction", type: "boolean", desc: "Enable mouse effects" },
                    { prop: "interactionMode", type: "vortex | repulsion | blackhole", desc: "Effect type" },
                    { prop: "gravityStrength", type: "number", desc: "Effect intensity (0-1)" },
                    { prop: "renderMode", type: "classic | gradient", desc: "Color mode" },
                  ].map(({ prop, type, desc }) => (
                    <div key={prop} className="flex items-center gap-3 py-1 text-sm border-b border-border last:border-0">
                      <code className="text-primary font-mono text-xs w-36 shrink-0">{prop}</code>
                      <code className="text-muted-foreground font-mono text-[9px] py-0.5 px-1 bg-muted rounded">{type}</code>
                      <span className="text-xs text-muted-foreground">{desc}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
