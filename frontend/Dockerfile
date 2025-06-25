# Usar Node.js 18 como imagen base
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración de dependencias
COPY package*.json ./
COPY tsconfig.json ./
COPY postcss.config.js ./

# Instalar todas las dependencias (incluyendo devDependencies para el build)
RUN npm i

# Copiar código fuente
COPY src/ ./src/

# Construir la aplicación
RUN npm run build

# Exponer puerto
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev"] 