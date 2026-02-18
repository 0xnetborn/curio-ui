"use client";

import { useEffect, useState } from "react";
import CubesComponent from "@/registry/effects/cubes";

export default function CubesPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl font-bold">Cubes</h1>
        <p className="text-muted-foreground mt-2">
          Animated cubes effect with GSAP.
        </p>
      </div>

      <div className="border rounded-xl overflow-hidden bg-card">
        <div className="p-12 min-h-[400px] flex items-center justify-center">
          <CubesComponent />
        </div>
      </div>
    </div>
  );
}
