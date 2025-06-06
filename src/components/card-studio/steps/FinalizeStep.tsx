import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, DesignMetadata, MarketMetadata } from '@/lib/types';
import { useCards } from '@/context/CardContext';
import { Switch } from "@/components/ui/switch"
import { toast } from 'sonner';

interface FinalizeStepProps {
  card: Partial<Card>;
  designMetadata: DesignMetadata;
  onUpdateCard: (updates: Partial<Card>) => void;
  onUpdateDesignMetadata: (updates: Partial<DesignMetadata>) => void;
}

const FinalizeStep = () => {
  const { updateCard } = useCards();
  const [isPrintable, setIsPrintable] = useState(false);
  const [isForSale, setIsForSale] = useState(false);
  const [includeInCatalog, setIncludeInCatalog] = useState(false);
  const [price, setPrice] = useState<number | undefined>(0);
  const [currency, setCurrency] = useState<string | undefined>('USD');
  const [availableForSale, setAvailableForSale] = useState(false);
  const [editionSize, setEditionSize] = useState<number | undefined>(1);
  const [editionNumber, setEditionNumber] = useState<number | undefined>(1);
  const [designMetadata, setDesignMetadata] = useState<DesignMetadata>({
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
  });

  useEffect(() => {
    if (designMetadata.marketMetadata) {
      setIsPrintable(designMetadata.marketMetadata.isPrintable || false);
      setIsForSale(designMetadata.marketMetadata.isForSale || false);
      setIncludeInCatalog(designMetadata.marketMetadata.includeInCatalog || false);
      setPrice(designMetadata.marketMetadata.price);
      setCurrency(designMetadata.marketMetadata.currency);
      setAvailableForSale(designMetadata.marketMetadata.availableForSale || false);
      setEditionSize(designMetadata.marketMetadata.editionSize);
      setEditionNumber(designMetadata.marketMetadata.editionNumber);
    }
  }, [designMetadata]);
  
  const updateMarketMetadata = (field: string, value: any) => {
    const updatedMetadata = {
      ...designMetadata,
      marketMetadata: {
        isPrintable: false,
        isForSale: false,
        includeInCatalog: false,
        ...designMetadata.marketMetadata,
        [field]: value
      }
    };
    setDesignMetadata(updatedMetadata);
  };

  return (
    <div className="grid gap-4">
      <div>
        <Label htmlFor="isPrintable" className="text-sm">Is Printable</Label>
        <Switch 
          id="isPrintable"
          checked={isPrintable}
          onCheckedChange={(checked) => {
            setIsPrintable(checked);
            updateMarketMetadata('isPrintable', checked);
          }}
        />
      </div>

      <div>
        <Label htmlFor="isForSale" className="text-sm">Is For Sale</Label>
        <Switch 
          id="isForSale"
          checked={isForSale}
          onCheckedChange={(checked) => {
            setIsForSale(checked);
            updateMarketMetadata('isForSale', checked);
          }}
        />
      </div>

      <div>
        <Label htmlFor="includeInCatalog" className="text-sm">Include In Catalog</Label>
        <Switch 
          id="includeInCatalog"
          checked={includeInCatalog}
          onCheckedChange={(checked) => {
            setIncludeInCatalog(checked);
            updateMarketMetadata('includeInCatalog', checked);
          }}
        />
      </div>

      <div>
        <Label htmlFor="price" className="text-sm">Price</Label>
        <Input
          id="price"
          type="number"
          value={price}
          onChange={(e) => {
            const newPrice = parseFloat(e.target.value);
            setPrice(newPrice);
            updateMarketMetadata('price', newPrice);
          }}
        />
      </div>

      <div>
        <Label htmlFor="currency" className="text-sm">Currency</Label>
        <Input
          id="currency"
          type="text"
          value={currency}
          onChange={(e) => {
            const newCurrency = e.target.value;
            setCurrency(newCurrency);
            updateMarketMetadata('currency', newCurrency);
          }}
        />
      </div>

      <div>
        <Label htmlFor="availableForSale" className="text-sm">Available For Sale</Label>
        <Switch 
          id="availableForSale"
          checked={availableForSale}
          onCheckedChange={(checked) => {
            setAvailableForSale(checked);
            updateMarketMetadata('availableForSale', checked);
          }}
        />
      </div>

      <div>
        <Label htmlFor="editionSize" className="text-sm">Edition Size</Label>
        <Input
          id="editionSize"
          type="number"
          value={editionSize}
          onChange={(e) => {
            const newEditionSize = parseInt(e.target.value);
            setEditionSize(newEditionSize);
            updateMarketMetadata('editionSize', newEditionSize);
          }}
        />
      </div>

      <div>
        <Label htmlFor="editionNumber" className="text-sm">Edition Number</Label>
        <Input
          id="editionNumber"
          type="number"
          value={editionNumber}
          onChange={(e) => {
            const newEditionNumber = parseInt(e.target.value);
            setEditionNumber(newEditionNumber);
            updateMarketMetadata('editionNumber', newEditionNumber);
          }}
        />
      </div>
    </div>
  );
};

export default FinalizeStep;
