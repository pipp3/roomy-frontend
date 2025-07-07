# RoomyApp Frontend

Frontend moderno para el sistema de reserva de salas de reuniones RoomyApp, construido con Next.js 15, TypeScript, Material-UI y Tailwind CSS v4.

## 🚀 Características Principales

- **Autenticación OAuth con Google**: Sistema de login seguro usando NextAuth.js
- **Dashboard interactivo**: Resumen visual de reservas con estadísticas en tiempo real
- **Gestión completa de reservas**: Crear, visualizar, editar y eliminar reservas
- **Diseño responsive**: Optimizado para móviles, tablets y desktop
- **Interfaz moderna**: UI construida con Material-UI v6 y Tailwind CSS v4
- **TypeScript**: Tipado estático completo para mejor desarrollo
- **Estado global**: Gestión de estado con Zustand
- **Notificaciones**: Sistema de toasts con Sonner
- **Optimización**: Lazy loading y optimizaciones de rendimiento

## 🛠️ Stack Tecnológico

### Core
- **Next.js 15.3.3** - Framework de React con App Router
- **React 19** - Biblioteca de UI
- **TypeScript 5** - Tipado estático

### UI/UX
- **Material-UI (MUI) v6** - Componentes de UI profesionales
- **Tailwind CSS v4** - Framework de utilidades CSS
- **Heroicons v2** - Iconografía moderna
- **Emotion** - CSS-in-JS para MUI

### Estado y Datos
- **Zustand v5** - Gestión de estado global
- **NextAuth.js v4** - Autenticación OAuth
- **Axios v1.7** - Cliente HTTP

### Utilidades
- **date-fns v3** - Manipulación de fechas
- **js-cookie v3** - Manejo de cookies
- **Sonner v2** - Sistema de notificaciones
- **MUI X Date Pickers v8** - Selectores de fecha avanzados

### Desarrollo
- **ESLint v9** - Linting de código
- **PostCSS** - Procesamiento de CSS
- **SWC** - Compilador rápido

## 📦 Instalación y Configuración

### 1. Clonar y instalar dependencias
```bash
git clone <repository-url>
cd roomy-frontend
npm install
```

### 2. Configurar variables de entorno
Crear un archivo `.env.local` basado en `env.local.example`:

```env
# NextAuth.js Configuration
NEXTAUTH_URL=https://tu-dominio.com
NEXTAUTH_SECRET=tu_nextauth_secret_muy_seguro_aqui

# Google OAuth Configuration
GOOGLE_CLIENT_ID=tu_google_client_id_aqui
GOOGLE_CLIENT_SECRET=tu_google_client_secret_aqui

# API Configuration
NEXT_PUBLIC_API_URL=https://tu-api-backend.com

# Para desarrollo local:
# NEXTAUTH_URL=http://localhost:3000
# NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Configurar Google OAuth
1. Ir a [Google Cloud Console](https://console.cloud.google.com/)
2. Crear un proyecto o seleccionar uno existente
3. Habilitar Google+ API
4. Crear credenciales OAuth 2.0
5. Configurar URIs autorizados:
   - `http://localhost:3000` (desarrollo)
   - `https://tu-dominio.com` (producción)

### 4. Ejecutar en desarrollo
```bash
npm run dev
```

