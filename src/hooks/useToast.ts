import { toast } from 'sonner';

interface ToastOptions {
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const useToast = () => {
  // Toast de éxito
  const success = (message: string, options?: ToastOptions) => {
    return toast.success(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      action: options?.action,
    });
  };

  // Toast de error
  const error = (message: string, options?: ToastOptions) => {
    return toast.error(message, {
      description: options?.description,
      duration: options?.duration || 5000,
      action: options?.action,
    });
  };

  // Toast de información
  const info = (message: string, options?: ToastOptions) => {
    return toast.info(message, {
      description: options?.description,
      duration: options?.duration || 3000,
      action: options?.action,
    });
  };

  // Toast de advertencia
  const warning = (message: string, options?: ToastOptions) => {
    return toast.warning(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      action: options?.action,
    });
  };

  // Toast de loading
  const loading = (message: string, options?: Omit<ToastOptions, 'action'>) => {
    return toast.loading(message, {
      description: options?.description,
      duration: options?.duration || Infinity,
    });
  };

  // Función para descartar un toast específico
  const dismiss = (toastId?: string | number) => {
    toast.dismiss(toastId);
  };

  // Función para descartar todos los toasts
  const dismissAll = () => {
    toast.dismiss();
  };

  // Toasts específicos para la aplicación de reservas
  const reserva = {
    created: (salaName: string, fecha: string, hora: string) => 
      success('¡Reserva creada exitosamente!', {
        description: `${salaName} - ${fecha} de ${hora}`,
        duration: 5000,
      }),

    updated: (salaName: string) => 
      success('Reserva actualizada', {
        description: `Los cambios en ${salaName} se guardaron correctamente`,
      }),

    deleted: (salaName: string) => 
      success('Reserva cancelada', {
        description: `La reserva de ${salaName} ha sido cancelada`,
      }),

    error: (action: string) => 
      error('Error en la reserva', {
        description: `No se pudo ${action}. Por favor, intenta nuevamente`,
        duration: 6000,
      }),

    loading: (action: string) => 
      loading(`${action}...`, {
        description: 'Por favor espera un momento',
      }),

    conflict: (salaName: string, fecha: string, hora: string) => 
      warning('Conflicto de horario', {
        description: `${salaName} ya está reservada para ${fecha} a las ${hora}`,
        duration: 6000,
      }),
  };

  // Toasts para autenticación
  const auth = {
    loginSuccess: (userName: string) => 
      success(`¡Bienvenido/a, ${userName}!`, {
        description: 'Has iniciado sesión correctamente',
      }),

    loginError: () => 
      error('Error al iniciar sesión', {
        description: 'Verifica tus credenciales e intenta nuevamente',
      }),

    logoutSuccess: () => 
      info('Sesión cerrada', {
        description: 'Has cerrado sesión correctamente',
      }),

    sessionExpired: () => 
      warning('Sesión expirada', {
        description: 'Por favor, inicia sesión nuevamente',
        duration: 5000,
      }),
  };

  // Toasts para navegación y acciones generales
  const navigation = {
    redirecting: (destination: string) => 
      info(`Redirigiendo a ${destination}...`, {
        description: 'Te llevamos allí en un momento',
        duration: 2000,
      }),

    pageLoading: (pageName: string) => 
      loading(`Cargando ${pageName}...`, {
        description: 'Preparando la información',
      }),

    actionCompleted: (action: string) => 
      success(`${action} completado`, {
        description: 'La acción se realizó correctamente',
      }),
  };

  return {
    success,
    error,
    info,
    warning,
    loading,
    dismiss,
    dismissAll,
    reserva,
    auth,
    navigation,
  };
}; 