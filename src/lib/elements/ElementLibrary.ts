
import { CardElement, ElementType, ElementCategory } from '@/lib/types/cardElements';
import { v4 as uuidv4 } from 'uuid';

class ElementLibrary {
  private elements: CardElement[] = [];

  // Create a new element
  createElement(
    type: ElementType, 
    data: Omit<CardElement, 'id' | 'type' | 'createdAt' | 'updatedAt'>
  ): CardElement {
    const element: CardElement = {
      ...data,
      id: uuidv4(),
      type,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.elements.push(element);
    return element;
  }

  // Get all elements
  getAllElements(): CardElement[] {
    return [...this.elements];
  }

  // Get elements by type
  getElementsByType(type: ElementType): CardElement[] {
    return this.elements.filter(element => element.type === type);
  }

  // Get elements by category
  getElementsByCategory(category: ElementCategory): CardElement[] {
    return this.elements.filter(element => element.category === category);
  }

  // Get element by ID
  getElementById(id: string): CardElement | undefined {
    return this.elements.find(element => element.id === id);
  }

  // Update element
  updateElement(id: string, updates: Partial<CardElement>): CardElement | null {
    const index = this.elements.findIndex(element => element.id === id);
    if (index === -1) return null;

    this.elements[index] = {
      ...this.elements[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    return this.elements[index];
  }

  // Delete element
  deleteElement(id: string): boolean {
    const index = this.elements.findIndex(element => element.id === id);
    if (index === -1) return false;

    this.elements.splice(index, 1);
    return true;
  }

  // Search elements
  searchElements(query: string): CardElement[] {
    const searchTerm = query.toLowerCase();
    return this.elements.filter(element =>
      element.name.toLowerCase().includes(searchTerm) ||
      element.title.toLowerCase().includes(searchTerm) ||
      element.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      (element.description && element.description.toLowerCase().includes(searchTerm))
    );
  }
}

export const elementLibrary = new ElementLibrary();
