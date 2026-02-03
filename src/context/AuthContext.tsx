/**
 * Authentication Context
 * Provides authentication state and methods throughout the app
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { isAuthenticated, getCurrentUser, logout as logoutService } from '../services/authService';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  logout: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);

  // Load user on mount
  useEffect(() => {
    refreshUser();
  }, []);

  const refreshUser = () => {
    if (isAuthenticated()) {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      setIsAuth(true);
    } else {
      setUser(null);
      setIsAuth(false);
    }
  };

  const logout = async () => {
    await logoutService();
    setUser(null);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: isAuth, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
