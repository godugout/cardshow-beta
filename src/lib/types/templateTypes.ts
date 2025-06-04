
/**
 * Template system types for card creation
 */

export interface Template {
  id: string;
  name: string;
  description?: string;
  category: TemplateCategory;
  thumbnailUrl?: string;
  previewUrl?: string;
  tags: string[];
  isOfficial: boolean;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
  creatorId?: string;
  usageCount: number;
  rating?: number;
  layout: TemplateLayout;
  styling: TemplateStyling;
}

export interface TemplateLayout {
  width: number;
  height: number;
  layers: TemplateLayer[];
  placeholders: TemplatePlaceholder[];
}

export interface TemplateLayer {
  id: string;
  type: 'background' | 'image' | 'text' | 'shape' | 'effect';
  position: { x: number; y: number; z: number };
  size: { width: number; height: number };
  rotation: number;
  opacity: number;
  blendMode?: string;
  properties: Record<string, any>;
}

export interface TemplatePlaceholder {
  id: string;
  type: 'image' | 'text' | 'logo';
  label: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  constraints: PlaceholderConstraints;
  defaultValue?: string;
}

export interface PlaceholderConstraints {
  required: boolean;
  maxLength?: number;
  allowedFormats?: string[];
  aspectRatio?: number;
  minSize?: { width: number; height: number };
  maxSize?: { width: number; height: number };
}

export interface TemplateStyling {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    primary: string;
    secondary: string;
    sizes: Record<string, number>;
    weights: Record<string, number>;
  };
  effects: TemplateEffect[];
}

export interface TemplateEffect {
  type: 'shadow' | 'glow' | 'gradient' | 'border' | 'texture';
  properties: Record<string, any>;
  targets: string[]; // Layer IDs this effect applies to
}

export enum TemplateCategory {
  SPORTS = 'sports',
  GAMING = 'gaming',
  ENTERTAINMENT = 'entertainment',
  BUSINESS = 'business',
  PERSONAL = 'personal',
  ARTISTIC = 'artistic',
  VINTAGE = 'vintage',
  MODERN = 'modern',
  MINIMAL = 'minimal',
  DECORATIVE = 'decorative'
}

// Updated CardTemplate interface with missing properties
export interface CardTemplate {
  id: string;
  name: string;
  description?: string;
  category: string;
  previewImage: string;
  thumbnail?: string;
  thumbnailUrl?: string;
  isOfficial: boolean;
  popularity?: number;
  layoutData: Record<string, any>;
}

// Use export type for re-exports to fix isolatedModules error
export type { Template as CardTemplate2, TemplateCategory as Category };
