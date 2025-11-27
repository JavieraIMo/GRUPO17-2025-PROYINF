const express = require('express');
const router = express.Router();
const { guardarSimulacion, obtenerHistorialSimulaciones, eliminarSimulacion } = require('../controllers/simulacionesController');
const { authMiddleware } = require('../middlewares/authMiddleware');


// Guardar simulación avanzada
router.post('/', authMiddleware, guardarSimulacion);

// Obtener historial de simulaciones del usuario autenticado
router.get('/', authMiddleware, obtenerHistorialSimulaciones);

// Eliminar simulación por id (solo del usuario autenticado)
router.delete('/:id', authMiddleware, eliminarSimulacion);

module.exports = router;
