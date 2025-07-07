'use client';

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireAuth?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  redirectTo = '/login',
  requireAuth = true
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated' && !!session?.user;

  useEffect(() => {
    // Solo redirigir si no está cargando y no está autenticado
    if (!isLoading && requireAuth && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, requireAuth, router, redirectTo]);

  // Mostrar loading solo durante la carga inicial
  if (isLoading) {
    return <Loading message="Verificando autenticación..." />;
  }

  // Si requiere autenticación y no está autenticado, mostrar loading de redirección
  if (requireAuth && !isAuthenticated) {
    return <Loading message="Redirigiendo..." />;
  }

  // Si no requiere autenticación o está autenticado, mostrar contenido
  return <>{children}</>;
};

export default AuthGuard; 