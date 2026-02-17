"use client";

import { track } from "@vercel/analytics";

// Track component preview clicks
export function trackComponentPreview(componentName: string, componentSlug: string) {
  track("component_preview", {
    component_name: componentName,
    component_slug: componentSlug,
  });
}

// Track component import copy
export function trackComponentCopy(componentName: string, componentSlug: string) {
  track("component_copy", {
    component_name: componentName,
    component_slug: componentSlug,
  });
}

// Track favorites toggles
export function trackFavoriteToggle(componentName: string, componentSlug: string, isFavorite: boolean) {
  track("favorite_toggle", {
    component_name: componentName,
    component_slug: componentSlug,
    is_favorite: isFavorite,
  });
}

// Track search queries
export function trackSearch(query: string, resultCount: number) {
  track("search", {
    query,
    result_count: resultCount,
  });
}

// Track category views
export function trackCategoryView(category: string, componentCount: number) {
  track("category_view", {
    category,
    component_count: componentCount,
  });
}
