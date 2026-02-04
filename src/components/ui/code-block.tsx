"use client";

import { useState } from "react";
import { Check, Copy, ChevronDown, ChevronUp } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  collapsed?: boolean;
}

export function CodeBlock({ code, language = "tsx", title, collapsed = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lineCount = code.trim().split('\n').length;
  const isLong = lineCount > 15;

  return (
    <div className="relative rounded-lg border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-accent/10 to-accent/5 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs font-mono text-muted-foreground">{title || language}</span>
        </div>
        <div className="flex items-center gap-2">
          {isLong && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
            >
              {isCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
              {isCollapsed ? 'Expand' : 'Collapse'}
            </button>
          )}
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-500" />
                <span className="text-green-500">Copied!</span>
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

      {/* Code */}
      {isCollapsed ? (
        <div className="p-4 bg-slate-950/50">
          <code className="text-xs font-mono text-muted-foreground">
            {code.slice(0, 200)}... ({lineCount} lines)
          </code>
        </div>
      ) : (
        <Highlight theme={themes.nightOwl} code={code.trim()} language={language}>
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre className="p-4 overflow-x-auto text-sm bg-slate-950 max-h-[500px] overflow-y-auto scrollbar-thin" style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  <span className="inline-block w-6 text-right mr-4 text-muted-foreground/40 select-none text-[10px]">
                    {i + 1}
                  </span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      )}
    </div>
  );
}
