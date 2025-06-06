import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Database } from 'lucide-react';
import { useCards } from '@/context/CardContext';
import { useToast } from '@/hooks/use-toast';
import { createToast } from '@/types/toast';

interface SampleCardsButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

const SampleCardsButton: React.FC<SampleCardsButtonProps> = ({ variant = 'default' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addCard } = useCards();
  const { toast } = useToast();

  // Since addSampleCards doesn't exist in context, let's implement it here
  const addSampleCards = async () => {
    // Mock implementation - in a real app this would fetch sample data
    const sampleCards = [];
    for (let i = 0; i < 10; i++) {
      const sampleCard = {
        id: `sample-${i + 1}`,
        title: `Sample Card ${i + 1}`,
        description: 'A sample card for demonstration',
        imageUrl: '/images/card-placeholder.png',
        tags: ['sample', 'demo'],
        userId: 'sample-user',
        effects: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        designMetadata: {
          cardStyle: {
            template: 'classic',
            effect: 'none',
            borderRadius: '8px',
            borderColor: '#000000',
            shadowColor: 'rgba(0,0,0,0.2)',
            frameWidth: 2,
            frameColor: '#000000',
          },
          textStyle: {
            titleColor: '#000000',
            titleAlignment: 'center',
            titleWeight: 'bold',
            descriptionColor: '#333333',
          },
          cardMetadata: {
            category: 'sample',
            series: 'demo',
            cardType: 'standard',
          },
          marketMetadata: {
            isPrintable: false,
            isForSale: false,
            includeInCatalog: false,
            price: 0,
            currency: 'USD',
            availableForSale: false,
            editionSize: 1,
            editionNumber: 1,
          }
        }
      };
      sampleCards.push(sampleCard);
    }
    
    // Add the sample cards to the collection
    for (const card of sampleCards) {
      await addCard(card);
    }
    
    return sampleCards;
  };

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const cards = await addSampleCards();
      toast(createToast({
        title: "Sample cards added",
        description: `${cards.length} sample cards have been added to your collection`,
        variant: "success"
      }));
    } catch (error) {
      console.error("Failed to add sample cards:", error);
      toast(createToast({
        title: "Failed to add sample cards",
        description: "An error occurred while adding sample cards",
        variant: "destructive"
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      onClick={handleClick}
      disabled={isLoading}
    >
      <Database className="mr-2 h-4 w-4" />
      {isLoading ? "Adding..." : "Add Sample Cards"}
    </Button>
  );
};

export default SampleCardsButton;
