"use client";

import "./glitch-text.css";

interface GlitchTextProps {
  children: React.ReactNode;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
}

const GlitchText = ({
  children,
  speed = 1,
  enableShadows = true,
  enableOnHover = true,
  className = "",
}: GlitchTextProps) => {
  const inlineStyles = {
    "--after-duration": `${speed * 3}s`,
    "--before-duration": `${speed * 2}s`,
    "--after-shadow": enableShadows ? "-2px 0 hsl(var(--accent))" : "none",
    "--before-shadow": enableShadows ? "2px 0 hsl(var(--accent) / 0.7)" : "none",
  };

  const hoverClass = enableOnHover ? "enable-on-hover" : "";

  return (
    <div
      className={`glitch ${hoverClass} ${className}`}
      style={inlineStyles as React.CSSProperties}
      data-text={typeof children === "string" ? children : ""}
    >
      {children}
    </div>
  );
};

export default GlitchText;
