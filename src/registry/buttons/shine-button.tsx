import React from "react";

const ShineButton = () => {
  return (
    <button className="px-4 py-2 bg-slate-800 text-white rounded-lg relative overflow-hidden">
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shine" />
      Shine
    </button>
  );
};

export default ShineButton;
