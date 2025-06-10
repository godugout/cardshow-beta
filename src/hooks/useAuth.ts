
import { useState, useEffect } from 'react';
import { AuthContextType, User, UserRole } from '@/lib/types/core';

export const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // Initialize auth state
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      // Mock sign in - replace with actual auth logic
      const mockUser: User = {
        id: '1',
        email,
        displayName: email.split('@')[0],
        role: UserRole.USER,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setUser(mockUser);
      setSession({ user: mockUser });
    } catch (err) {
      setError('Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      // Mock sign up - replace with actual auth logic
      const mockUser: User = {
        id: '1',
        email,
        displayName: email.split('@')[0],
        role: UserRole.USER,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setUser(mockUser);
      setSession({ user: mockUser });
    } catch (err) {
      setError('Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    setUser(null);
    setSession(null);
    setError(null);
  };

  const resetPassword = async (email: string): Promise<void> => {
    setError(null);
    try {
      // Mock reset password
      console.log('Password reset requested for:', email);
    } catch (err) {
      setError('Failed to reset password');
    }
  };

  const updateProfile = async (data: Partial<User>): Promise<void> => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  const refreshSession = async (): Promise<void> => {
    // Mock refresh session
    console.log('Session refreshed');
  };

  return {
    user,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
    refreshSession,
    session,
    error,
    loading,
    isAuthenticated: !!user,
    isLoading: loading // Provide alias for compatibility
  };
};
