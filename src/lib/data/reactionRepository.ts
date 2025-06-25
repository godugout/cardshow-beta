import { Reaction } from '@/lib/types';
import { User, UserRole } from '@/lib/types/core';

// Mock reaction data storage
let mockReactions: Reaction[] = [
  {
    id: '1',
    userId: 'user1',
    targetType: 'card',
    targetId: 'card1',
    type: 'like',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z'
  }
];

export const reactionRepository = {
  async getReactionsByCard(cardId: string): Promise<Reaction[]> {
    // Mock implementation
    return [];
  },

  async getReactionsByUser(userId: string): Promise<Reaction[]> {
    // Mock implementation
    return [];
  },

  async addReaction(reaction: Omit<Reaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<Reaction> {
    const newReaction: Reaction = {
      id: `reaction-${Date.now()}`,
      ...reaction,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    return newReaction;
  },

  async removeReaction(reactionId: string): Promise<void> {
    // Mock implementation
  },

  async getReactionCounts(targetId: string, targetType: 'card' | 'comment' | 'collection'): Promise<Record<string, number>> {
    // Mock implementation
    return {};
  }
};

// Mock user for testing
const mockUser: User = {
  id: 'user-1',
  email: 'test@example.com',
  displayName: 'Test User',
  role: UserRole.USER,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export { mockUser };
