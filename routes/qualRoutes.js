const express = require('express');
const router = express.Router();
const qlt = require('../controllers/qualController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

// الجميع يمكنهم الاطلاع
router.get('/domains', authenticateToken, qlt.getDomains);
router.get('/indicators/:domainId', authenticateToken, qlt.getIndicators);
router.get('/responses/:programId', authenticateToken, qlt.getResponses);
router.get('/unanswered/:programId', authenticateToken, qlt.getUnanswered);
router.get('/summary/:programId', authenticateToken, qlt.getDomainSummary);

// فقط رئيس القسم يستطيع التعديل
router.post('/responses', authenticateToken, authorizeRole(['department']), qlt.submitResponse);
router.delete('/responses/:id', authenticateToken, authorizeRole(['department']), qlt.removeResponse);

module.exports = router;
