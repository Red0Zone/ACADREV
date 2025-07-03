const express = require('express');
const router = express.Router();
const collegeController = require('../controllers/collegeController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

// جامعة تضيف كلية
router.post('/add', authenticateToken, authorizeRole(['university']), collegeController.addCollege);
router.delete('/delete/:id', authenticateToken, authorizeRole(['university']), collegeController.deleteCollege);

// عرض كل الكليات
router.get('/all', authenticateToken, authorizeRole(['admin', 'authority', 'university']), collegeController.getAllColleges);

// الكلية تعرض نفسها
router.get('/me', authenticateToken, authorizeRole(['college','department']), collegeController.getMyCollege);

// تعديل بيانات الكلية
router.put('/update', authenticateToken, authorizeRole(['college']), collegeController.updateCollege);

router.get('/uniAll', authenticateToken, authorizeRole(['university']), collegeController.getCollegesByUniversity);
// جلب أسماء وIDs الكليات التابعة لجامعة معينة
router.get('/getNamesByUni/:university_id', authenticateToken, authorizeRole(['admin', 'authority', 'university']), collegeController.getCollegeNameAndIdByUniversityId);
module.exports = router;
