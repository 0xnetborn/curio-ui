"use client";

import { SpotlightCard } from "@/registry/spotlight-card";

export default function SpotlightCardPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-3xl font-bold text-white">Spotlight Card</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Teal Spotlight */}
        <SpotlightCard gradient="teal">
          <h3 className="text-xl font-semibold text-white mb-2">Curiositas Studio</h3>
          <p className="text-slate-300">We build intelligent systems with craft.</p>
        </SpotlightCard>

        {/* Blue Spotlight */}
        <SpotlightCard gradient="blue">
          <h3 className="text-xl font-semibold text-white mb-2">AI Automation</h3>
          <p className="text-slate-300">Eliminate manual work with AI-powered workflows.</p>
        </SpotlightCard>

        {/* Purple Spotlight */}
        <SpotlightCard gradient="purple">
          <h3 className="text-xl font-semibold text-white mb-2">Custom Software</h3>
          <p className="text-slate-300">Tailored platforms engineered for your team.</p>
        </SpotlightCard>

        {/* Orange Spotlight */}
        <SpotlightCard gradient="orange">
          <h3 className="text-xl font-semibold text-white mb-2">Digital Experiences</h3>
          <p className="text-slate-300">Modern, elegant digital products.</p>
        </SpotlightCard>
      </div>
    </div>
  );
}
