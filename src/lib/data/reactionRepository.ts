
import { Reaction } from '@/lib/types/interaction';
import { User, UserRole } from '@/lib/types/user';

// Mock data for demonstration
const mockReactions: Array<{
  id: string;
  userId: string;
  cardId?: string;
  collectionId?: string;
  commentId?: string;
  type: string;
  createdAt: string;
  user: User;
  targetType: string;
  targetId: string;
}> = [];

export const reactionRepository = {
  async create(data: Partial<Reaction>): Promise<Reaction> {
    const reaction: Reaction = {
      id: data.id || `reaction-${Date.now()}`,
      userId: data.userId!,
      cardId: data.cardId,
      collectionId: data.collectionId,
      commentId: data.commentId,
      type: data.type as "like" | "love" | "wow" | "haha" | "sad" | "angry" || 'like',
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user: data.user || {
        id: data.userId!,
        email: 'user@example.com',
        displayName: 'Test User',
        name: 'Test User',
        username: 'testuser',
        avatarUrl: null,
        role: UserRole.USER,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      targetType: data.targetType!,
      targetId: data.targetId!
    };

    mockReactions.push({
      id: reaction.id,
      userId: reaction.userId,
      cardId: reaction.cardId,
      collectionId: reaction.collectionId,
      commentId: reaction.commentId,
      type: reaction.type,
      createdAt: reaction.createdAt,
      user: reaction.user!,
      targetType: reaction.targetType,
      targetId: reaction.targetId
    });
    return reaction;
  },

  async findByCardId(cardId: string): Promise<Reaction[]> {
    return mockReactions
      .filter(r => r.cardId === cardId)
      .map(r => ({
        id: r.id,
        userId: r.userId,
        cardId: r.cardId,
        type: r.type as "like" | "love" | "wow" | "haha" | "sad" | "angry",
        createdAt: r.createdAt,
        updatedAt: new Date().toISOString(),
        targetType: 'card',
        targetId: r.cardId!,
        user: {
          id: r.userId,
          email: 'user@example.com',
          displayName: 'Test User',
          name: 'Test User',
          username: 'testuser',
          avatarUrl: null,
          role: UserRole.USER,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      }));
  },

  async getAllByCardId(cardId: string): Promise<Reaction[]> {
    return this.findByCardId(cardId);
  },

  async findByCollectionId(collectionId: string): Promise<Reaction[]> {
    return mockReactions
      .filter(r => r.collectionId === collectionId)
      .map(r => ({
        id: r.id,
        userId: r.userId,
        collectionId: r.collectionId,
        type: r.type as "like" | "love" | "wow" | "haha" | "sad" | "angry",
        createdAt: r.createdAt,
        updatedAt: new Date().toISOString(),
        targetType: 'collection',
        targetId: r.collectionId!,
        user: {
          id: r.userId,
          email: 'user@example.com',
          displayName: 'Test User',
          name: 'Test User',
          username: 'testuser',
          avatarUrl: null,
          role: UserRole.USER,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      }));
  },

  async findByCommentId(commentId: string): Promise<Reaction[]> {
    return mockReactions
      .filter(r => r.commentId === commentId)
      .map(r => ({
        id: r.id,
        userId: r.userId,
        commentId: r.commentId,
        type: r.type as "like" | "love" | "wow" | "haha" | "sad" | "angry",
        createdAt: r.createdAt,
        updatedAt: new Date().toISOString(),
        targetType: 'comment',
        targetId: r.commentId!,
        user: {
          id: r.userId,
          email: 'user@example.com',
          displayName: 'Test User',
          name: 'Test User',
          username: 'testuser',
          avatarUrl: null,
          role: UserRole.USER,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      }));
  },

  async delete(id: string): Promise<void> {
    const index = mockReactions.findIndex(r => r.id === id);
    if (index > -1) {
      mockReactions.splice(index, 1);
    }
  },

  async remove(id: string): Promise<void> {
    return this.delete(id);
  },

  async add(data: Partial<Reaction>): Promise<Reaction> {
    return this.create(data);
  },

  async findOne(id: string): Promise<Reaction | undefined> {
    const reaction = mockReactions.find(r => r.id === id);
    if (!reaction) return undefined;

    return {
      id: reaction.id,
      userId: reaction.userId,
      cardId: reaction.cardId,
      collectionId: reaction.collectionId,
      commentId: reaction.commentId,
      type: reaction.type as "like" | "love" | "wow" | "haha" | "sad" | "angry",
      createdAt: reaction.createdAt,
      updatedAt: new Date().toISOString(),
      targetType: reaction.targetType,
      targetId: reaction.targetId,
      user: {
        id: reaction.userId,
        email: 'user@example.com',
        displayName: 'Test User',
        name: 'Test User',
        username: 'testuser',
        avatarUrl: null,
        role: UserRole.USER,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    };
  }
};
