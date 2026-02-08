"use client";

import React, { useEffect, useRef, useState } from 'react';

const BorderGlowButton = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: '-100%', y: '-100%' });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x: `${x}px`, y: `${y}px` });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <button
      className="relative overflow-hidden rounded-lg bg-background border border-border transform transition-transform ease-in-out active:scale-95 cursor-pointer"
      ref={ref}
      style={{ padding: '2px' }}
    >
      <span
        className="absolute z-0 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,var(--accent)_0%,transparent_70%)] opacity-50"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />
      <div className="relative z-10 rounded-md bg-background/80 px-4 py-2 text-sm font-medium text-foreground backdrop-blur-sm">
        CurioUI
      </div>
    </button>
  );
};

export default BorderGlowButton;
