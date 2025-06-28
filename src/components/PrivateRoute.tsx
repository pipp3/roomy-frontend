'use client';

import React from 'react';
import { useAuthValidation } from '@/hooks/useAuthValidation';
import LoadingScreen from './LoadingScreen';

interface PrivateRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  loadingMessage?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
  children, 
  fallback,
  loadingMessage = "Verificando tu sesión..." 
}) => {
  const { isLoading, isAuthenticated, isValidating } = useAuthValidation(true);

  // Mostrar loading mientras se valida la autenticación
  if (isLoading || isValidating) {
    return fallback || (
      <LoadingScreen 
        variant="auth" 
        message={loadingMessage}
        showProgress={true}
      />
    );
  }

  // Si no está autenticado, el hook ya redirigió a /login
  if (!isAuthenticated) {
    return (
      <LoadingScreen 
        variant="auth" 
        message="Redirigiendo al login..."
        showProgress={true}
      />
    );
  }

  // Usuario autenticado, mostrar contenido
  return <>{children}</>;
};

export default PrivateRoute; 