import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardEffect } from '@/lib/types';
import { useCards } from '@/hooks/useCards';
import { cardEffectsToStringArray, stringArrayToCardEffects } from '@/lib/utils/cardEffectHelpers';
import PageLayout from '@/components/navigation/PageLayout';
import ImmersiveCardViewer from '@/components/card-viewer/ImmersiveCardViewer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Sparkles, Layers, Settings, Download, Share } from 'lucide-react';
import { toast } from 'sonner';
import sampleCards from '@/lib/data/sampleCardData';

const ImmersiveCardViewerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { cards, isLoading } = useCards();
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [activeEffects, setActiveEffects] = useState<string[]>(['Holographic']);
  const [effectIntensities, setEffectIntensities] = useState<Record<string, number>>({
    'Holographic': 0.7,
    'Refractor': 0.6,
    'Prismatic': 0.8,
    'Chrome': 0.5,
    'Vintage': 0.4
  });

  // Find card by ID from URL params or use first sample card
  useEffect(() => {
    if (id) {
      const foundCard = cards.find(card => card.id === id) || 
                        sampleCards.find(card => card.id === id);
      
      if (foundCard) {
        setSelectedCard(foundCard);
        
        // Extract effects from card
        if (foundCard.effects && foundCard.effects.length > 0) {
          const effectStrings = cardEffectsToStringArray(foundCard.effects);
          setActiveEffects(effectStrings);
        }
      } else if (!isLoading) {
        toast.error('Card not found');
      }
    } else if (sampleCards.length > 0) {
      setSelectedCard(sampleCards[0]);
      
      // Extract effects from first sample card
      if (sampleCards[0].effects && sampleCards[0].effects.length > 0) {
        const effectStrings = cardEffectsToStringArray(sampleCards[0].effects);
        setActiveEffects(effectStrings);
      }
    }
  }, [id, cards, isLoading]);

  const handleCardEffectsChange = (effects: CardEffect[]) => {
    const effectStrings = cardEffectsToStringArray(effects);
    setActiveEffects(effectStrings);
  };

  const toggleEffect = (effect: string) => {
    setActiveEffects(prev => 
      prev.includes(effect)
        ? prev.filter(e => e !== effect)
        : [...prev, effect]
    );
  };

  const updateEffectIntensity = (effect: string, intensity: number) => {
    setEffectIntensities(prev => ({
      ...prev,
      [effect]: intensity
    }));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedCard?.title || 'Check out this card',
        text: selectedCard?.description || 'An amazing digital card',
        url: window.location.href
      }).catch(err => {
        console.error('Error sharing:', err);
        toast.error('Failed to share card');
      });
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => toast.success('Link copied to clipboard'))
        .catch(() => toast.error('Failed to copy link'));
    }
  };

  const handleDownload = () => {
    toast.info('Preparing download...');
    // Implement actual download logic
    setTimeout(() => {
      toast.success('Card downloaded successfully');
    }, 1500);
  };

  if (isLoading) {
    return (
      <PageLayout title="Loading..." description="Loading immersive card viewer">
        <div className="flex justify-center items-center h-[70vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </PageLayout>
    );
  }

  if (!selectedCard) {
    return (
      <PageLayout title="Card Not Found" description="The requested card could not be found">
        <div className="flex flex-col justify-center items-center h-[50vh] gap-4">
          <h2 className="text-2xl font-bold">Card Not Found</h2>
          <p className="text-gray-500">The card you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={selectedCard.title}
      description="Immersive 3D card viewing experience"
      className="bg-gradient-to-b from-gray-900 to-gray-800 text-white"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main viewer */}
          <div className="lg:col-span-2 bg-black rounded-xl overflow-hidden shadow-2xl h-[70vh]">
            <ImmersiveCardViewer 
              card={selectedCard}
              activeEffects={activeEffects}
              effectIntensities={effectIntensities}
            />
          </div>
          
          {/* Controls sidebar */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">{selectedCard.title}</h2>
            
            <Tabs defaultValue="effects" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="effects" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> Effects
                </TabsTrigger>
                <TabsTrigger value="layers" className="flex items-center gap-2">
                  <Layers className="h-4 w-4" /> Layers
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" /> Settings
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="effects" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Available Effects</h3>
                  
                  <div className="space-y-3">
                    {['Holographic', 'Refractor', 'Prismatic', 'Chrome', 'Vintage'].map(effect => (
                      <div key={effect} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Switch 
                            checked={activeEffects.includes(effect)}
                            onCheckedChange={() => toggleEffect(effect)}
                          />
                          <Label>{effect}</Label>
                        </div>
                        
                        {activeEffects.includes(effect) && (
                          <div className="flex items-center gap-2 w-32">
                            <Slider
                              value={[effectIntensities[effect] * 100 || 70]}
                              min={0}
                              max={100}
                              step={5}
                              onValueChange={([value]) => updateEffectIntensity(effect, value / 100)}
                            />
                            <span className="text-xs w-8">{Math.round((effectIntensities[effect] || 0.7) * 100)}%</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="layers" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Card Layers</h3>
                  <p className="text-sm text-gray-400">Manage card layers and their visibility</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-700 rounded">
                      <span>Base Card</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-700 rounded">
                      <span>Text & Info</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-700 rounded">
                      <span>Effects Layer</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Viewer Settings</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Auto-rotate</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Show stats</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>High quality</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label>Background</Label>
                      <div className="grid grid-cols-5 gap-2">
                        {['#000000', '#0f172a', '#18181b', '#1e293b', '#transparent'].map(color => (
                          <div 
                            key={color} 
                            className="w-full aspect-square rounded-full border border-white/20 cursor-pointer"
                            style={{ backgroundColor: color === '#transparent' ? 'transparent' : color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-8 space-y-4">
              <p className="text-sm text-gray-400">{selectedCard.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {selectedCard.tags?.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4 mt-6">
                <Button 
                  variant="outline" 
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={handleShare}
                >
                  <Share className="h-4 w-4" /> Share
                </Button>
                <Button 
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4" /> Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ImmersiveCardViewerPage;
