# Contribuir a CalSync

¡Gracias por tu interés en contribuir a CalSync! 🎉

## 🚀 Cómo Contribuir

### 1. Fork y Clone

```bash
# Fork el repositorio en GitHub, luego:
git clone https://github.com/tu-usuario/CalSync.git
cd CalSync
npm install
```

### 2. Crea una Rama

```bash
git checkout -b feature/mi-nueva-caracteristica
# o
git checkout -b fix/mi-correccion
```

### 3. Realiza tus Cambios

- Sigue la estructura de carpetas existente
- Mantén el código limpio y bien documentado
- Agrega comentarios donde sea necesario
- Usa TypeScript correctamente

### 4. Prueba tus Cambios

```bash
# Ejecuta la aplicación
npm run dev

# Verifica linting
npm run lint

# Prueba la build
npm run build
```

### 5. Commit

```bash
git add .
git commit -m "feat: descripción clara de la característica"
```

#### Convención de Commits

Usa [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva característica
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Formateo, punto y coma, etc
- `refactor:` Refactorización de código
- `test:` Agregar tests
- `chore:` Mantenimiento

Ejemplos:
```
feat: agregar notificaciones push
fix: corregir sincronización de eventos
docs: actualizar README con ejemplos
style: formatear código con prettier
refactor: simplificar hook useEvents
```

### 6. Push y Pull Request

```bash
git push origin feature/mi-nueva-caracteristica
```

Luego crea un Pull Request en GitHub.

## 📋 Guías de Estilo

### TypeScript

```typescript
// ✅ Bien
interface Event {
  id: string;
  title: string;
}

// ❌ Mal
interface Event {
  id: any;
  title: any;
}
```

### React Componentes

```typescript
// ✅ Bien - Functional Component con tipos
export const MiComponente: React.FC<Props> = ({ prop1, prop2 }) => {
  return <div>{prop1}</div>;
};

// ❌ Mal - Sin tipos
export const MiComponente = ({ prop1, prop2 }) => {
  return <div>{prop1}</div>;
};
```

### Hooks Personalizados

```typescript
// ✅ Bien
export const useMyHook = (param: string) => {
  const [state, setState] = useState<MyType>(initialValue);
  // ...
  return { state, setState };
};
```

### CSS

- Usa clases CSS en lugar de inline styles cuando sea posible
- Sigue la nomenclatura existente
- Mantén los archivos CSS cerca de sus componentes

```css
/* ✅ Bien */
.calendar-container {
  height: 100%;
  padding: 0;
}

/* ❌ Mal */
.cc {
  h: 100%;
  p: 0;
}
```

## 🐛 Reportar Bugs

Al reportar un bug, incluye:

1. **Descripción clara** del problema
2. **Pasos para reproducir**
3. **Comportamiento esperado**
4. **Comportamiento actual**
5. **Screenshots** (si aplica)
6. **Versión** del navegador/dispositivo
7. **Logs de consola** (si hay errores)

### Template de Bug Report

```markdown
## Descripción
[Descripción clara del bug]

## Pasos para Reproducir
1. Ve a '...'
2. Haz click en '...'
3. Observa el error

## Comportamiento Esperado
[Qué debería pasar]

## Comportamiento Actual
[Qué está pasando]

## Screenshots
[Si aplica]

## Entorno
- Navegador: [Chrome 118, Firefox 119, etc]
- Dispositivo: [Desktop, Android 13, iOS 16, etc]
- Versión de CalSync: [1.0.0]

## Logs
```
[Logs de consola]
```
```

## 💡 Sugerir Características

Al sugerir una característica:

1. **Explica el problema** que resuelve
2. **Describe la solución** que propones
3. **Considera alternativas**
4. **Piensa en el impacto** en usuarios existentes

### Template de Feature Request

```markdown
## Problema
[¿Qué problema resuelve esta característica?]

## Solución Propuesta
[Descripción detallada de la característica]

## Alternativas
[Otras formas de resolver el problema]

## Impacto
- [ ] Breaking change
- [ ] Requiere migración
- [ ] Afecta performance
- [ ] Afecta UX
```

## 🔍 Revisión de Código

Todos los Pull Requests serán revisados. Esperamos:

- ✅ Código limpio y legible
- ✅ Tests (cuando aplique)
- ✅ Documentación actualizada
- ✅ Sin errores de linting
- ✅ Build exitoso

## 📚 Recursos

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Ionic React Docs](https://ionicframework.com/docs/react)
- [Firebase Documentation](https://firebase.google.com/docs)
- [FullCalendar Docs](https://fullcalendar.io/docs)

## 🤝 Código de Conducta

- Sé respetuoso con otros colaboradores
- Acepta críticas constructivas
- Enfócate en lo mejor para el proyecto
- Ayuda a otros cuando puedas

## ❓ Preguntas

Si tienes preguntas sobre cómo contribuir:

1. Revisa la documentación existente
2. Busca en issues cerrados
3. Abre un nuevo issue con la etiqueta "question"

## 🎉 Reconocimientos

Todos los colaboradores serán agregados al README.

¡Gracias por contribuir a CalSync! 🙌

