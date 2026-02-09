"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import WetPaintButton from "@/registry/buttons/wet-paint-button";
import { PreviewCodeUsageTabs } from "@/components/ui/tabs";

const componentCode = `"use client";

import { motion } from "framer-motion";

const WetPaintButton = () => {
  return (
    <button className="group relative rounded bg-accent px-4 py-2.5 font-semibold text-white transition-colors hover:bg-accent/90 cursor-pointer">
      CurioUI
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
    <motion.div
      className="absolute top-[99%] origin-top"
      style={{ left }}
      initial={{ scaleY: 0.75 }}
      animate={{ scaleY: [0.75, 1, 0.75] }}
      transition={{
        duration: 2,
        times: [0, 0.25, 1],
        delay,
        ease: "easeIn",
        repeat: Infinity,
        repeatDelay: 2,
      }}
    >
      <div
        style={{ height }}
        className="w-2 rounded-b-full bg-accent transition-colors group-hover:bg-accent/90"
      />
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        className="absolute left-full top-0"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.4 0H0V5.4C0 2.41766 2.41766 0 5.4 0Z"
          className="fill-accent"
        />
      </svg>
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        className="absolute right-full top-0 rotate-90"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.4 0H0V5.4C0 2.41766 2.41766 0 5.4 0Z"
          className="fill-accent"
        />
      </svg>
      <motion.div
        initial={{ y: -8, opacity: 1 }}
        animate={{ y: [-8, 50], opacity: [1, 0] }}
        transition={{
          duration: 2,
          times: [0, 1],
          delay,
          ease: "easeIn",
          repeat: Infinity,
          repeatDelay: 2,
        }}
        className="absolute top-full h-2 w-2 rounded-full bg-accent"
      />
    </motion.div>
  );
};

export default WetPaintButton;`;

const usageCode = `import WetPaintButton from "@/registry/buttons/wet-paint-button";

<WetPaintButton />`;

export default function WetButtonPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/components/buttons" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Wet Paint</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">Button with dripping paint effect.</p>
      </motion.div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex items-center justify-center min-h-[200px]">
            <WetPaintButton />
          </div>
        }
        code={componentCode}
        usage={usageCode}
      />
    </div>
  );
}
