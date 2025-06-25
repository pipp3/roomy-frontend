import api from '@/lib/api';
import { Usuario } from '@/types';
import { toast } from 'sonner';

interface ApiError {
  response?: {
    status?: number;
    data?: unknown;
  };
}

export class AuthService {
  static async loginWithGoogle(): Promise<void> {
    // Para el login con Google OAuth, sí necesitamos usar window.location
    // porque estamos redirigiendo a un servicio externo
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    if (!apiUrl || apiUrl.includes('localhost')) {
      // Solo mostrar en desarrollo
      if (process.env.NODE_ENV === 'development') {
        toast.warning('Modo desarrollo', {
          description: 'Usando configuración local',
        });
      }
    }
    
    window.location.href = `${apiUrl}/api/auth/google`;
  }

  static async logout(): Promise<void> {
    try {
      await api.get('/api/auth/logout');
    } catch (error) {
      toast.error('Error al cerrar sesión', {
        description: 'Intenta cerrar sesión nuevamente',
      });
    }
    // No redirigimos aquí, dejamos que el componente maneje la redirección
    // usando el router de Next.js
  }

  static hasAuthCookie(): boolean {
    // Verificar si hay alguna cookie que sugiera autenticación
    // Aunque no podemos leer cookies httpOnly, podemos verificar si hay alguna cookie
    if (typeof document === 'undefined') return false;
    
    // En lugar de verificar todas las cookies, verificamos si hay indicios de autenticación
    // Nota: No podemos leer la cookie 'token' porque es httpOnly (esto es correcto por seguridad)
    // Esta función es solo una optimización para evitar requests innecesarios
    const hasCookies = document.cookie.length > 0;
    
    // Si hay cualquier cookie, es posible que haya una de autenticación
    // La validación real siempre se hace en el backend
    return hasCookies;
  }

  static async getCurrentUser(): Promise<Usuario | null> {
    try {
      // Verificar si hay cookies antes de hacer la petición
      const hasCookies = this.hasAuthCookie();
      if (!hasCookies) {
        // En modo silencioso, no mostrar toast para esto
        return null;
      }
      
      // Hacemos una llamada al backend para verificar la autenticación
      // El token se envía automáticamente en la cookie httpOnly
      const response = await api.get('/api/auth/me');
      const user = response.data.user;
      return user;
    } catch (error: unknown) {
      // Si es un error 401, significa que no está autenticado (normal)
      const apiError = error as ApiError;
      
      if (apiError.response?.status === 401) {
        // Normal, usuario no autenticado - no mostrar error
        return null;
      }
      
      if (apiError.response?.status === 404) {
        toast.error('Servicio no disponible', {
          description: 'Verifica tu conexión a internet',
        });
      } else if (apiError.response?.status && apiError.response.status >= 500) {
        toast.error('Error del servidor', {
          description: 'Intenta nuevamente en unos momentos',
        });
      } else if (!apiError.response) {
        // Error de red
        toast.error('Error de conexión', {
          description: 'Verifica tu conexión a internet',
        });
      }
      
      return null;
    }
  }

  static async checkAuthStatus(): Promise<boolean> {
    try {
      const user = await this.getCurrentUser();
      const isAuthenticated = user !== null;
      return isAuthenticated;
    } catch (error) {
      // No mostrar toast aquí ya que getCurrentUser ya maneja los errores
      return false;
    }
  }
} 