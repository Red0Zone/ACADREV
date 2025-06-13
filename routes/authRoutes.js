const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { logout } = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/authMiddleware');
router.post('/login', authController.login);
router.post('/logout', authenticateToken, logout);

module.exports = router;
