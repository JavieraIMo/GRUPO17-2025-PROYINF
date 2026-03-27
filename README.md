# Grupo Alara - Sistema de Préstamos Digitales

> **Stack:** React + Node.js + PostgreSQL + Docker  
> **Estado:** Sistema funcional con autenticación y simulación de préstamos

Aplicación web de simulación de préstamos crediticios con interfaz bancaria profesional, desarrollada por el **Grupo 7** de la UTFSM.

##  Equipo de Desarrollo

- **Fernanda López** - ROL: 202373638-4  
- **Antonia Salinas** - ROL: 202330512-k  
- **Javiera Ibaca Morales** - ROL: 202273624-0  
- **Emile Allué** - ROL: 202273564-3  
- **Álvaro Aceituno** - ROL: 202273520-1  
- **Tutor:** Miguel Belisario Huerta Flores

## Recursos del Proyecto

- [ Wiki del Proyecto](https://github.com/JavieraIMo/GRUPOALARA-2025-PROYINF/wiki)

#### Videos de Presentación

* [Video presentación cliente - 2025](https://aula.usm.cl/mod/resource/view.php?id=6926137)
* [Video presentación avance 1 (HU 1)](https://youtu.be/KnxOXxoZvGs)
* [Video presentación avance 2 (HU 2)](https://youtu.be/TI9UqV6XYTU)
* [Video presentación avance 3 (HU 4)](https://youtu.be/BiPZFH9mxA0)
* [Video presentación cliente - 2026](https://aula.usm.cl/pluginfile.php/8396563/mod_resource/content/1/Presentaci%C3%B3n%20Inicial%20del%20Cliente.mp4)
* Etc...
  
- [ Guía de Instalación](SETUP.md)

## Descripción del Proyecto

**Grupo Alara** es una aplicación web de simulación de préstamos crediticios que permite a los usuarios:

- Calcular préstamos con diferentes montos y plazos
- Obtener evaluaciones crediticias
- Simular diferentes escenarios financieros  
- Gestionar solicitudes de préstamos

La plataforma ofrece una interfaz profesional similar a las páginas bancarias reales, con un enfoque en la experiencia de usuario y la seguridad.

## Características Principales

 **Interfaz Bancaria Profesional** - Diseño moderno y responsive  
 **Sistema de Autenticación** - Login seguro con validación RUT chileno  
 **Simulador de Préstamos** - Cálculo en tiempo real de cuotas e intereses  
 **Diseño Responsive** - Funciona en desktop y mobile  
 **Arquitectura Modular** - Componentes React reutilizables  
 **Seguridad** - Encriptación de contraseñas con bcrypt  

##  Arquitectura del Sistema

**Stack Tecnológico:** React 19.2.0 + Node.js + Express + PostgreSQL + Docker

### Frontend
- **React 19.2.0** - Framework principal con hooks
- **CSS3** - Estilos modernos con Flexbox y Grid  
- **JavaScript ES6+** - Lógica de aplicación
- **Organización por roles** - Public/User/Admin

### Backend
- **Node.js + Express** - API REST con arquitectura MVC
- **PostgreSQL 15** - Base de datos relacional
- **bcrypt** - Encriptación de contraseñas
- **JWT** - Autenticación y autorización

### DevOps
- **Docker Compose** - Orquestación de servicios
- **Hot Reload** - Desarrollo en tiempo real
- **pgAdmin** - Administración de base de datos

### Estructura de Directorios

```
├── backend/           # API Node.js con arquitectura MVC
│   ├── controllers/   # Lógica de negocio
│   ├── routes/        # Endpoints de la API
│   ├── models/        # Modelos de datos
│   ├── middlewares/   # Middlewares personalizados
│   └── utils/         # Utilidades y helpers
└── frontend/          # Aplicación React
    └── src/Rols/      # Organización por roles de usuario
        ├── Public/    # Páginas públicas (Home, Login, Registro)
        ├── User/      # Dashboard de usuario autenticado
        └── Admin/     # Panel de administración
```

##  Estado del Desarrollo

###  Funcionalidades Implementadas
- Sistema de autenticación completo (registro/login)
- Validación de RUT chileno
- Base de datos PostgreSQL configurada
- Arquitectura MVC implementada
- Contenedorización con Docker
- Frontend organizado por roles de usuario
- Simulador básico de préstamos

###  En Desarrollo
- Simulador avanzado con más variables
- Sistema de evaluación crediticia
- Dashboard administrativo
- Reportes y estadísticas

###  Funcionalidades Planificadas
- Integración con servicios de riesgo (DICOM, Equifax)
- Autenticación con Clave Única
- Firma digital de documentos
- Integración con Transbank WebPay
- Notificaciones SMS y Email
- Deploy en plataforma cloud

##  Inicio Rápido

Para instalar y ejecutar el proyecto, consulta la [Guía de Instalación (SETUP.md)](SETUP.md) que incluye:

- Prerrequisitos y configuración
- Comandos de instalación
- Configuración de base de datos
- Solución de problemas comunes

---

*Desarrollado por el Grupo 17 - UTFSM 2025*
*Desarrollado por el Grupo 7 - UTFSM 2026*

