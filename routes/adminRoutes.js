const express = require('express');
const router = express.Router();
const {
  getUniversitiesCount,
  getCollegesCount,
  getDepartmentsCount,
  getProgramsCount
} = require('../controllers/adminController');

const { authenticateToken } = require('../middlewares/authMiddleware');

// فقط للأدمن
router.get('/universities-count', authenticateToken, getUniversitiesCount);
router.get('/colleges-count', authenticateToken, getCollegesCount);
router.get('/departments-count', authenticateToken, getDepartmentsCount);
router.get('/programs-count', authenticateToken, getProgramsCount);

module.exports = router;
