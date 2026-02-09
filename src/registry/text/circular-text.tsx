"use client";

import React, { useEffect, useMemo } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import './circular-text.css';

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: 'speedUp' | 'slowDown' | 'pause' | 'goBonkers';
  className?: string;
}

const CircularText = ({
  text,
  spinDuration = 20,
  onHover = 'speedUp',
  className = '',
}: CircularTextProps) => {
  const letters = useMemo(() => Array.from(text), [text]);
  const controls = useAnimation();
  const rotation = useMotionValue(0);

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: {
        rotate: { duration: spinDuration, ease: 'linear', repeat: Infinity, repeatDelay: 0 },
        scale: { type: 'spring', damping: 20, stiffness: 300 },
      },
    });
  }, [spinDuration, text, controls, rotation]);

  const handleHoverStart = () => {
    const start = rotation.get();
    if (!onHover) return;

    let duration = spinDuration;
    let scaleVal = 1;

    switch (onHover) {
      case 'slowDown':
        duration = spinDuration * 2;
        break;
      case 'speedUp':
        duration = spinDuration / 4;
        break;
      case 'pause':
        duration = 0;
        scaleVal = 1;
        break;
      case 'goBonkers':
        duration = spinDuration / 20;
        scaleVal = 0.8;
        break;
    }

    controls.start({
      rotate: start + 360,
      scale: scaleVal,
      transition: {
        rotate: duration > 0 ? { duration, ease: 'linear', repeat: Infinity } : { type: 'spring', damping: 20, stiffness: 300 },
        scale: { type: 'spring', damping: 20, stiffness: 300 },
      },
    });
  };

  const handleHoverEnd = () => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: {
        rotate: { duration: spinDuration, ease: 'linear', repeat: Infinity, repeatDelay: 0 },
        scale: { type: 'spring', damping: 20, stiffness: 300 },
      },
    });
  };

  return (
    <motion.div
      className={`circular-text ${className}`}
      style={{ rotate: rotation }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const factor = Math.PI / letters.length;
        const x = factor * i;
        const y = factor * i;
        const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`;

        return (
          <span key={i} style={{ transform, WebkitTransform: transform }}>
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;
