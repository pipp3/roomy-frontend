import { signIn, signOut, getSession } from 'next-auth/react';
import { Usuario } from '@/types';

export class AuthService {
  static async loginWithGoogle(): Promise<void> {
    await signIn('google', { 
      callbackUrl: '/',
      redirect: true 
    });
  }

  static async logout(): Promise<void> {
    await signOut({ 
      callbackUrl: '/login',
      redirect: true 
    });
  }

  static async getCurrentUser(): Promise<Usuario | null> {
    try {
      const session = await getSession();
      
      if (!session?.user) {
        return null;
      }

      // Convertir el usuario de NextAuth al formato de nuestra aplicación
      const user: Usuario = {
        id: session.user.id,
        email: session.user.email,
        nombre: session.user.name,
        avatar: session.user.image,
        googleId: session.user.id
      };

      return user;
    } catch (error) {
      console.error('Error al obtener usuario actual:', error);
      return null;
    }
  }

  static async checkAuthStatus(): Promise<boolean> {
    try {
      const session = await getSession();
      return !!session?.user;
    } catch {
      return false;
    }
  }
} 