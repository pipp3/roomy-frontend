import { create } from 'zustand';

interface UIState {
  // Estados de loading globales
  globalLoading: boolean;
  loadingMessage: string;
  
  // Estados de modales y diálogos
  deleteDialog: {
    open: boolean;
    reserva: any | null;
  };
  
  // Estados de navegación
  currentPage: string;
  
  // Estados de notificaciones
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    description?: string;
  }>;
  
  // Acciones
  setGlobalLoading: (loading: boolean, message?: string) => void;
  setDeleteDialog: (open: boolean, reserva?: any) => void;
  setCurrentPage: (page: string) => void;
  addNotification: (notification: Omit<UIState['notifications'][0], 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  // Estado inicial
  globalLoading: false,
  loadingMessage: '',
  deleteDialog: {
    open: false,
    reserva: null
  },
  currentPage: '',
  notifications: [],

  // Acciones
  setGlobalLoading: (loading: boolean, message: string = '') => {
    set({ globalLoading: loading, loadingMessage: message });
  },

  setDeleteDialog: (open: boolean, reserva?: any) => {
    set({ deleteDialog: { open, reserva: reserva || null } });
  },

  setCurrentPage: (page: string) => {
    set({ currentPage: page });
  },

  addNotification: (notification) => {
    const id = Date.now().toString();
    set(state => ({
      notifications: [...state.notifications, { ...notification, id }]
    }));
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
      get().removeNotification(id);
    }, 5000);
  },

  removeNotification: (id: string) => {
    set(state => ({
      notifications: state.notifications.filter(n => n.id !== id)
    }));
  },

  clearNotifications: () => {
    set({ notifications: [] });
  }
}));

// Selectores útiles
export const useGlobalLoading = () => useUIStore(state => ({
  loading: state.globalLoading,
  message: state.loadingMessage
}));

export const useDeleteDialog = () => useUIStore(state => state.deleteDialog);

export const useNotifications = () => useUIStore(state => state.notifications); 