const express = require('express');
const router = express.Router();
const qntController = require('../controllers/qntController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');
const db = require('../config/db');

// 🔹 GET routes - مفتوحة لأي مستخدم مسجل دخول
router.get('/areas', authenticateToken, qntController.getAreas);
router.get('/headers/:areaId', authenticateToken, qntController.getHeaders);
router.get('/items/:areaId', authenticateToken, qntController.getItems);
router.get('/responses/:programId', authenticateToken, qntController.getProgramResponses);
router.get('/responses', authenticateToken, qntController.getAllResponses);
router.get('/summary/:areaId', authenticateToken, qntController.getAreaSummary);
router.get('/submitted/:userId/:programId', authenticateToken, qntController.getUserSubmittedAreas);
router.get('/completed/:programId', authenticateToken, qntController.completedAreas);
router.get('/progress/:programId', authenticateToken, qntController.areaProgress);
router.get('/missing/:programId/:areaId', authenticateToken, qntController.missingResponses);
router.get('/skipped-headers', authenticateToken, qntController.mostSkippedHeaders);
router.get('/user-programs/:userId', authenticateToken, qntController.programsFilledByUser);

// 🔐 فقط لرئيس القسم
router.post('/responses', authenticateToken, authorizeRole(['department']), qntController.submitResponses);
router.put('/responses/:id', authenticateToken, authorizeRole(['department']), qntController.updateResponse);
router.delete('/responses/:id', authenticateToken, authorizeRole(['department']), qntController.deleteResponse);

module.exports = router;
