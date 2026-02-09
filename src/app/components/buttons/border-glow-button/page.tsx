"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import BorderGlowButton from "@/registry/buttons/border-glow-button";
import { PreviewCodeUsageTabs, type PropItem } from "@/components/ui/tabs";

const componentCode = `"use client";

import { useEffect, useRef, useState } from "react";

interface BorderGlowButtonProps {
  children?: React.ReactNode;
  glowColor?: string;
  className?: string;
}

const BorderGlowButton = ({
  children = "SyntaxUI",
  glowColor = "#fb3b53",
  className = "",
}: BorderGlowButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: "-100%", y: "-100%" });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x: \`\${x}px\`, y: \`\${y}px\` });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <button
      className={\`relative overflow-hidden rounded-lg bg-[#e5e7eb] transform transition-transform ease-in-out active:scale-90 cursor-pointer \${className}\`}
      ref={ref}
    >
      <span
        className="absolute z-0 h-28 w-28 -translate-x-1/2 -translate-y-1/2"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          background: \`radial-gradient(\${glowColor}_0%,transparent_70%)\`,
        }}
      />
      <div
        className="relative z-10 m-[1px] rounded-[calc(0.5rem-1px)] bg-white/90 px-4 py-1 text-xs backdrop-blur-sm"
        style={{ color: glowColor }}
      >
        {children}
      </div>
    </button>
  );
};

export default BorderGlowButton;`;

const usageCode = `import BorderGlowButton from "@/registry/buttons/border-glow-button";

<BorderGlowButton>Click me</BorderGlowButton>

<BorderGlowButton glowColor="#3b82f6">Blue</BorderGlowButton>`;

const props: PropItem[] = [
  { name: "children", type: "ReactNode", default: "SyntaxUI", description: "Button content" },
  { name: "glowColor", type: "string", default: "#fb3b53", description: "Glow and text color" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

export default function BorderGlowButtonPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/components/buttons" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Border Glow</h1>
        </div>
        <p className="text-muted-foreground max-w-lg pl-9">
          Button with mouse-tracking glow effect on border.
        </p>
      </div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex items-center justify-center gap-4 min-h-[200px] bg-card rounded-xl border border-border/50 p-8">
            <BorderGlowButton />
            <BorderGlowButton glowColor="#3b82f6" className="text-blue-500">Blue</BorderGlowButton>
            <BorderGlowButton glowColor="#10b981" className="text-emerald-500">Green</BorderGlowButton>
          </div>
        }
        code={componentCode}
        usage={usageCode}
        props={props}
      />
    </div>
  );
}
