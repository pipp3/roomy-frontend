export const CONFIG = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  APP_NAME: 'RoomyApp',
  APP_DESCRIPTION: 'Sistema de reserva de salas de reuniones',
  
  // Configuración de reservas
  HORARIO_INICIO: 9,
  HORARIO_FIN: 18,
  DURACION_MINIMA: 30, // minutos
  DURACION_MAXIMA: 180, // minutos (3 horas)
  INTERVALO_TIEMPO: 30, // minutos
  
  // Salas disponibles
  SALAS: [
    'Sala1', 'Sala2', 'Sala3', 'Sala4', 'Sala5',
    'Sala6', 'Sala7', 'Sala8', 'Sala9', 'Sala10'
  ] as const
}; 