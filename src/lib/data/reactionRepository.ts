
import { Reaction } from '@/lib/types/cardTypes';
import { User, UserRole } from '@/lib/types/user';

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
  async getReactionsByCardId(cardId: string): Promise<Reaction[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return mockReactions
      .filter(reaction => reaction.targetId === cardId && reaction.targetType === 'card')
      .map(reaction => ({
        ...reaction,
        user: {
          id: reaction.userId,
          email: `user${reaction.userId}@example.com`,
          displayName: `User ${reaction.userId}`,
          name: `User ${reaction.userId}`,
          username: `user${reaction.userId}`,
          avatarUrl: `/avatars/user${reaction.userId}.jpg`,
          role: UserRole.USER,
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-01-01T00:00:00Z',
        }
      }));
  },

  // Alias methods for backward compatibility
  getAllByCardId: async function(cardId: string): Promise<Reaction[]> {
    return this.getReactionsByCardId(cardId);
  },

  async addReaction(userId: string, targetId: string, targetType: 'card' | 'comment' | 'collection', reactionType: string): Promise<Reaction> {
    const newReaction: Reaction = {
      id: `reaction-${Date.now()}`,
      userId,
      targetType,
      targetId,
      type: reactionType as any,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockReactions.push(newReaction);
    return newReaction;
  },

  // Alias for backward compatibility
  add: async function(userId: string, targetId: string, targetType: 'card' | 'comment' | 'collection', reactionType: string): Promise<Reaction> {
    return this.addReaction(userId, targetId, targetType, reactionType);
  },

  async removeReaction(userId: string, targetId: string, targetType: 'card' | 'comment' | 'collection'): Promise<void> {
    mockReactions = mockReactions.filter(
      reaction => !(reaction.userId === userId && reaction.targetId === targetId && reaction.targetType === targetType)
    );
  },

  // Alias for backward compatibility
  remove: async function(userId: string, targetId: string, targetType: 'card' | 'comment' | 'collection'): Promise<void> {
    return this.removeReaction(userId, targetId, targetType);
  },

  async getReactionsByUserId(userId: string): Promise<Reaction[]> {
    return mockReactions.filter(reaction => reaction.userId === userId);
  }
};
