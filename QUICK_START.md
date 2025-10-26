# 🚀 Inicio Rápido - CalSync

Esta guía te ayudará a poner en marcha CalSync en **5 minutos**.

## ⚡ Pasos Rápidos

### 1. Instalar Dependencias (1 minuto)

```bash
npm install
```

### 2. Configurar Firebase (2 minutos)

1. **Crea un proyecto en Firebase**: https://console.firebase.google.com/
2. **Habilita Authentication** (Email/Password y Google)
3. **Crea una base de datos Firestore**
4. **Copia las credenciales** de tu proyecto

### 3. Configurar Variables de Entorno (30 segundos)

```bash
# Copia el archivo de ejemplo
cp .env.example .env

# Edita .env con tus credenciales de Firebase
# (Usa tu editor favorito: VS Code, Notepad++, etc.)
```

Dentro de `.env`:
```env
VITE_FIREBASE_API_KEY=tu_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 4. Configurar Reglas de Firestore (1 minuto)

En Firebase Console → Firestore Database → Reglas:

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

Haz clic en **"Publicar"**

### 5. Ejecutar la Aplicación (30 segundos)

```bash
npm run dev
```

Abre tu navegador en: **http://localhost:3000**

## ✅ Primeros Pasos en la App

1. **Regístrate** con tu email o Google
2. **Crea tu primer evento** con el botón `+`
3. **Prueba las vistas**: Mes, Semana, Agenda
4. **Invita a otros usuarios** (hasta 5 en total)

## 🎯 Características que Puedes Probar

- ✨ Crear/Editar/Eliminar eventos
- 🔄 Ver eventos de otros usuarios en tiempo real
- 📱 Responsive (prueba en móvil)
- 🌙 Tema oscuro automático
- 📡 Modo offline (desconecta el wifi)
- 📥 Instalar como PWA (botón en el navegador)

## 📱 Instalar en Móvil

### Android (Chrome)
1. Abre la app en Chrome
2. Menú (⋮) → "Agregar a pantalla de inicio"

### iOS (Safari)
1. Abre la app en Safari
2. Botón compartir → "Agregar a pantalla de inicio"

## 🐛 Problemas Comunes

**Error de Firebase**: Verifica que copiaste correctamente las credenciales en `.env`

**No se instala la PWA**: Asegúrate de estar en HTTPS (o localhost)

**Los eventos no se sincronizan**: Verifica las reglas de Firestore

## 📚 Documentación Completa

- [README.md](./README.md) - Documentación completa
- [INSTALL.md](./INSTALL.md) - Guía de instalación detallada
- [ICONS.md](./ICONS.md) - Cómo generar iconos

## 🎉 ¡Listo!

Ya tienes CalSync funcionando. Ahora puedes:
- Personalizar colores en `src/theme/variables.css`
- Agregar más categorías en `src/utils/constants.ts`
- Compilar para Android/iOS (ver README.md)

---

**¿Necesitas ayuda?** Abre un issue en el repositorio o consulta la documentación completa.


