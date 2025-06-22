# RoomyApp Frontend

Frontend para el sistema de reserva de salas de reuniones RoomyApp, construido con Next.js, TypeScript, Material-UI y Tailwind CSS.

## 🚀 Características

- **Autenticación con Google**: Inicio de sesión seguro usando Google OAuth
- **Dashboard intuitivo**: Resumen visual de reservas y estadísticas
- **Gestión de reservas**: Crear, ver y eliminar reservas de salas
- **Diseño responsive**: Optimizado para dispositivos móviles y desktop
- **Interfaz moderna**: UI construida con Material-UI y Tailwind CSS
- **TypeScript**: Tipado estático para mejor desarrollo

## 🛠️ Tecnologías

- **Next.js 15** - Framework de React
- **TypeScript** - Tipado estático
- **Material-UI (MUI)** - Componentes de UI
- **Tailwind CSS** - Utilidades de CSS
- **Heroicons** - Iconografía
- **Axios** - Cliente HTTP
- **date-fns** - Manipulación de fechas
- **js-cookie** - Manejo de cookies

## 📦 Instalación

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Configurar variables de entorno**:
   Crear un archivo `.env.local` con:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

3. **Ejecutar en desarrollo**:
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**:
   Navegar a [http://localhost:3000](http://localhost:3000)

## 🏗️ Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── auth/              # Páginas de autenticación
│   ├── nueva-reserva/     # Página de nueva reserva
│   ├── reservas/          # Página de gestión de reservas
│   ├── login/             # Página de login
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Dashboard principal
├── components/            # Componentes reutilizables
│   ├── Header.tsx         # Cabecera de navegación
│   ├── Loading.tsx        # Componente de carga
│   └── ProtectedRoute.tsx # Protección de rutas
├── contexts/              # Contextos de React
│   └── AuthContext.tsx    # Contexto de autenticación
├── services/              # Servicios de API
│   ├── authService.ts     # Servicio de autenticación
│   └── reservaService.ts  # Servicio de reservas
├── types/                 # Tipos de TypeScript
│   └── index.ts           # Definiciones de tipos
├── lib/                   # Utilidades
│   └── api.ts             # Configuración de Axios
└── config/                # Configuración
    └── index.ts           # Configuración de la app
```

## 🔐 Autenticación

El sistema utiliza autenticación OAuth con Google:

1. El usuario hace clic en "Iniciar Sesión con Google"
2. Es redirigido a Google para autenticarse
3. Google devuelve al usuario con un token JWT
4. El token se guarda en cookies y se usa para llamadas autenticadas a la API

## 🏢 Funcionalidades de Reservas

### Dashboard
- Resumen de reservas (total, hoy, próximas)
- Visualización de próximas reservas
- Accesos rápidos a funciones principales

### Nueva Reserva
- Selección de sala (10 salas disponibles)
- Selección de fecha (solo fechas futuras)
- Horarios disponibles en tiempo real
- Validación de duración (30 min - 3 horas)
- Intervalos de 30 minutos

### Gestión de Reservas
- Lista de todas las reservas del usuario
- Agrupación por estado (hoy, próximas, pasadas)
- Eliminación de reservas futuras
- Información detallada de cada reserva

## 🎨 Diseño

### Sistema de Colores
- **Primario**: Azul (#2563eb)
- **Secundario**: Ámbar (#f59e0b)
- **Estados**: Verde (hoy), Azul (próximas), Gris (pasadas)

### Responsive Design
- **Mobile**: Diseño optimizado para pantallas pequeñas
- **Tablet**: Layout adaptativo para tablets
- **Desktop**: Interfaz completa para escritorio

## 🔌 Integración con Backend

El frontend se conecta con la API backend usando Axios:

### Endpoints Utilizados
- `GET /auth/google` - Inicio de sesión
- `GET /auth/logout` - Cerrar sesión
- `GET /api/reservas/mis-reservas` - Obtener reservas del usuario
- `POST /api/reservas` - Crear nueva reserva
- `DELETE /api/reservas/:id` - Eliminar reserva
- `GET /api/reservas/disponibilidad` - Verificar disponibilidad

### Configuración de API
```typescript
// Configuración automática de tokens JWT
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 🛡️ Seguridad

- **Tokens JWT**: Autenticación basada en tokens
- **Protección de rutas**: Rutas protegidas con ProtectedRoute
- **Validación client-side**: Validación de formularios
- **HTTPS**: Configurado para producción

## 📱 Características Móviles

- Diseño touch-friendly
- FAB (Floating Action Button) para acciones rápidas
- Navegación optimizada para móviles
- Componentes adaptables

## 🚀 Despliegue

### Construcción para Producción
```bash
npm run build
npm start
```

### Variables de Entorno de Producción
```
NEXT_PUBLIC_API_URL=https://tu-api.herokuapp.com
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama feature (`git checkout -b feature/NuevaFuncionalidad`)
3. Commit los cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/NuevaFuncionalidad`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la documentación
2. Busca en los issues existentes
3. Crea un nuevo issue con detalles del problema

---

Desarrollado con ❤️ para RoomyApp
