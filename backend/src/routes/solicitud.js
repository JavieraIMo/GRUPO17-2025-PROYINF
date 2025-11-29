const express = require('express');
const router = express.Router();
const { registrarSolicitud } = require('../controllers/solicitudController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Registrar solicitud de préstamo
router.post('/', authMiddleware, registrarSolicitud);

module.exports = router;
