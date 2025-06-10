
import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, Camera } from 'lucide-react';

interface CardUploadStepProps {
  imageUrl: string;
  cardData: any;
  setCardData: (data: any) => void;
  onImageUpload: (url: string) => void;
}

const CardUploadStep: React.FC<CardUploadStepProps> = ({
  imageUrl,
  cardData,
  setCardData,
  onImageUpload
}) => {
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onImageUpload(url);
      setCardData({ ...cardData, imageUrl: url });
    }
  }, [cardData, setCardData, onImageUpload]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Upload Your Image</h3>
        <p className="text-muted-foreground">Add an image to your card</p>
      </div>
      
      {imageUrl ? (
        <Card className="p-4">
          <img src={imageUrl} alt="Card" className="w-full h-64 object-cover rounded" />
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => document.getElementById('image-upload')?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Change Image
          </Button>
        </Card>
      ) : (
        <Card className="p-8 border-dashed border-2 text-center">
          <div className="space-y-4">
            <Camera className="h-16 w-16 mx-auto text-muted-foreground" />
            <div>
              <Button onClick={() => document.getElementById('image-upload')?.click()}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
            </div>
          </div>
        </Card>
      )}
      
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};

export default CardUploadStep;
