
import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { MaterialSimulatorProps } from '@/components/gallery/types';

interface MaterialSimulation {
  metallic: number;
  roughness: number;
  color: string;
  emissive: string;
}

const MaterialSimulator: React.FC<MaterialSimulatorProps> = ({ 
  material, 
  className 
}) => {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            metalness={material.metallic}
            roughness={material.roughness}
            color={material.color}
            emissive={material.emissive}
          />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

const PbrDemo = () => {
  const [material, setMaterial] = useState<MaterialSimulation>({
    metallic: 0.5,
    roughness: 0.5,
    color: '#ffffff',
    emissive: '#000000'
  });

  const updateMaterial = (property: keyof MaterialSimulation, value: number | string) => {
    setMaterial(prev => ({ ...prev, [property]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">PBR Material Demo</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6 bg-gray-800 border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Material Preview</h2>
            <MaterialSimulator 
              material={material}
              className="h-96 rounded-lg overflow-hidden"
            />
          </Card>

          <Card className="p-6 bg-gray-800 border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Material Controls</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Metallic: {material.metallic.toFixed(2)}
                </label>
                <Slider
                  value={[material.metallic]}
                  onValueChange={([value]) => updateMaterial('metallic', value)}
                  max={1}
                  min={0}
                  step={0.01}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Roughness: {material.roughness.toFixed(2)}
                </label>
                <Slider
                  value={[material.roughness]}
                  onValueChange={([value]) => updateMaterial('roughness', value)}
                  max={1}
                  min={0}
                  step={0.01}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Base Color
                </label>
                <input
                  type="color"
                  value={material.color}
                  onChange={(e) => updateMaterial('color', e.target.value)}
                  className="w-full h-10 rounded border border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Emissive Color
                </label>
                <input
                  type="color"
                  value={material.emissive}
                  onChange={(e) => updateMaterial('emissive', e.target.value)}
                  className="w-full h-10 rounded border border-gray-600"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PbrDemo;
