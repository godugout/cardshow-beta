
import { CardElement } from '@/lib/types/cardElements';

class PlacementEngine {
  private canvas: HTMLElement | null = null;
  private gridSize: number = 10;

  setCanvas(canvas: HTMLElement): void {
    this.canvas = canvas;
  }

  setGridSize(size: number): void {
    this.gridSize = size;
  }

  snapToGrid(value: number): number {
    return Math.round(value / this.gridSize) * this.gridSize;
  }

  validatePosition(element: CardElement, x: number, y: number): { x: number; y: number } {
    if (!this.canvas) return { x, y };

    const rect = this.canvas.getBoundingClientRect();
    const maxX = rect.width - (element.size?.width || 100);
    const maxY = rect.height - (element.size?.height || 100);

    return {
      x: Math.max(0, Math.min(x, maxX)),
      y: Math.max(0, Math.min(y, maxY))
    };
  }

  checkCollision(element1: CardElement, element2: CardElement): boolean {
    if (!element1.position || !element2.position || !element1.size || !element2.size) {
      return false;
    }

    const rect1 = {
      left: element1.position.x,
      top: element1.position.y,
      right: element1.position.x + element1.size.width,
      bottom: element1.position.y + element1.size.height
    };

    const rect2 = {
      left: element2.position.x,
      top: element2.position.y,
      right: element2.position.x + element2.size.width,
      bottom: element2.position.y + element2.size.height
    };

    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
  }

  findNearestSnapPoint(x: number, y: number): { x: number; y: number } {
    return {
      x: this.snapToGrid(x),
      y: this.snapToGrid(y)
    };
  }
}

export const placementEngine = new PlacementEngine();
