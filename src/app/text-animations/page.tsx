"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import FuzzyText from "@/registry/text/fuzzy-text";
import GradientText from "@/registry/text/gradient-text";
import BlurText from "@/registry/text/blur-text";
import DecryptedText from "@/registry/text/decrypted-text";
import VariableProximity from "@/registry/text/variable-proximity";
import CircularText from "@/registry/text/circular-text";
import RotatingText from "@/registry/text/rotating-text";

import { ShinyText } from "@/registry/shiny-text";
import TextPressure from "@/registry/text/text-pressure";
import GlitchText from "@/registry/text/glitch-text";

const textAnimationComponents = [
  { 
    name: "fuzzy-text", 
    displayName: "Fuzzy Text", 
    component: FuzzyText, 
    href: "/text-animations/fuzzy-text" 
  },
  { 
    name: "gradient-text", 
    displayName: "Gradient Text", 
    component: GradientText, 
    href: "/text-animations/gradient-text" 
  },
  { 
    name: "shiny-text", 
    displayName: "Shiny Text", 
    component: ShinyText, 
    href: "/shiny-text",
    props: { text: "Shiny Text" }
  },
  { 
    name: "blur-text", 
    displayName: "Blur Text", 
    component: BlurText, 
    href: "/text-animations/blur-text",
    props: { text: "Blur Text", delay: 150 }
  },
  { 
    name: "decrypted-text", 
    displayName: "DecryptedText", 
    component: DecryptedText, 
    href: "/text-animations/decrypted-text",
    props: { text: "Decrypted" }
  },
  { 
    name: "variable-proximity", 
    displayName: "VariableProximity", 
    component: VariableProximity, 
    href: "/text-animations/variable-proximity",
    props: { label: "Variable" }
  },
  { 
    name: "circular-text", 
    displayName: "Circular Text", 
    component: CircularText, 
    href: "/text-animations/circular-text",
    props: { text: "CURIO UI • " }
  },
  { 
    name: "text-pressure", 
    displayName: "Text Pressure", 
    component: TextPressure, 
    href: "/text-animations/text-pressure",
    props: { text: "CurioUI" }
  },
  { 
    name: "glitch-text", 
    displayName: "Glitch Text", 
    component: GlitchText, 
    href: "/text-animations/glitch-text",
    props: { children: "Glitch" }
  },
  { 
    name: "rotating-text", 
    displayName: "Rotating Text", 
    component: RotatingText, 
    href: "/text-animations/rotating-text",
    props: { texts: ["Rotating", "Text", "Effect"] }
  },
];

export default function TextAnimationsPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="font-display text-4xl font-bold">Text Animations</h1>
        <p className="text-muted-foreground max-w-lg">
          Animated text effects with blur, reveal, and styling transitions.
        </p>
      </motion.div>

      {/* Components Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {textAnimationComponents.map((component, i) => (
          <motion.div
            key={component.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={component.href}>
              <div className="group relative aspect-square rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10">
                <div className="absolute inset-0 flex items-center justify-center bg-background rounded-xl p-4">
                  <component.component {...component.props} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl">
                  <h3 className="font-medium text-sm text-white">{component.displayName}</h3>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
