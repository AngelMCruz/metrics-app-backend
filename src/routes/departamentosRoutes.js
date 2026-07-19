const express = require('express');
const router = express.Router();
const departamentosController = require('../controllers/departamentosController');

router.get('/', departamentosController.getDepartamentos);

module.exports = router;