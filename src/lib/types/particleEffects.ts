
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
