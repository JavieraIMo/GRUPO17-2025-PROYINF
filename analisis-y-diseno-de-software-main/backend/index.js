const express = require('express');
const cors = require('cors'); // NUEVO: Para comunicación con React
const pool = require('./db');
const app = express();
const port = 3000;

// CORS - Permite que React (puerto 3001) se comunique con Node.js (puerto 3000)
app.use(cors({
  origin: 'http://localhost:3001', // URL de tu app React
  credentials: true
}));

// Middleware para procesar JSON (React envía JSON)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ELIMINAR estas líneas (ya no necesitas EJS):
// app.set('view engine', 'ejs');
// app.set('views', './src/views');
// app.use(express.static('public'));

// ============= RUTAS API =============

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// ============= AUTENTICACIÓN =============

// Verificar si email ya existe (HU-1)
app.get('/api/check-email/:email', async (req, res) => {
  try {
    const { email } = req.params;
    
    // TODO: Cuando tengamos la tabla clientes
    // const result = await pool.query('SELECT id FROM clientes WHERE email = $1', [email]);
    // const exists = result.rows.length > 0;
    
    // Por ahora, simulamos algunos emails que ya existen
    const existingEmails = ['test@test.com', 'admin@alara.cl', 'demo@demo.cl'];
    const exists = existingEmails.includes(email.toLowerCase());
    
    res.json({ 
      exists,
      email: email.toLowerCase()
    });
    
  } catch (error) {
    console.error('Error verificando email:', error);
    res.status(500).json({
      error: 'Error verificando email',
      message: error.message
    });
  }
});

// Registro de usuario (HU-1)
app.post('/api/register', async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      rut, 
      password 
    } = req.body;
    
    // Validaciones básicas
    if (!firstName || !lastName || !email || !phone || !rut || !password) {
      return res.status(400).json({
        error: 'Campos requeridos faltantes',
        required: ['firstName', 'lastName', 'email', 'phone', 'rut', 'password']
      });
    }
    
    // Verificar email único
    // TODO: Descomentar cuando tengamos la tabla
    // const emailCheck = await pool.query('SELECT id FROM clientes WHERE email = $1', [email]);
    // if (emailCheck.rows.length > 0) {
    //   return res.status(409).json({
    //     error: 'Email ya registrado',
    //     field: 'email'
    //   });
    // }
    
    // Simular verificación de email único
    const existingEmails = ['test@test.com', 'admin@alara.cl', 'demo@demo.cl'];
    if (existingEmails.includes(email.toLowerCase())) {
      return res.status(409).json({
        error: 'Email ya registrado',
        field: 'email'
      });
    }
    
    // TODO: Encriptar contraseña
    // const bcrypt = require('bcrypt');
    // const saltRounds = 10;
    // const passwordHash = await bcrypt.hash(password, saltRounds);
    
    // TODO: Insertar en base de datos
    // const result = await pool.query(`
    //   INSERT INTO clientes (
    //     rut, nombre_completo, email, telefono, password_hash, 
    //     fecha_registro, activo
    //   ) VALUES ($1, $2, $3, $4, $5, NOW(), true)
    //   RETURNING id, rut, nombre_completo, email, fecha_registro
    // `, [rut, `${firstName} ${lastName}`, email, phone, passwordHash]);
    
    // Simular inserción exitosa
    const mockUser = {
      id: Date.now(),
      rut,
      nombre_completo: `${firstName} ${lastName}`,
      email: email.toLowerCase(),
      telefono: phone,
      fecha_registro: new Date().toISOString(),
      activo: true
    };
    
    console.log('Usuario registrado (simulado):', {
      ...mockUser,
      password: '[ENCRIPTADO]'
    });
    
    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      user: {
        id: mockUser.id,
        firstName,
        lastName,
        email: mockUser.email,
        rut: mockUser.rut
      }
    });
    
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: error.message
    });
  }
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
    frontend: 'Ejecuta la app React en el puerto 3001'
  });
});

// ============= INICIAR SERVIDOR =============

app.listen(port, () => {
  console.log(`🚀 API Backend corriendo en http://localhost:${port}`);
  console.log(`📋 Endpoints disponibles en http://localhost:${port}/api`);
});