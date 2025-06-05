
import React from 'react';
import { CardTemplate } from '@/lib/types/cardTypes';

// Template definitions
export const TEMPLATE_LIBRARY: CardTemplate[] = [
  {
    id: 'classic',
    name: 'Classic Baseball',
    description: 'Traditional baseball card design',
    thumbnail: '/templates/classic.jpg',
    category: 'sports',
    sport: 'baseball',
    style: 'classic',
    previewUrl: '/templates/classic-preview.jpg',
    designDefaults: {
      cardStyle: {
        template: 'classic',
        effect: 'none',
        borderRadius: '8px',
        borderColor: '#000000',
        frameWidth: 2,
        frameColor: '#000000'
      },
      textStyle: {
        titleColor: '#000000',
        titleAlignment: 'center',
        titleWeight: 'bold'
      }
    }
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean modern design',
    thumbnail: '/templates/modern.jpg',
    category: 'modern',
    sport: 'all',
    style: 'modern',
    previewUrl: '/templates/modern-preview.jpg',
    designDefaults: {
      cardStyle: {
        template: 'modern',
        effect: 'none',
        borderRadius: '12px',
        borderColor: '#333333',
        frameWidth: 1,
        frameColor: '#333333'
      }
    }
  },
  {
    id: 'vintage',
    name: 'Vintage',
    description: 'Retro vintage style',
    thumbnail: '/templates/vintage.jpg',
    category: 'vintage',
    sport: 'all',
    style: 'vintage',
    previewUrl: '/templates/vintage-preview.jpg',
    designDefaults: {
      cardStyle: {
        template: 'vintage',
        effect: 'vintage',
        borderRadius: '4px',
        borderColor: '#8B4513',
        frameWidth: 3,
        frameColor: '#8B4513'
      }
    }
  }
];

// Export the CardTemplate type
export { CardTemplate };

// Default export for compatibility
export default TEMPLATE_LIBRARY;

interface TemplateLibraryProps {
  onSelectTemplate: (template: CardTemplate) => void;
  selectedTemplate?: CardTemplate;
}

export const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ 
  onSelectTemplate, 
  selectedTemplate 
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {TEMPLATE_LIBRARY.map((template) => (
        <div
          key={template.id}
          className={`cursor-pointer border rounded-lg p-4 transition-all ${
            selectedTemplate?.id === template.id 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => onSelectTemplate(template)}
        >
          <div className="aspect-[2.5/3.5] bg-gray-100 rounded mb-2">
            <img 
              src={template.thumbnail} 
              alt={template.name}
              className="w-full h-full object-cover rounded"
            />
          </div>
          <h3 className="font-medium text-sm">{template.name}</h3>
          <p className="text-xs text-gray-500">{template.description}</p>
        </div>
      ))}
    </div>
  );
};
