import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '@/components/navigation/PageLayout';
import { Card, CardEffect } from '@/lib/types';
import { useCards } from '@/context/CardContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Download, Share2, Maximize2 } from 'lucide-react';
import ImmersiveCardViewer from '@/components/card-viewer/ImmersiveCardViewer';
import CardEffectsPanel from '@/components/card-creation/CardEffectsPanel';
import { cardEffectsToStringArray, stringArrayToCardEffects } from '@/lib/utils/cardEffectHelpers';

const CardViewerPage = () => {
  const { id } = useParams<{ id: string }>();
  const { cards } = useCards();
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [activeEffects, setActiveEffects] = useState<string[]>([]);
  const [effectIntensities, setEffectIntensities] = useState<Record<string, number>>({});
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (id && cards) {
      const card = cards.find(c => c.id === id);
      if (card) {
        setSelectedCard(card);
        
        // Initialize active effects from card
        if (card.effects && Array.isArray(card.effects)) {
          const effectStrings = cardEffectsToStringArray(card.effects);
          setActiveEffects(effectStrings);
          
          // Initialize effect intensities
          const intensities: Record<string, number> = {};
          card.effects.forEach(effect => {
            const effectName = typeof effect === 'string' ? effect : effect.name || effect.type;
            const intensity = typeof effect === 'string' ? 0.7 : effect.intensity || 0.7;
            intensities[effectName] = intensity;
          });
          setEffectIntensities(intensities);
        }
      }
    }
  }, [id, cards]);

  const handleEffectsChange = (effects: CardEffect[]) => {
    const effectStrings = cardEffectsToStringArray(effects);
    setActiveEffects(effectStrings);
  };

  const handleEffectToggle = (effect: string) => {
    setActiveEffects(prev => 
      prev.includes(effect)
        ? prev.filter(e => e !== effect)
        : [...prev, effect]
    );
  };

  const handleIntensityChange = (effect: string, intensity: number) => {
    setEffectIntensities(prev => ({
      ...prev,
      [effect]: intensity
    }));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    
    if (!isFullscreen) {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  if (!selectedCard) {
    return (
      <PageLayout title="Card Viewer" description="View your card in 3D">
        <div className="flex justify-center items-center h-64">
          <p>Loading card...</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title={selectedCard.title} 
      description="Immersive 3D card viewer"
      fullWidth={isFullscreen}
      className={isFullscreen ? 'p-0' : ''}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-[600px] bg-gray-900 rounded-lg overflow-hidden relative">
            <ImmersiveCardViewer 
              card={selectedCard}
              activeEffects={activeEffects}
              effectIntensities={effectIntensities}
            />
            
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button 
                variant="ghost" 
                size="icon"
                className="bg-black/30 text-white hover:bg-black/50"
                onClick={toggleFullscreen}
              >
                <Maximize2 className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon"
                className="bg-black/30 text-white hover:bg-black/50"
              >
                <Share2 className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon"
                className="bg-black/30 text-white hover:bg-black/50"
              >
                <Download className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">{selectedCard.title}</h2>
              <p className="text-gray-500 mt-1">{selectedCard.description}</p>
            </div>
            
            <Tabs defaultValue="effects">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="effects">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Effects
                </TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
              
              <TabsContent value="effects" className="pt-4">
                <CardEffectsPanel 
                  effectStack={stringArrayToCardEffects(activeEffects)}
                  onAddEffect={(effect) => handleEffectToggle(effect)}
                  onRemoveEffect={(id) => {
                    const effectToRemove = stringArrayToCardEffects(activeEffects).find(e => e.id === id);
                    if (effectToRemove) {
                      handleEffectToggle(effectToRemove.name || effectToRemove.type);
                    }
                  }}
                  onUpdateSettings={(id, settings) => {
                    const effect = stringArrayToCardEffects(activeEffects).find(e => e.id === id);
                    if (effect && settings.intensity !== undefined) {
                      handleIntensityChange(effect.name || effect.type, settings.intensity);
                    }
                  }}
                />
              </TabsContent>
              
              <TabsContent value="details" className="pt-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Card Details</h3>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {selectedCard.player && (
                        <div>
                          <p className="text-sm text-gray-500">Player</p>
                          <p>{selectedCard.player}</p>
                        </div>
                      )}
                      {selectedCard.team && (
                        <div>
                          <p className="text-sm text-gray-500">Team</p>
                          <p>{selectedCard.team}</p>
                        </div>
                      )}
                      {selectedCard.year && (
                        <div>
                          <p className="text-sm text-gray-500">Year</p>
                          <p>{selectedCard.year}</p>
                        </div>
                      )}
                      {selectedCard.set && (
                        <div>
                          <p className="text-sm text-gray-500">Set</p>
                          <p>{selectedCard.set}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {selectedCard.tags && selectedCard.tags.length > 0 && (
                    <div>
                      <h3 className="font-medium">Tags</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedCard.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CardViewerPage;
