import api from '@/lib/api';
import { Usuario } from '@/types';

export class AuthService {
  static async loginWithGoogle(): Promise<void> {
    // Para el login con Google OAuth, sí necesitamos usar window.location
    // porque estamos redirigiendo a un servicio externo
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    console.log('🔑 AuthService - Iniciando login con Google');
    console.log('📍 API URL configurada:', apiUrl);
    console.log('🌐 Redirigiendo a:', `${apiUrl}/auth/google`);
    
    if (!apiUrl || apiUrl.includes('localhost')) {
      console.warn('⚠️ ADVERTENCIA: Usando localhost o API_URL no configurada');
    }
    
    window.location.href = `${apiUrl}/auth/google`;
  }

  static async logout(): Promise<void> {
    try {
      console.log('🚪 AuthService - Iniciando logout');
      await api.get('/auth/logout');
      console.log('✅ AuthService - Logout exitoso');
    } catch (error) {
      console.error('❌ AuthService - Error durante logout:', error);
    }
    // No redirigimos aquí, dejamos que el componente maneje la redirección
    // usando el router de Next.js
  }

  static hasAuthCookie(): boolean {
    // Verificar si hay alguna cookie que sugiera autenticación
    // Aunque no podemos leer cookies httpOnly, podemos verificar si hay alguna cookie
    if (typeof document === 'undefined') return false;
    
    const hasCookies = document.cookie.length > 0;
    console.log('🍪 AuthService - Verificando cookies:', hasCookies ? 'presentes' : 'ausentes');
    console.log('🍪 AuthService - Cookies disponibles:', document.cookie || 'ninguna');
    
    // Si hay cualquier cookie, es posible que haya una de autenticación
    return hasCookies;
  }

  static async getCurrentUser(): Promise<Usuario | null> {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      console.log('👤 AuthService - Solicitando usuario actual...');
      console.log('📍 AuthService - API URL:', apiUrl);
      console.log('🔗 AuthService - URL completa:', `${apiUrl}/auth/me`);
      
      // Verificar si hay cookies antes de hacer la petición
      const hasCookies = this.hasAuthCookie();
      if (!hasCookies) {
        console.log('⚠️ AuthService - No se encontraron cookies, es probable que no esté autenticado');
      }
      
      // Hacemos una llamada al backend para verificar la autenticación
      // El token se envía automáticamente en la cookie httpOnly
      const response = await api.get('/auth/me');
      console.log('✅ AuthService - Respuesta del servidor:', response.data);
      const user = response.data.user;
      console.log('👤 AuthService - Datos del usuario procesados:', user);
      return user;
    } catch (error: unknown) {
      // Si es un error 401, significa que no está autenticado (normal)
      const apiError = error as { response?: { status?: number; data?: any } };
      
      console.log('❌ AuthService - Error al obtener usuario actual:', error);
      
      if (apiError.response?.status === 401) {
        console.log('🔐 AuthService - Usuario no autenticado (401) - normal');
        return null;
      }
      
      if (apiError.response?.status === 404) {
        console.error('🚨 AuthService - ERROR 404: El endpoint /auth/me no existe o no es accesible');
        console.error('🔍 AuthService - Verifica que NEXT_PUBLIC_API_URL esté configurada correctamente');
        console.error('📍 AuthService - URL actual:', process.env.NEXT_PUBLIC_API_URL);
      }
      
      // Para otros errores, los logueamos
      console.error('❌ AuthService - Error detallado:', {
        status: apiError.response?.status,
        data: apiError.response?.data,
        message: error instanceof Error ? error.message : 'Error desconocido'
      });
      return null;
    }
  }

  static async checkAuthStatus(): Promise<boolean> {
    try {
      console.log('🔍 AuthService - Verificando estado de autenticación');
      const user = await this.getCurrentUser();
      const isAuthenticated = user !== null;
      console.log('🔐 AuthService - Estado de autenticación:', isAuthenticated ? 'autenticado' : 'no autenticado');
      return isAuthenticated;
    } catch (error) {
      console.error('❌ AuthService - Error al verificar estado de autenticación:', error);
      return false;
    }
  }
} 