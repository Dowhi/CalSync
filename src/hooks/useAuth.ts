import { useState, useEffect } from 'react';
import { User, AuthState } from '@/types';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
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
    // Cargar usuario desde Firebase con timeout
    const loadUser = async () => {
      try {
        console.log('🔄 Intentando cargar usuario desde Firebase...');
        
        // Timeout de 5 segundos para evitar espera infinita
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 5000)
        );
        
        const userDocPromise = getDoc(doc(db, 'config', CURRENT_USER_KEY));
        
        const userDoc = await Promise.race([userDocPromise, timeoutPromise]) as any;
        
        if (userDoc.exists && userDoc.exists()) {
          const userData = userDoc.data() as User;
          console.log('✅ Usuario encontrado en Firebase:', userData);
          setAuthState({
            user: userData,
            isLoading: false,
            isAuthenticated: true
          });
        } else {
          console.log('ℹ️ No hay usuario guardado en Firebase');
          setAuthState({
            user: null,
            isLoading: false,
            isAuthenticated: false
          });
        }
      } catch (error) {
        console.error('❌ Error al cargar usuario desde Firebase:', error);
        console.log('⚠️ Continuando sin usuario guardado');
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false
        });
      }
    };

    loadUser();
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