### 5. Abrir en el navegador
Navegar a [http://localhost:3000](http://localhost:3000)

## 🏗️ Estructura del Proyecto

```
src/
├── app/                          # App Router de Next.js 15
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/    # Configuración NextAuth.js
│   │           └── route.ts
│   ├── login/                    # Página de autenticación
│   │   └── page.tsx
│   ├── nueva-reserva/           # Creación de reservas
│   │   └── page.tsx
│   ├── reservas/                # Gestión de reservas
│   │   └── page.tsx
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Dashboard principal
│   ├── globals.css              # Estilos globales
│   └── favicon.ico
├── components/                   # Componentes reutilizables
│   ├── reserva/                 # Componentes específicos de reservas
│   │   ├── FechaSelector.tsx    # Selector de fechas
│   │   ├── HorarioSelector.tsx  # Selector de horarios
│   │   ├── SalaSelector.tsx     # Selector de salas
│   │   ├── ReservaInfo.tsx      # Información de reserva
│   │   └── ReservaHeader.tsx    # Header de reserva
│   ├── Header.tsx               # Navegación principal
│   ├── Footer.tsx               # Pie de página
│   ├── Loading.tsx              # Componente de carga
│   ├── LoadingScreen.tsx        # Pantalla de carga completa
│   ├── SkeletonLoader.tsx       # Loader con skeleton
│   ├── Avatar.tsx               # Avatar de usuario
│   ├── ClientLayout.tsx         # Layout del cliente
│   ├── SessionProvider.tsx      # Proveedor de sesión
│   ├── ProtectedRoute.tsx       # Protección de rutas
│   └── PrivateRoute.tsx         # Rutas privadas
├── contexts/                     # Contextos de React
│   └── AuthContext.tsx          # Contexto de autenticación
├── hooks/                        # Custom hooks
│   ├── useAuthValidation.ts     # Validación de autenticación
│   ├── useOptimizedData.ts      # Optimización de datos
│   ├── useRedirect.ts           # Redirecciones
│   └── useToast.ts              # Sistema de notificaciones
├── services/                     # Servicios de API
│   ├── authService.ts           # Servicio de autenticación
│   └── reservaService.ts        # Servicio de reservas
├── types/                        # Tipos de TypeScript
│   ├── index.ts                 # Definiciones principales
│   └── next-auth.d.ts           # Tipos de NextAuth
├── lib/                          # Utilidades
│   ├── api.ts                   # Configuración de Axios
│   └── dateUtils.ts             # Utilidades de fechas
└── config/                       # Configuración
    └── index.ts                 # Configuración de la app
```

## 🔐 Sistema de Autenticación

### NextAuth.js con Google OAuth
El sistema utiliza NextAuth.js v4 con autenticación OAuth de Google:

```typescript
// Configuración en [...nextauth]/route.ts
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 horas
  },
  // ... más configuración
})
```

### Flujo de Autenticación
1. Usuario hace clic en "Iniciar Sesión con Google"
2. Redirección a Google OAuth
3. Google devuelve al usuario con tokens
4. NextAuth.js maneja la sesión automáticamente
5. Tokens JWT se almacenan en cookies seguras

### Protección de Rutas
```typescript
// Componente ProtectedRoute
<ProtectedRoute>
  <ComponenteProtegido />
</ProtectedRoute>
```

## 🏢 Funcionalidades de Reservas

### Dashboard Principal
- **Resumen estadístico**: Total de reservas, reservas de hoy, próximas
- **Visualización de próximas reservas**: Lista con información detallada
- **Accesos rápidos**: Botones para crear reserva y ver todas
- **Estado en tiempo real**: Actualización automática de datos

### Creación de Reservas (`/nueva-reserva`)
- **Selección de sala**: 10 salas disponibles (Sala1-Sala10)
- **Selector de fecha**: Solo fechas futuras, con validación
- **Horarios dinámicos**: Verificación de disponibilidad en tiempo real
- **Validación de duración**: 30 minutos mínimo, 3 horas máximo
- **Intervalos de 30 minutos**: Horarios de 9:00 a 18:00

### Gestión de Reservas (`/reservas`)
- **Lista completa**: Todas las reservas del usuario
- **Agrupación inteligente**: Hoy, próximas, pasadas
- **Acciones disponibles**: Ver detalles, editar, eliminar
- **Filtros y búsqueda**: Por fecha, sala, estado

### Validaciones del Sistema
```typescript
// Validación de duración
static validarDuracionReserva(horaInicio: string, horaFin: string): boolean {
  const duracionMinutos = calcularDuracion(horaInicio, horaFin);
  return duracionMinutos >= 30 && duracionMinutos <= 180 && duracionMinutos % 30 === 0;
}
```

## 🎨 Sistema de Diseño

### Paleta de Colores
- **Primario**: Azul (#2563eb) - Acciones principales
- **Secundario**: Ámbar (#f59e0b) - Acentos y alertas
- **Estados**:
  - Verde (#10b981) - Reservas de hoy
  - Azul (#3b82f6) - Reservas próximas
  - Gris (#6b7280) - Reservas pasadas

### Componentes Material-UI
- **Cards**: Para mostrar información de reservas
- **Buttons**: Con variantes primary, secondary, outlined
- **Dialogs**: Para confirmaciones y formularios
- **Date Pickers**: Selectores de fecha avanzados
- **Snackbars**: Notificaciones temporales

### Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch Friendly**: Elementos táctiles optimizados
- **Navegación adaptativa**: Menú hamburguesa en móviles

## 🔌 Integración con Backend

### Configuración de API
```typescript
// lib/api.ts
import axios from 'axios';
import { getSession } from 'next-auth/react';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Interceptor para tokens JWT
api.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.user) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});
```

### Endpoints Principales
- `GET /api/reservas` - Obtener todas las reservas
- `GET /api/reservas/mis-reservas` - Reservas del usuario
- `POST /api/reservas` - Crear nueva reserva
- `PUT /api/reservas/:id` - Actualizar reserva
- `DELETE /api/reservas/:id` - Eliminar reserva
- `GET /api/reservas/disponibilidad` - Verificar disponibilidad
- `GET /api/reservas/obtener-usuario` - Obtener ID de usuario

### Manejo de Errores
```typescript
// Interceptor de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirigir a login
      signOut({ callbackUrl: '/login' });
    }
    return Promise.reject(error);
  }
);
```

## 🛡️ Seguridad

### Autenticación
- **JWT Tokens**: Tokens seguros con expiración
- **Cookies HttpOnly**: Almacenamiento seguro de sesiones
- **CSRF Protection**: Protección contra ataques CSRF
- **OAuth 2.0**: Autenticación con Google

### Validación
- **Client-side**: Validación en formularios
- **Server-side**: Validación en API
- **TypeScript**: Tipado estático para prevenir errores

### Headers de Seguridad
```typescript
// next.config.ts
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
      ],
    },
  ];
}
```

## 📱 Características Móviles

### Optimizaciones Touch
- **Botones grandes**: Mínimo 44px para touch
- **Espaciado generoso**: 16px entre elementos interactivos
- **FAB (Floating Action Button)**: Acceso rápido a crear reserva
- **Swipe gestures**: Navegación intuitiva

### Performance Móvil
- **Lazy loading**: Carga diferida de componentes
- **Optimización de imágenes**: Next.js Image component
- **Bundle splitting**: Código dividido por rutas
- **Service Worker**: Cache inteligente

## 🚀 Despliegue

### Construcción para Producción
```bash
# Instalar dependencias
npm install

# Construir aplicación
npm run build

# Iniciar servidor de producción
npm start
```

### Variables de Entorno de Producción
```env
NEXTAUTH_URL=https://tu-dominio.com
NEXTAUTH_SECRET=secret_muy_seguro_produccion
GOOGLE_CLIENT_ID=tu_client_id_produccion
GOOGLE_CLIENT_SECRET=tu_client_secret_produccion
NEXT_PUBLIC_API_URL=https://tu-api-backend.com
```

### Configuración de Next.js
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: 'standalone', // Para Docker
  experimental: {
    forceSwcTransforms: true,
  },
  productionBrowserSourceMaps: false,
  // ... más configuración
};
```

### Docker (Opcional)
```dockerfile
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=base /app/public ./public
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

## 🧪 Testing

### Scripts Disponibles
```bash
npm run dev          # Desarrollo
npm run build        # Construcción
npm run start        # Producción
npm run lint         # Linting
```

### Linting y Formateo
- **ESLint**: Configuración Next.js
- **TypeScript**: Verificación de tipos
- **Prettier**: Formateo de código (configurado)

## 🤝 Contribuir

### Flujo de Desarrollo
1. **Fork** el proyecto
2. **Crear rama** feature (`git checkout -b feature/NuevaFuncionalidad`)
3. **Commit** cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/NuevaFuncionalidad`)
5. **Abrir Pull Request**

### Estándares de Código
- **TypeScript**: Tipado estricto
- **ESLint**: Reglas de linting
- **Conventional Commits**: Formato de commits
- **Componentes funcionales**: Hooks de React

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🆘 Soporte y Troubleshooting

### Problemas Comunes

#### Error de Autenticación
```bash
# Verificar variables de entorno
echo $GOOGLE_CLIENT_ID
echo $GOOGLE_CLIENT_SECRET
```

#### Error de CORS
```bash
# Verificar configuración de API
echo $NEXT_PUBLIC_API_URL
```

#### Problemas de Build
```bash
# Limpiar cache
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### Recursos Útiles
- [Next.js Documentation](https://nextjs.org/docs)
- [Material-UI Documentation](https://mui.com/)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Contacto
Si tienes problemas o preguntas:
1. Revisa la documentación
2. Busca en los issues existentes
3. Crea un nuevo issue con detalles del problema

---

Desarrollado con ❤️ para RoomyApp - Sistema de Reserva de Salas
