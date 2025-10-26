# ⌨️ Comandos Rápidos - CalSync

Referencia rápida de todos los comandos útiles para el proyecto.

## 📦 Instalación

```bash
# Instalar todas las dependencias
npm install

# Instalar dependencias globales (opcional)
npm install -g firebase-tools
npm install -g @capacitor/cli
```

## 🚀 Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# El servidor estará en http://localhost:3000
```

## 🔨 Build

```bash
# Compilar para producción
npm run build

# Vista previa de la build de producción
npm run preview

# Limpiar y reconstruir todo
npm run clean
```

## ✅ Linting y Calidad

```bash
# Verificar código con ESLint
npm run lint

# Corregir automáticamente (si existe el script)
npm run lint:fix
```

## 🔥 Firebase

### Configuración Inicial

```bash
# Login en Firebase
firebase login

# Inicializar proyecto Firebase
firebase init

# Selecciona:
# - Firestore
# - Hosting
```

### Deployment

```bash
# Desplegar todo (build + hosting + rules)
npm run deploy

# Solo hosting
npm run deploy:hosting

# Solo reglas de Firestore
npm run deploy:rules

# Despliegue manual
firebase deploy
firebase deploy --only hosting
firebase deploy --only firestore:rules
```

### Firestore

```bash
# Ver logs de Firestore
firebase firestore:indexes

# Actualizar reglas de seguridad
firebase deploy --only firestore:rules

# Importar/exportar datos (si configurado)
firebase firestore:export export-folder/
firebase firestore:import export-folder/
```

## 📱 Capacitor (Apps Nativas)

### Configuración Inicial

```bash
# Agregar plataforma Android
npx cap add android

# Agregar plataforma iOS
npx cap add ios

# Sincronizar (después de cambios)
npx cap sync
```

### Android

```bash
# Compilar y abrir Android Studio
npm run android

# Solo sincronizar
npx cap sync android

# Solo abrir Android Studio
npx cap open android

# Build desde terminal (Android Studio debe estar instalado)
cd android
./gradlew assembleDebug
```

### iOS

```bash
# Compilar y abrir Xcode
npm run ios

# Solo sincronizar
npx cap sync ios

# Solo abrir Xcode
npx cap open ios
```

## 🧹 Limpieza

```bash
# Limpiar todo y reinstalar
npm run clean

# Limpiar caché de npm
npm cache clean --force

# Limpiar solo node_modules
rm -rf node_modules
npm install

# Limpiar build
rm -rf dist

# Limpiar plataformas móviles
rm -rf android ios
```

## 🔍 Debugging

```bash
# Ver logs en tiempo real (Firebase)
firebase functions:log

# Ver logs de Android
npx cap run android --livereload --external

# Ver logs de iOS
npx cap run ios --livereload --external
```

## 📊 Análisis

```bash
# Analizar tamaño del bundle
npm run build
npx vite-bundle-visualizer

# Ver dependencias desactualizadas
npm outdated

# Actualizar dependencias
npm update
```

## 🧪 Testing (cuando se implemente)

```bash
# Ejecutar tests unitarios
npm test

# Tests con coverage
npm run test:coverage

# Tests en modo watch
npm run test:watch

# Tests E2E
npm run test:e2e
```

## 🌐 Git

```bash
# Estado del repositorio
git status

# Agregar cambios
git add .

# Commit
git commit -m "feat: descripción del cambio"

# Push
git push origin main

# Pull
git pull origin main

# Crear nueva rama
git checkout -b feature/nombre-feature

# Cambiar de rama
git checkout main
```

## 🔑 Variables de Entorno

```bash
# Copiar .env de ejemplo
cp .env.example .env

# Editar .env (usa tu editor favorito)
nano .env
# o
code .env
# o
notepad .env
```

## 📱 PWA

```bash
# Generar iconos PWA (si tienes pwa-asset-generator)
npx pwa-asset-generator logo.png public/ --icon-only --favicon

# Verificar service worker
# Abre DevTools > Application > Service Workers
```

## 🔄 Actualizar Dependencias

```bash
# Ver dependencias desactualizadas
npm outdated

# Actualizar todo (cuidado!)
npm update

# Actualizar una específica
npm install package-name@latest

# Actualizar React
npm install react@latest react-dom@latest

# Actualizar Ionic
npm install @ionic/react@latest @ionic/react-router@latest

# Actualizar Firebase
npm install firebase@latest
```

## 📦 Gestión de Paquetes

```bash
# Listar paquetes instalados
npm list --depth=0

# Ver información de un paquete
npm info package-name

# Buscar paquetes
npm search keyword

# Instalar paquete específico
npm install package-name

# Desinstalar paquete
npm uninstall package-name

# Instalar dependencia de desarrollo
npm install --save-dev package-name
```

## 🐛 Solución de Problemas

```bash
# Reinstalar node_modules
rm -rf node_modules package-lock.json
npm install

# Limpiar caché de Capacitor
npx cap sync --clean

# Reconstruir Android
cd android
./gradlew clean
cd ..
npx cap sync android

# Verificar versiones
node --version
npm --version
npx cap --version
firebase --version

# Verificar Firebase login
firebase login:list
```

## 📝 Scripts Personalizados (package.json)

```json
{
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "lint": "eslint . --ext ts,tsx",
  "deploy": "npm run build && firebase deploy",
  "deploy:hosting": "npm run build && firebase deploy --only hosting",
  "deploy:rules": "firebase deploy --only firestore:rules",
  "android": "npm run build && npx cap sync android && npx cap open android",
  "ios": "npm run build && npx cap sync ios && npx cap open ios",
  "sync": "npx cap sync",
  "clean": "rm -rf node_modules dist android ios .firebase && npm install"
}
```

## 🔥 Comandos de Emergencia

```bash
# Si nada funciona, prueba esto en orden:

# 1. Limpiar todo
npm run clean

# 2. Verificar Node.js
node --version  # Debe ser 18+

# 3. Actualizar npm
npm install -g npm@latest

# 4. Reinstalar desde cero
rm -rf node_modules package-lock.json
npm install

# 5. Verificar .env
cat .env  # Verificar que tenga las credenciales

# 6. Intentar de nuevo
npm run dev
```

## 📋 Checklist de Pre-Deploy

```bash
# 1. Verificar que no haya errores
npm run lint

# 2. Build exitoso
npm run build

# 3. Probar build localmente
npm run preview

# 4. Verificar .env en producción
# Asegúrate de tener las variables correctas

# 5. Deploy
npm run deploy
```

## 🎯 Atajos Útiles

```bash
# Alias útiles (agrega a ~/.bashrc o ~/.zshrc)
alias calsync-dev="cd ~/path/to/CalSync && npm run dev"
alias calsync-build="cd ~/path/to/CalSync && npm run build"
alias calsync-deploy="cd ~/path/to/CalSync && npm run deploy"

# Luego usa:
calsync-dev
calsync-build
calsync-deploy
```

## 🔗 Links Útiles

```bash
# Abrir en navegador
# Desarrollo: http://localhost:3000
# Firebase Console: https://console.firebase.google.com
# GitHub: https://github.com/your-user/CalSync
```

---

**Tip**: Agrega este archivo a tus favoritos o imprime para tener una referencia rápida siempre a mano.

**Pro Tip**: Usa `Ctrl+R` en terminal para buscar en el historial de comandos.


