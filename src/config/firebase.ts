import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { firebaseConfig as prodConfig } from './firebase.prod';

// Usar credenciales de producción si las variables de entorno no están disponibles
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || prodConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || prodConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || prodConfig.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || prodConfig.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || prodConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || prodConfig.appId,
};

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);

// Habilitar persistencia offline de Firestore
// NOTA: La advertencia de deprecación es solo informativa y no afecta la funcionalidad
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Persistencia offline no disponible: múltiples pestañas abiertas');
  } else if (err.code === 'unimplemented') {
    console.warn('Persistencia offline no soportada en este navegador');
  }
});

export default app;

