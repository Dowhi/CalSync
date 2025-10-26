import { useState, useEffect, useCallback } from 'react';
import { CalendarEvent, EventFormData } from '@/types';
import { eventService } from '@/services/eventService';

/**
 * Hook personalizado para gestión de eventos
 */
export const useEvents = (userId: string | null) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      console.log('🔄 useEvents: No hay userId, limpiando eventos');
      setEvents([]);
      setIsLoading(false);
      return;
    }

    console.log('🔄 useEvents: Iniciando suscripción para userId:', userId);
    setIsLoading(true);
    setError(null);
    
    // Suscribirse a cambios en tiempo real
    const unsubscribe = eventService.subscribeToEvents((newEvents) => {
      console.log('📅 useEvents: Eventos recibidos:', newEvents.length);
      setEvents(newEvents);
      setIsLoading(false);
      setError(null);
    });

    return () => {
      console.log('🔌 useEvents: Desuscribiendo de eventos');
      unsubscribe();
    };
  }, [userId]);

  const createEvent = useCallback(
    async (eventData: EventFormData, userName: string) => {
      if (!userId) {
        throw new Error('Usuario no autenticado');
      }

      try {
        setError(null);
        await eventService.createEvent(eventData, userId, userName);
      } catch (err: any) {
        setError(err.message);
        throw err;
      }
    },
    [userId]
  );

  const updateEvent = useCallback(
    async (eventId: string, eventData: Partial<EventFormData>) => {
      if (!userId) {
        throw new Error('Usuario no autenticado');
      }

      try {
        setError(null);
        await eventService.updateEvent(eventId, eventData);
      } catch (err: any) {
        setError(err.message);
        throw err;
      }
    },
    [userId]
  );

  const deleteEvent = useCallback(
    async (eventId: string) => {
      if (!userId) {
        throw new Error('Usuario no autenticado');
      }

      try {
        setError(null);
        await eventService.deleteEvent(eventId);
      } catch (err: any) {
        setError(err.message);
        throw err;
      }
    },
    [userId]
  );

  const canEditEvent = useCallback(
    (event: CalendarEvent): boolean => {
      if (!userId) return false;
      return eventService.canEditEvent(event, userId);
    },
    [userId]
  );

  return {
    events,
    isLoading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    canEditEvent
  };
};


