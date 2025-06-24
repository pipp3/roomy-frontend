import api from '@/lib/api';
import { Reserva, DisponibilidadResponse, Sala } from '@/types';

export class ReservaService {
  static async obtenerReservas(): Promise<Reserva[]> {
    const response = await api.get('/reservas');
    return response.data;
  }

  static async obtenerMisReservas(): Promise<Reserva[]> {
    const response = await api.get('/reservas/mis-reservas');
    return response.data;
  }

  static async crearReserva(reserva: Omit<Reserva, '_id' | 'usuarioId' | 'createdAt' | 'updatedAt'>): Promise<Reserva> {
    const response = await api.post('/reservas', reserva);
    return response.data;
  }

  static async actualizarReserva(id: string, reserva: Partial<Reserva>): Promise<Reserva> {
    const response = await api.put(`/reservas/${id}`, reserva);
    return response.data;
  }

  static async eliminarReserva(id: string): Promise<void> {
    await api.delete(`/reservas/${id}`);
  }

  static async obtenerDisponibilidad(sala: Sala, fecha: string): Promise<DisponibilidadResponse> {
    const response = await api.get(`/reservas/disponibilidad?sala=${sala}&fecha=${fecha}`);
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