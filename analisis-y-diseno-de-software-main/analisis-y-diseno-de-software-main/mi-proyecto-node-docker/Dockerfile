FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Instalar nodemon globalmente
RUN npm install -g nodemon

# Instalar wait-port globalmente
RUN npm install -g wait-port

# Comando modificado para desarrollo con auto-reload
CMD ["sh", "-c", "wait-port postgres_db:5432 && npm run dev"]
