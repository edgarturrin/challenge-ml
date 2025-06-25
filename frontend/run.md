
# Guía de Ejecución

Esta guía explica cómo ejecutar la API, correr los tests y visualizar los reportes de cobertura.

## Requisitos Previos

Tener corriendo el backend, y instalar dependencias:

```bash 
cd frontend
npm install
```

## Levantar el frontend con BFF (React + Express)

```bash

cd frontend
cp env.example .env
npm run start
```

Esto ejecutará simultáneamente:
- El BFF y Frontend en [http://localhost:3000](http://localhost:3000)

---

### Endpoints del BFF

- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener un producto específico


## 🚀 Comandos de Test

### Ejecutar todos los tests
```bash
npm test
```

### Ejecutar tests en modo watch
```bash
npm run test:watch
```

### Ejecutar tests con cobertura
```bash
npm run test:coverage
```

## 🧩 Tipos de Tests

### 1. **Component Tests**
- **Propósito**: Verificar el comportamiento de componentes React
- **Cobertura**: Renderizado, interacciones, props, estados
- **Herramientas**: React Testing Library, Jest

### 2. **Page Tests**
- **Propósito**: Verificar el comportamiento de páginas completas
- **Cobertura**: Integración con servicios, manejo de estados, navegación
- **Herramientas**: React Testing Library, Jest, Mocks

### 3. **Service Tests**
- **Propósito**: Verificar la lógica de servicios y APIs
- **Cobertura**: Llamadas HTTP, manejo de errores, transformación de datos
- **Herramientas**: Jest, Mocks de fetch/axios

### 4. **BFF Tests**
- **Propósito**: Verificar el comportamiento del Backend for Frontend
- **Cobertura**: Rutas, middleware, integración con backend
- **Herramientas**: Supertest, Jest, Mocks