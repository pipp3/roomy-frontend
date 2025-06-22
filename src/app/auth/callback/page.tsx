'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Loading from '@/components/Loading';

const AuthCallbackPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const error = searchParams.get('error');
        
        if (error) {
          console.error('Error en autenticación:', error);
          router.push('/login?error=' + error);
          return;
        }

        // Si llegamos aquí sin error, significa que la autenticación fue exitosa
        // La cookie ya está establecida por el backend
        // Solo necesitamos refrescar el usuario y redirigir
        await refreshUser();
        router.push('/');
        
      } catch (error) {
        console.error('Error en callback de autenticación:', error);
        router.push('/login?error=callback_error');
      }
    };

    handleCallback();
  }, [searchParams, refreshUser, router]);

  return <Loading message="Completando autenticación..." />;
};

export default AuthCallbackPage; 