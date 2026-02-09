"use client";

import { useRef, MouseEvent, ReactNode, useState, useEffect } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "rgba(0, 255, 153, 0.15)",
}: SpotlightCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsLight(document.documentElement.classList.contains("light"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    container.style.setProperty("--spotlight-x", `${x}px`);
    container.style.setProperty("--spotlight-y", `${y}px`);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(
          400px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%),
          ${spotlightColor},
          transparent 60%
        )`,
        borderRadius: 'inherit',
      }}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;
