import { Card } from '@/lib/types/cardTypes';
import html2canvas from 'html2canvas'; // Fixed import

export interface ExportOptions {
  format: 'png' | 'jpg' | 'pdf';
  quality: number;
  width?: number;
  height?: number;
  backgroundColor?: string;
}

export class CardExportService {
  static async exportCard(
    cardElement: HTMLElement,
    options: ExportOptions = { format: 'png', quality: 0.92 }
  ): Promise<string> {
    try {
      const canvas = await html2canvas(cardElement, {
        backgroundColor: options.backgroundColor || 'transparent',
        scale: 2,
        logging: false,
        useCORS: true
      });

      return canvas.toDataURL(`image/${options.format}`, options.quality);
    } catch (error) {
      console.error('Failed to export card:', error);
      throw new Error('Card export failed');
    }
  }

  static async exportCardAsFile(
    cardElement: HTMLElement,
    filename: string,
    options: ExportOptions = { format: 'png', quality: 0.92 }
  ): Promise<File> {
    const dataUrl = await this.exportCard(cardElement, options);
    
    // Convert data URL to Blob
    const byteString = atob(dataUrl.split(',')[1]);
    const mimeType = dataUrl.split(',')[0].split(':')[1].split(';')[0];
    
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    
    const blob = new Blob([ab], { type: mimeType });
    return new File([blob], filename, { type: mimeType });
  }
  
  static async downloadCard(
    cardElement: HTMLElement,
    filename: string,
    options: ExportOptions = { format: 'png', quality: 0.92 }
  ): Promise<void> {
    const dataUrl = await this.exportCard(cardElement, options);
    
    // Create download link
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${filename}.${options.format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  static async exportCardCollection(
    cardElements: HTMLElement[],
    options: ExportOptions = { format: 'png', quality: 0.92 }
  ): Promise<string[]> {
    const promises = cardElements.map(element => this.exportCard(element, options));
    return Promise.all(promises);
  }
  
  static async createCardPDF(
    cardElements: HTMLElement[],
    filename: string,
    options: ExportOptions = { format: 'png', quality: 0.92 }
  ): Promise<void> {
    // This would require a PDF library like jsPDF
    // Implementation would depend on the specific PDF library used
    console.warn('PDF export not implemented yet');
    throw new Error('PDF export not implemented');
  }
}
