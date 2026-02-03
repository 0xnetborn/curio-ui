"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { WetButton } from "@/registry/buttons/wet-button";

export default function WetButtonPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/components/buttons" className="p-1 rounded-md hover:bg-secondary transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Wet Paint Button</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">Button with dripping paint effect on hover.</p>
      </motion.div>

      <div className="rounded-xl border border-border bg-card p-8">
        <div className="flex items-center justify-center min-h-[200px] bg-slate-900 rounded-lg">
          <WetButton onClick={() => console.log("Wet Button clicked!")} />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold">Usage</h3>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`import { WetButton } from "@/registry/buttons/wet-button";

<WetButton onClick={() => console.log("click!")}>
  Wet Paint
</WetButton>`}
        </pre>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold">Props</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-4 font-medium">Prop</th>
                <th className="text-left py-2 px-4 font-medium">Type</th>
                <th className="text-left py-2 px-4 font-medium">Default</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="py-2 px-4 font-mono text-accent">children</td>
                <td className="py-2 px-4">ReactNode</td>
                <td className="py-2 px-4">"Wet Paint"</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 px-4 font-mono text-accent">className</td>
                <td className="py-2 px-4">string</td>
                <td className="py-2 px-4">undefined</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold">Dependencies</h3>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li className="flex items-center gap-2"><code className="text-accent">framer-motion</code> — For drip animations</li>
        </ul>
      </div>
    </div>
  );
}
