

import React from 'react';
import { Grid, Card, CardContent, Box, Typography, TextField, Slide } from '@mui/material';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { formatearFechaParaVisualizacion } from '@/lib/dateUtils';

interface FechaSelectorProps {
  value: string;
  onChange: (value: string) => void;
  minDate: string;
}



const FechaSelector: React.FC<FechaSelectorProps> = ({ value, onChange, minDate }) => {
  return (
    <Slide direction="left" in timeout={800}>
      <Grid item xs={12} md={6}>
        <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
          <CardContent className="p-6">
            <Box className="flex items-center mb-4">
              <CalendarIcon className="w-6 h-6 text-secondary mr-2" />
              <Typography variant="h6" className="font-semibold text-text-primary">
                Fecha de Reserva
              </Typography>
            </Box>
            <TextField
              fullWidth
              type="date"
              label="Selecciona la fecha (DD/MM/YYYY)"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: minDate,
                'aria-label': 'Seleccionar fecha de reserva en formato día/mes/año'
              }}
              helperText={value ? `Fecha seleccionada: ${formatearFechaParaVisualizacion(value)}` : 'Formato: DD/MM/YYYY'}
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
                '& .MuiFormHelperText-root': {
                  color: '#6B7280',
                  fontSize: '0.875rem',
                  marginTop: '8px',
                },
              }}
            />
          </CardContent>
        </Card>
      </Grid>
    </Slide>
  );
};

export default FechaSelector; 