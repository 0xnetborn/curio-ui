// Curio UI Component Registry
// Orchestrated by Opus 4.5, built by Gemini 3 Pro workers

export { ThreeDButton, type ThreeDButtonProps } from './3d-button';
export { ShineButton, type ShineButtonProps } from './shine-button';
export { BorderGlowButton, type BorderGlowButtonProps } from './border-glow-button';
export { GradientFillButton, type GradientFillButtonProps } from './gradient-fill-button';
export { WetButton, type WetButtonProps } from './wet-button';
export { GlassSurface } from './glass-surface';

// Component metadata for the registry
export const buttons = [
  {
    name: '3d-button',
    displayName: '3D Button',
    description: 'Press effect with translate-y + ripple on hover',
    category: 'buttons',
  },
  {
    name: 'shine-button',
    displayName: 'Shine Button',
    description: 'Diagonal light sweep animation on hover',
    category: 'buttons',
  },
  {
    name: 'border-glow-button',
    displayName: 'Border Glow Button',
    description: 'Cyan gradient border that glows on hover',
    category: 'buttons',
  },
  {
    name: 'gradient-fill-button',
    displayName: 'Gradient Fill Button',
    description: 'Animated gradient fill with directional movement',
    category: 'buttons',
  },
  {
    name: 'wet-button',
    displayName: 'Wet Paint Button',
    description: 'Dripping paint effect on hover',
    category: 'buttons',
  },
] as const;

export type ButtonName = typeof buttons[number]['name'];
