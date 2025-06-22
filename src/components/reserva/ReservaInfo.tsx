import React from 'react';
import { Card, CardContent, Box, Typography, Grid, Slide } from '@mui/material';
import { ClockIcon, CalendarIcon, CheckIcon } from '@heroicons/react/24/outline';

const ReservaInfo: React.FC = () => {
  return (
    <Slide direction="up" in timeout={1400}>
      <Card className="mt-8 border-0 shadow-xl bg-white overflow-hidden">
        <Box className="bg-primary p-1">
          <CardContent className="bg-white m-1 rounded-lg">
            <Box className="text-center mb-6">
              <Typography variant="h5" className="font-bold text-text-primary mb-2">
                Información de Reservas
              </Typography>
              <Typography variant="body2" className="text-text-secondary">
                Todo lo que necesitas saber sobre nuestro sistema de reservas
              </Typography>
            </Box>
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Box className="text-center p-4 rounded-xl bg-background hover:shadow-lg transition-all duration-300 border border-gray-100">
                  <ClockIcon className="w-12 h-12 text-primary mx-auto mb-3" />
                  <Typography variant="h6" className="font-semibold text-text-primary mb-2">
                    Horario
                  </Typography>
                  <Typography variant="body2" className="text-text-secondary">
                    Funcionamiento de 9:00 a 18:00 horas
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box className="text-center p-4 rounded-xl bg-background hover:shadow-lg transition-all duration-300 border border-gray-100">
                  <CalendarIcon className="w-12 h-12 text-secondary mx-auto mb-3" />
                  <Typography variant="h6" className="font-semibold text-text-primary mb-2">
                    Duración
                  </Typography>
                  <Typography variant="body2" className="text-text-secondary">
                    Mínimo 30 minutos, máximo 3 horas
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box className="text-center p-4 rounded-xl bg-background hover:shadow-lg transition-all duration-300 border border-gray-100">
                  <CheckIcon className="w-12 h-12 text-accent mx-auto mb-3" />
                  <Typography variant="h6" className="font-semibold text-text-primary mb-2">
                    Intervalos
                  </Typography>
                  <Typography variant="body2" className="text-text-secondary">
                    Reservas en intervalos de 30 minutos
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Box>
      </Card>
    </Slide>
  );
};

export default ReservaInfo; 