import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

interface LoadingScreenProps {
  message?: string;
  showProgress?: boolean;
  variant?: 'auth' | 'data' | 'page';
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "Cargando...", 
  showProgress = true,
  variant = 'page'
}) => {
  const getLoadingContent = () => {
    switch (variant) {
      case 'auth':
        return (
          <Box className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Box className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full mx-4">
              {/* Logo/Branding */}
              <Box className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">R</span>
                </div>
                <Typography variant="h5" className="text-gray-800 font-semibold">
                  RoomyApp
                </Typography>
              </Box>

              {/* Loading Animation */}
              <Box className="mb-4">
                <div className="flex justify-center space-x-1 mb-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                {showProgress && <LinearProgress className="rounded-full" />}
              </Box>

              <Typography variant="body2" className="text-gray-600 text-center">
                {message}
              </Typography>
            </Box>
          </Box>
        );

      case 'data':
        return (
          <Box className="flex flex-col items-center justify-center p-8">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <Typography variant="body1" className="text-gray-600">
              {message}
            </Typography>
            {showProgress && (
              <Box className="w-48 mt-4">
                <LinearProgress className="rounded-full" />
              </Box>
            )}
          </Box>
        );

      default: // 'page'
        return (
          <Box className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <Typography variant="h6" className="text-gray-700 mb-2">
              {message}
            </Typography>
            {showProgress && (
              <Box className="w-64">
                <LinearProgress className="rounded-full" />
              </Box>
            )}
          </Box>
        );
    }
  };

  return getLoadingContent();
};

export default LoadingScreen; 