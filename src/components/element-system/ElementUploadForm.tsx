
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { CardElement, ElementType } from '@/lib/types/cardElements';

interface ElementUploadFormProps {
  onSubmit: (element: Omit<CardElement, 'id' | 'type' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const ElementUploadForm: React.FC<ElementUploadFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    elementType: 'sticker' as ElementType,
    category: '',
    tags: [] as string[],
    assetUrl: '',
    thumbnailUrl: '',
    width: 100,
    height: 100,
    isOfficial: false,
    isPremium: false,
    price: 0
  });

  const [newTag, setNewTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const elementData = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      url: formData.assetUrl, // Map assetUrl to url to satisfy CardElement interface
      assetUrl: formData.assetUrl,
      thumbnailUrl: formData.thumbnailUrl,
      tags: formData.tags,
      isOfficial: formData.isOfficial,
      isPremium: formData.isPremium,
      price: formData.price,
      position: { 
        x: 0, 
        y: 0, 
        z: 0, 
        rotation: 0 
      },
      size: {
        width: formData.width,
        height: formData.height,
        scale: 1,
        aspectRatio: formData.width / formData.height,
        preserveAspectRatio: true
      },
      style: {},
      metadata: {}
    };

    onSubmit(elementData);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Element Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="elementType">Element Type</Label>
          <Select 
            value={formData.elementType} 
            onValueChange={(value: ElementType) => setFormData(prev => ({ ...prev, elementType: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sticker">Sticker</SelectItem>
              <SelectItem value="logo">Logo</SelectItem>
              <SelectItem value="frame">Frame</SelectItem>
              <SelectItem value="badge">Badge</SelectItem>
              <SelectItem value="overlay">Overlay</SelectItem>
              <SelectItem value="decoration">Decoration</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="assetUrl">Asset URL</Label>
          <Input
            id="assetUrl"
            type="url"
            value={formData.assetUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, assetUrl: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
          <Input
            id="thumbnailUrl"
            type="url"
            value={formData.thumbnailUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, thumbnailUrl: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="width">Width</Label>
          <Input
            id="width"
            type="number"
            value={formData.width}
            onChange={(e) => setFormData(prev => ({ ...prev, width: parseInt(e.target.value) || 100 }))}
            min="1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="height">Height</Label>
          <Input
            id="height"
            type="number"
            value={formData.height}
            onChange={(e) => setFormData(prev => ({ ...prev, height: parseInt(e.target.value) || 100 }))}
            min="1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex gap-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
          />
          <Button type="button" onClick={addTag} variant="outline">Add</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeTag(tag)}
              />
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Create Element
        </Button>
      </div>
    </form>
  );
};

export default ElementUploadForm;
