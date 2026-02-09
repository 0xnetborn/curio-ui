"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import GlitchText from "@/registry/text/glitch-text";
import { PreviewCodeUsageTabs, type PropItem } from "@/components/ui/tabs";

const componentCode = `"use client";

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
    "--after-duration": \`\${speed * 3}s\`,
    "--before-duration": \`\${speed * 2}s\`,
    "--after-shadow": enableShadows ? "-2px 0 hsl(var(--accent))" : "none",
    "--before-shadow": enableShadows ? "2px 0 hsl(var(--accent) / 0.7)" : "none",
  };

  return (
    <div
      className={\`glitch \${enableOnHover ? "enable-on-hover" : ""} \${className}\`}
      style={inlineStyles as React.CSSProperties}
      data-text={typeof children === "string" ? children : ""}
    >
      {children}
    </div>
  );
};

export default GlitchText;`;

const usageCode = `import GlitchText from "@/registry/text/glitch-text";

<GlitchText className="text-4xl font-bold">
  CurioUI
</GlitchText>`;

const props: PropItem[] = [
  { name: "children", type: "ReactNode", description: "Text content" },
  { name: "speed", type: "number", default: "1", description: "Glitch animation speed" },
  { name: "enableShadows", type: "boolean", default: "true", description: "Enable color shadows" },
  { name: "enableOnHover", type: "boolean", default: "true", description: "Enable glitch on hover" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

export default function GlitchTextPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/text-animations" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Glitch Text</h1>
        </div>
        <p className="text-muted-foreground max-w-lg pl-9">
          Text with glitch animation effect.
        </p>
      </div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex items-center justify-center min-h-[200px] bg-card rounded-xl border border-border/50 p-8">
            <GlitchText className="text-4xl font-bold">
              CurioUI
            </GlitchText>
          </div>
        }
        code={componentCode}
        usage={usageCode}
        props={props}
      />
    </div>
  );
}
