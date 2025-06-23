

import React from 'react';
import { Grid, Card, CardContent, Box, Typography, FormControl, InputLabel, Select, MenuItem, Chip, Divider, Fade } from '@mui/material';
import { ClockIcon } from '@heroicons/react/24/outline';

interface HorarioSelectorProps {
  horaInicio: string;
  horaFin: string;
  horariosDisponibles: string[];
  onHoraInicioChange: (value: string) => void;
  onHoraFinChange: (value: string) => void;
  showHorarios: boolean;
}

const HorarioSelector: React.FC<HorarioSelectorProps> = ({
  horaInicio,
  horaFin,
  horariosDisponibles,
  onHoraInicioChange,
  onHoraFinChange,
  showHorarios
}) => {


  const getHorariosFinDisponibles = (): string[] => {
    if (!horaInicio) return [];
    
    // Convertir hora inicio a minutos para cálculos
    const [horaInicioHour, horaInicioMin] = horaInicio.split(':').map(Number);
    const inicioEnMinutos = horaInicioHour * 60 + horaInicioMin;
    
    // Filtrar horarios disponibles que sean posteriores a la hora de inicio
    // y que no excedan las 3 horas de duración máxima
    return horariosDisponibles
      .filter(horario => {
        const [hora, min] = horario.split(':').map(Number);
        const horarioEnMinutos = hora * 60 + min;
        
        // Debe ser posterior a la hora de inicio
        if (horarioEnMinutos <= inicioEnMinutos) return false;
        
        // No debe exceder 3 horas (180 minutos) de duración
        const duracion = horarioEnMinutos - inicioEnMinutos;
        if (duracion > 180) return false;
        
        return true;
      })
      .slice(0, 6); // Máximo 6 opciones (30min, 1h, 1.5h, 2h, 2.5h, 3h)
  };

  if (!showHorarios) return null;

  return (
    <Fade in={showHorarios} timeout={1000}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Divider className="mb-6">
            <Chip 
              className='my-8'
              label="Horarios Disponibles" 
              sx={{ 
                bgcolor: '#2563EB', 
                color: 'white',
                fontWeight: 'semibold',
                px: 3
              }}
            />
          </Divider>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
            <CardContent className="p-6">
              <Box className="flex items-center mb-4">
                <ClockIcon className="w-6 h-6 text-secondary mr-2" />
                <Typography variant="h6" className="font-semibold text-text-primary">
                  Hora de Inicio
                </Typography>
              </Box>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="hora-inicio-label">Selecciona hora de inicio</InputLabel>
                <Select
                  labelId="hora-inicio-label"
                  value={horaInicio}
                  label="Selecciona hora de inicio"
                  onChange={(e) => onHoraInicioChange(e.target.value)}
                  disabled={horariosDisponibles.length === 0}
                  aria-label="Seleccionar hora de inicio"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#10B981',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#10B981',
                      },
                    },
                  }}
                >
                  {horariosDisponibles.map((horario) => (
                    <MenuItem key={horario} value={horario} className="py-3">
                      <Box className="flex items-center">
                        <ClockIcon className="w-4 h-4 text-secondary mr-2" />
                        <Typography className="font-medium text-text-primary">{horario}</Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
            <CardContent className="p-6">
              <Box className="flex items-center mb-4">
                <ClockIcon className="w-6 h-6 text-accent mr-2" />
                <Typography variant="h6" className="font-semibold text-text-primary">
                  Hora de Fin
                </Typography>
              </Box>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="hora-fin-label">Selecciona hora de fin</InputLabel>
                <Select
                  labelId="hora-fin-label"
                  value={horaFin}
                  label="Selecciona hora de fin"
                  onChange={(e) => onHoraFinChange(e.target.value)}
                  disabled={!horaInicio}
                  aria-label="Seleccionar hora de fin"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#F59E0B',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#F59E0B',
                      },
                    },
                  }}
                >
                  {getHorariosFinDisponibles().map((horario) => (
                    <MenuItem key={horario} value={horario} className="py-3">
                      <Box className="flex items-center">
                        <ClockIcon className="w-4 h-4 text-accent mr-2" />
                        <Typography className="font-medium text-text-primary">{horario}</Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fade>
  );
};

export default HorarioSelector; 