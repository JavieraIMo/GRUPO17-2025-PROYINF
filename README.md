# GRUPOALARA-2025-PROYINF
# Grupo 17 - Simulador de Préstamos Crediticios

Este es el repositorio del *Grupo 17*, cuyos integrantes son:

* Fernanda López - Rol: 202373638-4
* Antonia Salinas - Rol: 202330512-k
* Augusto Fuenzalida - Rol:202373114-5
* Javiera Ibaca Morales - Rol: 202273624-0
* **Tutor**: Miguel Belisario Huerta Flores

## Descripción del Proyecto

**Grupo Alara** es una aplicación web de simulación de préstamos crediticios desarrollada en React. La plataforma permite a los usuarios calcular préstamos con diferentes montos y plazos, ofreciendo una interfaz profesional similar a las páginas bancarias reales.

### Características Principales

- 🏦 **Interfaz Bancaria Profesional**: Diseño moderno y responsive
- 🔐 **Sistema de Autenticación**: Login modal con validación
- 📊 **Simulador de Préstamos**: Cálculo en tiempo real de cuotas e intereses
- 📱 **Diseño Responsive**: Funciona en desktop, tablet y móvil
- ⚡ **React Modular**: Arquitectura de componentes reutilizables

## Estructura del Proyecto

```
src/
├── components/
│   ├── Header/           # Navegación y autenticación
│   ├── Footer/           # Pie de página
│   ├── Hero/            # Sección principal
│   ├── Simulator/       # Calculadora de préstamos
│   ├── Features/        # Características del servicio
│   └── Login/           # Modal de inicio de sesión
├── styles/              # Estilos globales
├── pages/               # Páginas principales
├── utils/               # Utilidades y helpers
└── App.jsx             # Componente principal
```

## Componentes Desarrollados

### 🎯 **Header**
- Navegación principal
- Botón de login/logout
- Menú responsive

### 🔐 **LoginModal**
- Modal de autenticación
- Validación de formularios
- Manejo de errores

### 🏠 **Hero**
- Sección de bienvenida
- Call-to-action dinámico
- Mensajes según estado de login

### 📊 **Simulator**
- Calculadora de préstamos
- Resultados en tiempo real
- Formato de moneda chilena (CLP)

### ⭐ **Features**
- Características del servicio
- Tarjetas con hover effects
- Call-to-action integrado

### 🦶 **Footer**
- Enlaces de navegación
- Información legal
- Datos de contacto

## Tecnologías Utilizadas

- **React 18+**: Framework principal
- **CSS3**: Estilos modernos con Flexbox y Grid
- **JavaScript ES6+**: Lógica de aplicación
- **Responsive Design**: Media queries y diseño adaptable

## Wiki

Puede acceder a la Wiki mediante el siguiente [enlace](https://github.com/JavieraIMo/GRUPOALARA-2025-PROYINF/wiki)

## Videos

* [Video presentación cliente](https://aula.usm.cl/mod/resource/view.php?id=6926137)
* [Video presentación avance 1](https://www.youtube.com/)
* Etc ...

## Aspectos técnicos relevantes

A continuación se **evaluarán** diversas herramientas y lenguajes para elegir los más adecuados y flexibles al proyecto. **Se podrán considerar opciones adicionales** a medida que se **defina** el stack a utilizar.

### Proyecto: Sistema de Préstamos Digitales

**Estado del desarrollo:** 📋 Fase de análisis y diseño

### Stack Tecnológico
> 🚧 **En definición** - Se actualizará según avance del proyecto

**Consideraciones técnicas planificadas:**

#### Backend

- **Framework web:** Node.js
- **Base de datos:** PostgreSQL
- **API:** RESTful API para integración con sistemas externos

#### Frontend  
- **Web:** React

#### Integraciones Externas (Confirmadas)
- **Servicios de riesgo:** DICOM, Equifax, CCS
- **Validación identidad:** Clave Única, biometría facial
- **Firma digital:** eCert Chile u entidad certificadora similar
- **Pagos:** Transbank WebPay, Servipag
- **Notificaciones:** SMS, WhatsApp Business API, Email

#### Infraestructura y Despliegue
- **Cloud:** AWS, Azure o Google Cloud (por evaluar)
- **Contenedores:** Docker + Kubernetes (candidato)
- **CI/CD:** GitHub Actions + plataforma de despliegue
- **Monitoreo:** Logging y métricas (herramientas por definir)

#### Seguridad
- **Autenticación:** JWT + OAuth 2.0
- **Encriptación:** HTTPS, cifrado de datos sensibles
- **Compliance:** Cumplimiento normativo financiero chileno

### Requisitos del Sistema
- **Disponibilidad:** 7x24 para operaciones críticas
- **SLA objetivo:** Aprobación en menos de 24 horas
- **Escalabilidad:** Soporte para crecimiento de usuarios
- **Integración:** APIs para sistemas bancarios existentes

---

**📅 Próximas actualizaciones:** Definición de stack completo en Hito 2

*Última actualización: Agosto 2025*
