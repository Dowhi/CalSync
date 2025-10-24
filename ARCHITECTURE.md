# 🏗️ Arquitectura de CalSync

## 📐 Visión General

CalSync sigue una arquitectura moderna de aplicación web progresiva (PWA) con separación clara de responsabilidades.

```
┌─────────────────────────────────────────────────┐
│                   Usuario                        │
└────────────────┬────────────────────────────────┘
                 │
    ┌────────────▼────────────┐
    │    Navegador / PWA      │
    │   (React + Ionic)       │
    └────────────┬────────────┘
                 │
    ┌────────────▼────────────┐
    │   Service Worker        │
    │   (Cache + Offline)     │
    └────────────┬────────────┘
                 │
    ┌────────────▼────────────┐
    │   Firebase Services     │
    │  - Authentication       │
    │  - Cloud Firestore      │
    └─────────────────────────┘
```

## 🎯 Patrón de Arquitectura

### Frontend: Component-Based Architecture

```
App (Root)
├── Auth Flow
│   ├── LoginPage
│   └── RegisterPage
│
└── Main App Flow (Protected)
    ├── Menu (Sidebar)
    │   └── User Profile
    │
    └── CalendarPage
        ├── CalendarView (FullCalendar)
        └── EventModal (CRUD)
```

### Data Flow: Unidirectional

```
User Action → Component → Hook → Service → Firebase
                ↑                              ↓
                └──────── Realtime Update ─────┘
```

## 📦 Capas de la Aplicación

### 1. **Presentación (UI Layer)**
- **Responsabilidad**: Renderizar UI y manejar interacciones del usuario
- **Tecnologías**: React, Ionic Components
- **Componentes**:
  - Pages: Pantallas completas
  - Components: Componentes reutilizables
  - Layouts: Estructuras de página

```
src/
├── pages/
│   └── CalendarPage.tsx       # Página principal
├── components/
│   ├── auth/                  # Componentes de autenticación
│   ├── calendar/              # Componentes del calendario
│   └── layout/                # Componentes de layout
```

### 2. **Lógica de Negocio (Business Logic Layer)**
- **Responsabilidad**: Implementar lógica de la aplicación
- **Tecnologías**: Custom Hooks, Services
- **Elementos**:
  - Hooks: useAuth, useEvents
  - Utils: Utilidades y helpers

```
src/
├── hooks/
│   ├── useAuth.ts            # Gestión de autenticación
│   └── useEvents.ts          # Gestión de eventos
├── utils/
│   ├── constants.ts          # Constantes
│   └── dateUtils.ts          # Utilidades de fecha
```

### 3. **Servicios (Service Layer)**
- **Responsabilidad**: Comunicación con backend
- **Tecnologías**: Firebase SDK
- **Servicios**:
  - authService: Autenticación
  - eventService: CRUD de eventos

```
src/
└── services/
    ├── authService.ts        # Servicio de auth
    └── eventService.ts       # Servicio de eventos
```

### 4. **Capa de Datos (Data Layer)**
- **Responsabilidad**: Persistencia y sincronización
- **Tecnologías**: Firebase Firestore, IndexedDB
- **Características**:
  - Realtime sync
  - Offline persistence
  - Optimistic updates

```
Firebase Firestore
└── Collection: events
    └── Document: {eventId}
        ├── title: string
        ├── start: timestamp
        ├── end: timestamp
        ├── category: string
        ├── userId: string
        └── userName: string
```

## 🔄 Flujos de Datos

### Flujo de Autenticación

```
┌──────────┐      ┌──────────┐      ┌───────────┐      ┌──────────┐
│ Login    │─────▶│ useAuth  │─────▶│ authService│─────▶│ Firebase │
│ Page     │      │ Hook     │      │           │      │ Auth     │
└──────────┘      └──────────┘      └───────────┘      └──────────┘
     ▲                                                        │
     │                                                        │
     └────────────────── onAuthStateChanged ─────────────────┘
```

### Flujo de Eventos (CRUD)

#### Crear Evento
```
User clicks "+" button
    ↓
EventModal opens
    ↓
User fills form & saves
    ↓
useEvents.createEvent()
    ↓
eventService.createEvent()
    ↓
Firebase Firestore (addDoc)
    ↓
Realtime listener triggers
    ↓
All devices update instantly
```

#### Sincronización en Tiempo Real
```
Device A: Creates event
    ↓
Firebase Firestore
    ↓
WebSocket notification
    ↓
Device B: onSnapshot triggered
    ↓
Device B: Calendar updates
```

## 🗄️ Modelo de Datos

### Usuario (User)
```typescript
interface User {
  uid: string;              // ID único de Firebase
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
```

### Evento (CalendarEvent)
```typescript
interface CalendarEvent {
  id: string;              // ID del documento
  title: string;           // Título del evento
  start: Date;            // Fecha/hora inicio
  end: Date;              // Fecha/hora fin
  description?: string;   // Descripción opcional
  category: EventCategory; // Categoría
  userId: string;         // ID del creador
  userName: string;       // Nombre del creador
  createdAt: Date;       // Fecha de creación
  updatedAt: Date;       // Última actualización
}
```

### Categorías
```typescript
type EventCategory = 
  | 'medico'    // 🏥 Médico
  | 'padel'     // 🎾 Pádel
  | 'pago'      // 💳 Pago
  | 'personal'  // 👤 Personal
  | 'trabajo'   // 💼 Trabajo
  | 'otro';     // 📌 Otro
```

