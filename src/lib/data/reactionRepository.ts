
import { Reaction, User, UserRole } from '@/lib/types/core';

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
    return mockReactions.filter(r => r.cardId === cardId);
  },

  async getReactionsByUser(userId: string): Promise<Reaction[]> {
    // Mock implementation
    return mockReactions.filter(r => r.userId === userId);
  },

  async addReaction(userId: string, targetId: string, targetType: 'card' | 'comment' | 'collection', type: Reaction['type']): Promise<Reaction> {
    const newReaction: Reaction = {
      id: `reaction-${Date.now()}`,
      userId,
      targetId,
      targetType,
      type,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockReactions.push(newReaction);
    return newReaction;
  },

  async removeReaction(userId: string, targetId: string, targetType: 'card' | 'comment' | 'collection'): Promise<void> {
    mockReactions = mockReactions.filter(r => 
      !(r.userId === userId && r.targetId === targetId && r.targetType === targetType)
    );
  },

  async getReactionCounts(targetId: string, targetType: 'card' | 'comment' | 'collection'): Promise<Record<string, number>> {
    const reactions = mockReactions.filter(r => r.targetId === targetId && r.targetType === targetType);
    const counts: Record<string, number> = {};
    reactions.forEach(r => {
      counts[r.type] = (counts[r.type] || 0) + 1;
    });
    return counts;
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
