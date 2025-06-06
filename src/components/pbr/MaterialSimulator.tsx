import React, { useState, useEffect, useRef } from 'react';
import { PbrSettings, MaterialSimulation } from '@/components/pbr/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';

interface MaterialSimulatorProps {
  material: MaterialSimulation;
  onChange: (newMaterial: Partial<MaterialSimulation>) => void;
  className?: string;
}

const MaterialSimulator: React.FC<MaterialSimulatorProps> = ({
  material,
  onChange,
  className
}) => {
  const [albedo, setAlbedo] = useState(material.baseColor || '#ffffff');
  const [roughness, setRoughness] = useState(material.roughness ?? 0.5);
  const [metalness, setMetalness] = useState(material.metalness ?? material.metallic ?? 0.5);
  const [clearcoat, setClearcoat] = useState(material.clearcoat ?? 0);
  const [clearcoatRoughness, setClearcoatRoughness] = useState(material.clearcoatRoughness ?? 0);
  const [ior, setIor] = useState(material.ior ?? 1.5);
  const [transmission, setTransmission] = useState(material.transmission ?? 0);
  const [reflectivity, setReflectivity] = useState(material.reflectivity ?? 0.5);
  const [emissive, setEmissive] = useState(material.emissive || '#000000');
  const [envMapIntensity, setEnvMapIntensity] = useState(material.envMapIntensity ?? 1);
  const [normalIntensity, setNormalIntensity] = useState(material.normalIntensity ?? 1);
  const [weathering, setWeathering] = useState(material.weathering ?? 0);
  
  const previewRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setAlbedo(material.baseColor || '#ffffff');
    setRoughness(material.roughness ?? 0.5);
    setMetalness(material.metalness ?? material.metallic ?? 0.5);
    setClearcoat(material.clearcoat ?? 0);
    setClearcoatRoughness(material.clearcoatRoughness ?? 0);
    setIor(material.ior ?? 1.5);
    setTransmission(material.transmission ?? 0);
    setReflectivity(material.reflectivity ?? 0.5);
    setEmissive(material.emissive || '#000000');
    setEnvMapIntensity(material.envMapIntensity ?? 1);
    setNormalIntensity(material.normalIntensity ?? 1);
    setWeathering(material.weathering ?? 0);
  }, [material]);
  
  useEffect(() => {
    if (previewRef.current) {
      const element = previewRef.current;
      element.style.setProperty('--material-albedo', albedo);
      element.style.setProperty('--material-roughness', roughness.toString());
      element.style.setProperty('--material-metalness', metalness.toString());
      element.style.setProperty('--material-clearcoat', clearcoat.toString());
      element.style.setProperty('--material-clearcoatRoughness', clearcoatRoughness.toString());
      element.style.setProperty('--material-ior', ior.toString());
      element.style.setProperty('--material-transmission', transmission.toString());
      element.style.setProperty('--material-reflectivity', reflectivity.toString());
      element.style.setProperty('--material-emissive', emissive);
      element.style.setProperty('--material-envMapIntensity', envMapIntensity.toString());
      element.style.setProperty('--material-normalIntensity', normalIntensity.toString());
      element.style.setProperty('--material-weathering', weathering ? weathering.toString() : '0');
    }
  }, [albedo, roughness, metalness, clearcoat, clearcoatRoughness, ior, transmission, reflectivity, emissive, envMapIntensity, normalIntensity, weathering]);
  
  const handleAlbedoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAlbedo = e.target.value;
    setAlbedo(newAlbedo);
    onChange({ baseColor: newAlbedo });
  };
  
  const handleRoughnessChange = (value: number[]) => {
    const newRoughness = value[0];
    setRoughness(newRoughness);
    onChange({ roughness: newRoughness });
  };
  
  const handleMetalnessChange = (value: number[]) => {
    const newMetalness = value[0];
    setMetalness(newMetalness);
    onChange({ metalness: newMetalness });
  };
  
  const handleClearcoatChange = (value: number[]) => {
    const newClearcoat = value[0];
    setClearcoat(newClearcoat);
    onChange({ clearcoat: newClearcoat });
  };
  
  const handleClearcoatRoughnessChange = (value: number[]) => {
    const newClearcoatRoughness = value[0];
    setClearcoatRoughness(newClearcoatRoughness);
    onChange({ clearcoatRoughness: newClearcoatRoughness });
  };
  
  const handleIorChange = (value: number[]) => {
    const newIor = value[0];
    setIor(newIor);
    onChange({ ior: newIor });
  };
  
  const handleTransmissionChange = (value: number[]) => {
    const newTransmission = value[0];
    setTransmission(newTransmission);
    onChange({ transmission: newTransmission });
  };
  
  const handleReflectivityChange = (value: number[]) => {
    const newReflectivity = value[0];
    setReflectivity(newReflectivity);
    onChange({ reflectivity: newReflectivity });
  };
  
  const handleEmissiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmissive = e.target.value;
    setEmissive(newEmissive);
    onChange({ emissive: newEmissive });
  };
  
  const handleEnvMapIntensityChange = (value: number[]) => {
    const newEnvMapIntensity = value[0];
    setEnvMapIntensity(newEnvMapIntensity);
    onChange({ envMapIntensity: newEnvMapIntensity });
  };
  
  const handleNormalIntensityChange = (value: number[]) => {
    const newNormalIntensity = value[0];
    setNormalIntensity(newNormalIntensity);
    onChange({ normalIntensity: newNormalIntensity });
  };
  
  const handleWeatheringChange = (value: number[]) => {
    const newWeathering = value[0];
    setWeathering(newWeathering);
    onChange({ weathering: newWeathering });
  };
  
  return (
    <div className={cn("grid gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="albedo">Albedo</Label>
        <Input id="albedo" value={albedo} onChange={handleAlbedoChange} type="color" />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="roughness">Roughness</Label>
        <Slider
          id="roughness"
          defaultValue={[roughness]}
          max={1}
          step={0.01}
          onValueChange={handleRoughnessChange}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="metalness">Metalness</Label>
        <Slider
          id="metalness"
          defaultValue={[metalness]}
          max={1}
          step={0.01}
          onValueChange={handleMetalnessChange}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="clearcoat">Clearcoat</Label>
        <Slider
          id="clearcoat"
          defaultValue={[clearcoat]}
          max={1}
          step={0.01}
          onValueChange={handleClearcoatChange}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="clearcoatRoughness">Clearcoat Roughness</Label>
        <Slider
          id="clearcoatRoughness"
          defaultValue={[clearcoatRoughness]}
          max={1}
          step={0.01}
          onValueChange={handleClearcoatRoughnessChange}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="ior">Index of Refraction (IOR)</Label>
        <Slider
          id="ior"
          defaultValue={[ior]}
          min={1}
          max={2.5}
          step={0.01}
          onValueChange={handleIorChange}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="transmission">Transmission</Label>
        <Slider
          id="transmission"
          defaultValue={[transmission]}
          max={1}
          step={0.01}
          onValueChange={handleTransmissionChange}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="reflectivity">Reflectivity</Label>
        <Slider
          id="reflectivity"
          defaultValue={[reflectivity]}
          max={1}
          step={0.01}
          onValueChange={handleReflectivityChange}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="emissive">Emissive</Label>
        <Input id="emissive" value={emissive} onChange={handleEmissiveChange} type="color" />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="envMapIntensity">Environment Map Intensity</Label>
        <Slider
          id="envMapIntensity"
          defaultValue={[envMapIntensity]}
          max={1}
          step={0.01}
          onValueChange={handleEnvMapIntensityChange}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="normalIntensity">Normal Intensity</Label>
        <Slider
          id="normalIntensity"
          defaultValue={[normalIntensity]}
          max={1}
          step={0.01}
          onValueChange={handleNormalIntensityChange}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="weathering">Weathering</Label>
        <Slider
          id="weathering"
          defaultValue={[weathering]}
          max={1}
          step={0.01}
          onValueChange={handleWeatheringChange}
        />
      </div>
      
      <div className="border rounded-md">
        <AspectRatio ratio={1 / 1}>
          <div 
            className="w-full h-full"
            style={{
              backgroundColor: albedo,
              '--material-albedo': albedo,
              '--material-roughness': roughness.toString(),
              '--material-metalness': metalness.toString(),
              '--material-clearcoat': clearcoat.toString(),
              '--material-clearcoatRoughness': clearcoatRoughness.toString(),
              '--material-ior': ior.toString(),
              '--material-transmission': transmission.toString(),
              '--material-reflectivity': reflectivity.toString(),
              '--material-emissive': emissive,
              '--material-envMapIntensity': envMapIntensity.toString(),
              '--material-normalIntensity': normalIntensity.toString(),
              '--material-weathering': weathering.toString(),
            }}
            ref={previewRef}
          />
        </AspectRatio>
      </div>
    </div>
  );
};

export default MaterialSimulator;
