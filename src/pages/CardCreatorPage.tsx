import React, { useState } from 'react';
import PageLayout from '@/components/navigation/PageLayout';
import CardMakerWizard from '@/components/card-creation/CardMakerWizard';
import { useCardEffectsStack } from '@/components/card-creation/hooks/useCardEffectsStack';
import { useLayers } from '@/components/card-creation/hooks/useLayers';
import { CardDesignState, CardLayer } from '@/components/card-creation/types/cardTypes';

const CardCreatorPage: React.FC = () => {
  const [cardData, setCardData] = useState<CardDesignState>({
    title: '',
    description: '',
    tags: [],
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    imageUrl: null,
    player: '',
    team: '',
    year: '',
  });
  
  const {
    layers,
    activeLayerId,
    setActiveLayer,
    addLayer,
    updateLayer,
    deleteLayer,
    moveLayerUp,
    moveLayerDown,
    setLayers
  } = useLayers();
  
  const { 
    activeEffects,
    addEffect, 
    removeEffect, 
    updateEffectSettings,
    effectStack = [],
    getEffectClasses = () => ""
  } = useCardEffectsStack();

  const activeLayer = layers.find(layer => layer.id === activeLayerId) || null;

  return (
    <PageLayout
      title="Create a CRD"
      description="Design your own custom trading cards with advanced effects and 3D visualization."
    >
      <div className="container mx-auto max-w-[1400px] px-4 pt-6 pb-20">
        <CardMakerWizard 
          cardData={cardData}
          setCardData={setCardData}
          layers={layers}
          setLayers={setLayers}
          activeLayer={activeLayer}
          setActiveLayerId={setActiveLayer}
          updateLayer={updateLayer}
          effectStack={effectStack}
          addEffect={addEffect}
          removeEffect={removeEffect}
          updateEffectSettings={updateEffectSettings}
          effectClasses={getEffectClasses()}
        />
      </div>
    </PageLayout>
  );
};

export default CardCreatorPage;
