
/**
 * Core unified type definitions for CardShow
 * This file consolidates all type definitions to prevent conflicts
 */

// Base entity interface
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// User types
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  PREMIUM = 'premium',
  CREATOR = 'creator',
  MODERATOR = 'moderator'
}

// User permission types
export type UserPermission = 
  | 'read:own' 
  | 'write:own' 
  | 'delete:own' 
  | 'read:all' 
  | 'write:all' 
  | 'delete:all' 
  | 'premium:features'
  | 'create:premium'
  | 'moderate:content'
  | 'all';

// Role permissions mapping
export const ROLE_PERMISSIONS: Record<UserRole, UserPermission[]> = {
  [UserRole.USER]: ['read:own', 'write:own', 'delete:own'],
  [UserRole.PREMIUM]: ['read:own', 'write:own', 'delete:own', 'premium:features', 'create:premium'],
  [UserRole.CREATOR]: ['read:own', 'write:own', 'delete:own', 'premium:features', 'create:premium'],
  [UserRole.MODERATOR]: ['read:own', 'write:own', 'delete:own', 'moderate:content', 'read:all'],
  [UserRole.ADMIN]: ['all']
};

export interface User extends BaseEntity {
  email: string;
  name?: string;
  displayName?: string;
  username?: string;
  avatarUrl?: string;
  bio?: string;
  role: UserRole;
  permissions?: string[];
  preferences?: Record<string, any>;
}

// Card effect types
export interface CardEffect {
  id: string;
  type: 'holographic' | 'prismatic' | 'refractor' | 'sparkle' | 'foil' | 'rainbow' | 'custom';
  intensity: number;
  parameters?: Record<string, any>;
}

// Card style types for compatibility
export interface CardStyle {
  background?: string;
  border?: string;
  borderRadius?: string;
  shadow?: string;
  effect?: string;
  template?: string;
  borderColor?: string;
  shadowColor?: string;
  frameWidth?: number;
  frameColor?: string;
  borderWidth?: number;
  backgroundColor?: string;
}

export interface TextStyle {
  color?: string;
  fontSize?: string;
  fontFamily?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
  titleColor?: string;
  titleAlignment?: string;
  titleWeight?: string;
  descriptionColor?: string;
}

export interface CardMetadata {
  artist?: string;
  year?: string;
  set?: string;
  player?: string;
  team?: string;
  rarity?: string;
  category?: string;
  series?: string;
  cardType?: string;
  cardNumber?: string;
  effects?: string[]; // Keep as string[] for compatibility
}

export interface MarketMetadata {
  price?: number;
  currency?: string;
  availability?: string;
  marketplace?: string;
  isPrintable: boolean;
  isForSale: boolean;
  includeInCatalog: boolean;
  availableForSale?: boolean;
  editionSize?: number;
  editionNumber?: number;
}

// Design metadata for cards - unified structure
export interface DesignMetadata {
  template?: {
    id: string;
    type: string;
    variation?: string;
  };
  layout?: {
    sections: Array<{
      id: string;
      type: string;
      position: { x: number; y: number; width: number; height: number };
      content?: any;
    }>;
  };
  effects?: CardEffect[];
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
  typography?: {
    titleFont?: string;
    bodyFont?: string;
    fontSize?: number;
  };
  oaklandMemory?: {
    title?: string;
    description?: string;
    era?: string;
    memoryType?: string;
    emotions?: string[];
    location?: string;
    gameDate?: string;
    opponent?: string;
    section?: string;
    date?: string;
    score?: string;
    attendees?: string[];
    tags?: string[];
    imageUrl?: string;
    historicalContext?: string;
    personalSignificance?: string;
    template?: string;
  };
  // Required properties for compatibility
  cardStyle: CardStyle;
  textStyle: TextStyle;
  cardMetadata: CardMetadata;
  marketMetadata: MarketMetadata;
}

// Card interface - unified and complete
export interface Card extends BaseEntity {
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string; // Required for consistency
  userId: string;
  tags: string[];
  effects: CardEffect[]; // Changed from string[] to CardEffect[]
  designMetadata: DesignMetadata;
  rarity?: string;
  isPublic?: boolean;
  collectionId?: string;
  teamId?: string;
  verificationStatus?: 'pending' | 'verified' | 'rejected';
  price?: number;
  editionSize?: number;
  printAvailable?: boolean;
  // Additional properties for compatibility
  artist?: string;
  year?: string;
  set?: string;
  player?: string;
  team?: string;
  reactions?: any[];
  name?: string;
  jersey?: string;
  cardType?: string;
  cardNumber?: string;
  backgroundColor?: string;
  specialEffect?: string;
}

// Collection visibility and permissions
export type CollectionVisibility = 'public' | 'private' | 'team' | 'unlisted';

export interface Collection extends BaseEntity {
  name: string;
  description: string;
  userId: string;
  cardIds: string[];
  cards?: Card[];
  coverImageUrl?: string;
  isPublic: boolean;
  visibility: CollectionVisibility;
  allowComments: boolean;
  designMetadata?: Record<string, any>;
  tags?: string[];
  featured?: boolean;
  teamId?: string;
}

// Team interface
export interface Team extends BaseEntity {
  name: string;
  description?: string;
  logoUrl?: string;
  ownerId: string;
  isActive: boolean;
}

// Team member interface
export interface TeamMember extends BaseEntity {
  teamId: string;
  userId: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: string;
}

// Comment interface
export interface Comment extends BaseEntity {
  content: string;
  userId: string;
  cardId?: string;
  collectionId?: string;
  teamId?: string;
  parentId?: string;
  user?: {
    id: string;
    email: string;
    displayName?: string;
    avatarUrl?: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
  };
}

// Reaction interface - unified types with extended reaction types
export interface Reaction extends BaseEntity {
  userId: string;
  cardId?: string;
  collectionId?: string;
  commentId?: string;
  type: 'like' | 'heart' | 'star' | 'thumbs_up' | 'thumbs_down' | 'love' | 'wow' | 'haha' | 'sad' | 'angry';
  targetType?: 'card' | 'comment' | 'collection';
  targetId?: string;
  user?: User;
}

// JSON value types for metadata
export type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
export interface JsonObject { [key: string]: JsonValue; }
export interface JsonArray extends Array<JsonValue> {}

// Card template interface
export interface CardTemplate {
  id: string;
  name: string;
  category: string;
  description?: string;
  thumbnailUrl?: string;
  layoutJson: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}
