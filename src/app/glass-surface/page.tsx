"use client";

export default function GlassSurfacePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="font-display text-4xl font-bold">Glass Surface</h1>
        <p className="text-muted-foreground max-w-lg">Glassmorphism card with blur backdrop.</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-8">
        <div className="relative h-[200px] w-full overflow-hidden rounded-lg bg-gradient-to-br from-slate-700 to-slate-900">
          <div className="absolute inset-0 backdrop-blur-xl bg-white/10">
            <div className="flex items-center justify-center h-full">
              <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 border border-white/30">
                <p className="text-white">Glass card content</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
