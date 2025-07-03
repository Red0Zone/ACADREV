const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');
const db = require('../config/db'); // Import the database connection from your config

// ➕ الكلية تضيف قسم
router.post(
  '/add',
  authenticateToken,
  authorizeRole(['college']),
  departmentController.addDepartment
);
// الكلية تحذف قسم تابع لها
router.delete('/delete/:id', authenticateToken, authorizeRole(['college']), departmentController.deleteDepartment);

// 📋 عرض كل الأقسام (لـ الجميع ما عدا القسم نفسه)
router.get(
  '/all',
  authenticateToken,
  authorizeRole(['admin', 'authority', 'university', 'college']),
  departmentController.getAllDepartments
);

// 👁️ القسم يعرض بياناته فقط
router.get(
  '/me',
  authenticateToken,
  authorizeRole(['department']),
  departmentController.getMyDepartment
);

// ✏️ القسم يعدل بياناته
router.put(
  '/update',
  authenticateToken, 
  authorizeRole(['department']),
  departmentController.updateDepartment
);

router.get('/getDepName/:college_id/',
  authenticateToken,
  authorizeRole(['admin', 'authority', 'university', 'college']),
  departmentController.getDepartmenNameByCollegeId
);


router.get('/query',
  authenticateToken,
  authorizeRole(['admin', 'authority', 'university', 'college']),
  departmentController.getAllDepartments
);

module.exports = router;