## 🔐 Seguridad

### Reglas de Firestore

```javascript
// Lectura: Todos los usuarios autenticados
allow read: if request.auth != null;

// Creación: Solo usuarios autenticados
allow create: if request.auth != null 
  && request.resource.data.userId == request.auth.uid;

// Edición/Eliminación: Solo el propietario
allow update, delete: if request.auth != null 
  && resource.data.userId == request.auth.uid;
```

### Flujo de Seguridad

```
User Request
    ↓
Firebase checks Auth Token (JWT)
    ↓
Firestore evaluates rules
    ↓
If allowed: Execute operation
If denied: Return permission error
```

## 📱 PWA Architecture

### Service Worker

```
Browser
    ↓
Service Worker (Middleware)
    ├─→ Cache (Static assets)
    ├─→ IndexedDB (Offline data)
    └─→ Network (Fresh data)
```

### Estrategia de Caché

1. **Static Assets**: Cache-first
   - HTML, CSS, JS, imágenes
   
2. **API Calls**: Network-first with cache fallback
   - Datos de Firebase
   
3. **Offline Support**: IndexedDB
   - Eventos previamente cargados

## 🚀 Estado y Gestión

### Estado de Autenticación

```typescript
interface AuthState {
  user: User | null;      // Usuario actual
  isLoading: boolean;     // Cargando
  isAuthenticated: boolean; // Autenticado?
}
```

Gestionado por: `useAuth` hook + Firebase `onAuthStateChanged`

### Estado de Eventos

```typescript
interface EventsState {
  events: CalendarEvent[];  // Lista de eventos
  isLoading: boolean;      // Cargando
  error: string | null;    // Error si existe
}
```

Gestionado por: `useEvents` hook + Firestore `onSnapshot`

## 🔄 Sincronización Offline

### Escritura Offline

```
User creates event (offline)
    ↓
Save to Firestore (queued)
    ↓
Show optimistic update in UI
    ↓
When online: Sync to server
    ↓
Update with server response
```

### Lectura Offline

```
User opens app (offline)
    ↓
Load from IndexedDB cache
    ↓
Display cached events
    ↓
Show "offline" indicator
```

## 📊 Rendimiento

### Code Splitting

```
main.js (React + routing)
    ├─→ auth.chunk.js (lazy)
    ├─→ calendar.chunk.js (lazy)
    └─→ fullcalendar.chunk.js (lazy)
```

### Bundle Size

- Main bundle: ~200KB (gzipped)
- FullCalendar: ~100KB (gzipped)
- Firebase: ~150KB (gzipped)
- **Total**: ~450KB (gzipped)

## 🔌 Integraciones

### Firebase Services

```
CalSync
├── Firebase Authentication
│   ├── Email/Password
│   └── Google OAuth
│
├── Cloud Firestore
│   ├── Realtime Database
│   ├── Offline Persistence
│   └── Security Rules
│
└── Firebase Hosting (opcional)
    └── Static file serving
```

### External Libraries

```
React Ecosystem
├── React 18
├── React Router DOM
└── React Hooks

UI Framework
├── Ionic React
└── Ionicons

Calendar
└── FullCalendar
    ├── DayGrid plugin
    ├── TimeGrid plugin
    └── List plugin
```

## 🧪 Testing Strategy (Futuro)

### Unit Tests
- Services: authService, eventService
- Utils: dateUtils, constants
- Hooks: useAuth, useEvents

### Integration Tests
- Authentication flow
- Event CRUD operations
- Offline sync

### E2E Tests
- User registration
- Create/edit/delete events
- Multi-device sync

## 📈 Escalabilidad

### Limitaciones Actuales
- Máximo 5 usuarios por grupo
- Sin paginación de eventos
- Eventos cargados en memoria

### Mejoras Futuras
- Paginación de eventos
- Múltiples grupos/calendarios
- Carga incremental
- Optimización de queries

## 🛠️ DevOps

### Build Process

```
npm run build
    ↓
TypeScript compilation
    ↓
Vite bundling
    ↓
PWA manifest generation
    ↓
Service Worker compilation
    ↓
dist/ folder ready
```

### Deployment

```
npm run deploy
    ↓
Build application
    ↓
Firebase hosting deploy
    ↓
Update Firestore rules
    ↓
Live on production
```

## 🎯 Principios de Diseño

1. **Separation of Concerns**: Capas bien definidas
2. **Single Responsibility**: Cada módulo una responsabilidad
3. **DRY**: Don't Repeat Yourself
4. **SOLID Principles**: Especialmente SRP e DIP
5. **Component Composition**: Componentes pequeños y reutilizables

## 📚 Patrones Utilizados

- **Custom Hooks**: Lógica reutilizable (useAuth, useEvents)
- **Service Pattern**: Abstracción de Firebase
- **Observer Pattern**: Realtime subscriptions
- **Repository Pattern**: eventService como repositorio
- **Singleton Pattern**: Firebase app instance

---

Esta arquitectura proporciona:
- ✅ Escalabilidad
- ✅ Mantenibilidad
- ✅ Testabilidad
- ✅ Rendimiento
- ✅ Seguridad
- ✅ Experiencia offline

