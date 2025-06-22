

import React from 'react';
import { Grid, Card, CardContent, Box, Typography, FormControl, InputLabel, Select, MenuItem, Chip, Slide } from '@mui/material';
import { HomeModernIcon } from '@heroicons/react/24/outline';
import { Sala } from '@/types';

interface SalaSelectorProps {
  value: Sala | '';
  onChange: (value: string) => void;
  salas: Sala[];
}

const SALA_COLORS = [
  'bg-primary',
  'bg-secondary', 
  'bg-accent',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-red-500'
];

const getSalaIcon = (index: number): string => {
  return SALA_COLORS[index] || SALA_COLORS[0];
};

const SalaSelector: React.FC<SalaSelectorProps> = ({ value, onChange, salas }) => {
  return (
    <Slide direction="right" in timeout={600}>
      <Grid item xs={12} md={6}>
        <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
          <CardContent className="p-6">
            <Box className="flex items-center mb-4">
              <HomeModernIcon className="w-6 h-6 text-primary mr-2" />
              <Typography variant="h6" className="font-semibold text-text-primary">
                Selecciona tu Sala
              </Typography>
            </Box>
            <FormControl fullWidth variant="outlined">
              <InputLabel 
                id="sala-select-label"
                className="text-text-secondary"
              >
                Sala de Reuniones
              </InputLabel>
              <Select
                labelId="sala-select-label"
                value={value}
                label="Sala de Reuniones"
                onChange={(e) => onChange(e.target.value)}
                aria-label="Seleccionar sala"
                className="rounded-lg"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#2563EB',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#2563EB',
                    },
                  },
                }}
              >
                {salas.map((sala, index) => (
                  <MenuItem key={sala} value={sala} className="py-3">
                    <Box className="flex items-center w-full">
                      <Box className={`w-4 h-4 rounded-full ${getSalaIcon(index)} mr-3 shadow-sm`} />
                      <Typography className="font-medium text-text-primary">
                        {sala}
                      </Typography>
                      <Box className="ml-auto">
                        <Chip 
                          label="Disponible" 
                          size="small" 
                          sx={{ 
                            bgcolor: '#D1FAE5', 
                            color: '#047857',
                            fontSize: '0.75rem'
                          }}
                        />
                      </Box>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>
    </Slide>
  );
};

export default SalaSelector; 