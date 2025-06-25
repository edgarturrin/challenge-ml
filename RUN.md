# Cómo levantar la app

## Arquitectura

La aplicación ahora incluye un BFF (Backend for Frontend) que actúa como intermediario entre el frontend y el backend:

```
Frontend (React) → BFF (Express) → Backend (Java Spring Boot)
```

# Opción 1: Usando Docker Compose (recomendado)

1. Asegúrate de tener Docker y Docker Compose instalados.
2. Desde la raíz del proyecto, ejecuta:

``` bash 


docker-compose up --build
```

- El Front estará disponible en: [http://localhost:3000](http://localhost:3000)
- El backend no estara disponible, solo es accesible desde el bff del frontend.

Para detener los servicios:
```bash


docker-compose down
```

---

# Opción 2: Levantar en modo desarrollo local (sin Docker)

### 1. Instalar dependencias del frontend
```bash
 
 
cd frontend
npm install
```

### 2. Levantar el backend (Java Spring Boot)
```bash


cd backend
./gradlew bootRun
```

### 3. Levantar el frontend con BFF (React + Express)

En otra terminal:


```bash


cd frontend

cp env.example .env
npm run start
```

Esto ejecutará simultáneamente:
- El BFF y Frontend en [http://localhost:3000](http://localhost:3000)

---

## Endpoints del BFF

- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener un producto específico