const express = require('express');
const router = express.Router();
const { guardarSimulacion, obtenerHistorialSimulaciones } = require('../controllers/simulacionesController');
const { authMiddleware } = require('../middlewares/authMiddleware');


// Guardar simulación avanzada
router.post('/', authMiddleware, guardarSimulacion);

// Obtener historial de simulaciones del usuario autenticado
router.get('/', authMiddleware, obtenerHistorialSimulaciones);

module.exports = router;
