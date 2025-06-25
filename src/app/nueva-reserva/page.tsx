'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Box,
  Alert,
  Card,
  CardContent,
  Fade,
  Stack
} from '@mui/material';
import { 
  CheckIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { ReservaService } from '@/services/reservaService';
import { Sala } from '@/types';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import ReservaHeader from '@/components/reserva/ReservaHeader';
import SalaSelector from '@/components/reserva/SalaSelector';
import FechaSelector from '@/components/reserva/FechaSelector';
import HorarioSelector from '@/components/reserva/HorarioSelector';
import ReservaInfo from '@/components/reserva/ReservaInfo';
import { convertirFechaParaBackend } from '@/lib/dateUtils';

interface FormData {
  sala: Sala | '';
  fecha: string;
  horaInicio: string;
  horaFin: string;
}

const SALAS_DISPONIBLES: Sala[] = [
  'Sala1', 'Sala2', 'Sala3', 'Sala4', 'Sala5',
  'Sala6', 'Sala7', 'Sala8', 'Sala9', 'Sala10'
];

const TIEMPO_REDIRECCION = 2000; // 2 segundos

const NuevaReservaPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    sala: '',
    fecha: '',
    horaInicio: '',
    horaFin: ''
  });
  const [horariosDisponibles, setHorariosDisponibles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showHorarios, setShowHorarios] = useState(false);

  const getFechaMinima = (): string => {
    return new Date().toISOString().split('T')[0];
  };

  const limpiarMensajes = (): void => {
    setError(null);
    setSuccess(null);
  };

  const validarFormularioCompleto = (): boolean => {
    return !!(formData.sala && formData.fecha && formData.horaInicio && formData.horaFin);
  };

  const obtenerDisponibilidad = useCallback(async (): Promise<void> => {
    if (!formData.sala || !formData.fecha) {
      setHorariosDisponibles([]);
      setShowHorarios(false);
      return;
    }

    try {
      const fechaFormateada = convertirFechaParaBackend(formData.fecha);
      
      const disponibilidad = await ReservaService.obtenerDisponibilidad(
        formData.sala,
        fechaFormateada
      );
      setHorariosDisponibles(disponibilidad.horariosDisponibles);
      setShowHorarios(true);
    } catch {
      setHorariosDisponibles([]);
      setShowHorarios(false);
    }
  }, [formData.sala, formData.fecha]);

  useEffect(() => {
    obtenerDisponibilidad();
  }, [obtenerDisponibilidad]);

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar horarios dependientes cuando cambian sala o fecha
    if (field === 'sala' || field === 'fecha') {
      setFormData(prev => ({
        ...prev,
        horaInicio: '',
        horaFin: ''
      }));
    }
    
    // Limpiar hora fin cuando cambia hora inicio
    if (field === 'horaInicio') {
      setFormData(prev => ({
        ...prev,
        horaFin: ''
      }));
    }

    limpiarMensajes();
  };

  const validarDuracionReserva = (horaInicio: string, horaFin: string): boolean => {
    if (!horaInicio || !horaFin) return false;
    
    // Convertir a minutos para cálculo preciso
    const [inicioHour, inicioMin] = horaInicio.split(':').map(Number);
    const [finHour, finMin] = horaFin.split(':').map(Number);
    
    const inicioEnMinutos = inicioHour * 60 + inicioMin;
    const finEnMinutos = finHour * 60 + finMin;
    
    const duracionMinutos = finEnMinutos - inicioEnMinutos;
    
    // Validar: mínimo 30 minutos, máximo 180 minutos (3 horas)
    return duracionMinutos >= 30 && duracionMinutos <= 180;
  };

  const validarDatosFormulario = (): void => {
    if (!validarFormularioCompleto()) {
      throw new Error('Todos los campos son obligatorios');
    }

    if (!validarDuracionReserva(formData.horaInicio, formData.horaFin)) {
      throw new Error('La duración debe ser entre 30 minutos y 3 horas, en intervalos de 30 minutos');
    }
  };

  const crearReserva = async (): Promise<void> => {
    const fechaFormateada = convertirFechaParaBackend(formData.fecha);
    
    await ReservaService.crearReserva({
      sala: formData.sala as Sala,
      fecha: fechaFormateada,
      horaInicio: formData.horaInicio,
      horaFin: formData.horaFin
    });
  };

  const handleRedireccionExitosa = (): void => {
    setSuccess('¡Reserva creada exitosamente!');
    setTimeout(() => {
      router.push('/reservas');
    }, TIEMPO_REDIRECCION);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    limpiarMensajes();

    try {
      validarDatosFormulario();
      await crearReserva();
      handleRedireccionExitosa();
    } catch (err: unknown) {
      let errorMessage = 'Error al crear la reserva';
      
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'object' && err !== null) {
        const apiError = err as { response?: { data?: { message?: string } } };
        errorMessage = apiError.response?.data?.message || errorMessage;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = (): void => {
    router.back();
  };

  const renderAlertaSinHorarios = () => {
    if (!formData.sala || !formData.fecha || horariosDisponibles.length > 0) return null;

    return (
      <Fade in timeout={600}>
        <Grid item xs={12}>
          <Alert 
            severity="warning" 
            className="rounded-xl border-0 shadow-lg"
            sx={{
              bgcolor: '#FFFBEB',
              color: '#92400E',
              '& .MuiAlert-icon': {
                color: '#F59E0B',
              },
            }}
          >
            <Typography className="font-medium">
              No hay horarios disponibles para esta sala en la fecha seleccionada.
            </Typography>
          </Alert>
        </Grid>
      </Fade>
    );
  };

  const renderBotones = () => (
    <Fade in timeout={1200}>
      <Grid item xs={12}>
        <Card className="border-0 shadow-lg bg-background">
          <CardContent className="p-8">
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading || !validarFormularioCompleto()}
                className="shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-8 py-3 text-white font-semibold bg-[#2563EB]"
                aria-label={loading ? 'Creando reserva' : 'Crear reserva'}
                sx={{
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  minWidth: '200px',
                  bgcolor: '#2563EB',
                  '&:hover': {
                    bgcolor: '#1D4ED8',
                  },
                  '&:disabled': {
                    bgcolor: '#9CA3AF',
                  },
                }}
              >
                {loading ? (
                  <Box className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creando...
                  </Box>
                ) : (
                  <Box className="flex items-center">
                    <CheckIcon className="w-5 h-5 mr-2" />
                    Crear Reserva
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </Box>
                )}
              </Button>
              
              <Button
                variant="outlined"
                size="large"
                onClick={handleCancelar}
                className="rounded-xl px-8 py-3 font-semibold transition-all duration-300"
                aria-label="Cancelar y volver atrás"
                sx={{
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  minWidth: '200px',
                  borderColor: '#D1D5DB',
                  color: '#374151',
                  '&:hover': {
                    borderColor: '#9CA3AF',
                    bgcolor: '#F9FAFB',
                  },
                }}
              >
                Cancelar
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Fade>
  );

  return (
    <ProtectedRoute>
      <Box className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Container maxWidth="lg" className="py-12">
          <ReservaHeader />

          {error && (
            <Fade in timeout={400}>
              <Alert 
                severity="error" 
                className="mb-6 rounded-xl border-0 shadow-lg" 
                role="alert"
                sx={{
                  bgcolor: '#FEF2F2',
                  color: '#991B1B',
                  '& .MuiAlert-icon': {
                    color: '#EF4444',
                  },
                }}
              >
                <Typography className="font-medium">{error}</Typography>
              </Alert>
            </Fade>
          )}

          {success && (
            <Fade in timeout={400}>
              <Alert 
                severity="success" 
                className="mb-6 rounded-xl border-0 shadow-lg" 
                role="alert"
                sx={{
                  bgcolor: '#ECFDF5',
                  color: '#065F46',
                  '& .MuiAlert-icon': {
                    color: '#10B981',
                  },
                }}
              >
                <Typography className="font-medium">{success}</Typography>
              </Alert>
            </Fade>
          )}

          <Paper 
            elevation={0} 
            className="p-8 rounded-2xl border-0 shadow-2xl bg-white/90 backdrop-blur-sm"
          >
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={4}>
                <SalaSelector 
                  value={formData.sala}
                  onChange={(value) => handleInputChange('sala', value)}
                  salas={SALAS_DISPONIBLES}
                />
                
                <FechaSelector 
                  value={formData.fecha}
                  onChange={(value) => handleInputChange('fecha', value)}
                  minDate={getFechaMinima()}
                />
                
                <HorarioSelector 
                  horaInicio={formData.horaInicio}
                  horaFin={formData.horaFin}
                  horariosDisponibles={horariosDisponibles}
                  onHoraInicioChange={(value) => handleInputChange('horaInicio', value)}
                  onHoraFinChange={(value) => handleInputChange('horaFin', value)}
                  showHorarios={showHorarios}
                />
                
                {renderAlertaSinHorarios()}
                {renderBotones()}
              </Grid>
            </form>
          </Paper>

          <ReservaInfo />
        </Container>
      </Box>
    </ProtectedRoute>
  );
};

export default NuevaReservaPage; 