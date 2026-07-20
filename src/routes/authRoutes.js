const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define los endpoints POST para registro y login
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;