
import React, { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';
import UnifiedHomePage from '@/pages/UnifiedHomePage';
import CardViewerPage from '@/pages/CardViewerPage';
import ImmersiveCardViewerPage from '@/pages/ImmersiveCardViewerPage';
import CardCollectionPage from '@/pages/CardCollectionPage';
import CollectionGallery from '@/pages/CollectionGallery';
import CardDetail from '@/pages/CardDetail';
import CardGallery from '@/pages/CardGallery';
import Profile from '@/pages/Profile';
import Dashboard from '@/pages/Dashboard';
import Unauthorized from '@/pages/Unauthorized';
import AuthPage from '@/pages/AuthPage';
import NotFound from '@/pages/NotFound';
import Collections from '@/pages/Collections';
import TownCommunityHub from '@/pages/TownCommunityHub';

// Import other route collections
import { cardRoutes } from './cardRoutes';
import { collectionRoutes } from './collectionRoutes';
import { mainRoutes } from './mainRoutes';
import { baseballRoutes } from './baseballRoutes';
import featureRoutes from './featureRoutes';
import { teamRoutes } from './teamRoutes';
import { townRoutes } from './townRoutes';

// Lazy load pages that might suspend
const DeckBuilderPage = React.lazy(() => import('@/pages/DeckBuilderPage'));
const SeriesManagerPage = React.lazy(() => import('@/pages/SeriesManagerPage'));
const DeckViewPage = React.lazy(() => import('@/pages/DeckViewPage'));
const SeriesViewPage = React.lazy(() => import('@/pages/SeriesViewPage'));
const CardCreator = React.lazy(() => import('@/pages/CardCreator'));
const CardDetector = React.lazy(() => import('@/pages/CardDetector'));
const TeamPage = React.lazy(() => import('@/pages/TeamPage'));
const ArCardViewerPage = React.lazy(() => import('@/pages/ArCardViewerPage'));
const Labs = React.lazy(() => import('@/pages/Labs'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <div className="h-10 w-10 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin mx-auto mb-4"></div>
      <p>Loading...</p>
    </div>
  </div>
);

// Layout wrapper component
const AppLayout = () => (
  <MobileLayout>
    <Outlet />
  </MobileLayout>
);

// Main application routes - unified and consolidated
const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <UnifiedHomePage />
      },
      {
        path: "gallery",
        element: <CardGallery />
      },
      {
        path: "cards",
        element: <CardCollectionPage />
      },
      {
        path: "cards/create",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <CardCreator />
          </Suspense>
        )
      },
      {
        path: "detector", 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <CardDetector />
          </Suspense>
        )
      },
      {
        path: "cards/:id",
        element: <CardDetail />
      },
      {
        path: "collections",
        element: <Collections />
      },
      {
        path: "labs",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Labs />
          </Suspense>
        )
      },
      {
        path: "viewer/:id",
        element: <CardViewerPage />
      },
      {
        path: "immersive/:id",
        element: <ImmersiveCardViewerPage />
      },
      {
        path: "ar-viewer/:id",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ArCardViewerPage />
          </Suspense>
        )
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "auth",
        element: <AuthPage />
      },
      {
        path: "unauthorized",
        element: <Unauthorized />
      },
      {
        path: "community",
        element: <TownCommunityHub />
      },
      // Add other route collections as children
      ...teamRoutes,
      ...townRoutes,
      ...baseballRoutes,
      ...featureRoutes,
      ...cardRoutes.filter(route => 
        route.path !== "/cards" && 
        route.path !== "/cards/:id" && 
        route.path !== "/cards/create"
      ),
      ...collectionRoutes.filter(route => route.path !== "/collections"),
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
];

// Export unified routes
export const routes: RouteObject[] = appRoutes;
