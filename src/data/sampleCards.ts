
// Import Card and CardRarity types
import { Card, CardRarity, DesignMetadata } from '@/lib/types';

// Default design metadata for legacy cards
const defaultDesignMetadata: DesignMetadata = {
  cardStyle: {
    template: 'classic',
    effect: 'classic',
    borderRadius: '8px',
    borderColor: '#000000',
    frameColor: '#000000',
    frameWidth: 2,
    shadowColor: 'rgba(0,0,0,0.2)',
  },
  textStyle: {
    titleColor: '#FFFFFF',
    titleAlignment: 'left',
    titleWeight: 'bold',
    descriptionColor: '#FFFFFF',
  },
  marketMetadata: {
    isPrintable: false,
    isForSale: false,
    includeInCatalog: true
  },
  cardMetadata: {
    category: 'sports',
    cardType: 'collectible',
    series: 'standard'
  }
};

export const sampleCards: Card[] = [
  {
    id: "t206-wagner",
    title: "Honus Wagner Trading Card",
    description: "Rare Pittsburgh Pirates shortstop card from the early 1900s, considered one of the most valuable baseball cards in existence.",
    imageUrl: "/lovable-uploads/dc219616-1df7-461d-8f6d-7af3ef1b68ae.png",
    thumbnailUrl: "/lovable-uploads/dc219616-1df7-461d-8f6d-7af3ef1b68ae.png",
    tags: ["Baseball", "Vintage", "Rare", "Pirates"],
    userId: "system",
    effects: [],
    createdAt: "1909-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z",
    player: "Honus Wagner",
    team: "Pittsburgh Pirates",
    position: "Shortstop",
    year: "1909-11",
    designMetadata: { ...defaultDesignMetadata },
    rarity: 'legendary' as CardRarity
  },
  {
    id: "1952-topps-mantle",
    title: "Mickey Mantle Rookie Card",
    description: "Famous 1952 Topps #311 Mickey Mantle rookie card, one of the most iconic baseball cards of all time.",
    imageUrl: "/lovable-uploads/480dff88-07d3-461d-ad88-d5b0447dc9a4.png",
    thumbnailUrl: "/lovable-uploads/480dff88-07d3-461d-ad88-d5b0447dc9a4.png",
    tags: ["Baseball", "Rookie", "Yankees", "Vintage"],
    userId: "system",
    effects: ["Holographic"],
    createdAt: "1952-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z",
    player: "Mickey Mantle",
    team: "New York Yankees",
    position: "Center Field",
    year: "1952",
    designMetadata: { ...defaultDesignMetadata },
    rarity: 'legendary' as CardRarity
  },
  {
    id: "1933-goudey-ruth",
    title: "Babe Ruth Goudey Card",
    description: "Classic 1933 Goudey #53 Babe Ruth card featuring the legendary Yankees slugger.",
    imageUrl: "/lovable-uploads/88d804c5-6d0c-402e-b2d6-f0d10b5f6699.png",
    thumbnailUrl: "/lovable-uploads/88d804c5-6d0c-402e-b2d6-f0d10b5f6699.png",
    tags: ["Baseball", "Yankees", "Legend", "Vintage"],
    userId: "system",
    effects: ["Vintage"],
    createdAt: "1933-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z",
    player: "Babe Ruth",
    team: "New York Yankees",
    position: "Outfield",
    year: "1933",
    designMetadata: { ...defaultDesignMetadata },
    rarity: 'legendary' as CardRarity
  },
  {
    id: "lebron-james-rookie",
    title: "LeBron James Rookie Card",
    description: "Valuable LeBron James rookie card from his first NBA season with the Cleveland Cavaliers.",
    imageUrl: "/lovable-uploads/371b81a2-cafa-4637-9358-218d4120c658.png",
    thumbnailUrl: "/lovable-uploads/371b81a2-cafa-4637-9358-218d4120c658.png",
    tags: ["Basketball", "Rookie", "Cavaliers", "Modern"],
    userId: "system",
    effects: ["Refractor"],
    createdAt: "2003-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z",
    player: "LeBron James",
    team: "Cleveland Cavaliers",
    position: "Small Forward",
    year: "2003",
    designMetadata: { ...defaultDesignMetadata },
    rarity: "ultra-rare" as CardRarity
  },
  {
    id: "michael-jordan-fleer",
    title: "Michael Jordan Fleer Card",
    description: "Classic Michael Jordan trading card from his dominant years with the Chicago Bulls.",
    imageUrl: "/lovable-uploads/38b125d7-2257-4d56-98fa-c1ff2a7be7ea.png",
    thumbnailUrl: "/lovable-uploads/38b125d7-2257-4d56-98fa-c1ff2a7be7ea.png",
    tags: ["Basketball", "Bulls", "Legend", "90s"],
    userId: "system",
    effects: ["Holographic", "Shimmer"],
    createdAt: "1993-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z",
    player: "Michael Jordan",
    team: "Chicago Bulls",
    position: "Shooting Guard",
    year: "1993",
    designMetadata: { ...defaultDesignMetadata },
    rarity: "ultra-rare" as CardRarity
  }
];
