const express = require('express');
const router = express.Router();
const qlt = require('../controllers/qualController');
const { uploadEvidence,getEvidence } = require('../controllers/evidenceController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

// عرض البيانات
router.get('/domains', authenticateToken, qlt.getDomains);
router.get('/indicators/:domainId', authenticateToken, qlt.getIndicators);
router.get('/responses/:programId', authenticateToken, qlt.getResponses);
router.get('/unanswered/:programId', authenticateToken, qlt.getUnanswered);
router.get('/summary/:programId', authenticateToken, qlt.getDomainSummary);

// التعديل للمقيّم
router.post('/responses', authenticateToken, authorizeRole(['department']), qlt.submitResponse);
router.delete('/responses/:id', authenticateToken, authorizeRole(['department']), qlt.removeResponse);

// رفع الأدلة
router.post('/responses/:responseId/evidence', authenticateToken, authorizeRole(['department']), uploadEvidence);
router.get('/responses/:responseId/evidence', authenticateToken, authorizeRole(['department']), getEvidence);
module.exports = router;
