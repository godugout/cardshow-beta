
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, DesignMetadata, MarketMetadata } from '@/lib/types';
import { Switch } from "@/components/ui/switch"
import { DEFAULT_MARKET_METADATA } from '@/lib/utils/cardDefaults';

interface FinalizeStepProps {
  cardData: Partial<Card>;
  onUpdate: (updates: Partial<Card>) => void;
}

const FinalizeStep: React.FC<FinalizeStepProps> = ({ cardData, onUpdate }) => {
  const marketMetadata = cardData.designMetadata?.marketMetadata || DEFAULT_MARKET_METADATA;
  
  const [isPrintable, setIsPrintable] = useState(marketMetadata.isPrintable || false);
  const [isForSale, setIsForSale] = useState(marketMetadata.isForSale || false);
  const [includeInCatalog, setIncludeInCatalog] = useState(marketMetadata.includeInCatalog || false);
  const [price, setPrice] = useState<number>(marketMetadata.price || 0);
  const [currency, setCurrency] = useState<string>(marketMetadata.currency || 'USD');
  const [availableForSale, setAvailableForSale] = useState(marketMetadata.availableForSale || false);
  const [editionSize, setEditionSize] = useState<number>(marketMetadata.editionSize || 1);
  const [editionNumber, setEditionNumber] = useState<number>(marketMetadata.editionNumber || 1);

  useEffect(() => {
    const currentMarketMetadata = cardData.designMetadata?.marketMetadata || DEFAULT_MARKET_METADATA;
    setIsPrintable(currentMarketMetadata.isPrintable || false);
    setIsForSale(currentMarketMetadata.isForSale || false);
    setIncludeInCatalog(currentMarketMetadata.includeInCatalog || false);
    setPrice(currentMarketMetadata.price || 0);
    setCurrency(currentMarketMetadata.currency || 'USD');
    setAvailableForSale(currentMarketMetadata.availableForSale || false);
    setEditionSize(currentMarketMetadata.editionSize || 1);
    setEditionNumber(currentMarketMetadata.editionNumber || 1);
  }, [cardData]);
  
  const updateMarketMetadata = (field: string, value: any) => {
    const currentDesignMetadata = cardData.designMetadata || {
      cardStyle: {},
      textStyle: {},
      cardMetadata: {},
      marketMetadata: DEFAULT_MARKET_METADATA
    };

    const updatedMarketMetadata: MarketMetadata = {
      ...DEFAULT_MARKET_METADATA,
      ...currentDesignMetadata.marketMetadata,
      [field]: value
    };

    const updatedDesignMetadata = {
      ...currentDesignMetadata,
      marketMetadata: updatedMarketMetadata
    };

    onUpdate({
      designMetadata: updatedDesignMetadata
    });
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
