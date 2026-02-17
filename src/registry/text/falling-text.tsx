"use client";

import { useRef, useState, useEffect } from "react";
import Matter from "matter-js";

interface FallingTextProps {
  text?: string;
  highlightWords?: string[];
  highlightClass?: string;
  trigger?: "auto" | "scroll" | "hover";
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
  fontSize?: string;
  className?: string;
}

export default function FallingText({
  text = "Click to drop words",
  highlightWords = [],
  highlightClass = "highlighted",
  trigger = "auto",
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = "1rem",
  className = "",
}: FallingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const [effectStarted, setEffectStarted] = useState(false);

  useEffect(() => {
    if (!textRef.current) return;
    const words = text.split(" ");
    const newHTML = words
      .map((word) => {
        const isHighlighted = highlightWords.some((hw) =>
          word.startsWith(hw)
        );
        return `<span class="word ${isHighlighted ? highlightClass : ""}">${word}</span>`;
      })
      .join(" ");
    textRef.current.innerHTML = newHTML;
  }, [text, highlightWords, highlightClass]);

  useEffect(() => {
    if (trigger === "auto") {
      setEffectStarted(true);
      return;
    }
    if (trigger === "scroll" && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  useEffect(() => {
    if (!effectStarted || !canvasContainerRef.current || !textRef.current) return;

    // Clear previous canvas
    canvasContainerRef.current.innerHTML = "";

    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: canvasContainerRef.current,
      engine: engine,
      options: {
        width: containerRef.current?.offsetWidth || 800,
        height: containerRef.current?.offsetHeight || 400,
        wireframes: wireframes,
        background: backgroundColor,
      },
    });

    const wordElements = textRef.current.querySelectorAll(".word");
    const bodies: Matter.Body[] = [];

    wordElements.forEach((word) => {
      const rect = word.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();

      if (!containerRect) return;

      const x = (rect.left - containerRect.left) + rect.width / 2;
      const y = (rect.top - containerRect.top) + rect.height / 2;

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        restitution: 0.5,
        friction: 0.5,
        chamfer: { radius: 4 },
        render: {
          fillStyle: "transparent",
          strokeStyle: "transparent",
        },
      });

      (body as any).wordElement = word;
      bodies.push(body);
    });

    Composite.add(engine.world, bodies);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: {
          visible: false,
        },
      },
    });

    Composite.add(engine.world, mouseConstraint);

    // Update word positions on each tick
    Matter.Events.on(engine, "afterUpdate", () => {
      bodies.forEach((body) => {
        const wordElement = (body as any).wordElement;
        if (wordElement) {
          const angle = body.angle * (180 / Math.PI);
          wordElement.style.transform = `translate(${body.position.x - rect.width / 2}px, ${body.position.y - rect.height / 2}px) rotate(${angle}deg)`;
        }
      });
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas) {
        render.canvas.remove();
      }
    };
  }, [effectStarted, gravity, mouseConstraintStiffness, backgroundColor, wireframes]);

  const rect = { width: 80, height: 24 }; // Approximate dimensions

  return (
    <div ref={containerRef} className={`relative w-full h-[400px] overflow-hidden ${className}`}>
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-wrap items-center justify-center p-8 gap-2 pointer-events-none z-10"
        style={{ fontSize }}
      />
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 z-0"
        style={{ backgroundColor }}
      />
    </div>
  );
}
