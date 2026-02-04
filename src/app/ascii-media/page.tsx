"use client";

export default function AsciiMediaPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="font-display text-4xl font-bold">ASCII Art</h1>
        <p className="text-muted-foreground max-w-lg">ASCII art components and text effects.</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-8">
        <div className="flex items-center justify-center min-h-[200px] font-mono text-sm">
          <pre>{`
    /\\__/\\
   /      \\
   | 0    0 |
   \\  ----  /
    \\______/
          `}</pre>
        </div>
      </div>
    </div>
  );
}
