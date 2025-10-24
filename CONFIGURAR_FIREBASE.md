# 🔥 Configurar Firebase para CalSync

Los errores de Firestore que ves en la consola son porque **Firebase no está configurado**. Aquí te muestro cómo hacerlo.

---

## 📋 Paso 1: Crear Proyecto Firebase

1. **Ve a**: https://console.firebase.google.com/

2. **Clic en**: "Agregar proyecto" o "Create a project"

3. **Nombre del proyecto**: "CalSync" (o el que prefieras)

4. **Google Analytics**: Puedes desactivarlo (no es necesario para esta app)

5. **Clic en**: "Crear proyecto"

6. **Espera**: 1-2 minutos hasta que se cree

---

## 📋 Paso 2: Habilitar Firestore

1. En el menú lateral: **Build > Firestore Database**

2. **Clic en**: "Crear base de datos"

3. **Modo**: Selecciona "Comenzar en modo de prueba"
   - Esto permite leer/escribir sin autenticación
   - Perfecto para esta app

4. **Ubicación**: Elige la más cercana a ti
   - Ej: us-central, southamerica-east1, etc.

5. **Clic en**: "Habilitar"

6. **Espera**: 1 minuto hasta que se cree

---

## 📋 Paso 3: Actualizar Reglas de Firestore

1. **Ve a**: Firestore Database > Reglas

2. **Copia y pega** esto:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Reglas simplificadas sin autenticación
    match /events/{eventId} {
      // Todos pueden leer eventos
      allow read: if true;
      
      // Todos pueden crear eventos
      allow create: if true;
      
      // Todos pueden actualizar eventos
      allow update: if true;
      
      // Todos pueden eliminar eventos
      allow delete: if true;
    }
  }
}
```

3. **Clic en**: "Publicar"

---

## 📋 Paso 4: Obtener Credenciales

1. **Clic en**: ⚙️ (Configuración del proyecto) arriba a la izquierda

2. **Scroll down** hasta "Tus apps"

3. **Clic en**: El ícono web `</>`

4. **Nombre de la app**: "CalSync Web"

5. **NO marques**: "Configurar también Firebase Hosting"

6. **Clic en**: "Registrar app"

7. **Verás algo así**:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

8. **Copia estos valores**

---

## 📋 Paso 5A: Configurar en Local (Desarrollo)

Si quieres probar en `localhost`:

1. **Abre el archivo**: `.env` en la raíz del proyecto

2. **Reemplaza** los valores con los tuyos:

```env
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

3. **Guarda** el archivo

4. **Ejecuta**:
```bash
npm run dev
```

5. **Abre**: http://localhost:3000

6. **¡Funciona!** Ahora podrás crear eventos

---

## 📋 Paso 5B: Configurar en GitHub Pages (Producción)

Para que funcione en `https://dowhi.github.io/calendar/`:

### Opción A: Sin Secrets (Más Simple)

Las credenciales de Firebase del cliente NO son secretas. Puedes:

1. **Dejarlas en el archivo** `.env` (ya están ahí)
2. **Hacer commit y push**:
```bash
git add .env
git commit -m "feat: agregar credenciales de Firebase"
git push
```

3. **Esperar** 2-3 minutos al deploy

4. **¡Listo!** Tu app funcionará completamente

### Opción B: Con GitHub Secrets (Más Seguro)

Si prefieres no subir las credenciales al repo:

1. **Ve a**: https://github.com/Dowhi/CalSync/settings/secrets/actions

2. **Clic en**: "New repository secret"

3. **Agrega estos 6 secrets** (uno por uno):

```
Name: VITE_FIREBASE_API_KEY
Secret: AIzaSyXXXXXXXXXXXXXXXXXXXXXXXX

Name: VITE_FIREBASE_AUTH_DOMAIN
Secret: tu-proyecto.firebaseapp.com

Name: VITE_FIREBASE_PROJECT_ID
Secret: tu-proyecto-id

Name: VITE_FIREBASE_STORAGE_BUCKET
Secret: tu-proyecto.appspot.com

Name: VITE_FIREBASE_MESSAGING_SENDER_ID
Secret: 123456789

Name: VITE_FIREBASE_APP_ID
Secret: 1:123456789:web:abc123
```

4. **Luego avísame** y te ayudo a configurar el workflow para usar los secrets

---

## ✅ Verificar que Funciona

1. **Abre tu app**: https://dowhi.github.io/calendar/

2. **Selecciona un usuario**: Ej: Usuario 1

3. **Haz clic en el botón +** (abajo a la derecha)

4. **Llena el formulario**:
   - Título: "Mi primer evento"
   - Categoría: Personal
   - Fecha y hora

5. **Guarda**

6. **Si aparece en el calendario**: ¡Funciona! 🎉

7. **Si da error**: Verifica las credenciales en `.env`

---

## 🐛 Solución de Problemas

### Error: "Failed to load resource: Firestore"
✅ Verifica que las credenciales en `.env` sean correctas

### Error: "Permission denied"
✅ Verifica que las reglas de Firestore estén actualizadas (Paso 3)

### Error: "Project not found"
✅ Verifica el `projectId` en `.env`

### Los eventos no se guardan
✅ Abre la consola (F12) y busca errores específicos
✅ Verifica que Firestore esté habilitado en Firebase Console

---

## 📊 Resumen

```
┌─────────────────────────────────────────┐
│ 1. Crear proyecto Firebase             │
│ 2. Habilitar Firestore                 │
│ 3. Actualizar reglas                   │
│ 4. Obtener credenciales                │
│ 5. Pegar en .env                       │
│ 6. Push a GitHub                       │
│ 7. ¡Listo!                             │
└─────────────────────────────────────────┘
```

---

## 💡 Nota Importante

Las credenciales de Firebase **del cliente** (las que van en `.env`) **NO son secretas**:
- Se envían al navegador de todos modos
- Son públicas en el código JavaScript
- La seguridad viene de las **reglas de Firestore**, no de ocultar las credenciales

Por eso está bien hacer commit de `.env` con las credenciales.

---

## 🎉 ¡Listo!

Una vez configurado Firebase, tu app CalSync estará **100% funcional**:
- ✅ Selector de usuarios
- ✅ Calendario interactivo
- ✅ Crear/Editar/Eliminar eventos
- ✅ Sincronización en tiempo real
- ✅ Modo offline
- ✅ PWA instalable

---

**¿Necesitas ayuda?** Avísame y te guío paso a paso.

