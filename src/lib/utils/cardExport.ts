
import { Card } from '@/lib/types';
import html2canvas from 'html2canvas';

export interface ExportOptions {
  format: 'png' | 'jpeg' | 'pdf';
  quality: number;
  width?: number;
  height?: number;
}

export class CardExportUtility {
  static async exportCard(
    cardElement: HTMLElement,
    card: Card,
    options: ExportOptions = { format: 'png', quality: 0.9 }
  ): Promise<string> {
    try {
      const canvas = await html2canvas(cardElement, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        width: options.width,
        height: options.height,
      });

      return canvas.toDataURL(`image/${options.format}`, options.quality);
    } catch (error) {
      console.error('Error exporting card:', error);
      throw new Error('Failed to export card');
    }
  }

  static async downloadCard(
    cardElement: HTMLElement,
    card: Card,
    filename?: string,
    options?: ExportOptions
  ): Promise<void> {
    const dataUrl = await this.exportCard(cardElement, card, options);
    const link = document.createElement('a');
    link.download = filename || `${card.title || 'card'}.${options?.format || 'png'}`;
    link.href = dataUrl;
    link.click();
  }

  static async generateThumbnail(
    cardElement: HTMLElement,
    maxWidth: number = 300,
    maxHeight: number = 200
  ): Promise<string> {
    return this.exportCard(cardElement, {} as Card, {
      format: 'jpeg',
      quality: 0.7,
      width: maxWidth,
      height: maxHeight,
    });
  }
}
