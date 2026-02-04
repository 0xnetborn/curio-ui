"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PreviewCodeTabs } from "@/components/ui/tabs";
import WetPaintButton from "@/registry/buttons/wet-paint-button";

const CODE = `import { motion } from "framer-motion";
const Example = () => {
  return (
    <div className="grid min-h-[200px] place-content-center bg-slate-900 p-4">
      <WetPaintButton />
    </div>
  );
};

const WetPaintButton = () => {
  return (
    <button className="group relative rounded bg-accent px-4 py-2.5 font-semibold text-white transition-colors hover:bg-accent/90">
      Wet Paint Button
      <Drip left="10%" height={24} delay={0.5} />
      <Drip left="30%" height={20} delay={3} />
      <Drip left="57%" height={10} delay={4.25} />
      <Drip left="85%" height={16} delay={1.5} />
    </button>
  );
};

interface DripProps {
  left: string;
  height: number;
  delay: number;
}

const Drip = ({ left, height, delay }: DripProps) => {
  return (
    <motion.div className="absolute top-[99%] origin-top" style={{ left, }}
      initial={{ scaleY: 0.75 }}
      animate={{ scaleY: [0.75, 1, 0.75] }}
      transition={{ duration: 2, times: [0, 0.25, 1], delay, ease: "easeIn", repeat: Infinity, repeatDelay: 2, }}
    >
      <div style={{ height }} className="w-2 rounded-b-full bg-accent transition-colors group-hover:bg-accent/90" />
      <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-full top-0">
        <g clipPath="url(#clip0_1077_28)">
          <path fillRule="evenodd" clipRule="evenodd" d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z" className="fill-accent transition-colors group-hover:bg-accent/90" />
          <path fillRule="evenodd" clipRule="evenodd" d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z" className="fill-accent transition-colors group-hover:bg-accent/90" />
        </g>
        <defs><clipPath id="clip0_1077_28"><rect width="6" height="6" fill="white" /></clipPath></defs>
      </svg>
      <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-full top-0 rotate-90">
        <g clipPath="url(#clip0_1077_28)">
          <path fillRule="evenodd" clipRule="evenodd" d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z" className="fill-accent transition-colors group-hover:bg-accent/90" />
          <path fillRule="evenodd" clipRule="evenodd" d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z" className="fill-accent transition-colors group-hover:bg-accent/90" />
        </g>
        <defs><clipPath id="clip0_1077_28"><rect width="6" height="6" fill="white" /></clipPath></defs>
      </svg>
      <motion.div initial={{ y: -8, opacity: 1 }} animate={{ y: [-8, 50], opacity: [1, 0] }}
        transition={{ duration: 2, times: [0, 1], delay, ease: "easeIn", repeat: Infinity, repeatDelay: 2, }}
        className="absolute top-full h-2 w-2 rounded-full bg-accent transition-colors group-hover:bg-accent/90" />
    </motion.div>
  );
};

export default Example;`;

const USAGE = `import WetPaintButton from "@/registry/buttons/wet-paint-button";

// Basic
<WetPaintButton />

// With custom text
<WetPaintButton>Dripping Paint</WetPaintButton>

// With props
<WetPaintButton
  className="mt-4"
  onClick={() => console.log('clicked')}
>
  Custom Text
</WetPaintButton>`;

function TechBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-secondary text-secondary-foreground">
      {children}
    </span>
  );
}

export default function WetPaintButtonPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/buttons" className="p-1 rounded-md hover:bg-secondary transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Wet Paint Button</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">Button with dripping paint effect using Framer Motion.</p>
        <div className="flex flex-wrap gap-2">
          <TechBadge>React</TechBadge>
          <TechBadge>TypeScript</TechBadge>
          <TechBadge>Tailwind</TechBadge>
          <TechBadge>Framer Motion</TechBadge>
        </div>
      </motion.div>

      {/* Preview + Code */}
      <PreviewCodeTabs
        preview={<WetPaintButton />}
        code={CODE}
        codeLanguage="tsx"
      />

      {/* Usage */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold text-lg">Usage</h3>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono">{USAGE}</pre>
      </div>
    </div>
  );
}
