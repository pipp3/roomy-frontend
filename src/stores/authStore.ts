import { useSession } from 'next-auth/react';
import React from 'react';
import { Usuario } from '@/types';
import { AuthService } from '@/services/authService';

// Hook personalizado para autenticación con NextAuth
export const useAuth = () => {
  const { data: session, status, update } = useSession();

  // Usar directamente el estado de NextAuth
  const usuario: Usuario | null = React.useMemo(() => {
    if (status === 'loading' || !session?.user) return null;
    
    const sessionUser = session.user as any;
    return {
      id: sessionUser.id || '',
      email: sessionUser.email || '',
      nombre: sessionUser.name || '',
      avatar: sessionUser.image || undefined,
      googleId: sessionUser.id || ''
    };
  }, [session, status]);

  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated' && !!session?.user;

  return {
    usuario,
    isLoading,
    isAuthenticated,
    login: () => AuthService.loginWithGoogle(),
    logout: async () => {
      await AuthService.logout();
    },
    setUsuario: () => {
      // No es necesario con NextAuth
      console.warn('setUsuario no es necesario con NextAuth.js');
    },
    refreshUser: async () => {
      await update();
    }
  };
};

 