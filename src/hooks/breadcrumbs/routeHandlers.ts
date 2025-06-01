
import { BreadcrumbItem } from './types';
import { Team, User, Collection, Card } from '@/lib/types';

export const handleTeamRoute = async (teamId: string): Promise<BreadcrumbItem[]> => {
  try {
    // Mock team data - in real app, fetch from API
    const team: Team = {
      id: teamId,
      name: 'Oakland Athletics',
      description: 'Professional baseball team',
      primaryColor: '#003831',
      secondaryColor: '#EFB21E',
      ownerId: 'owner-id',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return [
      { label: 'Teams', href: '/teams' },
      { 
        label: team.name, 
        href: `/teams/${teamId}`,
        color: team.primaryColor || '#003831'
      }
    ];
  } catch (error) {
    console.error('Error fetching team for breadcrumbs:', error);
    return [
      { label: 'Teams', href: '/teams' },
      { label: 'Team', href: `/teams/${teamId}` }
    ];
  }
};

export const handleUserRoute = async (userId: string): Promise<BreadcrumbItem[]> => {
  try {
    // Mock user data - in real app, fetch from API
    const user: User = {
      id: userId,
      email: 'user@example.com',
      name: 'User Name',
      displayName: 'User Display Name',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return [
      { label: 'Users', href: '/users' },
      { label: user.displayName || user.name || 'User', href: `/users/${userId}` }
    ];
  } catch (error) {
    console.error('Error fetching user for breadcrumbs:', error);
    return [
      { label: 'Users', href: '/users' },
      { label: 'User', href: `/users/${userId}` }
    ];
  }
};

export const handleCollectionRoute = async (collectionId: string): Promise<BreadcrumbItem[]> => {
  try {
    // Mock collection data - in real app, fetch from API
    const collection: Collection = {
      id: collectionId,
      name: 'Collection Name',
      ownerId: 'owner-id',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return [
      { label: 'Collections', href: '/collections' },
      { label: collection.name, href: `/collections/${collectionId}` }
    ];
  } catch (error) {
    console.error('Error fetching collection for breadcrumbs:', error);
    return [
      { label: 'Collections', href: '/collections' },
      { label: 'Collection', href: `/collections/${collectionId}` }
    ];
  }
};

export const handleCardRoute = async (cardId: string): Promise<BreadcrumbItem[]> => {
  try {
    // Mock card data - in real app, fetch from API
    const card: Card = {
      id: cardId,
      title: 'Card Title',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return [
      { label: 'Cards', href: '/cards' },
      { label: card.title || 'Card', href: `/cards/${cardId}` }
    ];
  } catch (error) {
    console.error('Error fetching card for breadcrumbs:', error);
    return [
      { label: 'Cards', href: '/cards' },
      { label: 'Card', href: `/cards/${cardId}` }
    ];
  }
};
