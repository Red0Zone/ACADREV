const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

// ➕ القسم يضيف برنامج
router.post(
  '/add',
  authenticateToken,
  authorizeRole(['department']),
  programController.addProgram
);

// القسم يحذف برنامج
router.delete('/delete/:id', authenticateToken, authorizeRole(['department']), programController.deleteProgram);


// 📋 عرض جميع البرامج (لـ admin, authority, university, college, department)
router.get(
  '/all',
  authenticateToken,
  authorizeRole(['admin', 'authority', 'university', 'college', 'department']),
  programController.getAllPrograms
);

// ✏️ تعديل برنامج (من قبل القسم)
router.put(
  '/update/:id',
  authenticateToken,
  authorizeRole(['department']),
  programController.updateProgram
);

router.get('/query',
  authenticateToken,
  authorizeRole(['admin', 'authority', 'university', 'college','department']),
  programController.getAllPrograms
);

router.get('/getProgName/:Department_id',
  authenticateToken,
  authorizeRole(['admin', 'authority', 'university', 'college']),
  programController.getProgramNameByDepartmentId
);

router.get(
  '/:id',
  authenticateToken,
  authorizeRole(['admin', 'authority', 'university', 'college', 'department']),
  programController.getProgramById
);




module.exports = router;
