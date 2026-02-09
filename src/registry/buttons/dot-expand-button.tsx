"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface DotExpandButtonProps {
  children?: React.ReactNode;
  className?: string;
}

const DotExpandButton = ({
  children = "Hover me",
  className = "",
}: DotExpandButtonProps) => {
  return (
    <div className={`grid place-content-center py-8 ${className}`}>
      <button className="group flex h-10 items-center gap-2 rounded-full bg-secondary pl-3 pr-4 transition-all duration-300 ease-in-out hover:bg-accent hover:pl-2 hover:text-accent-foreground active:scale-95 cursor-pointer">
        <span className="rounded-full bg-accent p-1 text-sm transition-all duration-300 group-hover:bg-accent-foreground group-hover:text-accent">
          <ArrowRight className="-translate-x-[200%] text-[0px] transition-all duration-300 group-hover:translate-x-0 group-hover:text-sm group-hover:rotate-0" />
        </span>
        <span className="transition-all duration-300 group-hover:translate-x-1">{children}</span>
      </button>
    </div>
  );
};

export default DotExpandButton;
