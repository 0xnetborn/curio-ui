// Curio UI Text Components Registry

export { default as FuzzyText } from './fuzzy-text';
export type { FuzzyTextProps } from './fuzzy-text';

export const textComponents = [
  { name: 'fuzzy-text', displayName: 'Fuzzy Text', description: 'Canvas fuzzy/glitch text effect', category: 'text' },
] as const;

export type TextComponentName = typeof textComponents[number]['name'];
