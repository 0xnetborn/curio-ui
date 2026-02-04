"use client";

import { ButtonHTMLAttributes } from "react";

export interface ThreeDButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const ThreeDButton = ({
  children = "CurioUI",
  className,
  ...props
}: ThreeDButtonProps) => {
  return (
    <button
      className={`group relative m-1 inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-b-2 border-l-2 border-r-2 border-accent bg-gradient-to-tr from-accent to-accent/80 px-4 py-1 text-accent-foreground shadow-lg transition duration-100 ease-in-out active:translate-y-0.5 active:border-accent/60 active:shadow-none ${className || ""}`}
      {...props}
    >
      <span className="absolute h-0 w-0 rounded-full bg-white opacity-10 transition-all duration-300 ease-out group-hover:h-32 group-hover:w-32"></span>
      <span className="relative font-medium">{children}</span>
    </button>
  );
};

export default ThreeDButton;
