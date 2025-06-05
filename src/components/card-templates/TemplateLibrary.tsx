
import React from 'react';
import { CardTemplate } from './TemplateTypes';

// This is a placeholder - in a real app this would come from an API
const defaultTemplates: CardTemplate[] = [
  {
    id: 'template-1',
    name: 'Classic Sports Card',
    description: 'Traditional sports card layout',
    imageUrl: '/placeholder-template.png',
    cardStyle: {
      template: 'classic',
      effect: 'none',
      borderRadius: '8px',
      borderWidth: 2,
      borderColor: '#000000',
      backgroundColor: '#FFFFFF',
      shadowColor: 'rgba(0,0,0,0.2)',
      frameWidth: 2,
      frameColor: '#000000',
    },
    textStyle: {
      fontFamily: 'Inter',
      fontSize: '16px',
      fontWeight: 'normal',
      color: '#000000',
      titleColor: '#000000',
      titleAlignment: 'center',
      titleWeight: 'bold',
      descriptionColor: '#333333',
    },
    backgroundColor: '#FFFFFF',
    category: 'sports',
    tags: ['classic', 'sports']
  }
];

interface TemplateLibraryProps {
  onSelectTemplate: (template: CardTemplate) => void;
}

const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ onSelectTemplate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {defaultTemplates.map((template) => (
        <div 
          key={template.id}
          className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onSelectTemplate(template)}
        >
          <div className="aspect-[2.5/3.5] bg-gray-100 rounded mb-2">
            <img 
              src={template.imageUrl} 
              alt={template.name}
              className="w-full h-full object-cover rounded"
            />
          </div>
          <h3 className="font-semibold">{template.name}</h3>
          <p className="text-sm text-gray-600">{template.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TemplateLibrary;
export { type CardTemplate };
