
export interface ParticleSystemState {
  isActive: boolean;
  effects: Record<string, any>;
  isTransitioning: boolean;
  isPerformanceRestricted: boolean;
  performanceLevel: 'low' | 'medium' | 'high';
  lastUpdateTime: number;
}

export interface ParticleEffectSettings {
  enabled: boolean;
  intensity: number;
  color: string;
  speed: number;
  density: number;
}

export type ParticleEffectType = 'sparkle' | 'dust' | 'energy' | 'team';

export interface ParticleSettings {
  enabled: boolean;
  density: number;
  speed: number;
  size: number;
  color: string | string[];
  opacity: number;
  lifespan: number;
  reactivity: number;
  emissionPattern: 'full' | 'edges' | 'corners' | 'custom';
  customEmissionPoints?: [number, number][];
  blendMode?: string;
}

export const DEFAULT_PARTICLE_PRESETS: Record<string, { name: string; settings: Record<ParticleEffectType, ParticleSettings> }> = {
  subtle: {
    name: 'Subtle',
    settings: {
      sparkle: {
        enabled: true,
        density: 0.3,
        speed: 0.5,
        size: 0.8,
        color: '#ffffff',
        opacity: 0.6,
        lifespan: 1.5,
        reactivity: 0.3,
        emissionPattern: 'edges'
      },
      dust: {
        enabled: false,
        density: 0.2,
        speed: 0.3,
        size: 0.5,
        color: '#cccccc',
        opacity: 0.4,
        lifespan: 2.0,
        reactivity: 0.2,
        emissionPattern: 'full'
      },
      energy: {
        enabled: false,
        density: 0.1,
        speed: 0.4,
        size: 0.6,
        color: '#00ffff',
        opacity: 0.5,
        lifespan: 1.0,
        reactivity: 0.4,
        emissionPattern: 'corners'
      },
      team: {
        enabled: false,
        density: 0.2,
        speed: 0.3,
        size: 0.7,
        color: '#ff0000',
        opacity: 0.6,
        lifespan: 1.2,
        reactivity: 0.3,
        emissionPattern: 'edges'
      }
    }
  },
  dynamic: {
    name: 'Dynamic',
    settings: {
      sparkle: {
        enabled: true,
        density: 0.7,
        speed: 1.0,
        size: 1.2,
        color: '#ffff00',
        opacity: 0.8,
        lifespan: 1.0,
        reactivity: 0.8,
        emissionPattern: 'full'
      },
      dust: {
        enabled: true,
        density: 0.5,
        speed: 0.8,
        size: 0.8,
        color: '#ffffff',
        opacity: 0.6,
        lifespan: 1.5,
        reactivity: 0.6,
        emissionPattern: 'edges'
      },
      energy: {
        enabled: false,
        density: 0.3,
        speed: 1.2,
        size: 1.0,
        color: '#00ff00',
        opacity: 0.7,
        lifespan: 0.8,
        reactivity: 0.9,
        emissionPattern: 'corners'
      },
      team: {
        enabled: false,
        density: 0.4,
        speed: 0.9,
        size: 1.1,
        color: '#0000ff',
        opacity: 0.8,
        lifespan: 1.1,
        reactivity: 0.7,
        emissionPattern: 'full'
      }
    }
  }
};
