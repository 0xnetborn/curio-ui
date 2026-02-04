"use client";

import React from "react";
import { ButtonHTMLAttributes } from "react";

export interface ThreeDButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  buttonColor?: string;
  textColor?: string;
  borderColor?: string;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  depth?: "shallow" | "medium" | "deep";
}

export const ThreeDButton = ({
  children = "CurioUI",
  className = "",
  buttonColor = "#14B8A6",
  textColor = "#FFFFFF",
  borderColor = "#0D9488",
  rounded = "lg",
  depth = "medium",
  ...props
}: ThreeDButtonProps) => {
  const depthMap: Record<string, string> = {
    shallow: "border-b-[1px]",
    medium: "border-b-2",
    deep: "border-b-4",
  };

  const radiusMap: Record<string, string | undefined> = {
    none: "0",
    sm: "0.125rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    full: undefined, // undefined means full in style
  };

  return (
    <button
      className={`group relative inline-flex cursor-pointer items-center justify-center overflow-hidden px-4 py-1.5 font-medium shadow-lg transition-all duration-100 ease-in-out active:translate-y-0.5 active:shadow-none ${depthMap[depth] || depthMap.medium} border-l-2 border-r-2 ${className || ""}`}
      style={{
        backgroundColor: buttonColor || "#14B8A6",
        color: textColor || "#FFFFFF",
        borderBottomColor: borderColor || "#0D9488",
        borderLeftColor: borderColor || "#0D9488",
        borderRightColor: borderColor || "#0D9488",
        borderRadius: radiusMap[rounded] || "0.5rem",
      }}
      {...props}
    >
      <span className="absolute h-0 w-0 rounded-full bg-white opacity-10 transition-all duration-300 ease-out group-hover:h-32 group-hover:w-32" />
      <span className="relative">{children}</span>
    </button>
  );
};

export default ThreeDButton;
