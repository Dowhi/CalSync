import { useState, useEffect } from 'react';
import { User, AuthState } from '@/types';

const STORAGE_KEY = 'calsync_current_user';

/**
 * Hook personalizado para gestión de usuarios (sin autenticación Firebase)
 */
export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  });

  useEffect(() => {
    // Cargar usuario desde localStorage
    const loadUser = () => {
      const storedUser = localStorage.getItem(STORAGE_KEY);
      console.log('🔍 Leyendo localStorage, storedUser:', storedUser);
      
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser) as User;
          console.log('✅ Usuario encontrado en localStorage:', user);
          setAuthState({
            user,
            isLoading: false,
            isAuthenticated: true
          });
        } catch (error) {
          console.error('❌ Error al parsear usuario:', error);
          localStorage.removeItem(STORAGE_KEY); // Limpiar datos corruptos
          setAuthState({
            user: null,
            isLoading: false,
            isAuthenticated: false
          });
        }
      } else {
        console.log('ℹ️ No hay usuario guardado en localStorage');
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false
        });
      }
    };

    loadUser();
  }, []);

  const selectUser = (user: User) => {
    console.log('🔵 Seleccionando usuario:', user);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      console.log('✅ Usuario guardado en localStorage');
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

  const changeUser = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false
    });
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
