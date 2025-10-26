import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Turno, TurnoFormData } from '@/types';

const TURNOS_COLLECTION = 'turnos';

export const turnoService = {
  /**
   * Suscribirse a cambios en los turnos
   */
  subscribeToTurnos(callback: (turnos: Turno[]) => void, onError?: (error: Error) => void) {
    const turnosRef = collection(db, TURNOS_COLLECTION);
    const q = query(turnosRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const turnos: Turno[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            nombre: data.nombre || '',
            abreviatura: data.abreviatura || '',
            colorFondo: data.colorFondo || '#FFFFFF',
            colorTexto: data.colorTexto || '#000000',
            tamañoTexto: data.tamañoTexto || 12,
            horarioInicio: data.horarioInicio || undefined,
            horarioFin: data.horarioFin || undefined,
            createdAt: data.createdAt instanceof Timestamp 
              ? data.createdAt.toDate() 
              : new Date(data.createdAt || Date.now()),
            updatedAt: data.updatedAt instanceof Timestamp 
              ? data.updatedAt.toDate() 
              : new Date(data.updatedAt || Date.now())
          };
        });
        callback(turnos);
      },
      (error) => {
        console.error('Error al suscribirse a turnos:', error);
        if (onError) onError(error);
      }
    );

    return unsubscribe;
  },

  /**
   * Crear un nuevo turno
   */
  async createTurno(formData: TurnoFormData): Promise<string> {
    try {
      const turnosRef = collection(db, TURNOS_COLLECTION);
      const docRef = await addDoc(turnosRef, {
        ...formData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      console.log('✅ Turno creado con ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('❌ Error al crear turno:', error);
      throw new Error('Error al crear el turno. Por favor, intenta de nuevo.');
    }
  },

  /**
   * Actualizar un turno existente
   */
  async updateTurno(turnoId: string, formData: Partial<TurnoFormData>): Promise<void> {
    try {
      const turnoRef = doc(db, TURNOS_COLLECTION, turnoId);
      await updateDoc(turnoRef, {
        ...formData,
        updatedAt: serverTimestamp()
      });
      console.log('✅ Turno actualizado:', turnoId);
    } catch (error) {
      console.error('❌ Error al actualizar turno:', error);
      throw new Error('Error al actualizar el turno. Por favor, intenta de nuevo.');
    }
  },

  /**
   * Eliminar un turno
   */
  async deleteTurno(turnoId: string): Promise<void> {
    try {
      const turnoRef = doc(db, TURNOS_COLLECTION, turnoId);
      await deleteDoc(turnoRef);
      console.log('✅ Turno eliminado:', turnoId);
    } catch (error) {
      console.error('❌ Error al eliminar turno:', error);
      throw new Error('Error al eliminar el turno. Por favor, intenta de nuevo.');
    }
  }
};

