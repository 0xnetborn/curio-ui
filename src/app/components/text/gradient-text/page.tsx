"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import GradientText from "@/registry/text/gradient-text";
import { PreviewCodeUsageTabs } from "@/components/ui/tabs";

const componentCode = `"use client";



export default function GradientText({
  children,
  className = '',
  colors = ['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa'],
  animationSpeed = 8,
  showBorder = false
}) {
  const gradientStyle = {
    backgroundImage: \`linear-gradient(to right, \${colors.join(', ')})\`,
    animationDuration: \`\${animationSpeed}s\`
  };

  return (
    <div className={\`animated-gradient-text \${className}\`}>
      {showBorder && <div className="gradient-overlay" style={gradientStyle}></div>}
      <div className="text-content" style={gradientStyle}>
        {children}
      </div>
    </div>
  );
}
`;

const usageCode = `import GradientText from "@/registry/text/gradient-text";

<GradientText text="CurioUI" />`;

export default function GradientTextPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/components/text" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">GradientText</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">GradientText animation effect.</p>
      </motion.div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex items-center justify-center min-h-[200px]">
            <GradientText text="CurioUI" />
          </div>
        }
        code={componentCode}
        usage={usageCode}
      />
    </div>
  );
}
