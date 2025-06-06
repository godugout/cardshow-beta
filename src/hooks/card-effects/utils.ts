import { PremiumCardEffect } from './types';

export const defaultEffectSettings = {
  intensity: 1.0,
  speed: 1.0,
  pattern: 'none',
  color: '#FFFFFF',
  animationEnabled: true,
};

export const applyEffect = (element: HTMLElement, effectId: string, settings: Record<string, any>) => {
  // Check if the element already has the effect applied
  if (element.classList.contains(effectId)) {
    console.warn(`Effect "${effectId}" already applied to element. Skipping.`);
    return;
  }
  
  // Add the effect class to the element
  element.classList.add(effectId);
  
  // Apply the settings to the element as CSS variables
  Object.keys(settings).forEach(key => {
    element.style.setProperty(`--${effectId}-${key}`, settings[key]);
  });
};

export const removeEffect = (element: HTMLElement, effectId: string) => {
  // Remove the effect class from the element
  element.classList.remove(effectId);
  
  // Remove the settings from the element
  Object.keys(element.style).forEach(key => {
    if (key.startsWith(`--${effectId}`)) {
      element.style.removeProperty(key);
    }
  });
};

export const toggleEffect = (element: HTMLElement, effectId: string, settings: Record<string, any>) => {
  if (element.classList.contains(effectId)) {
    removeEffect(element, effectId);
  } else {
    applyEffect(element, effectId, settings);
  }
};

export const updateEffectSettings = (element: HTMLElement, effectId: string, settings: Record<string, any>) => {
  Object.keys(settings).forEach(key => {
    element.style.setProperty(`--${effectId}-${key}`, settings[key]);
  });
};

export const getEffectSettings = (element: HTMLElement, effectId: string) => {
  const settings: Record<string, any> = {};
  Object.keys(element.style).forEach(key => {
    if (key.startsWith(`--${effectId}`)) {
      const settingName = key.replace(`--${effectId}-`, '');
      settings[settingName] = element.style.getPropertyValue(key);
    }
  });
  return settings;
};

export const premiumEffects: Record<string, PremiumCardEffect> = {
  holographic: {
    id: 'holographic',
    name: 'Holographic',
    category: 'premium',
    className: 'effect-holographic',
    settings: {
      intensity: 1.0,
      speed: 1.0,
    },
    description: 'Creates a rainbow holographic effect that shifts with viewing angle',
    premium: false,
    iconUrl: '/icons/holographic.svg',
  },
  
  prismatic: {
    id: 'prismatic',
    name: 'Prismatic',
    category: 'premium',
    className: 'effect-prismatic',
    settings: {
      intensity: 1.0,
      speed: 1.0,
    },
    description: 'Disperses light into beautiful rainbow patterns',
    premium: false,
    iconUrl: '/icons/prismatic.svg',
  },
  
  refractor: {
    id: 'refractor',
    name: 'Refractor',
    category: 'premium',
    className: 'effect-refractor',
    settings: {
      intensity: 1.0,
      speed: 1.0,
      pattern: 'diamond',
    },
    description: 'Creates complex light refraction patterns',
    premium: true,
    iconUrl: '/icons/refractor.svg',
  },
  
  metallic: {
    id: 'metallic',
    name: 'Metallic Shine',
    category: 'premium',
    className: 'effect-metallic',
    settings: {
      intensity: 1.0,
      speed: 1.0,
      pattern: 'brushed',
    },
    description: 'Simulates brushed metal surface with realistic shine',
    premium: true,
    iconUrl: '/icons/metallic.svg',
  },
  
  goldFoil: {
    id: 'gold-foil',
    name: 'Gold Foil',
    category: 'premium',
    className: 'effect-gold-foil',
    settings: {
      intensity: 1.0,
      speed: 1.0,
      pattern: 'foil',
    },
    description: 'Luxurious gold foil finish with authentic metallic luster',
    premium: true,
    iconUrl: '/icons/gold-foil.svg',
  },
  
  animated: {
    id: 'animated',
    name: 'Animated',
    category: 'special',
    className: 'effect-animated',
    settings: {
      intensity: 1.0,
      speed: 1.0,
      pattern: 'wave',
      animationEnabled: true,
    },
    description: 'Dynamic animated effects that bring cards to life',
    premium: true,
    iconUrl: '/icons/animated.svg',
  }
};
