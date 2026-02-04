// Curio UI Component Registry
// Orchestrated by Opus 4.5, built by Gemini 3 Pro workers

import ThreeDButton from './3d-button';
import ShineButton from './shine-button';
import BorderGlowButton from './border-glow-button';
import GradientFillButton from './gradient-fill-button';
import WetPaintButton from './wet-paint-button';
import WetButton from './wet-button';
import GlassSurface from './glass-surface';

export { ThreeDButton, ShineButton, BorderGlowButton, GradientFillButton, WetPaintButton, WetButton, GlassSurface };

// Component metadata for the registry
export const buttons = [
  { name: '3d-button', displayName: '3D Button', description: 'Press effect', category: 'buttons' },
  { name: 'shine-button', displayName: 'Shine Button', description: 'Diagonal light sweep', category: 'buttons' },
  { name: 'border-glow-button', displayName: 'Border Glow', description: 'Mouse-tracking glow', category: 'buttons' },
  { name: 'gradient-fill-button', displayName: 'Gradient Fill', description: 'Gradient fill from bottom', category: 'buttons' },
  { name: 'wet-paint-button', displayName: 'Wet Paint', description: 'Dripping paint effect', category: 'buttons' },
  { name: 'wet-button', displayName: 'Wet Button', description: 'Dripping paint effect', category: 'buttons' },
] as const;

export type ButtonName = typeof buttons[number]['name'];
