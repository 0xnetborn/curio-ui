"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { PreviewCodeUsageTabs } from "@/components/ui/tabs";

const BounceCards = dynamic(
  () => import("@/registry/cards/bounce-cards"),
  { ssr: false }
);

const componentCode = `"use client";

import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function BounceCards({
  className = '',
  images = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = 'elastic.out(1, 0.8)',
  enableHover = true
}) {
  // GSAP animation implementation...
}
`;

const usageCode = `import BounceCards from "@/registry/cards/bounce-cards";

const images = [
  "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
  "https://images.unsplash.com/photo-1682687982501-1e58ab814714",
  "https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1",
];

<BounceCards images={images} />`;

export default function BounceCardsPage() {
  const images = [
    "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1682695797221-8164ff1fafc9?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?w=400&h=600&fit=crop",
  ];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/components/cards" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">BounceCards</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">Interactive bouncing cards with GSAP animations.</p>
      </motion.div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex items-center justify-center min-h-[400px] py-8">
            <BounceCards images={images} />
          </div>
        }
        code={componentCode}
        usage={usageCode}
      />
    </div>
  );
}
