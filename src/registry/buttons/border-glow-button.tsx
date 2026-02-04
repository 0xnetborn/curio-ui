"use client";

import { useEffect, useRef, useState, ButtonHTMLAttributes } from "react";

export interface BorderGlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const BorderGlowButton = ({
  children = "CurioUI",
  className,
  ...props
}: BorderGlowButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState("-100% -100%");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition(`${x}px ${y}px`);
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mounted]);

  return (
    <button
      className={`relative overflow-hidden rounded-lg bg-muted transform transition-transform ease-in-out active:scale-90 ${className || ""}`}
      ref={ref}
      {...props}
    >
      <span
        className="absolute z-0 h-28 w-28 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(#0D9488_0%,transparent_70%)]"
        style={{
          left: mousePosition.split(" ")[0] || "-100%",
          top: mousePosition.split(" ")[1] || "-100%",
        }}
      />
      <div className="relative z-10 m-[1px] rounded-[calc(0.5rem-1px)] bg-background/90 px-4 py-1 text-xs text-accent backdrop-blur-sm">
        {children}
      </div>
    </button>
  );
};

export default BorderGlowButton;
