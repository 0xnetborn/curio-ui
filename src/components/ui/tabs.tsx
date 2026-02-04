"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/ui/code-block";

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  preview: React.ReactNode;
  code: string;
  codeLanguage?: string;
}

export function Tabs({ tabs, defaultTab, preview, code, codeLanguage = "tsx" }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center border-b border-border px-1 py-1 bg-secondary/30">
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
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "preview" ? (
            <div className="relative min-h-[200px] flex items-center justify-center p-8">
              {preview}
            </div>
          ) : (
            <div className="p-0">
              <CodeBlock code={code} language={codeLanguage} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Convenience component
export function PreviewCodeTabs({ preview, code, codeLanguage }: { preview: React.ReactNode; code: string; codeLanguage?: string }) {
  return (
    <Tabs
      tabs={[
        { id: "preview", label: "Preview", icon: <Eye className="w-4 h-4" /> },
        { id: "code", label: "Code", icon: <Code2 className="w-4 h-4" /> },
      ]}
      defaultTab="preview"
      preview={preview}
      code={code}
      codeLanguage={codeLanguage}
    />
  );
}
