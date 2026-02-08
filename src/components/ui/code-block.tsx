"use client";

import { useState } from "react";
import { Check, Copy, ChevronDown, ChevronUp, FileCode, Terminal } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import { cn } from "@/lib/utils";

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

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lineCount = code.trim().split("\n").length;
  const isLong = lineCount > 15;

  // Language icon mapping
  const getLanguageIcon = (lang: string) => {
    switch (lang.toLowerCase()) {
      case "tsx":
      case "typescript":
      case "ts":
        return "TS";
      case "css":
        return "CSS";
      case "json":
        return "JSON";
      default:
        return lang.toUpperCase().slice(0, 3);
    }
  };

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
          "bg-secondary/30"
        )}
      >
        <div className="flex items-center gap-3">
          {/* Language badge */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-secondary/50">
              <Terminal className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-mono font-medium text-foreground">
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
          {/* Collapse/Expand button */}
          {isLong && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={cn(
                "flex items-center gap-1.5 px-2 py-1 rounded-md",
                "text-xs text-muted-foreground",
                "hover:text-foreground hover:bg-secondary/50",
                "transition-colors cursor-pointer"
              )}
            >
              {isCollapsed ? (
                <>
                  <ChevronDown className="w-3.5 h-3.5" />
                  <span>Expand</span>
                </>
              ) : (
                <>
                  <ChevronUp className="w-3.5 h-3.5" />
                  <span>Collapse</span>
                </>
              )}
            </button>
          )}

          {/* Copy button */}
          <button
            onClick={copyToClipboard}
            className={cn(
              "flex items-center gap-1.5 px-2 py-1 rounded-md",
              "text-xs transition-colors cursor-pointer",
              copied
                ? "text-green-500 bg-green-500/10"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
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
      </div>

      {/* Code content */}
      {isCollapsed ? (
        <div className="px-4 py-3 bg-secondary/20">
          <Highlight
            theme={themes.nightOwl}
            code={code.trim().slice(0, 200)}
            language={language}
          >
            {({ style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className="overflow-x-auto text-sm font-mono"
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
                    className="hover:bg-secondary/10"
                  >
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
                {code.length > 200 && <span className="text-muted-foreground">...</span>}
              </pre>
            )}
          </Highlight>
          <span className="text-xs text-muted-foreground/50 mt-2 block">
              ({lineCount} lines)
          </span>
        </div>
      ) : (
        <div className="relative">
          <Highlight
            theme={themes.nightOwl}
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
                    className="hover:bg-secondary/20 -mx-4 px-4"
                  >
                    {showLineNumbers && (
                      <span
                        className={cn(
                          "inline-block w-6 text-right mr-4",
                          "text-xs text-muted-foreground/40 select-none"
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
