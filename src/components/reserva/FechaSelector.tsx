

import React from 'react';
import { Grid, Card, CardContent, Box, Typography, TextField, Slide } from '@mui/material';
import { CalendarIcon } from '@heroicons/react/24/outline';

interface FechaSelectorProps {
  value: string;
  onChange: (value: string) => void;
  minDate: string;
}

const FechaSelector: React.FC<FechaSelectorProps> = ({ value, onChange, minDate }) => {
  const formatDateForDisplay = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };



  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue) {
      onChange(inputValue); // Mantener formato YYYY-MM-DD para el backend
    } else {
      onChange('');
    }
  };

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
              label="Selecciona la fecha"
              value={value}
              onChange={handleDateChange}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: minDate,
                'aria-label': 'Seleccionar fecha de reserva en formato día/mes/año',
                pattern: '\\d{4}-\\d{2}-\\d{2}'
              }}
              helperText={
                value 
                  ? `Fecha seleccionada: ${formatDateForDisplay(value)}` 
                  : 'Formato: DD/MM/AAAA'
              }
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
                '& input[type="date"]': {
                  fontFamily: 'inherit',
                  '&::-webkit-calendar-picker-indicator': {
                    filter: 'invert(0.5)',
                    cursor: 'pointer',
                  },
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