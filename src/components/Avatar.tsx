'use client';

import React, { useState } from 'react';
import { UserIcon } from '@heroicons/react/24/outline';

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

  // Debug: log del src recibido
  React.useEffect(() => {
    console.log('Avatar - src recibido:', src);
    console.log('Avatar - alt:', alt);
    if (src) {
      setImageError(false);
      setImageLoaded(false);
    }
  }, [src, alt]);

  const handleImageError = () => {
    console.error('Error cargando imagen del avatar:', src);
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log('Imagen del avatar cargada correctamente:', src);
    setImageLoaded(true);
  };

  // Si hay src y no hay error, mostrar la imagen
  if (src && !imageError) {
    return (
      <div className={`${sizeClasses[size]} ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className={`${sizeClasses[size]} rounded-full object-cover border-2 border-white shadow-sm`}
          onError={handleImageError}
          onLoad={handleImageLoad}
          style={{ display: imageLoaded ? 'block' : 'none' }}
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