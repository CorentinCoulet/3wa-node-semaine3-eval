const express = require('express');
const router = express.Router();
const { registerUser, authenticateUser, logout } = require('../controllers/authController');
const auth = require('../middleware/auth');

// Routes d'authentification
router.post('/register', registerUser);
router.post('/login', authenticateUser);

// Route de déconnexion
router.get('/logout', logout);

module.exports = router;
