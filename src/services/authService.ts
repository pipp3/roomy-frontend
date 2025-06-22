import api from '@/lib/api';
import { Usuario } from '@/types';

export class AuthService {
  static async loginWithGoogle(): Promise<void> {
    // Para el login con Google OAuth, sí necesitamos usar window.location
    // porque estamos redirigiendo a un servicio externo
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    window.location.href = `${apiUrl}/auth/google`;
  }

  static async logout(): Promise<void> {
    try {
      await api.get('/auth/logout');
    } catch (error) {
      console.error('Error durante logout:', error);
    }
    // No redirigimos aquí, dejamos que el componente maneje la redirección
    // usando el router de Next.js
  }

  static hasAuthCookie(): boolean {
    // Verificar si hay alguna cookie que sugiera autenticación
    // Aunque no podemos leer cookies httpOnly, podemos verificar si hay alguna cookie
    if (typeof document === 'undefined') return false;
    
    // Si hay cualquier cookie, es posible que haya una de autenticación
    return document.cookie.length > 0;
  }

  static async getCurrentUser(): Promise<Usuario | null> {
    try {
      //console.log('AuthService - Solicitando usuario actual...');
      // Hacemos una llamada al backend para verificar la autenticación
      // El token se envía automáticamente en la cookie httpOnly
      const response = await api.get('/auth/me');
      //console.log('AuthService - Respuesta del servidor:', response.data);
      const user = response.data.user;
      //console.log('AuthService - Datos del usuario procesados:', user);
      return user;
    } catch (error: any) {
      // Si es un error 401, significa que no está autenticado (normal)
      if (error.response?.status === 401) {
        //console.log('AuthService - Usuario no autenticado (401)');
        return null;
      }
      // Para otros errores, los logueamos
      //console.error('AuthService - Error al obtener usuario actual:', error);
      return null;
    }
  }

  static async checkAuthStatus(): Promise<boolean> {
    try {
      const user = await this.getCurrentUser();
      return user !== null;
    } catch (error) {
      return false;
    }
  }
} 