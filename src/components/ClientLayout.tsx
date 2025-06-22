'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#2563EB', // Azul Profesional
    },
    secondary: {
      main: '#10B981', // Verde Suave (acción segura)
    },
    error: {
      main: '#EF4444', // Rojo Sereno
    },
    warning: {
      main: '#F59E0B', // Amarillo Mostaza Sutil
    },
    background: {
      default: '#F9FAFB', // Fondo Claro - Gris Perla
      paper: '#FFFFFF',
    },
    text: {
      primary: '#111827', // Texto Principal - Gris Oscuro
      secondary: '#6B7280',
    },
  },
});

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          {!isLoginPage && <Header />}
          
          <main className={`flex-grow ${isLoginPage ? "min-h-screen" : "bg-background"}`}>
            {children}
          </main>
          
          {!isLoginPage && <Footer />}
        </div>
        
        {/* Toaster de Sonner configurado con el tema de la aplicación */}
        <Toaster
          position="top-right"
          richColors
          closeButton
          duration={4000}
          toastOptions={{
            style: {
              fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
            },
            className: 'toast-custom',
          }}
          theme="light"
          expand={false}
          gap={8}
        />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default ClientLayout; 