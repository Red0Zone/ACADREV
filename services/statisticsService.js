const statisticsModel = require("../models/statisticsModel");

// Validate and get statistics for different user roles
const getStatisticsForUserRole = async (user) => {
  const { role, authority_id, university_id, college_id, department_id } = user;

  switch (role) {
    case "admin":
      return await statisticsModel.getAdminStatistics();

    case "authority":
      if (!authority_id) {
        throw new Error("Authority ID is required for authority users");
      }
      return await statisticsModel.getAuthorityStatistics(authority_id);

    case "university":
      if (!university_id) {
        throw new Error("University ID is required for university users");
      }
      return await statisticsModel.getUniversityStatistics(university_id);

    case "college":
      if (!college_id) {
        throw new Error("College ID is required for college users");
      }
      return await statisticsModel.getCollegeStatistics(college_id);

    case "department":
      if (!department_id) {
        throw new Error("Department ID is required for department users");
      }
      return await statisticsModel.getDepartmentStatistics(department_id);

    default:
      throw new Error("Invalid user role");
  }
};

// Check if user has permission to access specific entity statistics
const checkEntityAccess = (user, entityType, entityId) => {
  const { role, authority_id, university_id, college_id, department_id } = user;

  // Admin has access to everything
  if (role === "admin") {
    return true;
  }

  switch (entityType) {
    case "authority":
      return role === "authority" && authority_id === entityId;

    case "university":
      // Authority users can access universities under their authority (additional DB check needed)
      // University users can only access their own university
      return (
        role === "authority" ||
        (role === "university" && university_id === entityId)
      );

    case "college":
      // Authority, university, and college users can access colleges under their jurisdiction
      return (
        role === "authority" ||
        role === "university" ||
        (role === "college" && college_id === entityId)
      );

    case "department":
      // All higher-level users can access departments under their jurisdiction
      return (
        role === "authority" ||
        role === "university" ||
        role === "college" ||
        (role === "department" && department_id === entityId)
      );

    default:
      return false;
  }
};

// Get comprehensive dashboard data based on user role
const getDashboardData = async (user) => {
  const statistics = await getStatisticsForUserRole(user);

  // Add additional dashboard-specific formatting or calculations here
  const dashboardData = {
    ...statistics,
    lastUpdated: new Date().toISOString(),
    userRole: user.role,
  };

  return dashboardData;
};

// Format statistics for export (JSON only)
const formatStatisticsForExport = (statistics) => {
  return statistics;
};

// Validate statistics parameters
const validateStatisticsParams = (params) => {
  const { entityType, entityId } = params;

  if (entityId && isNaN(parseInt(entityId))) {
    throw new Error("Entity ID must be a valid number");
  }

  const validEntityTypes = [
    "authority",
    "university",
    "college",
    "department",
    "program",
  ];
  if (entityType && !validEntityTypes.includes(entityType)) {
    throw new Error(
      `Invalid entity type. Must be one of: ${validEntityTypes.join(", ")}`
    );
  }

  return true;
};

module.exports = {
  getStatisticsForUserRole,
  checkEntityAccess,
  getDashboardData,
  formatStatisticsForExport,
  validateStatisticsParams,
};
