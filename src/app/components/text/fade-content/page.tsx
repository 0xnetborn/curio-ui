"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import FadeContent from "@/registry/text/fade-content";
import { PreviewCodeUsageTabs } from "@/components/ui/tabs";

const componentCode = `import FadeContent from "@/registry/text/fade-content";

<FadeContent>
  <h1>Your Content Here</h1>
</FadeContent>`;

const usageCode = `import FadeContent from "@/registry/text/fade-content";

<FadeContent
  blur={true}
  duration={1000}
  delay={0}
  threshold={0.1}
>
  <h1>Fade In Content</h1>
</FadeContent>`;

export default function FadeContentPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/components/text" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">FadeContent</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">Scroll-triggered fade-in animation with optional blur effect.</p>
      </motion.div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex items-center justify-center min-h-[200px] p-8">
            <FadeContent blur duration={800}>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Scroll to Reveal</h2>
                <p className="text-muted-foreground">FadeContent animates as you scroll</p>
              </div>
            </FadeContent>
          </div>
        }
        code={componentCode}
        usage={usageCode}
      />
    </div>
  );
}
