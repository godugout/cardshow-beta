import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/lib/types/unifiedCardTypes';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { showToast } from '@/lib/utils/toastHelpers';
import { stringToCardEffect } from '@/lib/utils/cardEffectHelpers';

const ImmersiveCardViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeEffects, setActiveEffects] = useState<CardEffect[]>([
    stringToCardEffect('holographic'), stringToCardEffect('refractor')
  ]);

  useEffect(() => {
    if (!id) {
      showToast.error("Invalid card", "No card ID provided");
      navigate('/gallery');
      return;
    }

    // Simulate loading card data
    setTimeout(() => {
      // Mock card data
      const mockCard: Card = {
        id: id,
        title: 'Sample Card',
        description: 'This is a sample card for demonstration purposes.',
        imageUrl: 'https://placehold.co/600x400/orange/white?text=Sample+Card',
        thumbnailUrl: 'https://placehold.co/600x400/orange/white?text=Sample+Card',
        tags: ['sample', 'card'],
        userId: 'system',
        effects: ['Holographic', 'Refractor'],
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
            frameColor: '#000000'
          },
          textStyle: {
            titleColor: '#000000',
            titleAlignment: 'center',
            titleWeight: 'bold',
            descriptionColor: '#333333'
          },
          cardMetadata: {
            category: 'general',
            series: 'base',
            cardType: 'standard'
          },
          marketMetadata: {
            price: 0,
            currency: 'USD',
            availableForSale: false,
            editionSize: 0,
            editionNumber: 0,
            isPrintable: false,
            isForSale: false,
            includeInCatalog: false
          }
        }
      };
      
      setCard(mockCard);
      setLoading(false);
      showToast.info("Card loaded", "Interactive viewer ready");
    }, 1000);
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-transparent border-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading immersive viewer...</p>
        </div>
      </div>
    );
  }

  if (!card) {
    showToast.error("Card not found", "The requested card could not be loaded");
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Card not found</h2>
          <Button onClick={() => navigate('/gallery')}>
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Gallery
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="absolute top-4 left-4 z-10">
        <Button variant="ghost" onClick={() => navigate(-1)} className="text-white">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
      </div>

      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="relative max-w-2xl max-h-[80vh] mx-4">
          <div className="relative aspect-[2.5/3.5] w-full rounded-lg overflow-hidden shadow-2xl">
            <img 
              src={card.imageUrl} 
              alt={card.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-6 text-center text-white">
            <h1 className="text-3xl font-bold">{card.title}</h1>
            {card.description && (
              <p className="text-gray-300 mt-2 text-lg">{card.description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImmersiveCardViewer;
