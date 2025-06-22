import React from 'react';
import { Box, Typography, Avatar, Fade } from '@mui/material';
import { SparklesIcon } from '@heroicons/react/24/outline';

const ReservaHeader: React.FC = () => {
  return (
    <Box className="text-center mb-8">
      <Fade in timeout={800}>
        <Box>
          <Box className="flex justify-center mb-4">
            <Avatar 
              className="w-16 h-16 bg-primary shadow-lg"
              sx={{ width: 64, height: 64, bgcolor: '#2563EB' }}
            >
              <SparklesIcon className="w-8 h-8 text-white" />
            </Avatar>
          </Box>
          <Typography 
            variant="h3" 
            component="h1" 
            className="font-bold text-text-primary mb-2"
          >
            Nueva Reserva
          </Typography>
          <Typography 
            variant="h6" 
            className="text-text-secondary font-light"
          >
            Reserva tu espacio ideal para trabajar
          </Typography>
        </Box>
      </Fade>
    </Box>
  );
};

export default ReservaHeader; 