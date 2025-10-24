import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  onSnapshot,
  Timestamp,
  serverTimestamp,
  QuerySnapshot,
  DocumentData
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import { CalendarEvent, EventFormData } from '@/types';

/**
 * Servicio para gestión de eventos
 */
class EventService {
  private readonly collectionName = 'events';

  /**
   * Crear un nuevo evento
   */
  async createEvent(
    eventData: EventFormData,
    userId: string,
    userName: string
  ): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, this.collectionName), {
        title: eventData.title,
        start: Timestamp.fromDate(new Date(eventData.start)),
        end: Timestamp.fromDate(new Date(eventData.end)),
        description: eventData.description || '',
        category: eventData.category,
        userId,
        userName,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      return docRef.id;
    } catch (error) {
      console.error('Error al crear evento:', error);
      throw new Error('No se pudo crear el evento');
    }
  }

  /**
   * Actualizar un evento existente
   */
  async updateEvent(eventId: string, eventData: Partial<EventFormData>): Promise<void> {
    try {
      const eventRef = doc(db, this.collectionName, eventId);
      
      const updateData: any = {
        updatedAt: serverTimestamp()
      };

      if (eventData.title !== undefined) updateData.title = eventData.title;
      if (eventData.description !== undefined) updateData.description = eventData.description;
      if (eventData.category !== undefined) updateData.category = eventData.category;
      if (eventData.start !== undefined) {
        updateData.start = Timestamp.fromDate(new Date(eventData.start));
      }
      if (eventData.end !== undefined) {
        updateData.end = Timestamp.fromDate(new Date(eventData.end));
      }

      await updateDoc(eventRef, updateData);
    } catch (error) {
      console.error('Error al actualizar evento:', error);
      throw new Error('No se pudo actualizar el evento');
    }
  }

  /**
   * Eliminar un evento
   */
  async deleteEvent(eventId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, this.collectionName, eventId));
    } catch (error) {
      console.error('Error al eliminar evento:', error);
      throw new Error('No se pudo eliminar el evento');
    }
  }

  /**
   * Suscribirse a cambios en tiempo real de todos los eventos
   */
  subscribeToEvents(callback: (events: CalendarEvent[]) => void): () => void {
    const q = query(collection(db, this.collectionName));

    const unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const events: CalendarEvent[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            start: data.start?.toDate() || new Date(),
            end: data.end?.toDate() || new Date(),
            description: data.description || '',
            category: data.category,
            userId: data.userId,
            userName: data.userName,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date()
          };
        });

        callback(events);
      },
      (error) => {
        console.error('Error en suscripción a eventos:', error);
      }
    );

    return unsubscribe;
  }

  /**
   * Verificar si un usuario puede editar un evento
   */
  canEditEvent(event: CalendarEvent, userId: string): boolean {
    return event.userId === userId;
  }
}

export const eventService = new EventService();

