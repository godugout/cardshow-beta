
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface TemplateSelectionStepProps {
  selectedTemplate: string;
  onSelectTemplate: (template: string) => void;
}

const TemplateSelectionStep: React.FC<TemplateSelectionStepProps> = ({
  selectedTemplate,
  onSelectTemplate
}) => {
  const templates = [
    { id: 'classic', name: 'Classic Card', preview: '/templates/classic.jpg' },
    { id: 'modern', name: 'Modern Design', preview: '/templates/modern.jpg' },
    { id: 'vintage', name: 'Vintage Style', preview: '/templates/vintage.jpg' },
    { id: 'holographic', name: 'Holographic', preview: '/templates/holo.jpg' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Choose a Template</h3>
        <p className="text-muted-foreground">Select a template to start creating your card</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className={`cursor-pointer transition-all ${
              selectedTemplate === template.id 
                ? 'ring-2 ring-primary border-primary' 
                : 'hover:border-primary/50'
            }`}
            onClick={() => onSelectTemplate(template.id)}
          >
            <div className="p-4 text-center">
              <div className="w-full h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded mb-3"></div>
              <h4 className="font-medium text-sm">{template.name}</h4>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelectionStep;
