# Aplicación Node.js con Docker y PostgreSQL

Este es un ejemplo de una aplicación Node.js usando Express, Docker y PostgreSQL. Incluye configuración para desarrollo y producción.

## Requisitos Previos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0+)
- [Node.js](https://nodejs.org/) (opcional, solo para desarrollo local)
- `curl` o cliente HTTP (para probar endpoints)

## Instalación

### 1. Clonar el repositorio
git clone https://github.com/MatiasBV/analisis-y-diseno-de-software.git  
(debe tener docker-desktop abierto en todo momento)
Ejecutar en terminal:

1. Deben navegar hasta la carpeta analisis-y-diseno-de-software/mi-proyecto-node-docker  

2. (les instalará las dependencias se suele demorar un poco la primera vez con esto levantan el proyecto)  
docker compose up --build

# Para ejecutar en segundo plano (detached mode)
docker compose up --build -d
```

> **⏱️ Primera ejecución**: Puede tomar varios minutos mientras Docker descarga las imágenes base y construye los contenedores.

## 🎯 Uso de la Aplicación

### Verificar que todo funciona

1. **Comprobar el estado de los servicios**:
```powershell
docker compose ps
```

2. **Ver logs en tiempo real**:
```powershell
# Ver logs de todos los servicios
docker compose logs -f

# Ver logs de un servicio específico
docker compose logs -f app
docker compose logs -f postgres_db
```

3. **Acceder a la aplicación**:
   - API: `http://localhost:3000`
   - Base de datos: `localhost:5432`

### Detener la aplicación

```powershell
# Detener contenedores sin eliminar volúmenes
docker compose down

# Detener y eliminar volúmenes (⚠️ elimina datos de la DB)
docker compose down -v
```

## 📚 Comandos Útiles

### Gestión de Contenedores

| Comando | Descripción |
|---------|-------------|
| `docker compose up` | Iniciar sin reconstruir |
| `docker compose up -d` | Iniciar en segundo plano |
| `docker compose down` | Detener servicios |
| `docker compose restart app` | Reiniciar servicio específico |
| `docker compose ps` | Ver estado de servicios |

### Debugging y Logs

| Comando | Descripción |
|---------|-------------|
| `docker compose logs -f` | Ver logs en tiempo real |
| `docker compose logs app` | Ver logs del servicio app |
| `docker compose exec app sh` | Acceder al contenedor |

### Gestión de Volúmenes

|         Comando          |     Descripción    |
|--------------------------|--------------------|
| `docker volume ls`       | Listar volúmenes   |
| `docker compose down -v` | Eliminar volúmenes |

## 🔧 Solución de Problemas

### Problema: "No se puede conectar a Docker"
- Verificar que Docker Desktop esté ejecutándose
- Reiniciar Docker Desktop si es necesario

### Problema: Error de puertos ocupados
```powershell
# Ver qué está usando el puerto 3000
netstat -ano | findstr :3000

# Cambiar el puerto en docker-compose.yml si es necesario
```

### Problema: WSL2 en Windows
Si usas Windows, configura WSL2 en Docker Desktop:
1. Ir a **Configuración → General**
2. Marcar "Use WSL 2 based engine"
3. En **Resources → WSL Integration**, activar integración

### Problema: Contenedores no se comunican
- Verificar que los servicios usen los nombres correctos (`postgres_db`, `app`)
- Comprobar las variables de entorno en `docker-compose.yml`

## 🏗️ Estructura del Proyecto

```
mi-proyecto-node-docker/
├── docker-compose.yml    # Configuración de servicios
├── Dockerfile           # Imagen de la aplicación Node.js
├── package.json         # Dependencias de Node.js
├── index.js            # Punto de entrada de la aplicación
├── db.js               # Configuración de base de datos
└── README.md           # Este archivo
```

## 🤝 Desarrollo

### Modo desarrollo local (sin Docker)

Si prefieres desarrollar sin Docker:

```powershell
# Instalar dependencias
npm install

# Configurar variables de entorno
# Crear archivo .env con las credenciales de tu PostgreSQL local

# Iniciar aplicación
npm start
```

### Variables de entorno

El proyecto usa estas variables (configuradas automáticamente con Docker):
- `DB_HOST=postgres_db`
- `DB_PORT=5432`
- `DB_USER=user`
- `DB_PASSWORD=password`
- `DB_NAME=mydb`



