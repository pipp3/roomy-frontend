'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Box,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  IconButton,
  Fab
} from '@mui/material';
import {
  TrashIcon,
  PlusIcon,
  CalendarDaysIcon,
  ClockIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import { Reserva } from '@/types';
import Link from 'next/link';
import AuthGuard from '@/components/AuthGuard';
import Loading from '@/components/Loading';
import { parseISO, isBefore } from 'date-fns';
import { formatearFechaSinZonaHoraria } from '@/lib/dateUtils';
import { useReservaStore, useReservas, useReservasLoading, useReservasError } from '@/stores/reservaStore';
import { useUIStore, useDeleteDialog } from '@/stores/uiStore';

const ReservasPage: React.FC = () => {
  const { reservas, loading, error, cargarReservas, eliminarReserva } = useReservaStore();
  const { deleteDialog, setDeleteDialog } = useUIStore();
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    cargarReservas();
  }, [cargarReservas]);

  const handleDeleteClick = (reserva: Reserva) => {
    setDeleteDialog(true, reserva);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.reserva?._id) return;

    try {
      setDeleting(true);
      await eliminarReserva(deleteDialog.reserva._id);
      setDeleteDialog(false);
    } catch (err: unknown) {
      // El error ya se maneja en el store
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog(false);
  };

  const getEstadoReserva = (reserva: Reserva): 'pasada' | 'hoy' | 'proxima' => {
    const fechaReserva = parseISO(reserva.fecha);
    const hoy = new Date();

    if (isBefore(fechaReserva, hoy)) return 'pasada';
    if (fechaReserva.toDateString() === hoy.toDateString()) return 'hoy';
    return 'proxima';
  };

  const getColorChip = (estado: 'pasada' | 'hoy' | 'proxima') => {
    switch (estado) {
      case 'pasada': return 'default';
      case 'hoy': return 'primary';
      case 'proxima': return 'secondary';
    }
  };

  const getTextoEstado = (estado: 'pasada' | 'hoy' | 'proxima') => {
    switch (estado) {
      case 'pasada': return 'Finalizada';
      case 'hoy': return 'Hoy';
      case 'proxima': return 'Próxima';
    }
  };

  // Agrupar reservas por estado
  const reservasAgrupadas = {
    hoy: reservas.filter(r => getEstadoReserva(r) === 'hoy'),
    proximas: reservas.filter(r => getEstadoReserva(r) === 'proxima'),
    pasadas: reservas.filter(r => getEstadoReserva(r) === 'pasada')
  };

  if (loading) {
    return (
      <AuthGuard>
        <Loading message="Cargando reservas..." />
      </AuthGuard>
    );
  }

  const ReservaCard: React.FC<{ reserva: Reserva }> = ({ reserva }) => {
    const estado = getEstadoReserva(reserva);
    const puedeEliminar = estado !== 'pasada';

    return (
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardContent>
          <Box className="flex justify-between items-start mb-3">
            <Typography variant="h6" className="font-semibold">
              {reserva.sala}
            </Typography>
            <Box className="flex items-center space-x-2">
              <Chip
                label={getTextoEstado(estado)}
                color={getColorChip(estado)}
                size="small"
              />
              {puedeEliminar && (
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleDeleteClick(reserva)}
                  className="ml-2"
                >
                  <TrashIcon className="w-4 h-4" />
                </IconButton>
              )}
            </Box>
          </Box>

          <Box className="space-y-2">
            <Box className="flex items-center text-text-secondary">
              <CalendarDaysIcon className="w-4 h-4 mr-2" />
              <Typography variant="body2">
                {formatearFechaSinZonaHoraria(reserva.fecha)}
              </Typography>
            </Box>

            <Box className="flex items-center text-text-secondary">
              <ClockIcon className="w-4 h-4 mr-2" />
              <Typography variant="body2">
                {reserva.horaInicio} - {reserva.horaFin}
              </Typography>
            </Box>

            <Box className="flex items-center text-text-secondary">
              <BuildingOfficeIcon className="w-4 h-4 mr-2" />
              <Typography variant="body2">
                {reserva.sala}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  const SeccionReservas: React.FC<{
    titulo: string;
    reservas: Reserva[];
    descripcion?: string;
  }> = ({ titulo, reservas, descripcion }) => {
    if (reservas.length === 0) return null;

    return (
      <Box className="mb-8">
        <Typography variant="h5" className="mb-2 font-semibold">
          {titulo}
        </Typography>
        {descripcion && (
          <Typography variant="body2" className="mb-4 text-text-secondary">
            {descripcion}
          </Typography>
        )}
        <Grid container spacing={3}>
          {reservas.map((reserva) => (
            <Grid item xs={12} sm={6} md={4} key={reserva._id}>
              <ReservaCard reserva={reserva} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <AuthGuard>
      <Container maxWidth="lg" className="py-8">
        <Box className="flex justify-between items-center mb-8">
          <Box>
            <Typography variant="h4" component="h1" className="mb-2 font-bold text-text-primary">
              Mis Reservas
            </Typography>
            <Typography variant="body1" className="text-text-secondary">
              Gestiona todas tus reservas de salas
            </Typography>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" className="mb-6">
            {error}
          </Alert>
        )}

        {reservas.length === 0 ? (
          <Card>
            <CardContent className="text-center py-16">
              <CalendarDaysIcon className="w-16 h-16 mx-auto mb-4 text-text-secondary" />
              <Typography variant="h6" className="mb-2">
                No tienes reservas
              </Typography>
              <Typography variant="body2" className="text-text-secondary mb-4">
                Comienza creando tu primera reserva de sala
              </Typography>
              <Link href="/nueva-reserva">
                <Button variant="contained" className="bg-primary hover:bg-primary-700">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Nueva Reserva
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            <SeccionReservas
              titulo="Reservas de Hoy"
              reservas={reservasAgrupadas.hoy}
              descripcion="Tus reservas para el día de hoy"
            />

            <SeccionReservas
              titulo="Próximas Reservas"
              reservas={reservasAgrupadas.proximas}
              descripcion="Reservas futuras programadas"
            />

            <SeccionReservas
              titulo="Reservas Pasadas"
              reservas={reservasAgrupadas.pasadas}
              descripcion="Historial de reservas anteriores"
            />
          </>
        )}

        {/* FAB para nueva reserva */}
        <Link href="/nueva-reserva">
          <Fab
            color="primary"
            className="fixed bottom-6 right-6 bg-primary hover:bg-primary-700"
            size="large"
          >
            <PlusIcon className="w-6 h-6" />
          </Fab>
        </Link>

        {/* Dialog de confirmación de eliminación */}
        <Dialog
          open={deleteDialog.open}
          onClose={handleDeleteCancel}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            Confirmar Eliminación
          </DialogTitle>
          <DialogContent>
            <Typography>
              ¿Estás seguro de que quieres eliminar esta reserva?
            </Typography>
            {deleteDialog.reserva && (
              <Box className="mt-4 p-4 bg-background-light rounded">
                <Typography variant="subtitle2" className="font-semibold">
                  {deleteDialog.reserva.sala}
                </Typography>
                <Typography variant="body2" className="text-text-secondary">
                  {formatearFechaSinZonaHoraria(deleteDialog.reserva.fecha)}
                </Typography>
                <Typography variant="body2" className="text-text-secondary">
                  {deleteDialog.reserva.horaInicio} - {deleteDialog.reserva.horaFin}
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} disabled={deleting}>
              Cancelar
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              color="error"
              variant="contained"
              disabled={deleting}
            >
              {deleting ? 'Eliminando...' : 'Eliminar'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </AuthGuard>
  );
};

export default ReservasPage; 