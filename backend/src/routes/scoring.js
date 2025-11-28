const express = require('express');
const router = express.Router();
const { calcularScoring } = require('../controllers/scoringController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Endpoint seguro para calcular scoring
router.post('/', authMiddleware, calcularScoring);

module.exports = router;
