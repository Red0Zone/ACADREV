const express = require("express");
const router = express.Router();
const statisticsController = require("../controllers/statisticsController");
const {
  authenticateToken,
  authorizeRole,
} = require("../middlewares/authMiddleware");

// Admin Statistics Routes
// GET /api/statistics/admin - Get complete system overview (admin only)
router.get(
  "/admin",
  authenticateToken,
  authorizeRole(["admin"]),
  statisticsController.getAdminStatistics
);

// Authority Statistics Routes
// GET /api/statistics/authority/:authorityId - Get authority and all its entities
router.get(
  "/authority/:authorityId",
  authenticateToken,
  authorizeRole(["admin", "authority"]),
  (req, res, next) => {
    const { role, authority_id } = req.user;
    const requestedAuthorityId = parseInt(req.params.authorityId);

    // Admin can access any authority, authority users can only access their own
    if (
      role !== "admin" &&
      (role !== "authority" || authority_id !== requestedAuthorityId)
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. You can only access your own authority statistics.",
      });
    }
    next();
  },
  statisticsController.getAuthorityStatistics
);

// University Statistics Routes
// GET /api/statistics/university/:universityId - Get university and all its entities
router.get(
  "/university/:universityId",
  authenticateToken,
  authorizeRole(["admin", "authority", "university"]),
  (req, res, next) => {
    const { role, university_id } = req.user;
    const requestedUniversityId = parseInt(req.params.universityId);
    if (role === "admin") {
      next();
    } else if (role === "authority") {
      // Check if university belongs to user's authority (this would need additional validation)
      next();
    } else if (
      role === "university" &&
      university_id === requestedUniversityId
    ) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. You can only access your own university statistics.",
      });
    }
  },
  statisticsController.getUniversityStatistics
);

router.get(
  "/college/:collegeId",
  authenticateToken,
  authorizeRole(["admin", "authority", "university", "college"]),
  (req, res, next) => {
    const { role, college_id } = req.user;
    const requestedCollegeId = parseInt(req.params.collegeId);

    if (role === "admin" || role === "authority" || role === "university") {
      next();
    } else if (role === "college" && college_id === requestedCollegeId) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. You can only access your own college statistics.",
      });
    }
  },
  statisticsController.getCollegeStatistics
);

router.get(
  "/department/:departmentId",
  authenticateToken,
  authorizeRole(["admin", "authority", "university", "college", "department"]),
  (req, res, next) => {
    const { role, department_id } = req.user;
    const requestedDepartmentId = parseInt(req.params.departmentId);

    if (
      role === "admin" ||
      role === "authority" ||
      role === "university" ||
      role === "college"
    ) {
      next();
    } else if (
      role === "department" &&
      department_id === requestedDepartmentId
    ) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. You can only access your own department statistics.",
      });
    }
  },
  statisticsController.getDepartmentStatistics
);

// Program Evaluation Statistics Routes
// GET /api/statistics/program/:programId - Get detailed evaluation statistics for a program
router.get(
  "/program/:programId",
  authenticateToken,
  authorizeRole(["admin", "authority", "university", "college", "department"]),
  statisticsController.getProgramEvaluationStatistics
);

// Additional convenience routes for specific user contexts
// GET /api/statistics/dashboard - Get dashboard statistics for current user
router.get(
  "/dashboard",
  authenticateToken,
  authorizeRole(["admin", "authority", "university", "college", "department"]),
  statisticsController.getStatisticsForUser
);

module.exports = router;
