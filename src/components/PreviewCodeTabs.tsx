"use client";

import React, { useState, useMemo } from "react";
import { Check, Copy, Code, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Control {
  type: "text" | "select" | "boolean" | "range" | "color";
  label: string;
  prop: string;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  defaultValue: string | number | boolean;
}

interface PreviewCodeTabsProps {
  children: React.ReactNode;
  code: string;
  codeGenerator?: (values: Record<string, string | number | boolean>) => string;
  controls?: Control[];
  codeLanguage?: string;
}

export function PreviewCodeTabs({
  children,
  code: initialCode,
  codeGenerator,
  controls = [],
  codeLanguage = "tsx",
}: PreviewCodeTabsProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);
  const [controlValues, setControlValues] = useState<Record<string, string | number | boolean>>(() => {
    const defaults: Record<string, string | number | boolean> = {};
    controls.forEach((c) => {
      defaults[c.prop] = c.defaultValue;
    });
    return defaults;
  });

  const code = useMemo(() => {
    if (codeGenerator) {
      return codeGenerator(controlValues);
    }
    return initialCode;
  }, [controlValues, codeGenerator, initialCode]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Filter out props that have default values
  const hasNonDefaultValues = controls.some(
    (c) => controlValues[c.prop] !== c.defaultValue
  );

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Tabs Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab("preview")}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
              activeTab === "preview"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
              activeTab === "code"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Code className="w-4 h-4" />
            Code
          </button>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-500" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Content */}
      {activeTab === "preview" ? (
        <div className="p-8">
          <div className="flex items-center justify-center min-h-[200px]">
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child as React.ReactElement<any>, controlValues);
              }
              return child;
            })}
          </div>
        </div>
      ) : (
        <div className="bg-muted p-4 overflow-x-auto">
          <pre className="text-sm font-mono text-foreground">
            <code>{code}</code>
          </pre>
        </div>
      )}

      {/* Controls */}
      {controls.length > 0 && activeTab === "preview" && (
        <div className="px-4 py-3 border-t border-border bg-muted/20">
          <div className="flex flex-wrap gap-4">
            {controls.map((control) => (
              <div key={control.prop} className="flex items-center gap-2">
                <label className="text-xs font-medium text-muted-foreground">
                  {control.label}
                </label>
                {control.type === "text" && (
                  <input
                    type="text"
                    value={controlValues[control.prop] as string}
                    onChange={(e) =>
                      setControlValues((prev) => ({
                        ...prev,
                        [control.prop]: e.target.value,
                      }))
                    }
                    className="px-2 py-1 text-sm rounded-md border border-border bg-background w-32"
                  />
                )}
                {control.type === "select" && control.options && (
                  <select
                    value={controlValues[control.prop] as string}
                    onChange={(e) =>
                      setControlValues((prev) => ({
                        ...prev,
                        [control.prop]: e.target.value,
                      }))
                    }
                    className="px-2 py-1 text-sm rounded-md border border-border bg-background"
                  >
                    {control.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}
                {control.type === "boolean" && (
                  <button
                    onClick={() =>
                      setControlValues((prev) => ({
                        ...prev,
                        [control.prop]: !prev[control.prop],
                      }))
                    }
                    className={cn(
                      "w-10 h-5 rounded-full transition-colors relative",
                      controlValues[control.prop]
                        ? "bg-accent"
                        : "bg-muted-foreground/30"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-sm",
                        controlValues[control.prop]
                          ? "translate-x-5"
                          : "translate-x-0.5"
                      )}
                    />
                  </button>
                )}
                {control.type === "range" && (
                  <input
                    type="range"
                    min={control.min ?? 0}
                    max={control.max ?? 100}
                    step={control.step ?? 1}
                    value={controlValues[control.prop] as number}
                    onChange={(e) =>
                      setControlValues((prev) => ({
                        ...prev,
                        [control.prop]: Number(e.target.value),
                      }))
                    }
                    className="w-24"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PreviewCodeTabs;
