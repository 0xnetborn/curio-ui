"use client";

export default function AuroraGlowPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="font-display text-4xl font-bold">Aurora Glow</h1>
        <p className="text-muted-foreground max-w-lg">Animated aurora borealis gradient effects.</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-8 overflow-hidden">
        <div className="relative h-[200px] w-full overflow-hidden rounded-lg bg-slate-950">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-50 blur-3xl animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-display text-2xl">Aurora</span>
          </div>
        </div>
      </div>
    </div>
  );
}
