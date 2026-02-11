"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import GlitchText from "@/registry/text/glitch-text";
import { PreviewCodeUsageTabs } from "@/components/ui/tabs";

const componentCode = `"use client";



const GlitchText = ({ children, speed = 1, enableShadows = true, enableOnHover = true, className = '' }) => {
  const inlineStyles = {
    '--after-duration': \`\${speed * 3}s\`,
    '--before-duration': \`\${speed * 2}s\`,
    '--after-shadow': enableShadows ? '-5px 0 red' : 'none',
    '--before-shadow': enableShadows ? '5px 0 cyan' : 'none'
  };

  const hoverClass = enableOnHover ? 'enable-on-hover' : '';

  return (
    <div className={\`glitch \${hoverClass} \${className}\`} style={inlineStyles} data-text={children}>
      {children}
    </div>
  );
};

export default GlitchText;
`;

const usageCode = `import GlitchText from "@/registry/text/glitch-text";

<GlitchText text="CurioUI" />`;

export default function GlitchTextPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/components/text" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">GlitchText</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">GlitchText animation effect.</p>
      </motion.div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex items-center justify-center min-h-[200px]">
            <GlitchText text="CurioUI" />
          </div>
        }
        code={componentCode}
        usage={usageCode}
      />
    </div>
  );
}
