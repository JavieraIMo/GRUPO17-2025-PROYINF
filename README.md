# GRUPOALARA-2025-PROYINF
# Grupo 17 - Simulador de Préstamos Crediticios

Este es el repositorio del *Grupo 17*, cuyos integrantes son:

* Fernanda López - Rol: 202373638-4
* Antonia Salinas - Rol: 202330512-k
* Javiera Ibaca Morales - Rol: 202273624-0
* **Tutor**: Miguel Belisario Huerta Flores

## Wiki

Puede acceder a la Wiki mediante el siguiente [enlace](https://github.com/JavieraIMo/GRUPOALARA-2025-PROYINF/wiki)

## Videos

* [Video presentación cliente](https://aula.usm.cl/mod/resource/view.php?id=6926137)
* [Video presentación avance 1](https://www.youtube.com/)
* Etc ...

## Aspectos técnicos relevantes

## Descripción del Proyecto

**Grupo Alara** es una aplicación web de simulación de préstamos crediticios desarrollada en React. La plataforma permite a los usuarios calcular préstamos con diferentes montos y plazos, ofreciendo una interfaz profesional similar a las páginas bancarias reales.

### Características Principales

- 🏦 **Interfaz Bancaria Profesional**: Diseño moderno y responsive
- 🔐 **Sistema de Autenticación**: Login modal con validación
- 📊 **Simulador de Préstamos**: Cálculo en tiempo real de cuotas e intereses
- 📱 **Diseño Responsive**: Funciona en desktop
- ⚡ **React Modular**: Arquitectura de componentes reutilizables

## Estructura del Proyecto

```
GRUPO17-2025-PROYINF/
├── README.md
└── analisis-y-diseno-de-software-main/
    ├── docker-compose.yml          # Orquestación de contenedores
    ├── start-complete.bat          # Script para iniciar stack completo
    ├── start-frontend.bat          # Script para desarrollo frontend
    ├── backend/                    # API Node.js + Express
    │   ├── .dockerignore
    │   ├── Dockerfile
    │   ├── package.json
    │   ├── index.js               # Punto de entrada del servidor
    │   ├── db.js                  # Configuración de base de datos
    │   ├── src/                   # Código fuente organizado en MVC
    │   │   ├── config/            # Configuraciones
    │   │   ├── controllers/       # Controladores de rutas
    │   │   ├── middlewares/       # Middlewares personalizados
    │   │   ├── models/            # Modelos de datos
    │   │   ├── routes/            # Definición de rutas
    │   │   └── utils/             # Utilidades y helpers
    │   └── tests/                 # Pruebas unitarias
    └── frontend/                  # Aplicación React
        ├── .dockerignore
        ├── Dockerfile
        ├── package.json
        ├── public/
        │   ├── index.html
        │   └── images/            # Assets estáticos (logos, etc.)
        └── src/
            ├── App.js             # Componente principal
            ├── index.js           # Punto de entrada React
            ├── components/        # Componentes reutilizables
            │   ├── Header.js      # Navegación con logo ALARA
            │   └── Header.css     # Estilos del header responsive
            └── pages/             # Páginas de la aplicación
                ├── Home.js        # Página principal con hero
                └── Home.css       # Estilos de la página principal
```

## Componentes Desarrollados

### 🎯 **Header (components/Header.js)**
- Navegación principal con logo ALARA
- Menú hamburguesa responsive posicionado a la derecha
- Navegación centrada en desktop
- Estilos profesionales con identidad corporativa

### 🏠 **Home (pages/Home.js)**
- Página de bienvenida al simulador
- Hero section con call-to-action
- Diseño responsive y moderno

### 🐳 **Arquitectura Docker**
- Contenedores separados para frontend, backend y base de datos
- Hot-reload configurado para desarrollo
- Scripts de automatización para inicio rápido

## Tecnologías Utilizadas

### Frontend
- **React 19.2.0**: Framework principal con hooks
- **CSS3**: Estilos modernos con Flexbox y Grid
- **JavaScript ES6+**: Lógica de aplicación moderna
- **Docker**: Containerización para desarrollo

### Backend
- **Node.js**: Runtime del servidor
- **Express**: Framework web minimalista
- **PostgreSQL**: Base de datos relacional
- **Docker**: Containerización y orquestación

### DevOps
- **Docker Compose**: Orquestación multi-contenedor
- **Hot Reload**: Desarrollo en tiempo real
- **Scripts .bat**: Automatización de tareas

### Proyecto: Sistema de Préstamos Digitales

**Estado del desarrollo:** ✅ **HU-1 Implementada** - Registro y Login funcional con PostgreSQL

### Stack Tecnológico
> **Frontend:** React 19.2.0 + CSS3 (Puerto 3101)
> **Backend:** Node.js + Express + MVC (Puerto 3100)
> **Base de datos:** PostgreSQL 15 con bcrypt (Puerto 5433)
> **Admin BD:** pgAdmin 4 Web (Puerto 5050)
> **Orquestación:** Docker Compose para desarrollo
> **Arquitectura:** MVC completa con autenticación segura

## Servicios Configurados

### 🐳 **Docker Compose**
- **Frontend React**: `http://localhost:3101` (puerto actualizado)
- **Backend API**: `http://localhost:3100` (puerto actualizado)
- **PostgreSQL**: `localhost:5433` (puerto externo para evitar conflictos)
- **pgAdmin**: `http://localhost:5050` (interfaz web de administración)

### 🚀 **Scripts de Ejecución**
```bash
# Iniciar stack completo (recomendado)
start-complete.bat

# Solo frontend para desarrollo
start-frontend.bat

# Comando manual
docker-compose up --build
```

### ⚙️ **Características Técnicas Implementadas**
- ✅ **Contenedorización completa** con Docker Compose
- ✅ **Hot-reload configurado** para desarrollo ágil  
- ✅ **Arquitectura MVC completa** implementada en backend
- ✅ **Autenticación con bcrypt** y PostgreSQL
- ✅ **Validación RUT chileno** con algoritmo oficial
- ✅ **Separación de servicios** (frontend/backend/db/pgAdmin)
- ✅ **Scripts de automatización** para inicio rápido
- ✅ **Configuración de puertos** optimizada (3100/3101)
- ✅ **HU-1 completada** (Registro y Login de usuarios)

**Consideraciones técnicas planificadas para siguientes fases:**

#### Integraciones Externas (Confirmadas)
- **Servicios de riesgo:** DICOM, Equifax, CCS
- **Validación identidad:** Clave Única, biometría facial
- **Firma digital:** eCert Chile u entidad certificadora similar
- **Pagos:** Transbank WebPay, Servipag
- **Notificaciones:** SMS, WhatsApp Business API, Email

#### Infraestructura y Despliegue (Siguiente fase)
- **Cloud:** AWS, Azure o Google Cloud (por evaluar)
- **Escalabilidad:** Kubernetes para producción
- **CI/CD:** GitHub Actions + plataforma de despliegue
- **Monitoreo:** Logging y métricas (herramientas por definir)

#### Seguridad (Por implementar)
- **Autenticación:** JWT + OAuth 2.0
- **Encriptación:** HTTPS, cifrado de datos sensibles
- **Compliance:** Cumplimiento normativo financiero chileno

### Requisitos del Sistema (Objetivos)
- **Disponibilidad:** 7x24 para operaciones críticas
- **SLA objetivo:** Aprobación en menos de 24 horas
- **Escalabilidad:** Soporte para crecimiento de usuarios
- **Integración:** APIs para sistemas bancarios existentes

---

## 🚀 Guía de Instalación Completa (Desde Cero)

Esta guía te permite configurar todo el sistema ALARA en una nueva máquina local.

### 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

1. **Git**
   - Descargar desde: https://git-scm.com/downloads
   - Verificar instalación: `git --version`

2. **Docker Desktop**
   - Descargar desde: https://www.docker.com/products/docker-desktop/
   - **IMPORTANTE:** Debe incluir Docker Compose
   - Verificar instalación: `docker --version` y `docker-compose --version`

3. **Puertos disponibles** (verificar que no estén en uso):
   - `3100` - Backend API
   - `3101` - Frontend React
   - `5433` - PostgreSQL
   - `5050` - pgAdmin

### 📥 Paso 1: Clonar el Repositorio

```bash
# Clonar el proyecto
git clone https://github.com/JavieraIMo/GRUPO17-2025-PROYINF.git

# Navegar al directorio del proyecto
cd GRUPO17-2025-PROYINF/analisis-y-diseno-de-software-main
```

### 🔧 Paso 2: Configuración de Puertos

El proyecto utiliza puertos específicos para evitar conflictos comunes (3000/3001):

| Servicio           | Puerto Interno | Puerto Externo | URL de Acceso           |
|--------------------|----------------|----------------|-------------------------|
| **Frontend React** | 3000           | **3101**       | `http://localhost:3101` |
| **Backend API**    | 3000           | **3100**       | `http://localhost:3100` |
| **PostgreSQL**     | 5432           | **5433**       | `localhost:5433`        |
| **pgAdmin**        | 80             | **5050**       | `http://localhost:5050` |

#### ⚠️ Resolución de Conflictos de Puerto

Si tienes conflictos de puerto, puedes cambiarlos editando `docker-compose.yml`:

```yaml
# Ejemplo: cambiar puerto del frontend de 3101 a 3201
frontend:
  ports:
    - "3201:3000"  # Puerto externo:interno
```

### 🐳 Paso 3: Construcción e Inicio

#### Opción A: Script Automático (Recomendado para Windows)
```bash
# Ejecutar script de inicio completo
./start-complete.bat
```

#### Opción B: Comando Manual (Multiplataforma)
```bash
# Construir e iniciar todos los servicios
docker-compose up --build

# Para ejecutar en segundo plano
docker-compose up --build -d
```

### ⏳ Paso 4: Verificación de Instalación

1. **Esperar inicialización** (2-3 minutos primera vez)

2. **Verificar servicios activos:**
```bash
docker ps
```

3. **Probar conectividad:**
   - ✅ Frontend: http://localhost:3101
   - ✅ Backend API: http://localhost:3100/api/health
   - ✅ pgAdmin: http://localhost:5050

### 🗄️ Paso 5: Configuración de Base de Datos

#### 5.1 Acceso a pgAdmin
1. Ir a: http://localhost:5050
2. **Credenciales:**
   - Email: `admin@alara.cl`
   - Contraseña: `admin123`

#### 5.2 Conectar a PostgreSQL
1. Clic derecho en "Servers" → "Create" → "Server"
2. **General Tab:**
   - Name: `ALARA Database`
3. **Connection Tab:**
   - Host: `postgres_db` (nombre del servicio Docker)
   - Port: `5432` (puerto interno)
   - Database: `mydb`
   - Username: `user`
   - Password: `password`

#### 5.3 Crear Esquema de HU-1
```sql
-- Ejecutar en pgAdmin Query Tool
CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    rut VARCHAR(12) UNIQUE NOT NULL,
    nombre_completo VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE
);
```

### 🛠️ Comandos Útiles para Desarrollo

#### Docker
```bash
# Ver logs del backend
docker logs analisis-y-diseno-de-software-main-app-1

# Ver logs del frontend
docker logs analisis-y-diseno-de-software-main-frontend-1

# Reiniciar un servicio específico
docker-compose restart app

# Parar todos los servicios
docker-compose down

# Limpiar y reconstruir
docker-compose down && docker-compose up --build
```

#### Base de Datos
```bash
# Conectarse directamente a PostgreSQL
docker exec -it analisis-y-diseno-de-software-main-postgres_db-1 psql -U user -d mydb

# Limpiar tabla de usuarios
docker exec -it analisis-y-diseno-de-software-main-postgres_db-1 psql -U user -d mydb -c "DELETE FROM clientes;"

# Resetear contador de IDs
docker exec -it analisis-y-diseno-de-software-main-postgres_db-1 psql -U user -d mydb -c "ALTER SEQUENCE clientes_id_seq RESTART WITH 1;"
```

### 🔧 Solución de Problemas Comunes

#### Problema: Puerto ya en uso
```bash
# Verificar qué proceso usa el puerto
netstat -ano | findstr :3100

# Matar proceso (Windows)
taskkill /PID [PID_NUMBER] /F
```

#### Problema: Contenedor no inicia
```bash
# Ver logs detallados
docker-compose logs [service_name]

# Reconstruir contenedor específico
docker-compose up --build [service_name]
```

#### Problema: Error de conexión a BD
1. Verificar que PostgreSQL esté corriendo: `docker ps`
2. Verificar logs de PostgreSQL: `docker logs [postgres_container_name]`
3. Reiniciar servicios: `docker-compose restart`

### 📁 Estructura de Archivos Clave

```
analisis-y-diseno-de-software-main/
├── docker-compose.yml          # ⚙️ Configuración de servicios y puertos
├── backend/
│   ├── index.js               # 🚪 Punto de entrada del servidor
│   ├── src/controllers/       # 🎮 Lógica de negocio MVC
│   ├── src/models/           # 📊 Modelos de datos
│   └── src/routes/           # 🛣️ Endpoints de API
└── frontend/
    ├── src/components/       # 🧩 Componentes React
    ├── src/pages/           # 📄 Páginas de la aplicación
    └── Dockerfile           # 🐳 Configuración del contenedor React
```

### ✅ Lista de Verificación Post-Instalación

- [ ] Docker Desktop ejecutándose
- [ ] Puertos 3100, 3101, 5433, 5050 disponibles
- [ ] Proyecto clonado y en directorio correcto
- [ ] `docker-compose up --build` ejecutado exitosamente
- [ ] Frontend accesible en http://localhost:3101
- [ ] Backend responde en http://localhost:3100/api/health
- [ ] pgAdmin accesible en http://localhost:5050
- [ ] Base de datos conectada y tabla `clientes` creada
- [ ] Registro de usuario funcional
- [ ] Login de usuario funcional

---

*Última actualización: Octubre 2025 - Versión 1.2 con guía de instalación completa*
