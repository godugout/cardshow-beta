
import React from 'react';
import { cn } from '@/lib/utils';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  className?: string;
  colors?: string[];
  id?: string;
  label?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ 
  color, 
  onChange, 
  className,
  colors = ['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#888888'],
  id,
  label
}) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {label && <label htmlFor={id} className="text-sm font-medium">{label}</label>}
      {/* Predefined color palette */}
      <div className="flex gap-1 flex-wrap">
        {colors.map((presetColor) => (
          <button
            key={presetColor}
            type="button"
            className={`w-6 h-6 rounded-full border ${color === presetColor ? 'ring-2 ring-blue-500' : 'border-gray-300'}`}
            style={{ backgroundColor: presetColor }}
            onClick={() => onChange(presetColor)}
            title={presetColor}
          />
        ))}
      </div>
      
      {/* Custom color input */}
      <input
        id={id}
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-8 h-8 p-0 border-0 rounded-md"
      />
    </div>
  );
};
