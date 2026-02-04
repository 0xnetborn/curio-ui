"use client";

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
 * High-performance WebGL-based ASCII video renderer with Gravity Distortion.
 */
export const AsciiRenderer: React.FC<AsciiRendererProps> = ({
    videoSrc = "/videos/curio-hero.mp4",
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

        const vsSource = `
      attribute vec2 a_position;
      attribute vec2 a_texCoord;
      varying vec2 v_texCoord;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_texCoord = a_texCoord;
      }
    `;

        const fsSource = `
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
            
            // Correct for aspect ratio to ensure circles are round
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
            } else if (u_interactionMode == 2) { // BLACK HOLE - Mathematically accurate
                // Schwarzschild radius (event horizon)
                float rs = 0.08 * u_gravity;
                float photonSphere = rs * 1.5;
                float accretionOuter = rs * 4.0;
                
                // Gravitational lensing: light bends with inverse-square falloff
                float bend = (rs * rs) / (dist * dist + 0.001);
                bend = min(bend, 0.5); // Clamp to prevent extreme distortion
                
                // Apply gravitational lensing
                vec2 direction = normalize(diff);
                direction.x /= aspect; // Undo aspect correction for UV manipulation
                uv -= direction * bend * 0.3;
                
                // Event horizon: complete darkness inside Schwarzschild radius
                float eventHorizonMask = smoothstep(rs * 0.5, rs * 1.2, dist);
                u_brightness_mod = eventHorizonMask;
                
                // Photon sphere / Accretion disk glow
                float innerGlow = smoothstep(rs * 0.8, photonSphere, dist);
                float outerFade = smoothstep(accretionOuter, photonSphere * 1.5, dist);
                accretionGlow = innerGlow * outerFade * 1.5 * u_gravity;
            }
        }

        // Grid setup
        vec2 charGrid = floor(uv * res / u_charSize);
        vec2 charCoord = (charGrid * u_charSize + u_charSize * 0.5) / res;
        
        // Sample video with Y-flip to match standard coordinate system
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
              float rad = u_gradientAngle * 0.0174533; // PI/180
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
    `;

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
        // Canvas is already transparent by default - don't fill with black!
        ctx.clearRect(0, 0, atlasCanvas.width, atlasCanvas.height);
        ctx.fillStyle = "white";
        ctx.font = `bold ${size * 0.8}px monospace`;
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
                // Clear with background color from ref (always latest value)
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
            className={`relative w-full h-full overflow-hidden ${className}`}
            style={{ backgroundColor: backgroundColor || undefined }}
        >
            <video ref={videoRef} src={videoSrc} loop muted playsInline crossOrigin="anonymous" className="hidden" />
            <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
    );
};
