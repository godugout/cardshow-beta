export interface MaterialSimulation {
  id: string;
  name: string;
  type: string;
  textureUrl?: string;
  baseColor?: string;
  weathering?: number;
  metallic?: number;
  roughness?: number;
  normalIntensity?: number;
  emissive?: string;
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
