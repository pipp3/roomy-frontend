'use client';

import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = 'Cargando...' }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="200px"
      className="p-8"
    >
      <CircularProgress size={40} />
      <Typography variant="body1" className="mt-4 text-text-secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default Loading; 