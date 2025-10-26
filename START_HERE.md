# 🚀 EMPIEZA AQUÍ - CalSync

## ¡Bienvenido a CalSync! 👋

Esta guía te llevará paso a paso para tener tu aplicación funcionando en **menos de 10 minutos**.

---

## ✅ ¿Qué tienes ahora?

Has recibido una **aplicación completa y funcional** de calendario compartido con:

- ✅ Autenticación (Email/Password + Google)
- ✅ Calendario interactivo (FullCalendar)
- ✅ Sincronización en tiempo real
- ✅ Funcionalidad offline
- ✅ PWA instalable
- ✅ Diseño responsive
- ✅ Tema oscuro automático
- ✅ Lista para compilar a Android/iOS

---

## 🎯 3 Pasos para Empezar

### 📦 Paso 1: Instalar Dependencias (2 minutos)

Abre una terminal en esta carpeta y ejecuta:

```bash
npm install
```

Esto instalará todas las librerías necesarias (~500MB).

---

### 🔥 Paso 2: Configurar Firebase (5 minutos)

#### 2.1. Crear Proyecto Firebase

1. Ve a https://console.firebase.google.com/
2. Haz clic en **"Agregar proyecto"**
3. Nombre: **CalSync** (o el que prefieras)
4. Desactiva Google Analytics (opcional)
5. Haz clic en **"Crear proyecto"**

#### 2.2. Habilitar Authentication

1. En el menú lateral: **Build > Authentication**
2. Haz clic en **"Comenzar"**
3. Habilita:
   - ✅ **Correo electrónico/Contraseña**
   - ✅ **Google**
4. Para Google: Configura el correo de soporte

#### 2.3. Crear Base de Datos Firestore

1. En el menú lateral: **Build > Firestore Database**
2. Haz clic en **"Crear base de datos"**
3. Modo: **"Comenzar en modo de prueba"**
4. Ubicación: Elige la más cercana
5. Haz clic en **"Habilitar"**

#### 2.4. Obtener Credenciales

1. Ve a **⚙️ Configuración del proyecto** (rueda dentada arriba a la izquierda)
2. En **"Tus apps"**, haz clic en el ícono web `</>`
3. Nombre de la app: **CalSync Web**
4. NO marques "Firebase Hosting" (por ahora)
5. **Copia todo el objeto firebaseConfig**

#### 2.5. Configurar Variables de Entorno

1. Abre el archivo `.env` en esta carpeta
2. Reemplaza los valores con tus credenciales:

```env
VITE_FIREBASE_API_KEY=AIzaSy... (tu clave aquí)
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

3. Guarda el archivo

#### 2.6. Configurar Reglas de Firestore

1. En Firebase Console: **Firestore Database > Reglas**
2. Copia y pega esto:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /events/{eventId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && 
        request.resource.data.userId == request.auth.uid;
      allow update, delete: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

3. Haz clic en **"Publicar"**

---

### ▶️ Paso 3: Ejecutar la Aplicación (1 minuto)

```bash
npm run dev
```

**¡Listo!** Abre tu navegador en: **http://localhost:3000**

---

## 🎉 Primeros Pasos en la App

### 1. Crear tu Primera Cuenta

- Haz clic en **"Regístrate aquí"**
- Completa el formulario
- O usa **"Continuar con Google"**

### 2. Crear tu Primer Evento

- Haz clic en el botón **+** (abajo a la derecha)
- Completa el formulario:
  - Título: "Mi primer evento"
  - Categoría: Personal
  - Fecha y hora
- Guarda

### 3. Explorar las Vistas

- **Mes**: Vista mensual completa
- **Semana**: Vista semanal con horas
- **Agenda**: Lista de eventos

### 4. Invitar a Otros Usuarios

- Comparte la URL con hasta 4 personas más
- Cada uno debe registrarse
- ¡Los eventos se sincronizarán automáticamente!

---

## 📱 Instalar como PWA

### En Chrome (Desktop)

1. Busca el ícono ➕ o 💻 en la barra de direcciones
2. Haz clic en **"Instalar CalSync"**

### En Android (Chrome)

1. Menú (⋮) → **"Agregar a pantalla de inicio"**

### En iOS (Safari)

1. Botón compartir → **"Agregar a pantalla de inicio"**

---

## 📚 Documentación Completa

Esta carpeta incluye documentación exhaustiva:

| Archivo | Descripción |
|---------|-------------|
| **QUICK_START.md** | Inicio rápido (5 min) |
| **README.md** | Documentación completa |
| **INSTALL.md** | Guía de instalación detallada |
| **FEATURES.md** | Lista de características |
| **ARCHITECTURE.md** | Arquitectura del proyecto |
| **COMMANDS.md** | Referencia de comandos |
| **ICONS.md** | Cómo generar iconos PWA |
| **CONTRIBUTING.md** | Cómo contribuir |
| **PROJECT_SUMMARY.md** | Resumen del proyecto |

---

## 🎨 Personalización Rápida

### Cambiar Colores

Edita `src/theme/variables.css`:

```css
:root {
  --ion-color-primary: #3880ff;  /* Cambia este color */
}
```

### Agregar Categorías

Edita `src/utils/constants.ts`:

```typescript
export const EVENT_CATEGORIES = {
  // Agrega tu categoría aquí
  miCategoria: {
    label: 'Mi Categoría',
    color: '#ff0000',
    icon: '🎨'
  }
}
```

---

## 🐛 ¿Algo no funciona?

### Error: "Firebase: Error (auth/...)"

✅ **Solución**: Verifica que las credenciales en `.env` sean correctas

### Error: "Missing or insufficient permissions"

✅ **Solución**: Verifica que las reglas de Firestore estén publicadas

### La app no se instala como PWA

✅ **Solución**: Asegúrate de estar en HTTPS o localhost

### Los eventos no se sincronizan

✅ **Solución**: 
1. Verifica tu conexión a internet
2. Abre la consola (F12) y busca errores
3. Verifica que estés autenticado

---

## 📞 Soporte

¿Necesitas más ayuda?

1. 📖 Lee la documentación completa en **README.md**
2. 🔍 Revisa **INSTALL.md** para problemas comunes
3. 💻 Consulta **COMMANDS.md** para comandos útiles

---

## 🚀 Próximos Pasos

Una vez que tu app funcione:

1. 🎨 **Personaliza**: Cambia colores, categorías, etc.
2. 📱 **Compila para móvil**: Lee **README.md** sección "Compilación Nativa"
3. 🌐 **Despliega**: Usa `npm run deploy` para Firebase Hosting
4. 📊 **Monitorea**: Revisa Firebase Console para estadísticas

---

## ⚡ Comandos Más Usados

```bash
# Desarrollo
npm run dev

# Compilar
npm run build

# Vista previa
npm run preview

# Desplegar
npm run deploy

# Android
npm run android

# iOS
npm run ios

# Limpiar todo
npm run clean
```

---

## 🎊 ¡Disfruta CalSync!

Has recibido una aplicación profesional y completa. Ahora:

- ✅ Gestiona tus eventos
- ✅ Sincroniza con tu grupo
- ✅ Úsala offline
- ✅ Instálala en todos tus dispositivos

**¿Preguntas?** Consulta la documentación o revisa el código (está bien comentado).

---

**Versión**: 1.0.0
**Estado**: ✅ Lista para usar
**Tiempo estimado de configuración**: 10 minutos

¡Éxito! 🚀


