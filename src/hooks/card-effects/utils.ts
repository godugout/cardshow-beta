
import { PremiumCardEffect, EffectCategory } from './types';

// Utility functions for card effects

export const generateEffectId = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '-');
};

export const createEffectSettings = (defaults: Record<string, any>) => {
  return {
    intensity: 1.0,
    speed: 1.0,
    animationEnabled: true,
    ...defaults
  };
};

export const validateEffectSettings = (settings: Record<string, any>): boolean => {
  if (!settings) return false;
  
  const requiredFields = ['intensity', 'speed'];
  return requiredFields.every(field => 
    settings.hasOwnProperty(field) && 
    typeof settings[field] === 'number'
  );
};

export const applyEffectToElement = (
  element: HTMLElement, 
  effectId: string, 
  settings: Record<string, any>
): void => {
  if (!element || !effectId) return;
  
  // Remove existing effect classes
  element.className = element.className.replace(/effect-\w+/g, '');
  
  // Apply new effect class
  element.classList.add(`effect-${effectId}`);
  
  // Apply settings as CSS custom properties
  Object.entries(settings).forEach(([key, value]) => {
    element.style.setProperty(`--${key}`, String(value));
  });
};

export const removeEffectFromElement = (element: HTMLElement, effectId: string): void => {
  if (!element || !effectId) return;
  
  element.classList.remove(`effect-${effectId}`);
  
  // Remove related CSS custom properties
  const style = element.style;
  for (let i = style.length - 1; i >= 0; i--) {
    const prop = style[i];
    if (prop.startsWith('--') && prop.includes(effectId)) {
      style.removeProperty(prop);
    }
  }
};

// Predefined effect configurations
export const getBasicEffects = (): PremiumCardEffect[] => [
  {
    id: 'holographic',
    name: 'Holographic',
    category: 'premium',
    settings: {
      intensity: 0.8,
      speed: 1.2,
    },
    description: 'Stunning holographic rainbow effect',
    premium: false,
    enabled: true,
    iconUrl: '/icons/holographic.svg'
  },
  {
    id: 'refractor',
    name: 'Refractor',
    category: 'premium',
    settings: {
      intensity: 0.9,
      speed: 0.8,
      pattern: 'diagonal'
    },
    description: 'Premium refractor light effect',
    premium: true,
    enabled: true,
    iconUrl: '/icons/refractor.svg'
  },
  {
    id: 'superfractor',
    name: 'Superfractor',
    category: 'premium',
    settings: {
      intensity: 1.0,
      speed: 1.5,
      pattern: 'radial'
    },
    description: 'Ultra-rare superfractor effect',
    premium: true,
    enabled: true,
    iconUrl: '/icons/superfractor.svg'
  },
  {
    id: 'prizm',
    name: 'Prizm',
    category: 'premium',
    settings: {
      intensity: 0.7,
      speed: 1.0,
      pattern: 'linear'
    },
    description: 'Classic Prizm rainbow effect',
    premium: true,
    enabled: true,
    iconUrl: '/icons/prizm.svg'
  },
  {
    id: 'cracked-ice',
    name: 'Cracked Ice',
    category: 'premium',
    settings: {
      intensity: 0.6,
      speed: 0.5,
      pattern: 'fractal',
      animationEnabled: true
    },
    description: 'Unique cracked ice pattern',
    premium: true,
    enabled: true,
    iconUrl: '/icons/cracked-ice.svg'
  },
  {
    id: 'mosaic',
    name: 'Mosaic',
    category: 'premium',
    settings: {
      intensity: 0.8,
      speed: 0.3,
      pattern: 'geometric'
    },
    description: 'Geometric mosaic effect',
    premium: true,
    enabled: true,
    iconUrl: '/icons/mosaic.svg'
  },
  {
    id: 'gold-foil',
    name: 'Gold Foil',
    category: 'foil',
    settings: {
      intensity: 0.9,
      speed: 0.7,
      color: '#FFD700'
    },
    description: 'Luxurious gold foil finish',
    premium: false,
    enabled: true,
    iconUrl: '/icons/gold-foil.svg'
  },
  {
    id: 'silver-foil',
    name: 'Silver Foil',
    category: 'foil',
    settings: {
      intensity: 0.8,
      speed: 0.6,
      color: '#C0C0C0'
    },
    description: 'Classic silver foil effect',
    premium: false,
    enabled: true,
    iconUrl: '/icons/silver-foil.svg'
  },
  {
    id: 'chrome',
    name: 'Chrome',
    category: 'metallic',
    settings: {
      intensity: 1.0,
      speed: 0.4
    },
    description: 'Mirror-like chrome finish',
    premium: false,
    enabled: true,
    iconUrl: '/icons/chrome.svg'
  },
  {
    id: 'vintage',
    name: 'Vintage',
    category: 'classic',
    settings: {
      intensity: 0.5,
      speed: 0.2,
      pattern: 'aged'
    },
    description: 'Classic vintage card look',
    premium: false,
    enabled: true,
    iconUrl: '/icons/vintage.svg'
  },
  {
    id: 'sepia',
    name: 'Sepia',
    category: 'classic',
    settings: {
      intensity: 0.6,
      speed: 0.1
    },
    description: 'Warm sepia tone effect',
    premium: false,
    enabled: true,
    iconUrl: '/icons/sepia.svg'
  },
  {
    id: 'neon',
    name: 'Neon Glow',
    category: 'modern',
    settings: {
      intensity: 0.9,
      speed: 2.0,
      animationEnabled: true
    },
    description: 'Electric neon glow effect',
    premium: true,
    enabled: true,
    iconUrl: '/icons/neon.svg'
  }
];

export const getEffectCategories = (): EffectCategory[] => [
  {
    id: 'premium',
    name: 'Premium Effects',
    description: 'High-end holographic and refractor effects',
    effects: getBasicEffects().filter(e => e.category === 'premium')
  },
  {
    id: 'foil',
    name: 'Foil Effects',
    description: 'Metallic foil finishes',
    effects: getBasicEffects().filter(e => e.category === 'foil')
  },
  {
    id: 'metallic',
    name: 'Metallic Effects',
    description: 'Chrome and metallic surfaces',
    effects: getBasicEffects().filter(e => e.category === 'metallic')
  },
  {
    id: 'classic',
    name: 'Classic Effects',
    description: 'Traditional vintage looks',
    effects: getBasicEffects().filter(e => e.category === 'classic')
  },
  {
    id: 'modern',
    name: 'Modern Effects',
    description: 'Contemporary digital effects',
    effects: getBasicEffects().filter(e => e.category === 'modern')
  }
];
