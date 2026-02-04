"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ThreeDButton from "@/registry/buttons/3d-button";
import { PreviewCodeTabs } from "@/components/PreviewCodeTabs";
import type { Control } from "@/components/PreviewCodeTabs";

const controls: Control[] = [
  { type: "text", label: "Text", prop: "children", defaultValue: "CurioUI" },
  { type: "color", label: "Color", prop: "buttonColor", defaultValue: "#14B8A6" },
  { type: "color", label: "Text", prop: "textColor", defaultValue: "#FFFFFF" },
  {
    type: "select",
    label: "Rounded",
    prop: "rounded",
    options: ["none", "sm", "md", "lg", "xl", "full"],
    defaultValue: "lg",
  },
  {
    type: "select",
    label: "Depth",
    prop: "depth",
    options: ["shallow", "medium", "deep"],
    defaultValue: "medium",
  },
];

const codeGenerator = (values: Record<string, string | number | boolean>) => {
  const props: string[] = [];
  
  if (values.children !== "CurioUI") {
    props.push(`  children="${values.children}"`);
  }
  if (values.buttonColor !== "#14B8A6") {
    props.push(`  buttonColor="${values.buttonColor}"`);
  }
  if (values.textColor !== "#FFFFFF") {
    props.push(`  textColor="${values.textColor}"`);
  }
  if (values.rounded !== "lg") {
    props.push(`  rounded="${values.rounded}"`);
  }
  if (values.depth !== "medium") {
    props.push(`  depth="${values.depth}"`);
  }

  return `import ThreeDButton from "@/registry/buttons/3d-button";

<ThreeDButton${props.length > 0 ? "\n" + props.join("\n") : ""} />`;
};

export default function ThreeDButtonPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <Link href="/components/buttons" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Buttons</span>
        </Link>
      </header>

      <h1 className="font-display text-4xl font-bold">3D Button</h1>
      <p className="text-muted-foreground max-w-2xl">Button with 3D depth effect and customizable colors.</p>

      <PreviewCodeTabs
        controls={controls}
        code={codeGenerator({
          children: "CurioUI",
          buttonColor: "#14B8A6",
          textColor: "#FFFFFF",
          rounded: "lg",
          depth: "medium",
        })}
        codeGenerator={codeGenerator}
      >
        <ThreeDButton />
      </PreviewCodeTabs>
    </div>
  );
}
