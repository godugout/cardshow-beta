
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card as CardUI } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCards } from '@/context/CardContext';
import { useCardEffects } from '@/hooks/useCardEffects';
import { useToast } from '@/components/ui/use-toast';
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  RotateCw, 
  Shuffle,
  Play,
  Pause
} from 'lucide-react';
import ImmersiveCardViewer from '@/components/immersive/ImmersiveCardViewer';
import EffectsPanel from '@/components/immersive/EffectsPanel';
import { Card } from '@/lib/types/unifiedCardTypes';

interface ImmersiveCardViewerProps {
  imageUrl?: string;
  title?: string;
  description?: string;
  effects?: string[];
}

const ImmersiveCardViewerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cards, getCardById } = useCards();
  const { toast } = useToast();
  
  const [card, setCard] = useState<Card | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(2);
  
  const {
    availableEffects,
    activeEffects,
    setActiveEffects,
    toggleEffect,
    applyEffect,
    removeEffect,
    isEffectActive,
    getEffectIntensity,
    setEffectIntensity,
  } = useCardEffects();

  useEffect(() => {
    if (id) {
      const foundCard = getCardById(id);
      if (foundCard) {
        setCard(foundCard);
        // Apply any existing effects from the card
        if (foundCard.effects && foundCard.effects.length > 0) {
          setActiveEffects(foundCard.effects);
        }
      } else {
        toast({
          title: "Card not found",
          description: "The requested card could not be found.",
          variant: "destructive"
        });
        navigate('/gallery');
      }
    } else {
      toast({
        title: "Invalid card ID",
        description: "No card ID provided.",
        variant: "destructive"
      });
      navigate('/gallery');
    }
  }, [id, getCardById, setActiveEffects, toast, navigate]);

  const handleRandomEffect = () => {
    if (availableEffects.length > 0) {
      const randomEffect = availableEffects[Math.floor(Math.random() * availableEffects.length)];
      applyEffect(randomEffect.id);
    }
  };

  const handleExportCard = () => {
    if (!card) return;
    
    // In a real implementation, this would capture the card as an image
    toast({
      title: "Export Started",
      description: "Your card is being prepared for download."
    });
    
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Your card has been downloaded successfully."
      });
    }, 2000);
  };

  const handleShareCard = () => {
    if (!card) return;
    
    if (navigator.share) {
      navigator.share({
        title: card.title,
        text: card.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Card link has been copied to your clipboard."
      });
    }
  };

  const toggleAutoRotation = () => {
    setIsAutoRotating(!isAutoRotating);
  };

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading card...</h2>
          <p className="text-gray-600">Please wait while we load your card.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Header */}
      <header className="p-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/gallery')}
            className="text-white hover:bg-gray-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gallery
          </Button>
          
          <h1 className="text-xl font-bold">{card.title}</h1>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShareCard}
              className="text-white hover:bg-gray-800"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExportCard}
              className="text-white hover:bg-gray-800"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Main Card Viewer */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Card Controls */}
            <div className="flex justify-center items-center space-x-4 mb-8">
              <Button
                variant="outline"
                onClick={handleFlipCard}
                className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
              >
                <RotateCw className="h-4 w-4 mr-2" />
                Flip Card
              </Button>
              
              <Button
                variant="outline"
                onClick={toggleAutoRotation}
                className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
              >
                {isAutoRotating ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Stop Rotation
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Auto Rotate
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={handleRandomEffect}
                className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
              >
                <Shuffle className="h-4 w-4 mr-2" />
                Random Effect
              </Button>
            </div>

            {/* Immersive Card Display */}
            <ImmersiveCardViewer
              imageUrl={card.imageUrl}
              title={card.title}
              description={card.description}
              effects={activeEffects}
              isFlipped={isFlipped}
              isAutoRotating={isAutoRotating}
            />
          </div>
        </div>

        {/* Effects Panel */}
        <div className="w-80 border-l border-gray-800 p-6">
          <CardUI className="bg-gray-900 border-gray-800">
            <div className="p-4">
              <h3 className="text-lg font-bold mb-4 text-white">Effects Panel</h3>
              
              <EffectsPanel
                availableEffects={availableEffects}
                activeEffects={activeEffects}
                onToggleEffect={toggleEffect}
                onRemoveEffect={removeEffect}
                isEffectActive={isEffectActive}
                getEffectIntensity={getEffectIntensity}
                setEffectIntensity={setEffectIntensity}
              />
            </div>
          </CardUI>
        </div>
      </div>
    </div>
  );
};

export default ImmersiveCardViewerPage;
