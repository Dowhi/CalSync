# Guía de Instalación de CalSync

Esta guía te ayudará a instalar y configurar CalSync paso a paso.

## 📋 Requisitos del Sistema

- **Node.js**: versión 18.0.0 o superior
- **npm**: versión 9.0.0 o superior (viene con Node.js)
- **Navegador moderno**: Chrome, Firefox, Safari o Edge (últimas versiones)
- **Cuenta de Google**: para Firebase y autenticación de Google

## 🔥 Configuración de Firebase

### Paso 1: Crear un proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Agregar proyecto"
3. Ingresa un nombre (ej: "CalSync")
4. Desactiva Google Analytics si no lo necesitas
5. Haz clic en "Crear proyecto"

### Paso 2: Configurar Authentication

1. En el menú lateral, ve a **Build > Authentication**
2. Haz clic en "Comenzar"
3. Habilita los siguientes métodos de inicio de sesión:
   - **Correo electrónico/contraseña**: Actívalo
   - **Google**: Actívalo y configura el correo de soporte
4. En la pestaña "Settings" > "Authorized domains", asegúrate de que `localhost` esté en la lista

### Paso 3: Configurar Firestore Database

1. En el menú lateral, ve a **Build > Firestore Database**
2. Haz clic en "Crear base de datos"
3. Selecciona "Comenzar en modo de prueba" (cambiaremos las reglas después)
4. Elige la ubicación más cercana a tus usuarios
5. Haz clic en "Habilitar"

### Paso 4: Obtener las credenciales

1. Ve a **Configuración del proyecto** (ícono de engranaje) > **Configuración del proyecto**
2. En la sección "Tus apps", haz clic en el ícono web `</>`
3. Registra una app con el nombre "CalSync Web"
4. Copia las credenciales que aparecen en `firebaseConfig`

## 💻 Instalación Local

### Paso 1: Clonar e instalar dependencias

```bash
# Navega a la carpeta del proyecto
cd CalSync

# Instala las dependencias
npm install
```

### Paso 2: Configurar variables de entorno

1. Crea un archivo `.env` en la raíz del proyecto:
```bash
cp .env.example .env
```

2. Abre `.env` y completa con tus credenciales de Firebase:
```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

### Paso 3: Configurar reglas de seguridad de Firestore

1. En Firebase Console, ve a **Firestore Database > Reglas**
2. Copia y pega el contenido del archivo `firestore.rules`:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return request.auth.uid == userId;
    }

    match /events/{eventId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated() 
        && request.resource.data.userId == request.auth.uid;
      allow update, delete: if isAuthenticated() 
        && isOwner(resource.data.userId);
    }
  }
}
```

3. Haz clic en "Publicar"

### Paso 4: Ejecutar la aplicación

```bash
# Modo desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📱 Instalación como PWA

### En Chrome/Edge (Desktop)

1. Abre la aplicación en el navegador
2. Busca el ícono de instalación en la barra de direcciones (generalmente un `+` o un ícono de computadora)
3. Haz clic en "Instalar CalSync"

### En Android

1. Abre la aplicación en Chrome
2. Toca el menú (3 puntos) > "Agregar a pantalla de inicio"
3. Confirma la instalación

### En iOS

1. Abre la aplicación en Safari
2. Toca el botón de compartir (cuadrado con flecha hacia arriba)
3. Selecciona "Agregar a pantalla de inicio"
4. Confirma

## 🚀 Compilación para Producción

### Web (PWA)

```bash
# Compilar la aplicación
npm run build

# Vista previa local
npm run preview
```

Los archivos compilados estarán en la carpeta `dist/`

### Despliegue en Firebase Hosting

```bash
# Instalar Firebase CLI (solo la primera vez)
npm install -g firebase-tools

# Iniciar sesión
firebase login

# Inicializar Firebase Hosting
firebase init hosting
# Selecciona: 
# - Use an existing project: tu-proyecto
# - Public directory: dist
# - Single-page app: Yes
# - Overwrite index.html: No

