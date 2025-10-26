import { TurnoFormData } from '@/types';

/**
 * Turnos predefinidos por defecto
 * Basados en las imágenes proporcionadas
 */
export const TURNOS_DEFAULT: TurnoFormData[] = [
  {
    nombre: 'Nuevo',
    abreviatura: 'F.A',
    colorFondo: '#DC143C',
    colorTexto: '#FFFFFF',
    tamañoTexto: 14,
    horarioInicio: '',
    horarioFin: ''
  },
  {
    nombre: 'S. Santa',
    abreviatura: 'S.Santa',
    colorFondo: '#87CEEB',
    colorTexto: '#000000',
    tamañoTexto: 12,
    horarioInicio: '',
    horarioFin: ''
  },
  {
    nombre: 'Feria',
    abreviatura: 'Feria',
    colorFondo: '#00BFFF',
    colorTexto: '#FFFFFF',
    tamañoTexto: 12,
    horarioInicio: '',
    horarioFin: ''
  },
  {
    nombre: 'Descanso',
    abreviatura: 'Descanso',
    colorFondo: '#6B8E23',
    colorTexto: '#FFFFFF',
    tamañoTexto: 11,
    horarioInicio: '',
    horarioFin: ''
  },
  {
    nombre: 'D1',
    abreviatura: 'D1',
    colorFondo: '#1E90FF',
    colorTexto: '#FFFFFF',
    tamañoTexto: 16,
    horarioInicio: '08:00',
    horarioFin: '20:00'
  },
  {
    nombre: 'D2',
    abreviatura: 'D2',
    colorFondo: '#DC143C',
    colorTexto: '#FFFFFF',
    tamañoTexto: 16,
    horarioInicio: '20:00',
    horarioFin: '08:00'
  },
  {
    nombre: 'Tarde',
    abreviatura: 'T',
    colorFondo: '#FFA07A',
    colorTexto: '#000000',
    tamañoTexto: 14,
    horarioInicio: '14:00',
    horarioFin: '22:00'
  }
];

