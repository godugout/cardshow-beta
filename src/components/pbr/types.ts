
export interface MaterialSimulation {
  id: string;
  name: string;
  type: string;
  textureUrl?: string;
  baseColor?: string;
  weathering?: number;
  metallic?: number;
  metalness?: number;
  roughness?: number;
  normalIntensity?: number;
  emissive?: string;
  clearcoat?: number;
  clearcoatRoughness?: number;
  ior?: number;
  transmission?: number;
  reflectivity?: number;
  envMapIntensity?: number;
}

export interface PBRMaterial {
  albedo: string;
  metallic: number;
  roughness: number;
  normal: number;
  emissive: string;
  ao: number;
}

export interface MaterialPreset {
  name: string;
  material: PBRMaterial;
  weathering?: number;
}

export interface PbrSettings {
  metallic: number;
  roughness: number;
  clearcoat: number;
  clearcoatRoughness: number;
  ior: number;
  transmission: number;
  reflectivity: number;
  emissive: string;
  envMapIntensity: number;
  metalness?: number;
  exposure?: number;
  reflectionStrength?: number;
}

export interface PbrSceneOptions {
  lighting: 'studio' | 'outdoor' | 'dramatic';
  environment: string;
  exposure: number;
  background: boolean;
  cleanup: () => void;
}
