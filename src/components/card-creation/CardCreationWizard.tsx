
import React, { useState } from 'react';
import { Card } from '@/lib/types/cardTypes';
import { Button } from '@/components/ui/button';
import CardPreview from './components/CardPreview';
import { DEFAULT_CARD_STYLE, DEFAULT_TEXT_STYLE, DEFAULT_MARKET_METADATA } from '@/lib/types/cardTypes';

interface CardCreationWizardProps {
  onComplete: (card: Card) => void;
  onCancel: () => void;
}

const CardCreationWizard: React.FC<CardCreationWizardProps> = ({ onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [cardData, setCardData] = useState<Partial<Card>>({
    title: '',
    description: '',
    imageUrl: '',
    tags: [],
    effects: [],
    designMetadata: {
      cardStyle: DEFAULT_CARD_STYLE,
      textStyle: DEFAULT_TEXT_STYLE,
      cardMetadata: { category: 'general' },
      marketMetadata: DEFAULT_MARKET_METADATA
    }
  });

  const steps = ['Upload', 'Design', 'Effects', 'Finalize'];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    const finalCard: Card = {
      id: `card-${Date.now()}`,
      title: cardData.title || 'Untitled Card',
      description: cardData.description || '',
      imageUrl: cardData.imageUrl || '',
      thumbnailUrl: cardData.thumbnailUrl || cardData.imageUrl || '',
      tags: cardData.tags || [],
      userId: 'user-1',
      effects: cardData.effects || [],
      designMetadata: cardData.designMetadata || {
        cardStyle: DEFAULT_CARD_STYLE,
        textStyle: DEFAULT_TEXT_STYLE,
        cardMetadata: { category: 'general' },
        marketMetadata: DEFAULT_MARKET_METADATA
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      rarity: 'common'
    };

    onComplete(finalCard);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Step indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`flex items-center ${
                index <= currentStep ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  index <= currentStep ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'
                }`}
              >
                {index + 1}
              </div>
              <span className="ml-2 font-medium">{step}</span>
              {index < steps.length - 1 && (
                <div className="w-12 h-px bg-gray-300 ml-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main content */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">{steps[currentStep]} Step</h2>
          
          {/* Step content would go here - simplified for now */}
          <div className="p-6 border rounded-lg">
            <p>Step {currentStep + 1} content goes here</p>
            
            {currentStep === 0 && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Card title"
                  value={cardData.title || ''}
                  onChange={(e) => setCardData({ ...cardData, title: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <textarea
                  placeholder="Card description"
                  value={cardData.description || ''}
                  onChange={(e) => setCardData({ ...cardData, description: e.target.value })}
                  className="w-full p-2 border rounded"
                  rows={3}
                />
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={currentStep === 0 ? onCancel : handlePrevious}
            >
              {currentStep === 0 ? 'Cancel' : 'Previous'}
            </Button>
            
            <Button
              onClick={currentStep === steps.length - 1 ? handleComplete : handleNext}
            >
              {currentStep === steps.length - 1 ? 'Create Card' : 'Next'}
            </Button>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Preview</h3>
          <div className="flex justify-center">
            <CardPreview 
              cardData={cardData as Card} 
              className="transform scale-75" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCreationWizard;
