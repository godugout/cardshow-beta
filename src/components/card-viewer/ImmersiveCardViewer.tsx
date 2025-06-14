
import React, { useState } from 'react';
import { Card } from '@/lib/types';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { toast } from 'sonner';
import Card3DRenderer from '../card-viewer/Card3DRenderer';

interface ImmersiveCardViewerProps {
  card: Card;
  activeEffects: string[];
  effectIntensities?: Record<string, number>;
}

const ImmersiveCardViewer: React.FC<ImmersiveCardViewerProps> = ({
  card,
  activeEffects = [],
  effectIntensities = {}
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [localActiveEffects, setLocalActiveEffects] = useState<string[]>(activeEffects);
  
  // Ensure card has proper image URLs and thumbnailUrl before rendering
  const enhancedCard: Card = {
    ...card,
    thumbnailUrl: card.thumbnailUrl || card.imageUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    imageUrl: card.imageUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475'
  };

  if (!enhancedCard.imageUrl) {
    console.log("Using fallback image for card:", enhancedCard.id);
  }

  // Convert CardEffect objects to strings for activeEffects
  const effectsAsStrings = enhancedCard.effects?.map(effect => 
    typeof effect === 'string' ? effect : effect.type || effect.name || 'unknown'
  ) || [];

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: '#111' }}
      >
        <ambientLight intensity={0.7} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1} 
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Card3DRenderer 
          card={enhancedCard}
          isFlipped={isFlipped} 
          activeEffects={localActiveEffects.length > 0 ? localActiveEffects : effectsAsStrings}
          effectIntensities={effectIntensities}
        />
        
        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={8}
        />
      </Canvas>
      
      {/* Controls overlay */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10">
        <button 
          className="px-4 py-2 bg-gray-800/70 text-white rounded-full hover:bg-gray-700/90 transition"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {isFlipped ? 'Show Front' : 'Show Back'}
        </button>
      </div>
    </div>
  );
};

export default ImmersiveCardViewer;
