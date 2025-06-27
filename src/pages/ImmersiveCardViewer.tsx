
import React, { useState, useEffect } from 'react';
import { Card, CardEffect } from '@/lib/types/core';
import { stringToCardEffect } from '@/lib/utils/cardEffectHelpers';
import { DEFAULT_DESIGN_METADATA } from '@/lib/utils/cardDefaults';

interface ImmersiveCardViewerProps {
  card?: Card;
  onClose?: () => void;
}

const ImmersiveCardViewer: React.FC<ImmersiveCardViewerProps> = ({ 
  card: propCard, 
  onClose 
}) => {
  const [currentCard, setCurrentCard] = useState<Card>(propCard || {
    id: '1',
    title: 'Sample Holographic Card',
    description: 'A beautiful card with holographic effects',
    imageUrl: 'https://placehold.co/400x600/4f46e5/ffffff?text=Holographic+Card',
    thumbnailUrl: 'https://placehold.co/200x300/4f46e5/ffffff?text=Holographic+Card',
    tags: ['holographic', 'premium', 'showcase'],
    effects: [stringToCardEffect('holographic'), stringToCardEffect('prismatic')],
    userId: 'user1',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    designMetadata: DEFAULT_DESIGN_METADATA
  });

  const [activeEffects, setActiveEffects] = useState<CardEffect[]>(currentCard.effects || []);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (propCard) {
      setCurrentCard(propCard);
      setActiveEffects(propCard.effects || []);
    }
  }, [propCard]);

  const toggleEffect = (effectType: string) => {
    const effect = stringToCardEffect(effectType);
    setActiveEffects(prev => {
      const exists = prev.some(e => e.type === effect.type);
      if (exists) {
        return prev.filter(e => e.type !== effect.type);
      } else {
        return [...prev, effect];
      }
    });
  };

  const getEffectClasses = () => {
    return activeEffects.map(effect => {
      switch (effect.type) {
        case 'holographic':
          return 'holographic-effect';
        case 'prismatic':
          return 'prismatic-effect';
        case 'refractor':
          return 'refractor-effect';
        case 'sparkle':
          return 'sparkle-effect';
        case 'foil':
          return 'foil-effect';
        case 'rainbow':
          return 'rainbow-effect';
        default:
          return '';
      }
    }).join(' ');
  };

  return (
    <div className={`immersive-viewer ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="viewer-container">
        <div className="card-display">
          <div className={`card-wrapper ${getEffectClasses()}`}>
            <img 
              src={currentCard.imageUrl} 
              alt={currentCard.title}
              className="card-image"
            />
          </div>
        </div>

        <div className="controls-panel">
          <h2>{currentCard.title}</h2>
          <p>{currentCard.description}</p>

          <div className="effects-controls">
            <h3>Effects</h3>
            {['holographic', 'prismatic', 'refractor', 'sparkle', 'foil', 'rainbow'].map(effectType => (
              <button
                key={effectType}
                onClick={() => toggleEffect(effectType)}
                className={`effect-button ${
                  activeEffects.some(e => e.type === effectType) ? 'active' : ''
                }`}
              >
                {effectType}
              </button>
            ))}
          </div>

          <div className="viewer-controls">
            <button onClick={() => setIsFullscreen(!isFullscreen)}>
              {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </button>
            {onClose && (
              <button onClick={onClose}>Close</button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .immersive-viewer {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #1e1e2e 0%, #2d1b69 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .viewer-container {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 2rem;
          max-width: 1200px;
          width: 100%;
          height: 80vh;
          padding: 2rem;
        }

        .card-display {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-wrapper {
          position: relative;
          width: 400px;
          height: 600px;
          border-radius: 20px;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .card-wrapper:hover {
          transform: scale(1.05);
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .controls-panel {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 2rem;
          color: white;
        }

        .effects-controls {
          margin: 2rem 0;
        }

        .effect-button {
          display: block;
          width: 100%;
          margin: 0.5rem 0;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 10px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: capitalize;
        }

        .effect-button:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .effect-button.active {
          background: rgba(79, 70, 229, 0.8);
        }

        .viewer-controls button {
          margin: 0.5rem 0;
          padding: 0.75rem 1.5rem;
          background: rgba(79, 70, 229, 0.8);
          border: none;
          border-radius: 10px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .viewer-controls button:hover {
          background: rgba(79, 70, 229, 1);
        }

        /* Effect styles */
        .holographic-effect {
          background: linear-gradient(45deg, #ff00ff, #00ffff, #ffff00, #ff00ff);
          background-size: 400% 400%;
          animation: holographic 3s ease-in-out infinite;
        }

        .prismatic-effect {
          background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3);
          background-size: 400% 400%;
          animation: prismatic 4s linear infinite;
        }

        .refractor-effect {
          background: linear-gradient(45deg, #c0c0c0, #ffffff, #c0c0c0);
          background-size: 200% 200%;
          animation: refractor 2s ease-in-out infinite;
        }

        .sparkle-effect {
          position: relative;
          overflow: hidden;
        }

        .sparkle-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
          animation: sparkle 2s linear infinite;
        }

        @keyframes holographic {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes prismatic {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        @keyframes refractor {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes sparkle {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .fullscreen .viewer-container {
          grid-template-columns: 1fr 400px;
          max-width: none;
          width: 100vw;
          height: 100vh;
        }

        .fullscreen .card-wrapper {
          width: 500px;
          height: 750px;
        }
      `}</style>
    </div>
  );
};

export default ImmersiveCardViewer;
