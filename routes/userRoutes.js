const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken ,authorizeRole } = require('../middlewares/authMiddleware');

router.post('/add', authenticateToken, userController.createUser);
router.get('/all', authenticateToken,authorizeRole(['admin']), userController.getAllUsers);
router.patch('/update', authenticateToken,authorizeRole(['admin','authority','university','college','department']), userController.patchUser);
router.delete('/delete/:id', authenticateToken,authorizeRole(['admin']), userController.deleteUser);
router.get('/me', authenticateToken, authorizeRole(['admin','authority','university','college','department']),userController.getUserProfile);

module.exports = router;
