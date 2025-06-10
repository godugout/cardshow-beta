
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, HelpCircle } from 'lucide-react';

interface HelpPanelProps {
  stepKey: string;
  onClose: () => void;
}

const HelpPanel: React.FC<HelpPanelProps> = ({
  stepKey,
  onClose
}) => {
  const helpContent = {
    template: {
      title: 'Template Selection',
      content: 'Choose a template that matches the style you want for your card. You can always customize it further in later steps.'
    },
    upload: {
      title: 'Image Upload',
      content: 'Upload a high-quality image for your card. Supported formats include JPG, PNG, and GIF.'
    },
    design: {
      title: 'Design Customization',
      content: 'Customize the colors, borders, and layout of your card to make it unique.'
    },
    effects: {
      title: 'Visual Effects',
      content: 'Add special visual effects like holographic, prismatic, or foil to make your card stand out.'
    },
    text: {
      title: 'Text Details',
      content: 'Add the title, description, and other details to your card. All fields are optional except the title.'
    },
    finalize: {
      title: 'Final Preview',
      content: 'Review your card one last time before saving. You can always edit it later.'
    }
  };

  const help = helpContent[stepKey as keyof typeof helpContent] || helpContent.template;

  return (
    <Card className="p-4 bg-blue-50 border-blue-200">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <HelpCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">{help.title}</h4>
            <p className="text-sm text-blue-700 mt-1">{help.content}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-blue-600 hover:text-blue-800"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default HelpPanel;
