const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');
const DepartmentService = require('../services/departmentService');
const db = require('../config/db'); // Import the database connection from your config

// ➕ الكلية تضيف قسم
router.post(
  '/add',
  authenticateToken,
  authorizeRole(['college']),
  departmentController.addDepartment
);

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

router.get('/getDepName/:id/',
  authenticateToken,
  authorizeRole(['admin', 'authority', 'university', 'college']),
  departmentController.getDepartmenNameByCollegeId
);

const departmentService = new DepartmentService(db); // Pass the db connection here

router.get('/query', async (req, res) => {
    try {
      console.log('Query parameters:', req.query);
        const filters = {
            page: req.query.page,
            perPage: req.query.perPage,
            university_id: req.query.university_id,
            college_id: req.query.college_id,
            search: req.query.search,
            sortBy: req.query.sort_by,
            sortOrder: req.query.sort_order
        };

        const result = await departmentService.getDepartments(filters);
        
        res.json({
            success: true,
            message: 'Departments retrieved successfully',
            ...result
        });
    } catch (error) {
        console.error('Failed to retrieve departments:', error); // Log the error server-side
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve departments',
            error: error.message
        });
    }
});

module.exports = router;
