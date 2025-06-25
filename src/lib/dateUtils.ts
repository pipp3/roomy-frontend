import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Formatea una fecha DD/MM/YYYY a un formato legible sin problemas de zona horaria
 * @param fechaString - Fecha en formato DD/MM/YYYY del backend
 * @param formatoSalida - Formato deseado para date-fns
 * @returns Fecha formateada
 */
export const formatearFechaSinZonaHoraria = (
  fechaString: string, 
  formatoSalida: string = 'EEEE, d MMMM yyyy'
): string => {
  try {
    // Si la fecha viene en formato DD/MM/YYYY del backend
    if (fechaString.includes('/')) {
      const [dia, mes, año] = fechaString.split('/');
      // Crear fecha en formato ISO sin zona horaria
      const fechaISO = `${año}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
      return format(parseISO(fechaISO), formatoSalida, { locale: es });
    }
    
    // Si ya viene en formato ISO
    return format(parseISO(fechaString), formatoSalida, { locale: es });
  } catch (error) {
    return fechaString; // Devolver la fecha original si hay error
  }
};

/**
 * Convierte fecha YYYY-MM-DD (input date) a DD/MM/YYYY para el backend
 * @param fechaISO - Fecha en formato YYYY-MM-DD
 * @returns Fecha en formato DD/MM/YYYY
 */
export const convertirFechaParaBackend = (fechaISO: string): string => {
  if (!fechaISO) return '';
  const [year, month, day] = fechaISO.split('-');
  return `${day}/${month}/${year}`;
};

/**
 * Convierte fecha DD/MM/YYYY a formato de visualización DD/MM/YYYY
 * @param fechaISO - Fecha en formato YYYY-MM-DD
 * @returns Fecha en formato DD/MM/YYYY para mostrar al usuario
 */
export const formatearFechaParaVisualizacion = (fechaISO: string): string => {
  if (!fechaISO) return '';
  const [year, month, day] = fechaISO.split('-');
  return `${day}/${month}/${year}`;
}; 