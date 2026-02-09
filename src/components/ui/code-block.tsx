"use client";

import { useState, useEffect } from "react";
import { Check, Copy, ChevronDown, ChevronUp, Terminal } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import { cn } from "@/lib/utils";

// Light theme colors for code
const lightTheme = {
  ...themes.github,
  plain: {
    backgroundColor: "#F8FAFC",
    color: "#1E293B",
  },
  styles: [
    { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "#94A3B8", fontStyle: "italic" } },
    { types: ["punctuation"], style: { color: "#64748B" } },
    { types: ["namespace"], style: { opacity: 0.7 } },
    { types: ["property", "tag", "boolean", "number", "constant", "symbol", "deleted"], style: { color: "#059669" } },
    { types: ["selector", "attr-name", "string", "char", "builtin", "inserted"], style: { color: "#0891B2" } },
    { types: ["operator", "entity", "url", "string"], style: { color: "#7C3AED" } },
    { types: ["atrule", "attr-value", "keyword"], style: { color: "#DC2626" } },
    { types: ["function", "class-name"], style: { color: "#2563EB" } },
    { types: ["regex", "important", "variable"], style: { color: "#EA580C" } },
    { types: ["important", "punctuation"], style: { fontWeight: "bold" } },
    { types: ["cursor"], style: { color: "#14B8A6" } },
  ],
};

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  collapsed?: boolean;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = "tsx",
  title,
  collapsed = false,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsLight(document.documentElement.classList.contains("light"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lineCount = code.trim().split("\n").length;
  const isLong = lineCount > 15;

  const getLanguageIcon = (lang: string) => {
    switch (lang.toLowerCase()) {
      case "tsx":
      case "typescript":
      case "ts": return "TS";
      case "css": return "CSS";
      case "json": return "JSON";
      default: return lang.toUpperCase().slice(0, 3);
    }
  };

  const codeTheme = isLight ? lightTheme : themes.nightOwl;

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card overflow-hidden",
        "transition-all duration-200 ease-in-out"
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "flex items-center justify-between px-4 py-3",
          "border-b border-border",
          isLight ? "bg-slate-100/50" : "bg-secondary/30"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className={cn(
              "flex items-center gap-1.5 px-2 py-1 rounded-md",
              isLight ? "bg-slate-200/50" : "bg-secondary/50"
            )}>
              <Terminal className={cn("w-3.5 h-3.5", isLight ? "text-slate-600" : "text-accent")} />
              <span className={cn("text-xs font-mono font-medium", isLight ? "text-slate-700" : "text-foreground")}>
                {getLanguageIcon(language)}
              </span>
            </div>
            {title && (
              <span className="text-xs text-muted-foreground">
                / {title}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isLong && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={cn(
                "flex items-center gap-1.5 px-2 py-1 rounded-md",
                "text-xs",
                isLight ? "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                "transition-colors cursor-pointer"
              )}
            >
              {isCollapsed ? <><ChevronDown className="w-3.5 h-3.5" /><span>Expand</span></> : <><ChevronUp className="w-3.5 h-3.5" /><span>Collapse</span></>}
            </button>
          )}

          <button
            onClick={copyToClipboard}
            className={cn(
              "flex items-center gap-1.5 px-2 py-1 rounded-md",
              "text-xs transition-colors cursor-pointer",
              copied
                ? "text-green-600 bg-green-100"
                : isLight ? "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
          >
            {copied ? <><Check className="w-3.5 h-3.5" /><span>Copied!</span></> : <><Copy className="w-3.5 h-5" /><span>Copy</span></>}
          </button>
        </div>
      </div>

      {/* Code content */}
      {isCollapsed ? (
        <div className={cn("px-4 py-3", isLight ? "bg-slate-50/50" : "bg-secondary/20")}>
          <div className="flex items-center gap-3">
            <code className={cn("text-xs font-mono", isLight ? "text-slate-500" : "text-muted-foreground")}>
              {code.slice(0, 150).trim()}
              {code.length > 150 && "..."}
            </code>
            <span className={cn("text-xs", isLight ? "text-slate-400" : "text-muted-foreground/50")}>
              ({lineCount} lines)
            </span>
          </div>
        </div>
      ) : (
        <div className="relative">
          <Highlight
            theme={codeTheme}
            code={code.trim()}
            language={language}
          >
            {({ style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className="p-4 overflow-x-auto text-sm font-mono"
                style={{
                  ...style,
                  background: "transparent",
                  margin: 0,
                }}
              >
                {tokens.map((line, i) => (
                  <div
                    key={i}
                    {...getLineProps({ line })}
                    className={cn(
                      "-mx-4 px-4",
                      isLight ? "hover:bg-slate-100/50" : "hover:bg-secondary/20"
                    )}
                  >
                    {showLineNumbers && (
                      <span
                        className={cn(
                          "inline-block w-6 text-right mr-4",
                          "text-xs select-none",
                          isLight ? "text-slate-400" : "text-muted-foreground/40"
                        )}
                      >
                        {i + 1}
                      </span>
                    )}
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
      )}
    </div>
  );
}

export default CodeBlock;
