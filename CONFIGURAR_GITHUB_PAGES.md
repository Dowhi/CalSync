# 🚀 Configurar GitHub Pages - Paso a Paso

## ✅ El Código Ya Está Arreglado

He corregido automáticamente:
- ✅ Configuración de Vite
- ✅ GitHub Actions workflow
- ✅ Build de producción
- ✅ Commit y push

**Solo te falta 1 paso manual (1 minuto):**

---

## 📋 PASO 1: Ir a Settings

1. Abre tu repositorio: https://github.com/Dowhi/CalSync

2. Haz clic en **"Settings"** (arriba a la derecha)

---

## 📋 PASO 2: Ir a Pages

1. En el menú lateral izquierdo, busca **"Pages"**

2. Haz clic en **"Pages"**

---

## 📋 PASO 3: Configurar Source

En la sección **"Build and deployment"**:

### ⚠️ IMPORTANTE:

1. En **"Source"** verás un dropdown
2. **NO selecciones** "Deploy from a branch"
3. **Selecciona: "GitHub Actions"** ← Esto es lo crucial

```
Source: [GitHub Actions ▼]
        ^^^^^^^^^^^^^^^^^^^^
        Selecciona esta opción
```

4. Los cambios se guardan automáticamente

---

## 📋 PASO 4: Verificar el Deploy

1. Ve a la pestaña **"Actions"**: https://github.com/Dowhi/CalSync/actions

2. Verás un workflow ejecutándose:
   - 🟡 Círculo amarillo = Ejecutando
   - ✅ Check verde = Completado
   - ❌ X roja = Error

3. Espera 2-3 minutos hasta ver el check verde ✅

---

## 🌐 PASO 5: Abrir tu App

Una vez que el workflow tenga check verde ✅:

### Abre en tu navegador:

```
https://dowhi.github.io/CalSync/
```

(Con mayúscula en la C de CalSync)

---

## 🎯 ¿Qué Verás?

1. **Primera pantalla**: Selector de 5 usuarios
2. **Clic en un usuario**: Entra al calendario
3. **Calendario funcionando**: Con FullCalendar
4. **Crear eventos**: Botón + flotante

---

## ⚠️ Si No Funciona Firestore

Si ves el selector pero no puedes crear eventos:

### Necesitas configurar Firebase:

#### Opción A: Variables de Entorno en GitHub (Producción)

1. Ve a: https://github.com/Dowhi/CalSync/settings/secrets/actions

2. Clic en **"New repository secret"**

3. Agrega estos secrets (uno por uno):

```
Name: VITE_FIREBASE_API_KEY
Secret: tu_api_key_aquí

Name: VITE_FIREBASE_AUTH_DOMAIN
Secret: tu_proyecto.firebaseapp.com

Name: VITE_FIREBASE_PROJECT_ID
Secret: tu_proyecto_id

Name: VITE_FIREBASE_STORAGE_BUCKET
Secret: tu_proyecto.appspot.com

Name: VITE_FIREBASE_MESSAGING_SENDER_ID
Secret: tu_sender_id

Name: VITE_FIREBASE_APP_ID
Secret: tu_app_id
```

4. Después de agregar los secrets, el workflow debe modificarse para usarlos. Déjame saber y te ayudo.

#### Opción B: Firebase Público (Más Simple)

Si tu Firestore no tiene datos sensibles:
- Las credenciales de Firebase del cliente NO son secretas
- Puedes dejarlas en el código (ya están en .env)
- Solo asegúrate de tener buenas reglas de Firestore

---

## 🔄 Deploys Automáticos

Cada vez que hagas:

```bash
git add .
git commit -m "cambios"
git push
```

GitHub Actions se ejecutará automáticamente y desplegará en 2-3 minutos.

---

## 📊 Verificar el Estado

### En cualquier momento puedes ver:

1. **Actions**: https://github.com/Dowhi/CalSync/actions
   - Historial de deploys
   - Logs de cada deploy
   - Errores si los hay

2. **Pages**: https://github.com/Dowhi/CalSync/settings/pages
   - URL de tu app
   - Estado del deploy
   - Custom domain (si quieres)

---

## 🎨 Tu App Incluye

- ✅ Selector de 5 usuarios
- ✅ Calendario interactivo
- ✅ Crear/Editar/Eliminar eventos
- ✅ 6 categorías de eventos
- ✅ Sincronización en tiempo real
- ✅ PWA instalable
- ✅ Modo offline
- ✅ Tema oscuro
- ✅ Totalmente responsive

---

## 🐛 Solución de Problemas

### "404 Not Found"
- Verifica que configuraste "GitHub Actions" como source
- Espera a que el workflow termine (check verde)
- La URL es: https://dowhi.github.io/CalSync/ (con mayúscula)

### "Workflow failed"
- Ve a Actions y revisa el log del error
- Probablemente es un problema de dependencias
- Avísame y te ayudo

### "App funciona pero no crea eventos"
- Necesitas configurar Firebase
- Sigue la Opción A o B de arriba

---

## 🎉 ¡Eso es Todo!

Una vez configurado Pages con "GitHub Actions":
1. El deploy se hace automáticamente
2. Tu app estará en la web
3. Cualquier push futuro la actualizará

---

**Siguiente paso**: Ve a https://github.com/Dowhi/CalSync/settings/pages y configura "GitHub Actions"

