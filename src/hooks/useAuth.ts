import { useState, useEffect } from 'react';
import { User, AuthState } from '@/types';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';

const CURRENT_USER_KEY = 'current_selected_user';

/**
 * Hook personalizado para gestión de usuarios usando Firebase
 */
export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  });

  useEffect(() => {
    // Inicializar aplicación sin usuario
    console.log('🔄 Iniciando aplicación - Mostrando selector de usuario');
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false
    });
  }, []);

  const selectUser = async (user: User) => {
    console.log('🔵 Seleccionando usuario:', user);
    try {
      await setDoc(doc(db, 'config', CURRENT_USER_KEY), user);
      console.log('✅ Usuario guardado en Firebase');
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true
      });
      console.log('✅ Estado actualizado, isAuthenticated:', true);
    } catch (error) {
      console.error('❌ Error al seleccionar usuario:', error);
    }
  };

  const changeUser = async () => {
    try {
      await deleteDoc(doc(db, 'config', CURRENT_USER_KEY));
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false
      });
    } catch (error) {
      console.error('❌ Error al cambiar usuario:', error);
    }
  };

  return {
    ...authState,
    selectUser,
    changeUser,
    // Mantener compatibilidad con código existente
    login: async () => {},
    loginWithGoogle: async () => {},
    register: async () => {},
    logout: changeUser
  };
};
