"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Copy, Check, BookOpen, Palette, Zap, Box, Layers, Code, Terminal, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const installationCode = `npm install curio-kit`;

const usageCode = `import { ThreeDButton } from "curio-kit";

export default function App() {
  return (
    <ThreeDButton>Click me</ThreeDButton>
  );
}`;

const themingCode = `/* tailwind.config.js */
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        accent: "#14B8A6",
        background: "#FAFAFA",
        foreground: "#0A0A0A",
      },
    },
  },
};`;

const darkModeCode = `import { useTheme } from "next-themes";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
}`;

const copyToClipboard = async (text: string, setCopied: (v: boolean) => void) => {
  await navigator.clipboard.writeText(text);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};

function CodeBlock({ code, language = "bash" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  
  return (
    <div className="relative group">
      <pre className="p-4 rounded-lg bg-muted overflow-x-auto text-sm">
        <code className="text-foreground font-mono">{code}</code>
      </pre>
      <button
        onClick={() => copyToClipboard(code, setCopied)}
        className="absolute top-2 right-2 p-2 rounded-md bg-background/80 border border-border opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Copy code"
      >
        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
      </button>
    </div>
  );
}

function DocSection({ 
  id, 
  title, 
  icon: Icon, 
  children 
}: { 
  id: string; 
  title: string; 
  icon: React.ElementType; 
  children: React.ReactNode;
}) {
  const [activeSection, setActiveSection] = useState("");
  
  return (
    <section id={id} className="scroll-mt-20">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-accent" />
        <h2 className="font-display text-2xl font-bold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

const docsSections = [
  { id: "installation", title: "Installation", icon: Terminal },
  { id: "usage", title: "Basic Usage", icon: Code },
  { id: "theming", title: "Theming", icon: Palette },
  { id: "dark-mode", title: "Dark Mode", icon: Moon },
  { id: "components", title: "Components", icon: Box },
];

export default function DocsPage() {
  const { resolvedTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("installation");
  const isDark = resolvedTheme === "dark";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-display text-xl font-bold">CurioKit</span>
              <span className="px-2 py-0.5 text-xs font-medium bg-accent/10 text-accent rounded">Docs</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {docsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`text-sm transition-colors ${
                    activeSection === section.id 
                      ? "text-accent font-medium" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>
            <Link 
              href="/components"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
            >
              Browse Components <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[1fr_250px] gap-12">
          {/* Main Content */}
          <main className="space-y-16">
            {/* Hero */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10">
                <BookOpen className="w-4 h-4 text-accent" />
                <span className="text-accent text-sm font-medium">Documentation</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
                Get started with CurioKit
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                A collection of high-quality, animated UI components designed for modern web experiences. 
                Built with React, Framer Motion, and Tailwind CSS.
              </p>
            </motion.div>

            {/* Installation */}
            <DocSection id="installation" title="Installation" icon={Terminal}>
              <p className="text-muted-foreground mb-4">
                Install CurioKit using your preferred package manager:
              </p>
              <CodeBlock code={installationCode} />
              <div className="mt-4 p-4 rounded-lg bg-accent/10 border border-accent/20">
                <p className="text-sm text-accent">
                  <strong>Note:</strong> CurioKit is currently in alpha. API may change. 
                  Check the GitHub repo for latest version.
                </p>
              </div>
            </DocSection>

            {/* Usage */}
            <DocSection id="usage" title="Basic Usage" icon={Code}>
              <p className="text-muted-foreground mb-4">
                Import and use components in your React application:
              </p>
              <CodeBlock code={usageCode} language="tsx" />
            </DocSection>

            {/* Theming */}
            <DocSection id="theming" title="Theming" icon={Palette}>
              <p className="text-muted-foreground mb-4">
                CurioKit uses CSS variables for theming. Configure your Tailwind config:
              </p>
              <CodeBlock code={themingCode} language="javascript" />
              <p className="text-muted-foreground mt-4">
                The library provides these default colors: <code className="px-1.5 py-0.5 bg-muted rounded text-sm">accent</code>,{" "}
                <code className="px-1.5 py-0.5 bg-muted rounded text-sm">background</code>,{" "}
                <code className="px-1.5 py-0.5 bg-muted rounded text-sm">foreground</code>,{" "}
                <code className="px-1.5 py-0.5 bg-muted rounded text-sm">card</code>,{" "}
                <code className="px-1.5 py-0.5 bg-muted rounded text-sm">muted</code>,{" "}
                <code className="px-1.5 py-0.5 bg-muted rounded text-sm">border</code>
              </p>
            </DocSection>

            {/* Dark Mode */}
            <DocSection id="dark-mode" title="Dark Mode" icon={Moon}>
              <p className="text-muted-foreground mb-4">
                CurioKit supports dark mode out of the box. Use with next-themes:
              </p>
              <CodeBlock code={darkModeCode} language="tsx" />
              <p className="text-muted-foreground mt-4">
                Components automatically adapt to the current theme. The library uses the{" "}
                <code className="px-1.5 py-0.5 bg-muted rounded text-sm">dark:</code> prefix for 
                dark mode specific styles.
              </p>
            </DocSection>

            {/* Components */}
            <DocSection id="components" title="Components" icon={Box}>
              <p className="text-muted-foreground mb-6">
                Browse our collection of animated components organized by category:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: "Buttons", count: 12, desc: "Interactive buttons with animations", href: "/components/buttons" },
                  { name: "Text Effects", count: 8, desc: "Animated text and typography", href: "/components/text" },
                  { name: "Backgrounds", count: 6, desc: "Animated backgrounds and patterns", href: "/components/backgrounds" },
                  { name: "Cards", count: 5, desc: "Interactive card components", href: "/components/spotlight-card" },
                  { name: "Effects", count: 4, desc: "Visual effects and animations", href: "/components/effects" },
                ].map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="group p-4 rounded-xl border border-border bg-card hover:border-accent/30 transition-all hover:shadow-lg hover:shadow-accent/5"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium group-hover:text-accent transition-colors">{category.name}</h3>
                      <span className="text-xs text-muted-foreground">{category.count}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{category.desc}</p>
                  </Link>
                ))}
              </div>
            </DocSection>
          </main>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="font-semibold mb-4">On This Page</h3>
                <nav className="space-y-1">
                  {docsSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        setActiveSection(section.id);
                        document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={`block w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors ${
                        activeSection === section.id
                          ? "bg-accent/10 text-accent font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-4 rounded-xl border border-border bg-card">
                <h4 className="font-medium mb-2">Need Help?</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Have questions or need support?
                </p>
                <a
                  href="https://github.com/curiositas-studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent hover:underline"
                >
                  View on GitHub →
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
