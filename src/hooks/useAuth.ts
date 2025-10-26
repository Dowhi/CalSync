import { useState, useEffect } from 'react';
import { User, AuthState } from '@/types';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
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
    const initializeApp = async () => {
      try {
        console.log('🔄 Iniciando aplicación - Verificando usuario guardado');
        
        // Intentar cargar usuario guardado
        const userDoc = await getDoc(doc(db, 'config', CURRENT_USER_KEY));
        
        if (userDoc.exists()) {
          const userData = userDoc.data() as User;
          console.log('✅ Usuario encontrado:', userData.displayName);
          setAuthState({
            user: userData,
            isLoading: false,
            isAuthenticated: true
          });
        } else {
          console.log('ℹ️ No hay usuario guardado - Mostrando selector');
          setAuthState({
            user: null,
            isLoading: false,
            isAuthenticated: false
          });
        }
      } catch (error) {
        console.error('❌ Error al cargar usuario:', error);
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false
        });
      }
    };

    initializeApp();
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
