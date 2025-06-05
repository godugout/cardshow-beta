
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X, FileImage, FileVideo, FileText } from 'lucide-react';
import { toast } from 'sonner';

type ElementType = 'sticker' | 'logo' | 'frame' | 'badge' | 'overlay' | 'decoration';

interface AssetUploaderProps {
  onUpload: (asset: any) => void;
  onCancel: () => void;
}

const AssetUploader: React.FC<AssetUploaderProps> = ({ onUpload, onCancel }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [elementType, setElementType] = useState<ElementType>('sticker');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedTypes: Record<ElementType, string[]> = {
    sticker: ['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml'],
    logo: ['image/png', 'image/jpeg', 'image/svg+xml'],
    frame: ['image/png', 'image/svg+xml'],
    badge: ['image/png', 'image/jpeg', 'image/svg+xml'],
    overlay: ['image/png', 'image/svg+xml'],
    decoration: ['image/png', 'image/jpeg', 'image/svg+xml']
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!allowedTypes[elementType].includes(file.type)) {
      toast.error(`Invalid file type for ${elementType}. Please select a valid image file.`);
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile || !title.trim()) {
      toast.error('Please select a file and enter a title');
      return;
    }

    setUploading(true);
    try {
      // Create asset object
      const asset = {
        id: `asset-${Date.now()}`,
        file: selectedFile,
        type: elementType,
        title: title.trim(),
        description: description.trim(),
        tags,
        createdAt: new Date().toISOString(),
        fileSize: selectedFile.size,
        mimeType: selectedFile.type
      };

      await onUpload(asset);
      toast.success('Asset uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload asset');
    } finally {
      setUploading(false);
    }
  };

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Upload New Asset</h2>
        <p className="text-gray-600 mt-2">Share your creative elements with the community</p>
      </div>

      {/* File Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        {selectedFile ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center text-green-600">
              <FileImage className="h-12 w-12" />
            </div>
            <div>
              <p className="font-medium">{selectedFile.name}</p>
              <p className="text-sm text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setSelectedFile(null)}
              className="text-red-600 hover:text-red-700"
            >
              <X className="h-4 w-4 mr-2" />
              Remove
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className="h-12 w-12 text-gray-400 mx-auto" />
            <div>
              <p className="text-lg font-medium">Drop files here or click to browse</p>
              <p className="text-sm text-gray-500">
                Supports PNG, JPG, GIF, SVG up to 10MB
              </p>
            </div>
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="mx-auto"
            >
              Choose File
            </Button>
          </div>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          accept={allowedTypes[elementType].join(',')}
          className="hidden"
        />
      </div>

      {/* Asset Details Form */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Element Type</Label>
          <Select value={elementType} onValueChange={(value: ElementType) => setElementType(value)}>
            <SelectTrigger>
              <SelectValue />
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
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a descriptive title"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your asset (optional)"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label>Tags</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          <Input
            placeholder="Add tags (press Enter)"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTag(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={handleUpload}
          disabled={!selectedFile || !title.trim() || uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Asset'}
        </Button>
      </div>
    </div>
  );
};

export default AssetUploader;
