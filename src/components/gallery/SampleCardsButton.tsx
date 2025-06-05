
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useCards } from '@/context/CardContext';
import { Card } from '@/lib/types';
import { toast } from 'sonner';
import { DEFAULT_CARD_STYLE, DEFAULT_TEXT_STYLE, MarketMetadata } from '@/components/card-templates/TemplateTypes';

const SampleCardsButton: React.FC = () => {
  const { addCard } = useCards();

  const createSampleCards = async () => {
    const defaultMarketMetadata: MarketMetadata = {
      isPrintable: false,
      isForSale: false,
      includeInCatalog: false,
      price: 0,
      currency: 'USD',
      availableForSale: false,
      editionSize: 1,
      editionNumber: 1
    };

    const sampleCards: Partial<Card>[] = [
      {
        id: `sample-card-${Date.now()}-1`,
        title: "2023 Rookie Sensation",
        description: "First-year phenom with incredible stats and promising future.",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop",
        tags: ["rookie", "baseball", "2023"],
        userId: "sample-user",
        effects: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        designMetadata: {
          cardStyle: DEFAULT_CARD_STYLE,
          textStyle: DEFAULT_TEXT_STYLE,
          cardMetadata: {
            category: 'sports',
            series: 'rookie',
            cardType: 'standard'
          },
          marketMetadata: defaultMarketMetadata
        }
      },
      {
        id: `sample-card-${Date.now()}-2`,
        title: "Championship MVP",
        description: "The hero who led the team to victory in the championship game.",
        imageUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&h=600&fit=crop",
        tags: ["mvp", "champion", "sports"],
        userId: "sample-user",
        effects: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        designMetadata: {
          cardStyle: DEFAULT_CARD_STYLE,
          textStyle: DEFAULT_TEXT_STYLE,
          cardMetadata: {
            category: 'sports',
            series: 'championship',
            cardType: 'special'
          },
          marketMetadata: defaultMarketMetadata
        }
      },
      {
        id: `sample-card-${Date.now()}-3`,
        title: "Legend Series",
        description: "A tribute to the all-time greats who shaped the game.",
        imageUrl: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=600&fit=crop",
        tags: ["legend", "vintage", "collectible"],
        userId: "sample-user",
        effects: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        designMetadata: {
          cardStyle: DEFAULT_CARD_STYLE,
          textStyle: DEFAULT_TEXT_STYLE,
          cardMetadata: {
            category: 'sports',
            series: 'legends',
            cardType: 'limited'
          },
          marketMetadata: defaultMarketMetadata
        }
      }
    ];

    try {
      for (const cardData of sampleCards) {
        await addCard(cardData);
      }
      toast.success(`Added ${sampleCards.length} sample cards to your collection!`);
    } catch (error) {
      console.error('Error adding sample cards:', error);
      toast.error('Failed to add sample cards');
    }
  };

  return (
    <Button 
      onClick={createSampleCards}
      variant="outline"
      className="flex items-center gap-2"
    >
      <Plus className="h-4 w-4" />
      Add Sample Cards
    </Button>
  );
};

export default SampleCardsButton;
