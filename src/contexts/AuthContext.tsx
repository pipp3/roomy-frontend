'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Usuario } from '@/types';
import { AuthService } from '@/services/authService';

interface AuthContextType {
  usuario: Usuario | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  setUsuario: (usuario: Usuario | null) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  // Memoizar el usuario para evitar re-renders innecesarios
  const usuario: Usuario | null = useMemo(() => {
    if (!session?.user) return null;
    
    return {
      id: session.user.id,
      email: session.user.email,
      nombre: session.user.name,
      avatar: session.user.image,
      googleId: session.user.id
    };
  }, [session?.user]);

  // Memoizar el estado de loading y autenticación
  const authState = useMemo(() => ({
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated' && !!session?.user,
  }), [status, session?.user]);

  const login = () => {
    AuthService.loginWithGoogle();
  };

  const logout = async () => {
    await AuthService.logout();
  };

  const setUsuario = () => {
    // Con NextAuth, no necesitamos setear manualmente el usuario
    console.warn('setUsuario no es necesario con NextAuth.js');
  };

  const refreshUser = async () => {
    // Actualizar la sesión de NextAuth
    await update();
  };

  // Memoizar el valor del contexto para evitar re-renders
  const contextValue = useMemo<AuthContextType>(() => ({
    usuario,
    isLoading: authState.isLoading,
    isAuthenticated: authState.isAuthenticated,
    login,
    logout,
    setUsuario,
    refreshUser,
  }), [usuario, authState.isLoading, authState.isAuthenticated]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}; 