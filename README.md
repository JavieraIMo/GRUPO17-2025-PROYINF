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

**Estado del desarrollo:** � Infraestructura base implementada con Docker

### Stack Tecnológico
> **Frontend:** React 19.2.0 (Containerizado con Docker)
> **Backend:** Node.js + Express (Containerizado con Docker)  
> **Base de datos:** PostgreSQL 15 (Containerizado con Docker)
> **Orquestación:** Docker Compose para desarrollo
> **Arquitectura:** MVC preparada en backend

## Servicios Configurados

### 🐳 **Docker Compose**
- **Frontend React**: `http://localhost:3001`
- **Backend API**: `http://localhost:3000`
- **PostgreSQL**: `localhost:5433` (puerto externo para evitar conflictos)

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
- ✅ **Arquitectura MVC** preparada en backend
- ✅ **Separación de servicios** (frontend/backend/db)
- ✅ **Scripts de automatización** para inicio rápido
- ✅ **Configuración de puertos** sin conflictos
- ✅ **Header profesional** con branding ALARA
- ✅ **Diseño responsive** móvil y desktop

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

*Última actualización: Octubre 2025*
