import { create } from 'zustand';
import { ReservaService } from '@/services/reservaService';
import { Reserva, Sala } from '@/types';
import { convertirFechaParaBackend } from '@/lib/dateUtils';

interface ReservaState {
  // Estado de las reservas del usuario
  reservas: Reserva[];
  loading: boolean;
  error: string | null;
  
  // Estado de disponibilidad
  horariosDisponibles: string[];
  disponibilidadLoading: boolean;
  
  // Estado de formulario de nueva reserva
  formData: {
    sala: Sala | '';
    fecha: string;
    horaInicio: string;
    horaFin: string;
  };
  
  // Estado de UI
  showHorarios: boolean;
  success: string | null;
  
  // Acciones
  cargarReservas: () => Promise<void>;
  crearReserva: (reserva: Omit<Reserva, '_id' | 'usuarioId'>) => Promise<void>;
  eliminarReserva: (id: string) => Promise<void>;
  obtenerDisponibilidad: (sala: Sala, fecha: string) => Promise<void>;
  actualizarFormData: (field: keyof ReservaState['formData'], value: string) => void;
  limpiarFormData: () => void;
  limpiarMensajes: () => void;
  setError: (error: string | null) => void;
  setSuccess: (success: string | null) => void;
}

const SALAS_DISPONIBLES: Sala[] = [
  'Sala1', 'Sala2', 'Sala3', 'Sala4', 'Sala5',
  'Sala6', 'Sala7', 'Sala8', 'Sala9', 'Sala10'
];

export const useReservaStore = create<ReservaState>((set, get) => ({
  // Estado inicial
  reservas: [],
  loading: false,
  error: null,
  horariosDisponibles: [],
  disponibilidadLoading: false,
  formData: {
    sala: '',
    fecha: '',
    horaInicio: '',
    horaFin: ''
  },
  showHorarios: false,
  success: null,

  // Cargar reservas del usuario
  cargarReservas: async () => {
    set({ loading: true, error: null });
    
    try {
      const misReservas = await ReservaService.obtenerMisReservas();
      set({ reservas: misReservas, loading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al cargar las reservas';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Crear nueva reserva
  crearReserva: async (reserva) => {
    set({ loading: true, error: null });
    
    try {
      const nuevaReserva = await ReservaService.crearReserva(reserva);
      set(state => ({
        reservas: [...state.reservas, nuevaReserva],
        loading: false,
        success: '¡Reserva creada exitosamente!'
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al crear la reserva';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Eliminar reserva
  eliminarReserva: async (id: string) => {
    set({ loading: true, error: null });
    
    try {
      await ReservaService.eliminarReserva(id);
      set(state => ({
        reservas: state.reservas.filter(r => r._id !== id),
        loading: false,
        success: 'Reserva eliminada exitosamente'
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al eliminar la reserva';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Obtener disponibilidad de horarios
  obtenerDisponibilidad: async (sala: Sala, fecha: string) => {
    if (!sala || !fecha) {
      set({ horariosDisponibles: [], showHorarios: false });
      return;
    }

    set({ disponibilidadLoading: true });
    
    try {
      const fechaFormateada = convertirFechaParaBackend(fecha);
      const disponibilidad = await ReservaService.obtenerDisponibilidad(sala, fechaFormateada);
      
      set({
        horariosDisponibles: disponibilidad.horariosDisponibles,
        showHorarios: true,
        disponibilidadLoading: false
      });
    } catch (error) {
      set({
        horariosDisponibles: [],
        showHorarios: false,
        disponibilidadLoading: false
      });
    }
  },

  // Actualizar datos del formulario
  actualizarFormData: (field, value) => {
    set(state => {
      const newFormData = { ...state.formData, [field]: value };
      
      // Limpiar horarios dependientes cuando cambian sala o fecha
      if (field === 'sala' || field === 'fecha') {
        newFormData.horaInicio = '';
        newFormData.horaFin = '';
      }
      
      // Limpiar hora fin cuando cambia hora inicio
      if (field === 'horaInicio') {
        newFormData.horaFin = '';
      }

      return { formData: newFormData };
    });

    // Obtener disponibilidad si cambió sala o fecha
    const { formData } = get();
    if (field === 'sala' || field === 'fecha') {
      get().obtenerDisponibilidad(formData.sala as Sala, formData.fecha);
    }

    get().limpiarMensajes();
  },

  // Limpiar formulario
  limpiarFormData: () => {
    set({
      formData: {
        sala: '',
        fecha: '',
        horaInicio: '',
        horaFin: ''
      },
      horariosDisponibles: [],
      showHorarios: false
    });
  },

  // Limpiar mensajes
  limpiarMensajes: () => {
    set({ error: null, success: null });
  },

  // Setters
  setError: (error: string | null) => set({ error }),
  setSuccess: (success: string | null) => set({ success })
}));

// Selectores útiles
export const useReservas = () => useReservaStore(state => state.reservas);
export const useReservasLoading = () => useReservaStore(state => state.loading);
export const useReservasError = () => useReservaStore(state => state.error);
export const useFormData = () => useReservaStore(state => state.formData);
export const useHorariosDisponibles = () => useReservaStore(state => state.horariosDisponibles);
export const useShowHorarios = () => useReservaStore(state => state.showHorarios); 