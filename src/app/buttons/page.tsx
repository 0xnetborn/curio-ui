"use client";

import ThreeDButton from "../../registry/buttons/3d-button";
import ShineButton from "../../registry/buttons/shine-button";
import BorderGlowButton from "../../registry/buttons/border-glow-button";
import GradientFillButton from "../../registry/buttons/gradient-fill-button";
import WetPaintButton from "../../registry/buttons/wet-paint-button";

const buttons = [
  { name: "3d-button", displayName: "3D Button", component: ThreeDButton },
  { name: "shine-button", displayName: "Shine Button", component: ShineButton },
  { name: "border-glow-button", displayName: "Border Glow", component: BorderGlowButton },
  { name: "gradient-fill-button", displayName: "Gradient Fill", component: GradientFillButton },
  { name: "wet-paint-button", displayName: "Wet Paint", component: WetPaintButton },
];

export default function ButtonsPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="font-display text-4xl font-bold">Buttons</h1>
        <p className="text-muted-foreground max-w-lg">Animated button components with hover effects.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {buttons.map((button) => (
          <div key={button.name} className="aspect-square rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-center h-[calc(100%-4rem)]">
              <button.component />
            </div>
            <div className="mt-4">
              <h3 className="font-medium text-sm">{button.displayName}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
