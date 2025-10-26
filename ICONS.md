# Generación de Iconos para CalSync

Esta aplicación requiere iconos para funcionar como PWA. Aquí te explicamos cómo generarlos.

## 📋 Iconos Requeridos

Necesitas crear los siguientes archivos en la carpeta `public/`:

1. **pwa-192x192.png** - 192x192 píxeles
2. **pwa-512x512.png** - 512x512 píxeles
3. **apple-touch-icon.png** - 180x180 píxeles
4. **favicon.ico** - 32x32 píxeles

## 🎨 Diseño Recomendado

El icono debe:
- Representar un calendario
- Usar los colores principales de la app (#3880ff - azul)
- Ser simple y reconocible
- Funcionar bien en fondos claros y oscuros

## 🛠️ Herramientas para Generar Iconos

### Opción 1: PWA Asset Generator (Recomendado)

```bash
# Instalar la herramienta
npm install -g pwa-asset-generator

# Crear un icono base de 512x512px (logo.png)
# Luego ejecutar:
pwa-asset-generator logo.png public/ --icon-only --favicon --type png
```

### Opción 2: Herramientas Online

1. **RealFaviconGenerator**: https://realfavicongenerator.net/
   - Sube una imagen cuadrada de alta resolución
   - Genera todos los tamaños automáticamente
   - Descarga y coloca en `public/`

2. **Favicon.io**: https://favicon.io/
   - Crea iconos desde texto, emoji o imagen
   - Genera múltiples tamaños
   - Descarga el paquete completo

### Opción 3: Manualmente con Photoshop/GIMP

1. Crea un diseño en 512x512px
2. Exporta en diferentes tamaños:
   - 512x512px → `pwa-512x512.png`
   - 192x192px → `pwa-192x192.png`
   - 180x180px → `apple-touch-icon.png`
   - 32x32px → `favicon.ico`

## 📂 Estructura Final

```
public/
├── pwa-192x192.png      (192x192)
├── pwa-512x512.png      (512x512)
├── apple-touch-icon.png (180x180)
├── favicon.ico          (32x32)
├── manifest.json
└── robots.txt
```

## ✅ Verificación

Para verificar que los iconos funcionan:

1. Ejecuta la aplicación: `npm run dev`
2. Abre DevTools (F12)
3. Ve a la pestaña "Application" → "Manifest"
4. Verifica que los iconos se muestren correctamente

## 🎯 Iconos Temporales

Si necesitas comenzar rápido, puedes usar iconos placeholder:

1. Ve a https://via.placeholder.com/512x512/3880ff/ffffff?text=CalSync
2. Descárgalos en diferentes tamaños
3. Renómbralos según lo necesario

## 📱 Para Aplicaciones Nativas

Si vas a compilar para Android/iOS:

### Android
Coloca los iconos en `android/app/src/main/res/`:
- `mipmap-mdpi/` (48x48)
- `mipmap-hdpi/` (72x72)
- `mipmap-xhdpi/` (96x96)
- `mipmap-xxhdpi/` (144x144)
- `mipmap-xxxhdpi/` (192x192)

### iOS
Usa Xcode para agregar los iconos en el Assets.xcassets:
- 20x20, 29x29, 40x40, 58x58, 60x60, 76x76, 80x80, 87x87, 120x120, 152x152, 167x167, 180x180, 1024x1024

## 🚀 Automatización

Puedes agregar este script en `package.json`:

```json
{
  "scripts": {
    "icons": "pwa-asset-generator src/assets/logo.png public/ --icon-only --favicon"
  }
}
```

Luego ejecutar: `npm run icons`

---

**Nota**: Los iconos son esenciales para que la PWA sea instalable. Sin ellos, la aplicación funcionará en el navegador pero no se podrá instalar en el dispositivo.


