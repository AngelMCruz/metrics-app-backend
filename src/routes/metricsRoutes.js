const express = require('express');
const router = express.Router();
const metricsController = require('../controllers/metricsController');

// Rutas para obtener y filtrar
router.get('/', metricsController.getMetrics);

// Rutas del CRUD para manipular métricas
router.post('/', metricsController.createMetric);
router.put('/:id', metricsController.updateMetric);
router.delete('/:id', metricsController.deleteMetric);

module.exports = router;