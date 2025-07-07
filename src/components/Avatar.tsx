'use client';

import React, { useState } from 'react';
import { UserIcon } from '@heroicons/react/24/outline';

// Función para procesar URLs de Google y evitar errores 429
const processGoogleImageUrl = (url: string): string => {
  if (!url || !url.includes('googleusercontent.com')) {
    return url;
  }
  
  // Opción 1: Usar un proxy de imágenes
  try {
    return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=400&h=400&fit=cover&output=webp`;
  } catch (error) {
    // Opción 2: Modificar la URL original de Google
    const baseUrl = url.split('=')[0];
    const timestamp = Date.now();
    return `${baseUrl}=s400-c&v=${timestamp}`;
  }
};

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt = 'Avatar', 
  size = 'md', 
  className = '' 
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Procesar la URL de la imagen
  const processedSrc = src ? processGoogleImageUrl(src) : src;
  


  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const iconSizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-7 h-7',
    xl: 'w-10 h-10'
  };

  React.useEffect(() => {
    if (processedSrc) {
      // Validar que la URL sea válida
      try {
        new URL(processedSrc);
        setImageError(false);
        setImageLoaded(false);
      } catch (error) {
        setImageError(true);
        setImageLoaded(false);
      }
    }
  }, [processedSrc, alt]);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Si hay src y no hay error, mostrar la imagen
  if (processedSrc && !imageError) {
    return (
      <div className={`${sizeClasses[size]} ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={processedSrc}
          alt={alt}
          className={`${sizeClasses[size]} rounded-full object-cover border-2 border-white shadow-sm`}
          onError={handleImageError}
          onLoad={handleImageLoad}
          style={{ display: imageLoaded ? 'block' : 'none' }}
          crossOrigin="anonymous"
        />
        {!imageLoaded && (
          <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center animate-pulse`}>
            <UserIcon className={`${iconSizeClasses[size]} text-white`} />
          </div>
        )}
      </div>
    );
  }

  // Avatar por defecto cuando no hay imagen o hay error
  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center ${className}`}>
      <UserIcon className={`${iconSizeClasses[size]} text-white`} />
    </div>
  );
};

export default Avatar; 