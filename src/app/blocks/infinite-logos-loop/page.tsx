"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PreviewCodeTabs } from "@/components/ui/tabs";
import InfiniteLogosLoop from "@/registry/blocks/infinite-logos-loop";

const CODE = `/* Add to globals.css:
@keyframes logo-cloud {
  from { transform: 'translateX(0)'; }
  to { transform: 'translateX(calc(-100% - 2rem))'; }
}
.animate-logo-cloud {
  animation: logo-cloud 30s linear infinite;
}
*/

import InfiniteLogosLoop from "@/registry/blocks/infinite-logos-loop";

<InfiniteLogosLoop />`;

const USAGE = `import InfiniteLogosLoop from "@/registry/blocks/infinite-logos-loop";

// Basic usage
<InfiniteLogosLoop />

// With custom logos
<InfiniteLogosLoop
  logos={[
    { name: 'React', url: 'https://react.svg' },
    { name: 'Next.js', url: 'https://nextjs.svg' },
  ]}
/>

// With custom className
<InfiniteLogosLoop className="py-8" />`;

function TechBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-secondary text-secondary-foreground">
      {children}
    </span>
  );
}

export default function InfiniteLogosLoopPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/components" className="p-1 rounded-md hover:bg-secondary transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Infinite Logos Loop</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">
          Continuously scrolling logo cloud animation with seamless loop.
        </p>
        <div className="flex flex-wrap gap-2">
          <TechBadge>React</TechBadge>
          <TechBadge>Tailwind</TechBadge>
          <TechBadge>CSS Animation</TechBadge>
        </div>
      </div>

      {/* Preview + Code */}
      <PreviewCodeTabs
        preview={<InfiniteLogosLoop />}
        code={CODE}
        codeLanguage="css"
      />

      {/* Usage */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold text-lg">Usage</h3>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono">{USAGE}</pre>
      </div>
    </div>
  );
}
