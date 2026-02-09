"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SpotlightCard } from "@/registry/cards";
import { PreviewCodeUsageTabs, type PropItem } from "@/components/ui/tabs";

const componentCode = `"use client";

import { useRef, MouseEvent, ReactNode } from "react";

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

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    container.style.setProperty("--spotlight-x", \`\${x}px\`);
    container.style.setProperty("--spotlight-y", \`\${y}px\`);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={\`relative overflow-hidden \${className}\`}
      style={{
        background: \`radial-gradient(
          400px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%),
          \${spotlightColor},
          transparent 60%
        )\`,
      }}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;`;

const usageCode = `import { SpotlightCard } from "@/registry/cards";

<SpotlightCard className="p-6 rounded-xl border border-border bg-card">
  <h3 className="text-lg font-semibold">Title</h3>
  <p className="text-muted-foreground text-sm">Description here.</p>
</SpotlightCard>`;

const props: PropItem[] = [
  { name: "children", type: "ReactNode", description: "Card content" },
  { name: "spotlightColor", type: "string", default: "rgba(0, 255, 153, 0.15)", description: "Spotlight gradient color" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

const dependencies: string[] = [];

export default function SpotlightCardPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/components" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Spotlight Card</h1>
        </div>
        <p className="text-muted-foreground max-w-lg pl-9">
          Card with gradient spotlight effect that follows your cursor.
        </p>
      </div>

      <PreviewCodeUsageTabs
        preview={
          <div className="grid gap-4 md:grid-cols-2">
            <SpotlightCard className="p-6 rounded-xl border border-border bg-card">
              <h3 className="text-lg font-semibold mb-2">Spotlight Effect</h3>
              <p className="text-muted-foreground text-sm">
                Move your cursor over this card to see the gradient follow you.
              </p>
            </SpotlightCard>
            <SpotlightCard
              className="p-6 rounded-xl border border-border bg-card"
              spotlightColor="rgba(20, 184, 166, 0.2)"
            >
              <h3 className="text-lg font-semibold mb-2">Custom Color</h3>
              <p className="text-muted-foreground text-sm">
                You can customize the spotlight color to match your theme.
              </p>
            </SpotlightCard>
          </div>
        }
        code={componentCode}
        usage={usageCode}
        props={props}
        dependencies={dependencies}
      />
    </div>
  );
}
