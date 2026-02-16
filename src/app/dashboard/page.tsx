"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Search, 
  LayoutGrid, 
  Layers, 
  MousePointer, 
  Type, 
  Loader2, 
  Sparkles,
  Star,
  Clock,
  ArrowRight,
  Terminal,
  Copy,
  Check
} from "lucide-react";
import { components, componentCategories, getComponentsByCategory } from "@/config/components";

const categoryIcons = {
  backgrounds: Layers,
  buttons: MousePointer,
  cards: LayoutGrid,
  text: Type,
  loaders: Loader2,
  effects: Sparkles,
};

// Quick preview card for dashboard
function QuickComponentCard({
  component,
  index
}: {
  component: typeof components[0];
  index: number;
}) {
  const [copied, setCopied] = useState(false);

  const copyImport = () => {
    const importPath = component.slug.startsWith('components/') 
      ? component.slug 
      : component.slug.replace('buttons/', 'components/buttons/').replace('text-animations/', 'components/text/');
    navigator.clipboard.writeText(`import ${component.name.replace(/\s+/g, '')} from "@/registry/${importPath}"`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const CategoryIcon = categoryIcons[component.category] || Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="group relative p-4 rounded-lg border border-border bg-card hover:border-accent/30 hover:bg-card/80 transition-all"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <CategoryIcon className="w-4 h-4 text-accent" />
          <span className="font-medium text-sm">{component.name}</span>
        </div>
        <div className="flex items-center gap-1">
          {component.isNew && (
            <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase bg-accent text-accent-foreground rounded">
              New
            </span>
          )}
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
        {component.description}
      </p>
      
      <div className="flex items-center gap-2">
        <Link
          href={`/${component.slug}`}
          className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-medium bg-foreground text-background rounded hover:opacity-90 transition-opacity"
        >
          Preview
          <ArrowRight className="w-3 h-3" />
        </Link>
        <button
          onClick={copyImport}
          className="p-1.5 text-xs border border-border rounded hover:bg-secondary transition-colors"
          title="Copy import"
        >
          {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
        </button>
      </div>
    </motion.div>
  );
}

// Category stat card
function CategoryCard({
  category,
  count,
  index
}: {
  category: string;
  count: number;
  index: number;
}) {
  const categoryData = componentCategories[category as keyof typeof componentCategories];
  const Icon = categoryIcons[category as keyof typeof categoryIcons] || Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        href={`/components?category=${category}`}
        className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:border-accent/30 hover:bg-card/80 transition-all group"
      >
        <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
          <Icon className="w-5 h-5 text-accent" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-sm">{categoryData?.name || category}</h3>
          <p className="text-xs text-muted-foreground">{count} components</p>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
      </Link>
    </motion.div>
  );
}

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter components based on search
  const filteredComponents = useMemo(() => {
    if (!searchQuery) return components.slice(0, 12); // Show first 12 by default
    return components.filter((comp) => 
      comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Get component counts by category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    components.forEach((comp) => {
      counts[comp.category] = (counts[comp.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Get newest components
  const newComponents = useMemo(() => {
    return components.filter((c) => c.isNew).slice(0, 6);
  }, []);

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <div className="p-2 rounded-lg bg-accent/10">
            <Terminal className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Quick access to all components</p>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative max-w-xl"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-card text-base focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </motion.div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Components", value: components.length, icon: LayoutGrid },
          { label: "New This Week", value: newComponents.length, icon: Star },
          { label: "Categories", value: Object.keys(componentCategories).length, icon: Layers },
          { label: "Premium", value: components.filter(c => c.isPremium).length, icon: Sparkles },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="p-4 rounded-lg border border-border bg-card"
          >
            <div className="flex items-center gap-2 mb-1">
              <stat.icon className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
          </motion.div>
        ))}
      </section>

      {/* Categories Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Categories</h2>
          <Link href="/components" className="text-sm text-accent hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.entries(categoryCounts).map(([category, count], i) => (
            <CategoryCard key={category} category={category} count={count} index={i} />
          ))}
        </div>
      </section>

      {/* New Components */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-accent" />
            <h2 className="font-display text-xl font-semibold">New & Featured</h2>
          </div>
          <Link href="/components?new=true" className="text-sm text-accent hover:underline">
            View all new
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {newComponents.map((comp, i) => (
            <QuickComponentCard key={comp.slug} component={comp} index={i} />
          ))}
        </div>
      </section>

      {/* Quick Access / Search Results */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-accent" />
            <h2 className="font-display text-xl font-semibold">
              {searchQuery ? `Results for "${searchQuery}"` : "Popular Components"}
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredComponents.map((comp, i) => (
            <QuickComponentCard key={comp.slug} component={comp} index={i} />
          ))}
        </div>
        {filteredComponents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No components found matching "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-sm text-accent hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
