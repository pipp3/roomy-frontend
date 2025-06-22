export interface Usuario {
  id: string;
  email: string;
  nombre: string;
  avatar?: string; // URL de la imagen de perfil de Google
  googleId?: string;
}

export interface Reserva {
  _id?: string;
  usuarioId: string;
  sala: Sala;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  createdAt?: string;
  updatedAt?: string;
}

export type Sala = 
  | "Sala1" 
  | "Sala2" 
  | "Sala3" 
  | "Sala4" 
  | "Sala5" 
  | "Sala6" 
  | "Sala7" 
  | "Sala8" 
  | "Sala9" 
  | "Sala10";

export interface DisponibilidadResponse {
  sala: Sala;
  fecha: string;
  horariosDisponibles: string[];
}

export interface AuthResponse {
  message: string;
  token: string;
  usuario: Usuario;
}

export interface ApiError {
  message: string;
  error?: string;
} 