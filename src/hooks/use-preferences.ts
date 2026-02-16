"use client";

import { useState, useEffect } from "react";

export type Preferences = {
  defaultView: "grid" | "list";
  showCodeByDefault: boolean;
  autoPlayAnimations: boolean;
  favoriteComponents: string[];
  recentlyViewed: string[];
};

const DEFAULT_PREFERENCES: Preferences = {
  defaultView: "grid",
  showCodeByDefault: false,
  autoPlayAnimations: true,
  favoriteComponents: [],
  recentlyViewed: [],
};

const STORAGE_KEY = "curiokit-preferences";

export function usePreferences() {
  const [preferences, setPreferences] = useState<Preferences>(DEFAULT_PREFERENCES);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPreferences({ ...DEFAULT_PREFERENCES, ...JSON.parse(stored) });
      }
    } catch (e) {
      console.error("Failed to load preferences:", e);
    }
    setIsLoaded(true);
  }, []);

  // Save preferences to localStorage whenever they change
  const updatePreferences = (updates: Partial<Preferences>) => {
    setPreferences((prev) => {
      const newPrefs = { ...prev, ...updates };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newPrefs));
      } catch (e) {
        console.error("Failed to save preferences:", e);
      }
      return newPrefs;
    });
  };

  // Toggle favorite for a component
  const toggleFavorite = (componentSlug: string) => {
    setPreferences((prev) => {
      const favorites = prev.favoriteComponents.includes(componentSlug)
        ? prev.favoriteComponents.filter((s) => s !== componentSlug)
        : [...prev.favoriteComponents, componentSlug];
      
      const newPrefs = { ...prev, favoriteComponents: favorites };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newPrefs));
      } catch (e) {
        console.error("Failed to save preferences:", e);
      }
      return newPrefs;
    });
  };

  // Add to recently viewed
  const addToRecentlyViewed = (componentSlug: string) => {
    setPreferences((prev) => {
      const recent = [
        componentSlug,
        ...prev.recentlyViewed.filter((s) => s !== componentSlug),
      ].slice(0, 12); // Keep max 12 recent items
      
      const newPrefs = { ...prev, recentlyViewed: recent };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newPrefs));
      } catch (e) {
        console.error("Failed to save preferences:", e);
      }
      return newPrefs;
    });
  };

  const isFavorite = (componentSlug: string) => {
    return preferences.favoriteComponents.includes(componentSlug);
  };

  return {
    preferences,
    isLoaded,
    updatePreferences,
    toggleFavorite,
    addToRecentlyViewed,
    isFavorite,
  };
}
