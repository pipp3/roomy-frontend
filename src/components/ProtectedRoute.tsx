'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/login' 
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  if (isLoading) {
    return <Loading message="Verificando autenticación..." />;
  }

  if (!isAuthenticated) {
    return <Loading message="Redirigiendo..." />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 