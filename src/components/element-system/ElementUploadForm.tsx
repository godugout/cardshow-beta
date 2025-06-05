
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';

interface ElementUploadFormProps {
  onUpload: (elementData: any) => void;
  onCancel: () => void;
  onElementCreated?: () => void;
}

const ElementUploadForm: React.FC<ElementUploadFormProps> = ({ 
  onUpload, 
  onCancel, 
  onElementCreated 
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !name.trim()) return;

    const elementData = {
      id: `element-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      file: selectedFile,
      createdAt: new Date().toISOString()
    };

    onUpload(elementData);
    
    // Call the optional callback
    if (onElementCreated) {
      onElementCreated();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6">
      <h3 className="text-lg font-semibold">Upload New Element</h3>
      
      <div className="space-y-2">
        <Label htmlFor="name">Element Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter element name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="file">Upload File</Label>
        <Input
          id="file"
          type="file"
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          accept="image/*"
          required
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={!selectedFile || !name.trim()}>
          <Upload className="h-4 w-4 mr-2" />
          Upload
        </Button>
      </div>
    </form>
  );
};

export default ElementUploadForm;
