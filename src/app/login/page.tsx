'use client';

import React, { useEffect } from 'react';
import { Container, Paper, Typography, Button, Box, Grid } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
import { 
  BuildingOfficeIcon, 
  CalendarDaysIcon, 
  ClockIcon,
  LockClosedIcon,
  SparklesIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const LoginPage: React.FC = () => {
  const { usuario, isLoading, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (usuario) {
      router.push('/');
    }
  }, [usuario, router]);

  if (isLoading) {
    return <Loading message="Verificando autenticación..." />;
  }

  if (usuario) {
    return <Loading message="Redirigiendo..." />;
  }

  return (
    <Box className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50 flex items-center justify-center p-4">
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center" className="min-h-[80vh]">
          {/* Columna izquierda - Información del producto */}
          <Grid item xs={12} lg={6}>
            <Box className="text-center lg:text-left">
              <Box className="flex items-center justify-center lg:justify-start mb-6">
                <BuildingOfficeIcon className="w-12 h-12 text-primary mr-3" />
                <Typography variant="h3" className="font-bold text-primary">
                  RoomyApp
                </Typography>
              </Box>
              
              <Typography variant="h4" className="mb-4 font-bold text-text-primary">
                Sistema Inteligente de
                <span className="text-primary"> Reservas de Salas</span>
              </Typography>
              
              <Typography variant="h6" className="mb-8 text-text-secondary leading-relaxed">
                Gestiona las salas de reuniones de tu empresa de manera eficiente, 
                rápida y sin complicaciones.
              </Typography>

              {/* Características destacadas */}
              <Box className="space-y-6">
                <Box className="flex items-center justify-center lg:justify-start">
                  <Box className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <CalendarDaysIcon className="w-6 h-6 text-primary" />
                  </Box>
                  <Box className="text-left">
                    <Typography variant="subtitle1" className="font-semibold text-text-primary">
                      Reservas Inteligentes
                    </Typography>
                    <Typography variant="body2" className="text-text-secondary">
                      Visualiza disponibilidad en tiempo real
                    </Typography>
                  </Box>
                </Box>

                <Box className="flex items-center justify-center lg:justify-start">
                  <Box className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mr-4">
                    <ClockIcon className="w-6 h-6 text-secondary" />
                  </Box>
                  <Box className="text-left">
                    <Typography variant="subtitle1" className="font-semibold text-text-primary">
                      Gestión Simplificada
                    </Typography>
                    <Typography variant="body2" className="text-text-secondary">
                      Administra todas tus reservas desde un solo lugar
                    </Typography>
                  </Box>
                </Box>

                <Box className="flex items-center justify-center lg:justify-start">
                  <Box className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mr-4">
                    <ShieldCheckIcon className="w-6 h-6 text-accent" />
                  </Box>
                  <Box className="text-left">
                    <Typography variant="subtitle1" className="font-semibold text-text-primary">
                      Seguro y Confiable
                    </Typography>
                    <Typography variant="body2" className="text-text-secondary">
                      Autenticación segura con Google OAuth
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Columna derecha - Formulario de login */}
          <Grid item xs={12} lg={6}>
            <Box className="flex justify-center">
              <Paper 
                elevation={12} 
                className="p-10 w-full max-w-md bg-white/95 backdrop-blur-sm border border-white/20 shadow-2xl"
                sx={{
                  borderRadius: '24px',
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(249,250,251,0.95) 100%)'
                }}
              >
                <Box textAlign="center">
                  {/* Icono y título principal */}
                  <Box className="w-20 h-20 bg-gradient-to-br from-primary to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <LockClosedIcon className="w-10 h-10 text-white" />
                  </Box>
                  
                  <Typography variant="h4" component="h1" className="mb-3 font-bold text-text-primary">
                    ¡Bienvenido!
                  </Typography>
                  
                  <Typography variant="body1" className="mb-8 text-text-secondary leading-relaxed">
                    Inicia sesión para acceder a tu espacio de trabajo y gestionar 
                    las reservas de salas de reuniones.
                  </Typography>
                  
                  {/* Botón de login mejorado */}
                  <Button
                    variant="contained"
                    size="large"
                    onClick={login}
                    fullWidth
                    className="py-4 mb-6 text-lg font-semibold"
                    sx={{
                      background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                      borderRadius: '16px',
                      boxShadow: '0 8px 25px rgba(37, 99, 235, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1D4ED8 0%, #1E3A8A 100%)',
                        boxShadow: '0 12px 35px rgba(37, 99, 235, 0.4)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Box className="flex items-center justify-center">
                      <SparklesIcon className="w-6 h-6 mr-3" />
                      Iniciar Sesión con Google
                    </Box>
                  </Button>
                  
                  {/* Footer del formulario */}
                  <Box className="pt-6 border-t border-gray-100">
                    <Typography variant="caption" className="text-text-secondary">
                      Al iniciar sesión, aceptas nuestros{' '}
                      <span className="text-primary font-medium cursor-pointer hover:underline">
                        términos y condiciones
                      </span>
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LoginPage; 