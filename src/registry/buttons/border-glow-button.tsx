import React from "react";

const BorderGlowButton = () => {
  return (
    <button className="px-4 py-2 bg-[#e5e7eb] text-slate-900 rounded-lg relative">
      <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 hover:opacity-20 transition-opacity rounded-lg" />
      Border Glow
    </button>
  );
};

export default BorderGlowButton;
