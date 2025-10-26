import { useState, useEffect } from 'react';
import { turnoService } from '@/services/turnoService';
import { Turno, TurnoFormData } from '@/types';

export const useTurnos = () => {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔄 Suscribiendo a turnos...');
    
    const unsubscribe = turnoService.subscribeToTurnos(
      (turnosData) => {
        console.log('✅ Turnos recibidos:', turnosData.length);
        setTurnos(turnosData);
        setIsLoading(false);
        setError(null);
      },
      (err) => {
        console.error('❌ Error al cargar turnos:', err);
        setError('Error al cargar los turnos');
        setIsLoading(false);
      }
    );

    return () => {
      console.log('🔌 Desuscribiendo de turnos');
      unsubscribe();
    };
  }, []);

  const createTurno = async (formData: TurnoFormData) => {
    setError(null);
    try {
      await turnoService.createTurno(formData);
    } catch (err: any) {
      setError(err.message || 'Error al crear el turno');
      throw err;
    }
  };

  const updateTurno = async (turnoId: string, formData: Partial<TurnoFormData>) => {
    setError(null);
    try {
      await turnoService.updateTurno(turnoId, formData);
    } catch (err: any) {
      setError(err.message || 'Error al actualizar el turno');
      throw err;
    }
  };

  const deleteTurno = async (turnoId: string) => {
    setError(null);
    try {
      await turnoService.deleteTurno(turnoId);
    } catch (err: any) {
      setError(err.message || 'Error al eliminar el turno');
      throw err;
    }
  };

  return {
    turnos,
    isLoading,
    error,
    createTurno,
    updateTurno,
    deleteTurno
  };
};

