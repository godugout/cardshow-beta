import { CardElement, ElementType, ElementCategory } from '@/lib/types/cardElements';

export class ElementLibrary {
  private elements: CardElement[] = [
    {
      id: 'element-1',
      type: 'image',
      name: 'Sparkle',
      assetUrl: '/elements/sparkle.png',
      thumbnailUrl: '/elements/sparkle-thumb.png',
      description: 'A shiny sparkle effect',
      tags: ['sparkle', 'shiny', 'effect'],
      category: 'effects',
      isOfficial: true,
      position: { x: 10, y: 10, z: 1 },
      size: { width: 50, height: 50 },
      rotation: 0,
      opacity: 0.7,
      zIndex: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      creatorId: 'system'
    },
    {
      id: 'element-2',
      type: 'text',
      name: 'Headline',
      assetUrl: '',
      thumbnailUrl: '',
      description: 'A bold headline text',
      tags: ['text', 'headline', 'bold'],
      category: 'text',
      isOfficial: true,
      position: { x: 20, y: 20, z: 1 },
      size: { width: 200, height: 40 },
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      creatorId: 'system'
    },
    {
      id: 'element-3',
      type: 'shape',
      name: 'Circle',
      assetUrl: '',
      thumbnailUrl: '',
      description: 'A simple circle shape',
      tags: ['shape', 'circle', 'geometric'],
      category: 'shapes',
      isOfficial: true,
      position: { x: 30, y: 30, z: 1 },
      size: { width: 60, height: 60 },
      rotation: 0,
      opacity: 0.8,
      zIndex: 4,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      creatorId: 'system'
    },
    {
      id: 'element-4',
      type: 'image',
      name: 'Star',
      assetUrl: '/elements/star.png',
      thumbnailUrl: '/elements/star-thumb.png',
      description: 'A bright star image',
      tags: ['image', 'star', 'bright'],
      category: 'images',
      isOfficial: true,
      position: { x: 40, y: 40, z: 1 },
      size: { width: 45, height: 45 },
      rotation: 0,
      opacity: 0.9,
      zIndex: 5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      creatorId: 'system'
    },
    {
      id: 'element-5',
      type: 'text',
      name: 'Caption',
      assetUrl: '',
      thumbnailUrl: '',
      description: 'A short caption text',
      tags: ['text', 'caption', 'short'],
      category: 'text',
      isOfficial: true,
      position: { x: 50, y: 50, z: 1 },
      size: { width: 180, height: 30 },
      rotation: 0,
      opacity: 1,
      zIndex: 6,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      creatorId: 'system'
    },
    {
      id: 'element-6',
      type: 'shape',
      name: 'Rectangle',
      assetUrl: '',
      thumbnailUrl: '',
      description: 'A basic rectangle shape',
      tags: ['shape', 'rectangle', 'basic'],
      category: 'shapes',
      isOfficial: true,
      position: { x: 60, y: 60, z: 1 },
      size: { width: 80, height: 50 },
      rotation: 0,
      opacity: 0.75,
      zIndex: 7,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      creatorId: 'system'
    },
    {
      id: 'element-7',
      type: 'image',
      name: 'Heart',
      assetUrl: '/elements/heart.png',
      thumbnailUrl: '/elements/heart-thumb.png',
      description: 'A lovely heart image',
      tags: ['image', 'heart', 'love'],
      category: 'images',
      isOfficial: true,
      position: { x: 70, y: 70, z: 1 },
      size: { width: 40, height: 40 },
      rotation: 0,
      opacity: 0.85,
      zIndex: 8,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      creatorId: 'system'
    },
    {
      id: 'element-8',
      type: 'text',
      name: 'Quote',
      assetUrl: '',
      thumbnailUrl: '',
      description: 'An inspiring quote text',
      tags: ['text', 'quote', 'inspiring'],
      category: 'text',
      isOfficial: true,
      position: { x: 80, y: 80, z: 1 },
      size: { width: 220, height: 60 },
      rotation: 0,
      opacity: 1,
      zIndex: 9,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      creatorId: 'system'
    },
    {
      id: 'element-9',
      type: 'shape',
      name: 'Triangle',
      assetUrl: '',
      thumbnailUrl: '',
      description: 'A simple triangle shape',
      tags: ['shape', 'triangle', 'geometric'],
      category: 'shapes',
      isOfficial: true,
      position: { x: 90, y: 90, z: 1 },
      size: { width: 70, height: 70 },
      rotation: 0,
      opacity: 0.7,
      zIndex: 10,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      creatorId: 'system'
    },
    {
      id: 'element-10',
      type: 'image',
      name: 'Diamond',
      assetUrl: '/elements/diamond.png',
      thumbnailUrl: '/elements/diamond-thumb.png',
      description: 'A precious diamond image',
      tags: ['image', 'diamond', 'precious'],
      category: 'images',
      isOfficial: true,
      position: { x: 100, y: 100, z: 1 },
      size: { width: 55, height: 55 },
      rotation: 0,
      opacity: 0.95,
      zIndex: 11,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      creatorId: 'system'
    }
  ];

  constructor() {
    // Additional initialization logic can be placed here
  }

  getElements(): CardElement[] {
    return this.elements;
  }

  getElementByType(type: ElementType): CardElement[] {
    return this.elements.filter(element => element.type === type);
  }

  getElementByCategory(category: ElementCategory): CardElement[] {
    return this.elements.filter(element => element.category === category);
  }

  getElementById(id: string): CardElement | undefined {
    return this.elements.find(element => element.id === id);
  }

  searchElements(query: string): CardElement[] {
    const lowercaseQuery = query.toLowerCase();
    return this.elements.filter(element =>
      element.name.toLowerCase().includes(lowercaseQuery) ||
      element.description.toLowerCase().includes(lowercaseQuery) ||
      element.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  addElement(element: Omit<CardElement, 'id' | 'createdAt' | 'updatedAt'>): CardElement {
    const newElement: CardElement = {
      ...element,
      id: `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      url: element.assetUrl, // Add the missing url property
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.elements.push(newElement);
    return newElement;
  }

  updateElement(id: string, updates: Partial<CardElement>): CardElement | undefined {
    const elementIndex = this.elements.findIndex(element => element.id === id);
    if (elementIndex === -1) {
      return undefined;
    }

    const updatedElement = { ...this.elements[elementIndex], ...updates, updatedAt: new Date().toISOString() };
    this.elements[elementIndex] = updatedElement;
    return updatedElement;
  }

  deleteElement(id: string): boolean {
    const elementIndex = this.elements.findIndex(element => element.id === id);
    if (elementIndex === -1) {
      return false;
    }

    this.elements.splice(elementIndex, 1);
    return true;
  }
}

export const elementLibrary = new ElementLibrary();
