# CalSync - Calendario Compartido

Aplicación Web Progresiva (PWA) para gestión de turnos y eventos compartidos entre un grupo de hasta 5 usuarios.

## 🚀 Características

- ✅ **PWA Multiplataforma**: Compatible con Android, iOS y escritorio
- ✅ **Sincronización en Tiempo Real**: Cambios instantáneos entre todos los usuarios
- ✅ **Modo Offline**: Funciona sin conexión a internet
- ✅ **Calendario Interactivo**: Vistas por mes, semana y agenda
- ✅ **Gestión de Eventos**: CRUD completo de eventos con categorías
- ✅ **Diseño Responsive**: Optimizado para todos los tamaños de pantalla
- ✅ **Tema Oscuro**: Soporte automático según preferencias del sistema

## 🛠️ Stack Tecnológico

- **Frontend Framework**: React 18 + TypeScript
- **UI Framework**: Ionic React 7
- **Build Tool**: Vite 5
- **Backend**: Firebase (Authentication + Firestore)
- **Calendario**: FullCalendar 6
- **PWA**: Vite Plugin PWA + Workbox
- **Mobile**: Capacitor 6

## 📋 Requisitos Previos

- Node.js 18+ y npm/yarn
- Cuenta de Firebase con proyecto configurado
- (Opcional) Android Studio o Xcode para compilación nativa

## 🔧 Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd CalSync
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar Firebase**

Copia el archivo `.env.example` a `.env` y completa con tus credenciales de Firebase:

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:
```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

4. **Configurar Firestore**

En Firebase Console:
- Habilita Authentication (Email/Password y Google)
- Crea una base de datos Firestore
- Configura las reglas de seguridad:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /events/{eventId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

## 🚀 Uso

### Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### Compilación para Producción

```bash
npm run build
```

### Vista Previa de Producción

```bash
npm run preview
```

## 📱 Compilación Nativa

### Android

```bash
npm run build
npx cap add android
npx cap sync android
npx cap open android
```

### iOS

```bash
npm run build
npx cap add ios
npx cap sync ios
npx cap open ios
```

## 📂 Estructura del Proyecto

```
CalSync/
├── public/              # Archivos estáticos y PWA assets
├── src/
│   ├── components/      # Componentes reutilizables
│   │   ├── auth/       # Componentes de autenticación
│   │   ├── calendar/   # Componentes del calendario
│   │   └── layout/     # Componentes de layout
│   ├── config/         # Configuración (Firebase, etc.)
│   ├── hooks/          # Custom hooks de React
│   ├── pages/          # Páginas principales
│   ├── services/       # Servicios (auth, events, etc.)
│   ├── types/          # Definiciones de TypeScript
│   ├── utils/          # Utilidades y constantes
│   ├── theme/          # Estilos y variables de tema
│   ├── App.tsx         # Componente principal
│   └── main.tsx        # Punto de entrada
├── capacitor.config.ts # Configuración de Capacitor
├── vite.config.ts      # Configuración de Vite
└── package.json        # Dependencias del proyecto
```

## 🎨 Características del Diseño

### Responsive
- Diseño adaptativo que se ajusta a móvil, tablet y escritorio
- Calendario de pantalla completa en móvil
- Componentes optimizados para gestos táctiles

### Tema Oscuro
- Soporte automático según preferencias del sistema
- Variables CSS personalizables
- Transiciones suaves entre temas

### Accesibilidad
- Navegación por teclado
- Etiquetas ARIA apropiadas
- Contraste de colores accesible

## 🔐 Seguridad

- Autenticación segura con Firebase
- Reglas de Firestore para protección de datos
- Solo los usuarios autenticados pueden ver eventos
- Solo el creador puede editar/eliminar sus propios eventos
- Datos encriptados en tránsito (HTTPS)

## 📡 Funcionalidad Offline

- Persistencia local de Firestore
- Service Worker para cacheo de assets
- Background Sync para sincronización diferida
- Notificación de estado de conexión

## 🐛 Solución de Problemas

### La app no se instala como PWA
- Verifica que estés usando HTTPS (excepto localhost)
- Comprueba que el manifest.json sea válido
- Asegúrate de que el service worker esté registrado

### Errores de autenticación
- Verifica las credenciales de Firebase en `.env`
- Asegura que Authentication esté habilitado en Firebase Console
- Comprueba los dominios autorizados en Firebase

### Eventos no se sincronizan
- Verifica las reglas de seguridad de Firestore
- Comprueba la conexión a internet
- Revisa la consola del navegador para errores

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Contribución

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📧 Contacto

Para preguntas o soporte, por favor abre un issue en el repositorio.

---

Desarrollado con ❤️ usando React, Ionic y Firebase

