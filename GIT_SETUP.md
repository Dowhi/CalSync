# 🚀 Git Setup - CalSync

## ✅ Commit Realizado Exitosamente

Se ha creado el primer commit con todos los cambios:

```
Commit: 809f27e
Mensaje: feat: sistema sin autenticación con selector de 5 usuarios
Archivos: 53 archivos creados
Líneas: +16,134 inserciones
```

---

## 📤 Para hacer Push - Opciones

### Opción 1: GitHub (Recomendado)

#### Paso 1: Crear repositorio en GitHub

1. Ve a: https://github.com/new
2. Nombre del repositorio: **CalSync**
3. Descripción: "Calendario compartido sincronizado con React + Firebase"
4. **NO marques** "Initialize with README" (ya lo tienes)
5. Haz clic en **"Create repository"**

#### Paso 2: Conectar y Push

Copia los comandos que GitHub te mostrará, o ejecuta esto (reemplaza TU_USUARIO):

```bash
git remote add origin https://github.com/TU_USUARIO/CalSync.git
git branch -M main
git push -u origin main
```

---

### Opción 2: GitLab

1. Ve a: https://gitlab.com/projects/new
2. Crea el proyecto "CalSync"
3. Ejecuta:

```bash
git remote add origin https://gitlab.com/TU_USUARIO/CalSync.git
git branch -M main
git push -u origin main
```

---

### Opción 3: Push a repositorio existente

Si ya tienes un repositorio:

```bash
git remote add origin URL_DE_TU_REPOSITORIO
git branch -M main
git push -u origin main
```

---

## 🔑 Autenticación

### GitHub Personal Access Token (si es necesario)

Si GitHub te pide autenticación:

1. Ve a: https://github.com/settings/tokens
2. **"Generate new token (classic)"**
3. Permisos: marca **"repo"**
4. Copia el token
5. Úsalo como contraseña cuando hagas push

---

## 📋 Comandos Rápidos

```bash
# Ver remotes configurados
git remote -v

# Agregar remote
git remote add origin URL_REPO

# Cambiar rama a main
git branch -M main

# Push inicial
git push -u origin main

# Push subsecuentes
git push
```

---

## 🎯 Estado Actual

✅ Repositorio Git inicializado
✅ Commit inicial creado (53 archivos)
✅ Listo para conectar con remoto
⏳ Pendiente: Agregar remote y push

---

## 💡 Después del Push

Una vez hagas push, tu código estará en la nube y podrás:

- ✅ Acceder desde cualquier lugar
- ✅ Compartir con otros
- ✅ Ver historial de cambios
- ✅ Trabajar en equipo
- ✅ Tener backup automático

---

## 📝 Ejemplo Completo

```bash
# 1. Crear repo en GitHub (https://github.com/new)

# 2. Ejecutar estos comandos (reemplaza la URL):
git remote add origin https://github.com/tu-usuario/CalSync.git
git branch -M main
git push -u origin main

# ¡Listo! Tu código está en GitHub
```

---

## 🆘 Solución de Problemas

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin URL_NUEVA
```

### Error: "Authentication failed"
```bash
# Usa Personal Access Token como contraseña
# o configura SSH keys
```

### Error: "fatal: refusing to merge unrelated histories"
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

**Siguiente paso**: Crea tu repositorio en GitHub y ejecuta los comandos de push.

