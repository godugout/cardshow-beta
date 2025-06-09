
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { CardProvider } from './context/CardContext';
import { AuthProvider } from './providers/AuthProvider';
import { SessionProvider } from './providers/session-provider';
import { Toaster } from './components/ui/toaster';
import MobileLayout from './components/layout/MobileLayout';
import './App.css';

// Create the unified router
const router = createBrowserRouter(routes);

function App() {
  return (
    <SessionProvider>
      <AuthProvider>
        <CardProvider>
          <MobileLayout>
            <RouterProvider router={router} />
          </MobileLayout>
          <Toaster />
        </CardProvider>
      </AuthProvider>
    </SessionProvider>
  );
}

export default App;
