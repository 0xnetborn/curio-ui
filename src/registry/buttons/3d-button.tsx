"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export interface ThreeDButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

/**
 * 3D Button - From SyntaxUI
 * A button with 3D depth effect and ripple on hover
 */
export const ThreeDButton = ({ children, className, ...props }: ThreeDButtonProps) => {
  return (
    <button
      className={cn(
        "group relative m-1 inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-b-2 border-l-2 border-r-2 border-red-700 bg-gradient-to-tr from-red-600 to-red-500 px-4 py-1 text-white shadow-lg transition duration-100 ease-in-out active:translate-y-0.5 active:border-red-600 active:shadow-none",
        className
      )}
      {...props}
    >
      <span className="absolute h-0 w-0 rounded-full bg-white opacity-10 transition-all duration-300 ease-out group-hover:h-32 group-hover:w-32"></span>
      <span className="relative font-medium">{children}</span>
    </button>
  );
};

export default ThreeDButton;
