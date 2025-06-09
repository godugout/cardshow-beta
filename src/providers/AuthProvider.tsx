
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/lib/types/core';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData?: Partial<User>) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  // TODO: Replace with Supabase auth integration
  useEffect(() => {
    const checkAuthState = () => {
      try {
        const savedUser = localStorage.getItem('cardshow_user');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error loading saved user:', error);
        localStorage.removeItem('cardshow_user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthState();
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with real Supabase authentication
      const mockUser: User = {
        id: 'user-' + Date.now(),
        email,
        displayName: email.split('@')[0],
        role: UserRole.USER,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem('cardshow_user', JSON.stringify(mockUser));
      setUser(mockUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData?: Partial<User>) => {
    setIsLoading(true);
    try {
      // TODO: Replace with real Supabase authentication
      const mockUser: User = {
        id: 'user-' + Date.now(),
        email,
        displayName: userData?.displayName || email.split('@')[0],
        role: UserRole.USER,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...userData,
      };

      localStorage.setItem('cardshow_user', JSON.stringify(mockUser));
      setUser(mockUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      localStorage.removeItem('cardshow_user');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
