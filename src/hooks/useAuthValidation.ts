'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Tipo específico para el usuario autenticado
interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  image: string;
}

interface AuthValidationState {
  isLoading: boolean;
  isAuthenticated: boolean;
  isValidating: boolean;
  user: AuthenticatedUser | null;
}

export const useAuthValidation = (requireAuth = true) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [validationState, setValidationState] = useState<AuthValidationState>({
    isLoading: true,
    isAuthenticated: false,
    isValidating: true,
    user: null
  });

  useEffect(() => {
    const validateAuth = async () => {
      // Si NextAuth aún está cargando, esperamos
      if (status === 'loading') {
        setValidationState(prev => ({
          ...prev,
          isLoading: true,
          isValidating: true
        }));
        return;
      }

      // Si no hay sesión y se requiere autenticación
      if (status === 'unauthenticated' && requireAuth) {
        setValidationState({
          isLoading: false,
          isAuthenticated: false,
          isValidating: false,
          user: null
        });
        router.push('/login');
        return;
      }

      // Si hay sesión válida
      if (status === 'authenticated' && session?.user) {
        setValidationState({
          isLoading: false,
          isAuthenticated: true,
          isValidating: false,
          user: session.user as AuthenticatedUser
        });
        return;
      }

      // Para páginas públicas sin sesión
      if (!requireAuth) {
        setValidationState({
          isLoading: false,
          isAuthenticated: status === 'authenticated',
          isValidating: false,
          user: session?.user ? (session.user as AuthenticatedUser) : null
        });
      }
    };

    validateAuth();
  }, [session, status, requireAuth, router]);

  return validationState;
}; 