# Compilar y desplegar
npm run build
firebase deploy
```

## 📲 Compilación para Móvil Nativo

### Preparación inicial

```bash
# Compilar la aplicación web
npm run build
```

### Android

```bash
# Agregar plataforma Android (solo la primera vez)
npx cap add android

# Sincronizar cambios
npx cap sync android

# Abrir en Android Studio
npx cap open android
```

En Android Studio:
1. Espera a que se indexe el proyecto
2. Conecta un dispositivo físico o inicia un emulador
3. Haz clic en el botón "Run" (triángulo verde)

#### Requisitos para Android:
- Android Studio (última versión)
- JDK 11 o superior
- Android SDK (se instala con Android Studio)

### iOS (solo macOS)

```bash
# Agregar plataforma iOS (solo la primera vez)
npx cap add ios

# Sincronizar cambios
npx cap sync ios

# Abrir en Xcode
npx cap open ios
```

En Xcode:
1. Selecciona tu equipo de desarrollo en "Signing & Capabilities"
2. Conecta un dispositivo físico o selecciona un simulador
3. Haz clic en el botón "Run" (triángulo)

#### Requisitos para iOS:
- macOS 12.0 o superior
- Xcode 14.0 o superior
- Cuenta de Apple Developer (gratis para desarrollo)

## 🧪 Verificación de la Instalación

1. **Registro de usuario**:
   - Crea una cuenta con email y contraseña
   - O inicia sesión con Google

2. **Crear un evento**:
   - Haz clic en el botón `+` flotante
   - Completa el formulario
   - Guarda el evento

3. **Verificar sincronización**:
   - Abre la app en otro dispositivo/navegador
   - Inicia sesión con otra cuenta
   - Verifica que veas el evento creado

4. **Probar modo offline**:
   - Desactiva el WiFi/datos
   - Navega por la aplicación
   - Los eventos previamente cargados deben ser visibles

## ❓ Solución de Problemas

### Error: "Firebase: Error (auth/unauthorized-domain)"

**Solución**: Agrega tu dominio a los dominios autorizados:
1. Firebase Console > Authentication > Settings
2. Pestaña "Authorized domains"
3. Agrega tu dominio (ej: `localhost`, `tu-dominio.com`)

### Error: "Missing or insufficient permissions"

**Solución**: Verifica que las reglas de Firestore estén configuradas correctamente (ver Paso 3 de configuración de Firebase)

### La app no se instala como PWA

**Solución**:
- Verifica que estés usando HTTPS (o localhost)
- Limpia la caché del navegador
- Asegúrate de tener un service worker registrado (mira la consola)

### Eventos no se sincronizan

**Solución**:
1. Verifica la conexión a internet
2. Abre la consola del navegador (F12) y busca errores
3. Verifica que las reglas de Firestore permitan lectura/escritura
4. Asegúrate de que el usuario esté autenticado

### Error en la compilación de Android

**Solución**:
```bash
cd android
./gradlew clean
cd ..
npx cap sync android
```

## 📞 Soporte

Si encuentras problemas no resueltos en esta guía:
1. Revisa los logs en la consola del navegador (F12)
2. Verifica la configuración de Firebase
3. Consulta la documentación de [Ionic](https://ionicframework.com/docs), [Firebase](https://firebase.google.com/docs) o [Capacitor](https://capacitorjs.com/docs)

## 🎉 ¡Listo!

Tu instalación de CalSync está completa. Ahora puedes:
- Invitar a otros usuarios (máximo 5 en total)
- Crear y gestionar eventos
- Disfrutar de la sincronización en tiempo real
- Usar la app offline

---

**Próximos pasos recomendados**:
1. Personaliza los colores en `src/theme/variables.css`
2. Agrega un icono personalizado en `public/`
3. Configura notificaciones push (opcional)
4. Implementa backup automático (opcional)


