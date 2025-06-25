'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasInitialized, setHasInitialized] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const refreshUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const currentUser = await AuthService.getCurrentUser();
      setUsuario(currentUser);
    } catch (error: unknown) {
      // Los errores 401 ya se manejan en AuthService.getCurrentUser()
      setUsuario(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Solo inicializar la verificación de autenticación si:
    // 1. No hemos inicializado aún
    // 2. No estamos en la página de login (evita errores 401 innecesarios)
    // 3. No estamos en páginas públicas
    const isPublicPage = pathname === '/login';
    
    if (!hasInitialized && !isPublicPage) {
      setHasInitialized(true);
      refreshUser();
    } else if (isPublicPage) {
      // En páginas públicas, simplemente marcamos como no cargando
      setIsLoading(false);
      setUsuario(null);
    }
  }, [pathname, hasInitialized, refreshUser]);

  const login = useCallback(() => {
    AuthService.loginWithGoogle();
  }, []);

  const logout = useCallback(async () => {
    try {
      await AuthService.logout();
      setUsuario(null);
      // Usar el router de Next.js para redirigir
      router.push('/login');
    } catch (error) {
      // Incluso si hay error, limpiar el estado y redirigir
      setUsuario(null);
      router.push('/login');
    }
  }, [router]);

  const value: AuthContextType = {
    usuario,
    isLoading,
    isAuthenticated: !!usuario,
    login,
    logout,
    setUsuario,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 