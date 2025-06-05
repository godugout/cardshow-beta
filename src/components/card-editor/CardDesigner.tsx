
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { HotspotData } from '@/lib/types/cardTypes';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

interface CardDesignerProps {
  cardData?: any;
  onUpdate?: (data: any) => void;
}

const CardDesigner: React.FC<CardDesignerProps> = ({ cardData, onUpdate }) => {
  const [hotspots, setHotspots] = useState<HotspotData[]>([]);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const addHotspot = (type: HotspotData['type']) => {
    const newHotspot: HotspotData = {
      id: `hotspot-${Date.now()}`,
      x: 100,
      y: 100,
      width: 80,
      height: 60,
      type,
      visible: true,
      content: {
        title: `New ${type} hotspot`,
        description: 'Click to edit',
        ...(type === 'text' && { text: 'Enter text here' }),
        ...(type === 'image' && { imageUrl: '' }),
        ...(type === 'link' && { url: 'https://example.com' })
      },
      style: {
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderRadius: 4,
        opacity: 0.8
      }
    };

    setHotspots(prev => [...prev, newHotspot]);
    setSelectedHotspot(newHotspot.id);
    setIsEditing(true);
  };

  const updateHotspot = (id: string, updates: Partial<HotspotData>) => {
    setHotspots(prev => prev.map(hotspot => 
      hotspot.id === id ? { ...hotspot, ...updates } : hotspot
    ));
  };

  const deleteHotspot = (id: string) => {
    setHotspots(prev => prev.filter(h => h.id !== id));
    if (selectedHotspot === id) {
      setSelectedHotspot(null);
      setIsEditing(false);
    }
  };

  const selectedHotspotData = hotspots.find(h => h.id === selectedHotspot);

  const handleContentUpdate = (field: string, value: string) => {
    if (!selectedHotspot) return;
    
    updateHotspot(selectedHotspot, {
      content: {
        ...selectedHotspotData?.content,
        [field]: value
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Canvas Area */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Card Design Canvas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
              {/* Card preview background */}
              {cardData?.imageUrl && (
                <img 
                  src={cardData.imageUrl} 
                  alt="Card" 
                  className="w-full h-full object-cover"
                />
              )}
              
              {/* Hotspots */}
              {hotspots.map(hotspot => (
                <div
                  key={hotspot.id}
                  className={`absolute border-2 cursor-pointer transition-all ${
                    selectedHotspot === hotspot.id 
                      ? 'border-blue-500 bg-blue-100/20' 
                      : 'border-gray-400 bg-gray-100/20'
                  } ${!hotspot.visible ? 'opacity-50' : ''}`}
                  style={{
                    left: `${hotspot.x}px`,
                    top: `${hotspot.y}px`,
                    width: `${hotspot.width}px`,
                    height: `${hotspot.height}px`,
                    borderRadius: hotspot.style?.borderRadius || 4
                  }}
                  onClick={() => {
                    setSelectedHotspot(hotspot.id);
                    setIsEditing(true);
                  }}
                >
                  <div className="p-1 text-xs text-center">
                    {hotspot.content.title || hotspot.type}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls Panel */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Add Interactive Elements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => addHotspot('text')}
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                Text
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addHotspot('image')}
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                Image
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addHotspot('link')}
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                Link
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addHotspot('video')}
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                Video
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Hotspot List */}
        <Card>
          <CardHeader>
            <CardTitle>Elements ({hotspots.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {hotspots.map(hotspot => (
                <div
                  key={hotspot.id}
                  className={`flex items-center justify-between p-2 rounded border ${
                    selectedHotspot === hotspot.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{hotspot.type}</Badge>
                    <span className="text-sm truncate max-w-20">
                      {hotspot.content.title || 'Untitled'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateHotspot(hotspot.id, { visible: !hotspot.visible })}
                    >
                      {hotspot.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedHotspot(hotspot.id);
                        setIsEditing(true);
                      }}
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteHotspot(hotspot.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))}
              {hotspots.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  No interactive elements added yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Edit Panel */}
        {isEditing && selectedHotspotData && (
          <Card>
            <CardHeader>
              <CardTitle>Edit {selectedHotspotData.type} Element</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={selectedHotspotData.content.title || ''}
                    onChange={(e) => handleContentUpdate('title', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={selectedHotspotData.content.description || ''}
                    onChange={(e) => handleContentUpdate('description', e.target.value)}
                  />
                </div>

                {selectedHotspotData.type === 'text' && (
                  <div>
                    <Label htmlFor="text-content">Text Content</Label>
                    <Input
                      id="text-content"
                      value={selectedHotspotData.content.text || ''}
                      onChange={(e) => handleContentUpdate('text', e.target.value)}
                    />
                  </div>
                )}

                {selectedHotspotData.type === 'link' && (
                  <div>
                    <Label htmlFor="url">URL</Label>
                    <Input
                      id="url"
                      type="url"
                      value={selectedHotspotData.content.url || ''}
                      onChange={(e) => handleContentUpdate('url', e.target.value)}
                    />
                  </div>
                )}

                {selectedHotspotData.type === 'image' && (
                  <div>
                    <Label htmlFor="image-url">Image URL</Label>
                    <Input
                      id="image-url"
                      type="url"
                      value={selectedHotspotData.content.imageUrl || ''}
                      onChange={(e) => handleContentUpdate('imageUrl', e.target.value)}
                    />
                  </div>
                )}

                <Button 
                  onClick={() => setIsEditing(false)}
                  className="w-full"
                >
                  Done Editing
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CardDesigner;
