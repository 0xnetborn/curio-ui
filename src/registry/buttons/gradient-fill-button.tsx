import React from "react";

const GradientFillButton = () => {
  return (
    <button className="px-4 py-2 bg-slate-900 text-white rounded-lg relative overflow-hidden">
      <span className="absolute inset-0 bg-gradient-to-b from-accent/0 via-accent/50 to-accent/0 -translate-y-full hover:translate-y-0 transition-transform duration-300" />
      <span className="relative">Gradient Fill</span>
    </button>
  );
};

export default GradientFillButton;
