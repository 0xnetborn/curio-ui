"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Code2, Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  children: React.ReactNode;
  codeContent?: string;
  className?: string;
}

export function Tabs({
  tabs,
  defaultTab,
  children,
  codeContent,
  className,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    if (codeContent) {
      await navigator.clipboard.writeText(codeContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={cn("rounded-xl border border-border bg-card overflow-hidden", className)}>
      {/* Tab Headers */}
      <div className="flex items-center justify-between border-b border-border px-1 py-1 bg-secondary/30">
        <div className="flex gap-0.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Copy button - only show when code tab is active */}
        {activeTab === "code" && codeContent && (
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs text-muted-foreground hover:text-foreground transition-colors mr-1"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-500" />
                <span className="text-green-500">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </button>
        )}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="p-0"
        >
          {activeTab === "preview" ? (
            <div className="relative min-h-[200px] flex items-center justify-center p-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/20 via-background to-background">
              {children}
            </div>
          ) : (
            <pre className="overflow-x-auto p-4 text-sm bg-muted/30">
              <code className="text-foreground">{codeContent}</code>
            </pre>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Convenience component for component pages
interface ComponentPageTabsProps {
  preview: React.ReactNode;
  code: string;
  className?: string;
}

export function ComponentPageTabs({ preview, code, className }: ComponentPageTabsProps) {
  return (
    <Tabs
      tabs={[
        { id: "preview", label: "Preview", icon: <Eye className="w-4 h-4" /> },
        { id: "code", label: "Code", icon: <Code2 className="w-4 h-4" /> },
      ]}
      defaultTab="preview"
      codeContent={code}
      className={className}
    >
      {preview}
    </Tabs>
  );
}
