"use client";

import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

interface KineticTypographyProps {
  text?: string;
  className?: string;
}

const KineticTypography: React.FC<KineticTypographyProps> = ({ 
  text = "ELEGANCE", 
  className = "" 
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Wrap every letter in a span
    const textWrapper = textRef.current;
    textWrapper.innerHTML = textWrapper.textContent!.replace(/\S/g, "<span class='letter' style='display:inline-block;'>$&</span>");

    anime.timeline({loop: true})
      .add({
        targets: '.kinetic-text .letter',
        translateY: [100,0],
        translateZ: 0,
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 1400,
        delay: (el, i) => 300 + 30 * i
      }).add({
        targets: '.kinetic-text .letter',
        translateY: [0,-100],
        opacity: [1,0],
        easing: "easeInExpo",
        duration: 1200,
        delay: (el, i) => 100 + 30 * i
      });
  }, [text]);

  return (
    <div className={`kinetic-text overflow-hidden ${className}`}>
      <h1 
        ref={textRef} 
        className="text-6xl md:text-8xl font-bold tracking-tighter text-foreground"
        style={{ lineHeight: '1.1' }}
      >
        {text}
      </h1>
    </div>
  );
};

export default KineticTypography;
