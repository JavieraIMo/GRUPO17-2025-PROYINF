# Dockerfile para React Frontend
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Variables de entorno para hot reload
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true

# Exponer puerto 3000 (React dev server)
EXPOSE 3000

# Comando para iniciar el servidor de desarrollo
CMD ["npm", "start"]