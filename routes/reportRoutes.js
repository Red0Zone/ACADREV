const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

// جلب المتطلبات لمجال محدد (للعرض في التقرير)
router.get('/prompts/:domainId', authenticateToken, reportController.getPrompts);

// جلب الردود الخاصة ببرنامج (عرضها للإدارة أو المقيم)
router.get('/results/:programId', authenticateToken, reportController.getResults);

// حفظ تقرير جديد أو تعديله (للمقيم فقط)
router.post('/save', authenticateToken, authorizeRole(['department']), reportController.saveReport);

module.exports = router;
