
import { Card, Collection, serializeMetadata } from '@/lib/types';

// Mock data storage
let mockCards: Card[] = [];
let mockCollections: Collection[] = [];

export const cardRepository = {
  async getCardsByUserId(userId: string): Promise<Card[]> {
    return mockCards.filter(card => card.userId === userId);
  },

  async addCard(card: Card): Promise<Card> {
    mockCards.push(card);
    return card;
  },

  async updateCard(cardId: string, updates: Partial<Card>): Promise<Card> {
    const index = mockCards.findIndex(card => card.id === cardId);
    if (index !== -1) {
      mockCards[index] = { ...mockCards[index], ...updates };
      return mockCards[index];
    }
    throw new Error('Card not found');
  },

  async deleteCard(cardId: string): Promise<void> {
    mockCards = mockCards.filter(card => card.id !== cardId);
  },

  async getCardById(cardId: string): Promise<Card | null> {
    return mockCards.find(card => card.id === cardId) || null;
  }
};
