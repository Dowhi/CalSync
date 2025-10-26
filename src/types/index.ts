// Tipos de la aplicación

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date | string;
  end: Date | string;
  description?: string;
  category: EventCategory;
  userId: string;
  userName: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type EventCategory = 'medico' | 'padel' | 'pago' | 'personal' | 'trabajo' | 'otro';

export interface EventCategoryConfig {
  label: string;
  color: string;
  icon: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface EventFormData {
  title: string;
  start: string;
  end: string;
  description: string;
  category: EventCategory;
}

// Tipos para Turnos
export interface Turno {
  id: string;
  nombre: string;
  abreviatura: string;
  colorFondo: string;
  colorTexto: string;
  tamañoTexto: number;
  horarioInicio?: string; // Formato "HH:mm"
  horarioFin?: string; // Formato "HH:mm"
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface TurnoFormData {
  nombre: string;
  abreviatura: string;
  colorFondo: string;
  colorTexto: string;
  tamañoTexto: number;
  horarioInicio?: string;
  horarioFin?: string;
}


