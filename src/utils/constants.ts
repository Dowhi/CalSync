import { EventCategoryConfig, User } from '@/types';

// Usuarios predefinidos (5 usuarios)
export const PREDEFINED_USERS: User[] = [
  {
    uid: 'user-1',
    email: 'usuario1@calsync.com',
    displayName: 'Usuario 1',
    photoURL: null
  },
  {
    uid: 'user-2',
    email: 'usuario2@calsync.com',
    displayName: 'Usuario 2',
    photoURL: null
  },
  {
    uid: 'user-3',
    email: 'usuario3@calsync.com',
    displayName: 'Usuario 3',
    photoURL: null
  },
  {
    uid: 'user-4',
    email: 'usuario4@calsync.com',
    displayName: 'Usuario 4',
    photoURL: null
  },
  {
    uid: 'user-5',
    email: 'usuario5@calsync.com',
    displayName: 'Usuario 5',
    photoURL: null
  }
];

// Configuración de categorías de eventos
export const EVENT_CATEGORIES: Record<string, EventCategoryConfig> = {
  medico: {
    label: 'Médico',
    color: '#e74c3c',
    icon: '🏥'
  },
  padel: {
    label: 'Pádel',
    color: '#2ecc71',
    icon: '🎾'
  },
  pago: {
    label: 'Pago',
    color: '#f39c12',
    icon: '💳'
  },
  personal: {
    label: 'Personal',
    color: '#3498db',
    icon: '👤'
  },
  trabajo: {
    label: 'Trabajo',
    color: '#9b59b6',
    icon: '💼'
  },
  otro: {
    label: 'Otro',
    color: '#95a5a6',
    icon: '📌'
  }
};

// Colores para eventos propios y ajenos
export const EVENT_COLORS = {
  own: '#3880ff',      // Color para eventos propios
  others: '#95a5a6'    // Color para eventos de otros usuarios
};

// Configuración del calendario
export const CALENDAR_CONFIG = {
  locale: 'es',
  firstDay: 1, // Lunes
  timeZone: 'America/Argentina/Buenos_Aires',
  slotMinTime: '06:00:00',
  slotMaxTime: '23:00:00',
  slotDuration: '00:30:00'
};

// Máximo de usuarios permitidos
export const MAX_USERS = 5;

