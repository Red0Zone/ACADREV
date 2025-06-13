const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/qualitativeScoreController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// وزن كل مجال
router.get('/wi', authenticateToken, ctrl.getWi);

// درجة كل مجال حسب الردود
router.get('/si/:programId', authenticateToken, ctrl.getSi);

// الوزن × الدرجة لكل مجال + الدرجة الكلية
router.get('/wisi/:programId', authenticateToken, ctrl.getWiSi);

module.exports = router;
