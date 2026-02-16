"use client";

import { usePreferences, type Preferences } from "@/hooks/use-preferences";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Settings, Grid3X3, List, Code, Play, Heart, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { components } from "@/config/components";

interface SettingsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsSheet({ open, onOpenChange }: SettingsSheetProps) {
  const { preferences, updatePreferences, isFavorite, toggleFavorite } = usePreferences();

  const handlePreferenceChange = <K extends keyof Preferences>(key: K, value: Preferences[K]) => {
    updatePreferences({ [key]: value });
  };

  // Get favorite components details
  const favoriteComponents = components.filter((c) => 
    preferences.favoriteComponents.includes(c.slug)
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Settings
          </SheetTitle>
          <SheetDescription>
            Customize your CurioKit experience
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-8 mt-6 overflow-y-auto max-h-[calc(100vh-140px)]">
          {/* Display Preferences */}
          <section className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
              Display
            </h3>
            
            <div className="space-y-4">
              {/* Default View */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Default View</label>
                  <p className="text-xs text-muted-foreground">Choose how components are displayed</p>
                </div>
                <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary">
                  <button
                    onClick={() => handlePreferenceChange("defaultView", "grid")}
                    className={`p-2 rounded-md transition-colors ${
                      preferences.defaultView === "grid" 
                        ? "bg-background shadow-sm" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handlePreferenceChange("defaultView", "list")}
                    className={`p-2 rounded-md transition-colors ${
                      preferences.defaultView === "list" 
                        ? "bg-background shadow-sm" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Show Code By Default */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Show Code by Default</label>
                  <p className="text-xs text-muted-foreground">Display code tab when viewing components</p>
                </div>
                <Switch
                  checked={preferences.showCodeByDefault}
                  onCheckedChange={(checked) => handlePreferenceChange("showCodeByDefault", checked)}
                />
              </div>

              {/* Auto-play Animations */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Auto-play Animations</label>
                  <p className="text-xs text-muted-foreground">Play component animations automatically</p>
                </div>
                <Switch
                  checked={preferences.autoPlayAnimations}
                  onCheckedChange={(checked) => handlePreferenceChange("autoPlayAnimations", checked)}
                />
              </div>
            </div>
          </section>

          {/* Favorites */}
          <section className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Favorites
            </h3>
            
            {favoriteComponents.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No favorites yet. Click the heart icon on any component to add it here.
              </p>
            ) : (
              <div className="space-y-2">
                {favoriteComponents.map((component) => (
                  <motion.div
                    key={component.slug}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-3 rounded-lg border border-border bg-card"
                  >
                    <div>
                      <p className="text-sm font-medium">{component.name}</p>
                      <p className="text-xs text-muted-foreground">{component.category}</p>
                    </div>
                    <button
                      onClick={() => toggleFavorite(component.slug)}
                      className="p-2 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-destructive"
                      title="Remove from favorites"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* Clear Data */}
          <section className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
              Data
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (confirm("Clear all preferences and favorites?")) {
                  updatePreferences({
                    defaultView: "grid",
                    showCodeByDefault: false,
                    autoPlayAnimations: true,
                    favoriteComponents: [],
                    recentlyViewed: [],
                  });
                }
              }}
              className="w-full justify-start gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Reset Preferences
            </Button>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
