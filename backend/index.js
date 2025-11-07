// =====================================================
// ALARA SIMULADOR - BACKEND API
// Arquitectura MVC con Node.js + Express + PostgreSQL
// =====================================================

const express = require('express');
const cors = require('cors');
const path = require('path');

// Importar rutas MVC
const authRoutes = require('./src/routes/authRoutes');
const simulacionesRoutes = require('./src/routes/simulaciones');

// Inicializar aplicación Express
const app = express();
const port = process.env.PORT || 3100;

// =====================================================
// MIDDLEWARES GLOBALES
// =====================================================

// CORS - Permite comunicación con React
app.use(cors({
  origin: [
    'http://localhost:3000',
    process.env.FRONTEND_URL || 'http://localhost:3101'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parsear JSON y URL-encoded data
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware (desarrollo)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// =====================================================
// RUTAS PRINCIPALES
// =====================================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true,
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'ALARA Backend API',
    version: '1.0.0'
  });
});

// Rutas de autenticación (MVC)
app.use('/api/auth', authRoutes);
app.use('/api/simulaciones', simulacionesRoutes);

// Mantener las rutas legacy para compatibilidad con React
const AuthController = require('./src/controllers/authController');
app.get('/api/check-email/:email', AuthController.checkEmail);
app.post('/api/register', AuthController.register);

// =====================================================
// MIDDLEWARES DE ERROR
// =====================================================

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint no encontrado',
    path: req.originalUrl,
    method: req.method
  });
});

// Manejo global de errores
app.use((error, req, res, next) => {
  console.error('Error global:', error);
  
  res.status(error.status || 500).json({
    success: false,
    error: error.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// =====================================================
// INICIAR SERVIDOR
// =====================================================

app.listen(port, () => {
  console.log('🚀 ==========================================');
  console.log('🏦 ALARA SIMULADOR - Backend API');
  console.log('🚀 ==========================================');
  console.log(`📡 Servidor corriendo en: http://localhost:${port}`);
  console.log(`🔗 CORS habilitado para: ${process.env.FRONTEND_URL || 'http://localhost:3101'}`);
  console.log(`🏗️  Arquitectura: MVC (Modelo-Vista-Controlador)`);
  console.log(`📊 Base de datos: PostgreSQL`);
  console.log('📋 ==========================================');
  console.log('📋 ENDPOINTS DISPONIBLES:');
  console.log('📋 ==========================================');
  console.log('🔍 GET  /api/health           - Estado del servidor');
  console.log('🔐 POST /api/auth/register    - Registro MVC');
  console.log('🔐 POST /api/auth/login       - Login MVC');
  console.log('📧 GET  /api/auth/check-email/:email - Verificar email MVC');
  console.log('🆔 GET  /api/auth/check-rut/:rut     - Verificar RUT MVC');
  console.log('👤 GET  /api/auth/profile     - Perfil usuario MVC');
  console.log('📋 ==========================================');
  console.log('🔄 LEGACY (compatibilidad):');
  console.log('📧 GET  /api/check-email/:email - Verificar email legacy');
  console.log('🔐 POST /api/register         - Registro legacy');
  console.log('📋 ==========================================');
});

// ============= SIMULACIONES =============

// Simular préstamo (lo que React enviará)
app.post('/api/simulate', (req, res) => {
  try {
    const { amount, term, interestRate } = req.body;
    
    // Validaciones básicas
    if (!amount || !term || !interestRate) {
      return res.status(400).json({
        error: 'Faltan datos: amount, term, interestRate son requeridos'
      });
    }

    // Cálculos del préstamo
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment = amount * 
      (monthlyRate * Math.pow(1 + monthlyRate, term)) /
      (Math.pow(1 + monthlyRate, term) - 1);
    
    const totalAmount = monthlyPayment * term;
    const totalInterest = totalAmount - amount;

    // Respuesta JSON para React
    res.json({
      success: true,
      data: {
        amount: amount,
        term: term,
        interestRate: interestRate,
        monthlyPayment: Math.round(monthlyPayment),
        totalAmount: Math.round(totalAmount),
        totalInterest: Math.round(totalInterest)
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error en el cálculo del préstamo'
    });
  }
});

// Obtener historial de simulaciones
app.get('/api/history', async (req, res) => {
  try {
    // Aquí obtendrías datos de la BD
    res.json({
      success: true,
      data: [
        {
          id: 1,
          amount: 1000000,
          term: 12,
          monthlyPayment: 90000,
          date: '2025-10-16'
        }
        // Más simulaciones...
      ]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener historial'
    });
  }
});

// ============= RUTAS DE BASE DE DATOS (mantener para pruebas) =============

app.get('/api/save', async (req, res) => {
  try {
    await pool.query('CREATE TABLE IF NOT EXISTS messages (id SERIAL PRIMARY KEY, content TEXT)');
    await pool.query('INSERT INTO messages (content) VALUES ($1)', ['Hola desde PostgreSQL!']);
    res.json({ message: 'Mensaje guardado en la base de datos' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al guardar en BD' });
  }
});

app.get('/api/messages', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM messages');
    res.json({ messages: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener mensajes' });
  }
});

// ============= RUTA CATCH-ALL =============

// Para cualquier ruta no API, devolver info básica
app.get('*', (req, res) => {
  res.json({
    message: 'API Simulador de Préstamos',
    note: 'Esta es una API REST. Usa /api/ para acceder a los endpoints.',
    frontend: 'Ejecuta la app React en el puerto 3101'
  });
});