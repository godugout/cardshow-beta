import React, { useState, useEffect, useRef } from 'react';
import { MaterialSimulation } from '@/components/pbr/types';
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
      element.style.setProperty('--material-roughness', String(roughness));
      element.style.setProperty('--material-metalness', String(metalness));
      element.style.setProperty('--material-clearcoat', String(clearcoat));
      element.style.setProperty('--material-clearcoatRoughness', String(clearcoatRoughness));
      element.style.setProperty('--material-ior', String(ior));
      element.style.setProperty('--material-transmission', String(transmission));
      element.style.setProperty('--material-reflectivity', String(reflectivity));
      element.style.setProperty('--material-emissive', emissive);
      element.style.setProperty('--material-envMapIntensity', String(envMapIntensity));
      element.style.setProperty('--material-normalIntensity', String(normalIntensity));
      element.style.setProperty('--material-weathering', weathering ? String(weathering) : '0');
    }
  }, [albedo, roughness, metalness, clearcoat, clearcoatRoughness, ior, transmission, reflectivity, emissive, envMapIntensity, normalIntensity, weathering]);
  
  return (
    <div className={cn("grid gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="albedo">Albedo</Label>
        <Input id="albedo" value={albedo} onChange={(e) => {
          setAlbedo(e.target.value);
          onChange({ baseColor: e.target.value });
        }} type="color" />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="roughness">Roughness</Label>
        <Slider
          id="roughness"
          defaultValue={[roughness]}
          value={[roughness]}
          max={1}
          step={0.01}
          onValueChange={(value) => {
            setRoughness(value[0]);
            onChange({ roughness: value[0] });
          }}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="metalness">Metalness</Label>
        <Slider
          id="metalness"
          defaultValue={[metalness]}
          value={[metalness]}
          max={1}
          step={0.01}
          onValueChange={(value) => {
            setMetalness(value[0]);
            onChange({ metalness: value[0] });
          }}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="clearcoat">Clearcoat</Label>
        <Slider
          id="clearcoat"
          defaultValue={[clearcoat]}
          value={[clearcoat]}
          max={1}
          step={0.01}
          onValueChange={(value) => {
            setClearcoat(value[0]);
            onChange({ clearcoat: value[0] });
          }}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="clearcoatRoughness">Clearcoat Roughness</Label>
        <Slider
          id="clearcoatRoughness"
          defaultValue={[clearcoatRoughness]}
          value={[clearcoatRoughness]}
          max={1}
          step={0.01}
          onValueChange={(value) => {
            setClearcoatRoughness(value[0]);
            onChange({ clearcoatRoughness: value[0] });
          }}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="ior">Index of Refraction (IOR)</Label>
        <Slider
          id="ior"
          defaultValue={[ior]}
          value={[ior]}
          min={1}
          max={2.5}
          step={0.01}
          onValueChange={(value) => {
            setIor(value[0]);
            onChange({ ior: value[0] });
          }}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="transmission">Transmission</Label>
        <Slider
          id="transmission"
          defaultValue={[transmission]}
          value={[transmission]}
          max={1}
          step={0.01}
          onValueChange={(value) => {
            setTransmission(value[0]);
            onChange({ transmission: value[0] });
          }}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="reflectivity">Reflectivity</Label>
        <Slider
          id="reflectivity"
          defaultValue={[reflectivity]}
          value={[reflectivity]}
          max={1}
          step={0.01}
          onValueChange={(value) => {
            setReflectivity(value[0]);
            onChange({ reflectivity: value[0] });
          }}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="emissive">Emissive</Label>
        <Input id="emissive" value={emissive} onChange={(e) => {
          setEmissive(e.target.value);
          onChange({ emissive: e.target.value });
        }} type="color" />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="envMapIntensity">Environment Map Intensity</Label>
        <Slider
          id="envMapIntensity"
          defaultValue={[envMapIntensity]}
          value={[envMapIntensity]}
          max={1}
          step={0.01}
          onValueChange={(value) => {
            setEnvMapIntensity(value[0]);
            onChange({ envMapIntensity: value[0] });
          }}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="normalIntensity">Normal Intensity</Label>
        <Slider
          id="normalIntensity"
          defaultValue={[normalIntensity]}
          value={[normalIntensity]}
          max={1}
          step={0.01}
          onValueChange={(value) => {
            setNormalIntensity(value[0]);
            onChange({ normalIntensity: value[0] });
          }}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="weathering">Weathering</Label>
        <Slider
          id="weathering"
          defaultValue={[weathering]}
          value={[weathering]}
          max={1}
          step={0.01}
          onValueChange={(value) => {
            setWeathering(value[0]);
            onChange({ weathering: value[0] });
          }}
        />
      </div>
      
      <div className="border rounded-md">
        <AspectRatio ratio={1 / 1}>
          <div 
            className="w-full h-full"
            style={{
              backgroundColor: albedo,
            }}
            ref={previewRef}
          />
        </AspectRatio>
      </div>
    </div>
  );
};

export default MaterialSimulator;
