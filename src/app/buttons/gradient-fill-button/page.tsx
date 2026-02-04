"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import GradientFillButton from "@/registry/buttons/gradient-fill-button";

export default function GradientFillButtonPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <Link href="/components/buttons" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Buttons</span>
        </Link>
      </header>

      <h1 className="font-display text-4xl font-bold">Gradient Fill Button</h1>
      <p className="text-muted-foreground max-w-2xl">Button that fills with gradient from bottom on hover.</p>

      <div className="rounded-xl border border-border bg-card p-8">
        <div className="flex items-center justify-center min-h-[300px]">
          <GradientFillButton />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold text-lg">Usage</h3>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono">{`import GradientFillButton from "@/registry/buttons/gradient-fill-button";

<GradientFillButton />`}</pre>
      </div>
    </div>
  );
}
