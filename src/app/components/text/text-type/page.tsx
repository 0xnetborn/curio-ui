"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import TextType from "@/registry/text/text-type";
import { PreviewCodeUsageTabs } from "@/components/ui/tabs";

const componentCode = `import TextType from "@/registry/text/text-type";

export default function Example() {
  return (
    <TextType
      text={["Hello World", "Welcome to Curio UI", "Typewriter Effect"]}
      typingSpeed={50}
      pauseDuration={2000}
      showCursor={true}
    />
  );
}`;

const usageCode = `import TextType from "@/registry/text/text-type";

<TextType
  text="Your text here"
  typingSpeed={50}
  initialDelay={0}
  pauseDuration={2000}
  deletingSpeed={30}
  loop={true}
  showCursor={true}
  hideCursorWhileTyping={false}
  cursorCharacter="|"
  cursorBlinkDuration={0.5}
  textColors={[]}
  variableSpeed={false}
  startOnVisible={false}
  reverseMode={false}
/>`;

export default function TextTypePage() {
  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link
        href="/components"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Components
      </Link>

      {/* Title */}
      <div>
        <h1 className="font-display text-4xl font-bold">Text Type</h1>
        <p className="text-muted-foreground mt-2">
          Animated typewriter effect with customizable typing speed, cursor, and loop options.
        </p>
      </div>

      {/* Preview */}
      <div className="border rounded-xl p-8 bg-card">
        <div className="flex items-center justify-center min-h-[200px]">
          <TextType
            text={["Hello World", "Welcome to Curio UI", "Typewriter Effect"]}
            typingSpeed={50}
            pauseDuration={2000}
            showCursor={true}
            className="text-2xl font-bold"
          />
        </div>
      </div>

      {/* Code Usage */}
      <PreviewCodeUsageTabs
        componentCode={componentCode}
        usageCode={usageCode}
        componentName="TextType"
      />
    </div>
  );
}
