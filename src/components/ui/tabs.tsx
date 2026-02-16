"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Code2, Package2, Settings2, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/ui/code-block";
import { CopyButton } from "@/components/ui/copy-button";

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
      <div className="flex items-center px-1 py-1 bg-gradient-to-r from-accent/5 to-transparent">
        <div className="flex gap-0.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "bg-accent text-white shadow-md"
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

// Convenience component for preview/code tabs
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

// Props interface
export interface PropItem {
  name: string;
  type: string;
  default?: string;
  description: string;
}

// Variant interface for component variants showcase
export interface VariantItem {
  name: string;
  preview: React.ReactNode;
  code?: string;
}

// Extended tabs with preview/code/usage and optional CSS tab
interface PreviewCodeUsageTabsProps {
  preview: React.ReactNode;
  code: string;
  usage: string;
  codeLanguage?: string;
  props?: PropItem[];
  cssCode?: string; // For components that need global CSS
  dependencies?: string[]; // NPM packages to install
  variants?: VariantItem[]; // Component variants to showcase
}

export function PreviewCodeUsageTabs({ preview, code, usage, codeLanguage = "tsx", props, cssCode, dependencies, variants }: PreviewCodeUsageTabsProps) {
  const [activeTab, setActiveTab] = useState("preview");
  const [copiedVariant, setCopiedVariant] = useState<string | null>(null);

  const tabs: Tab[] = [
    { id: "preview", label: "Preview", icon: <Eye className="w-4 h-4" /> },
    { id: "variants", label: "Variants", icon: <Settings2 className="w-4 h-4" /> },
    { id: "code", label: "Code", icon: <Code2 className="w-4 h-4" /> },
    { id: "css", label: "CSS", icon: <FileCode className="w-4 h-4" /> },
    { id: "usage", label: "Usage", icon: <Package2 className="w-4 h-4" /> },
  ];

  // Filter tabs based on what is provided
  const visibleTabs = tabs.filter(tab => {
    if (tab.id === "css" && !cssCode) return false;
    if (tab.id === "variants" && (!variants || variants.length === 0)) return false;
    return true;
  });

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center px-1 py-1 bg-gradient-to-r from-accent/5 to-transparent">
        <div className="flex gap-0.5">
          {visibleTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "bg-accent text-white shadow-md"
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
            <div className="space-y-6">
              <div className="relative min-h-[200px] flex items-center justify-center p-8 border-b border-border/50">
                {preview}
              </div>
              {props && props.length > 0 && (
                <div className="px-6 pb-6">
                  <h3 className="flex items-center gap-2 text-sm font-semibold mb-4">
                    <Settings2 className="w-4 h-4" />
                    Props Reference
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border/50">
                          <th className="text-left py-2 px-3 font-medium text-muted-foreground">Prop</th>
                          <th className="text-left py-2 px-3 font-medium text-muted-foreground">Type</th>
                          <th className="text-left py-2 px-3 font-medium text-muted-foreground">Default</th>
                          <th className="text-left py-2 px-3 font-medium text-muted-foreground">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {props.map((prop) => (
                          <tr key={prop.name} className="border-b border-border/30">
                            <td className="py-2 px-3 font-mono text-accent">{prop.name}</td>
                            <td className="py-2 px-3 font-mono text-secondary">{prop.type}</td>
                            <td className="py-2 px-3 font-mono text-muted-foreground">{prop.default || '-'}</td>
                            <td className="py-2 px-3 text-muted-foreground">{prop.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ) : activeTab === "variants" && variants && variants.length > 0 ? (
            <div className="space-y-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {variants.map((variant, index) => (
                  <div key={index} className="rounded-lg border border-border bg-card/50 overflow-hidden">
                    <div className="flex items-center justify-between px-3 py-2 border-b border-border/50 bg-secondary/20">
                      <span className="text-sm font-medium">{variant.name}</span>
                      {variant.code && (
                        <CopyButton 
                          code={variant.code} 
                          onCopy={() => {
                            setCopiedVariant(variant.name);
                            setTimeout(() => setCopiedVariant(null), 2000);
                          }}
                          copied={copiedVariant === variant.name}
                        />
                      )}
                    </div>
                    <div className="flex items-center justify-center min-h-[120px] p-4">
                      {variant.preview}
                    </div>
                    {variant.code && (
                      <div className="border-t border-border/50">
                        <CodeBlock code={variant.code} language={codeLanguage} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === "code" ? (
            <div className="p-0">
              <CodeBlock code={code} language={codeLanguage} />
            </div>
          ) : activeTab === "css" ? (
            <div className="p-0">
              <CodeBlock code={cssCode!} language="css" />
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {dependencies && dependencies.length > 0 && (
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold mb-2">
                    <Package2 className="w-4 h-4" />
                    Dependencies
                  </h3>
                  <div className="bg-secondary/30 rounded-lg p-3">
                    <code className="text-sm">npm install {dependencies.join(' ')}</code>
                  </div>
                </div>
              )}
              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold mb-2">
                  <Package2 className="w-4 h-4" />
                  Usage
                </h3>
                <CodeBlock code={usage} language="tsx" />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
