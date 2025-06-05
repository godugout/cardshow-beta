
import { CardElement, ElementType, ElementCategory, ElementUploadMetadata } from '../types/cardElements';

export class ElementUploader {
  async uploadElement(file: File, metadata: ElementUploadMetadata): Promise<CardElement> {
    // Simulate upload and metadata processing
    const assetUrl = URL.createObjectURL(file);
    const now = new Date().toISOString();
    const id = `element-${Math.random().toString(36).substring(2, 15)}`;

    const element: CardElement = {
      id,
      type: 'sticker', // Default type
      category: metadata.category,
      title: metadata.title,
      name: metadata.fileName || metadata.title,
      description: metadata.title, // Use title as description fallback
      thumbnailUrl: assetUrl,
      assetUrl: assetUrl,
      tags: metadata.tags,
      isOfficial: false,
      isPremium: false,
      createdAt: now,
      updatedAt: now,
      creatorId: 'current-user', // Replace with actual user ID
      downloadCount: 0,
      rating: 0,
      ratingCount: 0,
      position: { x: 0, y: 0, z: 0 },
      size: { 
        width: 100, 
        height: 100, 
        scale: 1, 
        aspectRatio: 1, 
        preserveAspectRatio: true 
      },
      style: { opacity: 1 }
    };

    return element;
  }

  private async extractMetadata(file: File): Promise<Partial<ElementUploadMetadata>> {
    return {
      title: file.name.split('.')[0],
      category: 'decorative',
      tags: [],
      isPublic: false,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
      isAnimated: false
    };
  }

  private async checkAnimated(file: File): Promise<boolean> {
    // Simple check for animated formats
    return file.type === 'image/gif' || file.type === 'image/webp';
  }

  private async extractDimensions(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.src = URL.createObjectURL(file);
    });
  }

  private async checkTransparency(file: File): Promise<boolean> {
    // Simple check for formats that support transparency
    return file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/webp';
  }
}

export const elementUploader = new ElementUploader();
