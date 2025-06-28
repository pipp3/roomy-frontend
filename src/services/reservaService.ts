import api from '@/lib/api';
import { Reserva, DisponibilidadResponse, Sala } from '@/types';
import { getSession } from 'next-auth/react';

export class ReservaService {
  // Función auxiliar para obtener el userId de MongoDB
  static async obtenerUserId(): Promise<string> {
    const session = await getSession();
    if (!session?.user) {
      throw new Error('Usuario no autenticado');
    }

    try {
      const response = await api.get('/api/reservas/obtener-usuario', {
        params: {
          googleId: session.user.id,
          email: session.user.email,
          nombre: session.user.name,
          avatar: session.user.image
        }
      });
      
      return response.data.userId;
    } catch (error) {
      console.error('Error al obtener userId:', error);
      throw new Error('Error al obtener información del usuario');
    }
  }

  static async obtenerReservas(): Promise<Reserva[]> {
    const userId = await this.obtenerUserId();
    const response = await api.get(`/api/reservas?userId=${userId}`);
    return response.data;
  }

  static async obtenerMisReservas(): Promise<Reserva[]> {
    const userId = await this.obtenerUserId();
    const response = await api.get(`/api/reservas/mis-reservas?userId=${userId}`);
    return response.data;
  }

  static async crearReserva(reserva: Omit<Reserva, '_id' | 'usuarioId' | 'createdAt' | 'updatedAt'>): Promise<Reserva> {
    const userId = await this.obtenerUserId();
    
    const reservaConUserId = {
      ...reserva,
      userId: userId
    };
    
    const response = await api.post('/api/reservas', reservaConUserId);
    return response.data.reserva || response.data;
  }

  static async actualizarReserva(id: string, reserva: Partial<Reserva>): Promise<Reserva> {
    const userId = await this.obtenerUserId();
    
    const reservaConUserId = {
      ...reserva,
      userId: userId
    };
    
    const response = await api.put(`/api/reservas/${id}`, reservaConUserId);
    return response.data.reserva || response.data;
  }

  static async eliminarReserva(id: string): Promise<void> {
    const userId = await this.obtenerUserId();
    
    await api.delete(`/api/reservas/${id}`, {
      data: { userId: userId }
    });
  }

  static async obtenerDisponibilidad(sala: Sala, fecha: string): Promise<DisponibilidadResponse> {
    const response = await api.get(`/api/reservas/disponibilidad?sala=${sala}&fecha=${fecha}`);
    return response.data;
  }

  static generarHorariosDisponibles(): string[] {
    const horarios: string[] = [];
    for (let hora = 9; hora < 18; hora++) {
      horarios.push(`${hora.toString().padStart(2, '0')}:00`);
      if (hora < 17) { // No agregar 17:30 ya que el límite es 18:00
        horarios.push(`${hora.toString().padStart(2, '0')}:30`);
      }
    }
    return horarios;
  }

  static validarDuracionReserva(horaInicio: string, horaFin: string): boolean {
    const [inicioH, inicioM] = horaInicio.split(':').map(Number);
    const [finH, finM] = horaFin.split(':').map(Number);
    
    const duracionMinutos = (finH - inicioH) * 60 + (finM - inicioM);
    
    return duracionMinutos >= 30 && duracionMinutos <= 180 && duracionMinutos % 30 === 0;
  }
} 