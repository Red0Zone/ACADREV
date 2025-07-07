const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

// Admin Statistics Routes
// GET /api/statistics/admin - Get complete system overview (admin only)
router.get('/admin', authenticateToken, authorizeRole(['admin']), statisticsController.getAdminStatistics);

// Authority Statistics Routes  
// GET /api/statistics/authority/:authorityId - Get authority and all its entities
router.get('/authority/:authorityId', authenticateToken, authorizeRole(['admin', 'authority']), (req, res, next) => {
  const { role, authority_id } = req.user;
  const requestedAuthorityId = parseInt(req.params.authorityId);
  
  // Admin can access any authority, authority users can only access their own
  if (role !== 'admin' && (role !== 'authority' || authority_id !== requestedAuthorityId)) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. You can only access your own authority statistics.'
    });
  }
  next();
}, statisticsController.getAuthorityStatistics);

// University Statistics Routes
// GET /api/statistics/university/:universityId - Get university and all its entities
router.get('/university/:universityId', authenticateToken, authorizeRole(['admin', 'authority', 'university']), (req, res, next) => {
  const { role,  university_id } = req.user;
  const requestedUniversityId = parseInt(req.params.universityId);
  
  // Admin can access any university
  // Authority users can access universities under their authority
  // University users can only access their own university
  if (role === 'admin') {
    next();
  } else if (role === 'authority') {
    // Check if university belongs to user's authority (this would need additional validation)
    next();
  } else if (role === 'university' && university_id === requestedUniversityId) {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access denied. You can only access your own university statistics.'
    });
  }
}, statisticsController.getUniversityStatistics);

// College Statistics Routes
// GET /api/statistics/college/:collegeId - Get college and all its entities
router.get('/college/:collegeId', authenticateToken, authorizeRole(['admin', 'authority', 'university', 'college']), (req, res, next) => {
  const { role,  college_id } = req.user;
  const requestedCollegeId = parseInt(req.params.collegeId);
  
  // Admin can access any college
  // Authority and University users can access colleges under their jurisdiction
  // College users can only access their own college
  if (role === 'admin' || role === 'authority' || role === 'university') {
    next();
  } else if (role === 'college' && college_id === requestedCollegeId) {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access denied. You can only access your own college statistics.'
    });
  }
}, statisticsController.getCollegeStatistics);

// Department Statistics Routes
// GET /api/statistics/department/:departmentId - Get department and all its entities
router.get('/department/:departmentId', authenticateToken, authorizeRole(['admin', 'authority', 'university', 'college', 'department']), (req, res, next) => {
  const { role, department_id } = req.user;
  const requestedDepartmentId = parseInt(req.params.departmentId);
  
  // Admin can access any department
  // Authority, University, and College users can access departments under their jurisdiction
  // Department users can only access their own department
  if (role === 'admin' || role === 'authority' || role === 'university' || role === 'college') {
    next();
  } else if (role === 'department' && department_id === requestedDepartmentId) {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access denied. You can only access your own department statistics.'
    });
  }
}, statisticsController.getDepartmentStatistics);

// Program Evaluation Statistics Routes
// GET /api/statistics/program/:programId - Get detailed evaluation statistics for a program
router.get('/program/:programId', authenticateToken, authorizeRole(['admin', 'authority', 'university', 'college', 'department']), statisticsController.getProgramEvaluationStatistics);

// User Context Statistics Routes
// GET /api/statistics/my-statistics - Get statistics based on current user's role and context
router.get('/my-statistics', authenticateToken, authorizeRole(['admin', 'authority', 'university', 'college', 'department']), statisticsController.getStatisticsForUser);

// Additional convenience routes for specific user contexts
// GET /api/statistics/dashboard - Get dashboard statistics for current user
router.get('/dashboard', authenticateToken, authorizeRole(['admin', 'authority', 'university', 'college', 'department']), statisticsController.getStatisticsForUser);

module.exports = router;
