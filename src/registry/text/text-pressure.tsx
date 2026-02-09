"use client";

import { useEffect, useRef, useState, useMemo } from "react";

interface TextPressureProps {
  text?: string;
  className?: string;
  minFontSize?: number;
}

const TextPressure = ({
  text = "CurioUI",
  className = "",
  minFontSize = 24,
}: TextPressureProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  const cursorRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);

  const chars = useMemo(() => text.split(""), [text]);

  const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    mouseRef.current.x = left + width / 2;
    mouseRef.current.y = top + height / 2;
    cursorRef.current.x = mouseRef.current.x;
    cursorRef.current.y = mouseRef.current.y;
  }, []);

  useEffect(() => {
    const setSize = () => {
      if (!containerRef.current || !titleRef.current) return;

      const { width: containerW } = containerRef.current.getBoundingClientRect();
      let newFontSize = containerW / (chars.length / 2);
      newFontSize = Math.max(newFontSize, minFontSize);

      setFontSize(newFontSize);
      setScaleY(1);

      requestAnimationFrame(() => {
        if (!titleRef.current) return;
        const textRect = titleRef.current.getBoundingClientRect();
        const containerH = containerRef.current?.getBoundingClientRect().height || 0;

        if (textRect.height > 0 && containerH > 0) {
          const yRatio = containerH / textRect.height;
          setScaleY(yRatio);
        }
      });
    };

    setSize();
    window.addEventListener("resize", setSize);
    return () => window.removeEventListener("resize", setSize);
  }, [chars.length, minFontSize]);

  useEffect(() => {
    let rafId: number;

    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

      if (titleRef.current && spansRef.current[0]) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = titleRect.width / 2;

        spansRef.current.forEach((span) => {
          if (!span) return;

          const rect = span.getBoundingClientRect();
          const charCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
          };

          const d = dist(mouseRef.current, charCenter);

          const getVal = (distance: number, minVal: number, maxVal: number) => {
            const val = maxVal - Math.abs((maxVal * distance) / maxDist);
            return Math.max(minVal, val + minVal);
          };

          const wdth = Math.floor(getVal(d, 50, 200));
          const wght = Math.floor(getVal(d, 100, 900));
          const italVal = getVal(d, 0, 1).toFixed(2);
          const alphaVal = getVal(d, 0.5, 1).toFixed(2);

          span.style.opacity = alphaVal;
          span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [chars.length]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <h1
        ref={titleRef}
        className={className}
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          textTransform: "uppercase",
          fontSize,
          lineHeight: scaleY,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: "center top",
          margin: 0,
          textAlign: "center",
          userSelect: "none",
          whiteSpace: "nowrap",
          fontWeight: 100,
          width: "100%",
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={(el) => (spansRef.current[i] = el)}
            style={{
              display: "inline-block",
              transition: "opacity 0.1s",
            }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;
