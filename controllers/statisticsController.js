const statisticsModel = require('../models/statisticsModel');
const statisticsService = require('../services/statisticsService');

// Get Admin Statistics - Overview of entire system
const getAdminStatistics = async (req, res) => {
  try {
    const statistics = await statisticsModel.getAdminStatistics();
    
    res.status(200).json({
      success: true,
      message: 'Admin statistics retrieved successfully',
      data: statistics
    });
  } catch (error) {
    console.error('Error fetching admin statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admin statistics',
      error: error.message
    });
  }
};

// Get Authority Statistics - All entities under a specific authority
const getAuthorityStatistics = async (req, res) => {
  try {
    const { authorityId } = req.params;
    
    if (!authorityId) {
      return res.status(400).json({
        success: false,
        message: 'Authority ID is required'
      });
    }

    const statistics = await statisticsModel.getAuthorityStatistics(parseInt(authorityId));
    
    res.status(200).json({
      success: true,
      message: 'Authority statistics retrieved successfully',
      data: statistics
    });
  } catch (error) {
    console.error('Error fetching authority statistics:', error);
    
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to fetch authority statistics',
      error: error.message
    });
  }
};

// Get University Statistics - All entities under a specific university
const getUniversityStatistics = async (req, res) => {
  try {
    const { universityId } = req.params;
    
    if (!universityId) {
      return res.status(400).json({
        success: false,
        message: 'University ID is required'
      });
    }

    const statistics = await statisticsModel.getUniversityStatistics(parseInt(universityId));
    
    res.status(200).json({
      success: true,
      message: 'University statistics retrieved successfully',
      data: statistics
    });
  } catch (error) {
    console.error('Error fetching university statistics:', error);
    
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to fetch university statistics',
      error: error.message
    });
  }
};

// Get College Statistics - All entities under a specific college
const getCollegeStatistics = async (req, res) => {
  try {
    const { collegeId } = req.params;
    
    if (!collegeId) {
      return res.status(400).json({
        success: false,
        message: 'College ID is required'
      });
    }

    const statistics = await statisticsModel.getCollegeStatistics(parseInt(collegeId));
    
    res.status(200).json({
      success: true,
      message: 'College statistics retrieved successfully',
      data: statistics
    });
  } catch (error) {
    console.error('Error fetching college statistics:', error);
    
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to fetch college statistics',
      error: error.message
    });
  }
};

// Get Department Statistics - All entities under a specific department
const getDepartmentStatistics = async (req, res) => {
  try {
    const { departmentId } = req.params;
    
    if (!departmentId) {
      return res.status(400).json({
        success: false,
        message: 'Department ID is required'
      });
    }

    const statistics = await statisticsModel.getDepartmentStatistics(parseInt(departmentId));
    
    res.status(200).json({
      success: true,
      message: 'Department statistics retrieved successfully',
      data: statistics
    });
  } catch (error) {
    console.error('Error fetching department statistics:', error);
    
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to fetch department statistics',
      error: error.message
    });
  }
};

// Get Program Evaluation Statistics - Detailed evaluation metrics for a specific program
const getProgramEvaluationStatistics = async (req, res) => {
  try {
    const { programId } = req.params;
    
    if (!programId) {
      return res.status(400).json({
        success: false,
        message: 'Program ID is required'
      });
    }

    const statistics = await statisticsModel.getProgramEvaluationStatistics(parseInt(programId));
    
    res.status(200).json({
      success: true,
      message: 'Program evaluation statistics retrieved successfully',
      data: statistics
    });
  } catch (error) {
    console.error('Error fetching program evaluation statistics:', error);
    
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to fetch program evaluation statistics',
      error: error.message
    });
  }
};

// Get statistics based on user role and context
const getStatisticsForUser = async (req, res) => {
  try {
    const statistics = await statisticsService.getStatisticsForUserRole(req.user);
    
    res.status(200).json({
      success: true,
      message: `${req.user.role.charAt(0).toUpperCase() + req.user.role.slice(1)} statistics retrieved successfully`,
      data: statistics
    });
  } catch (error) {
    console.error('Error fetching user statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics for user',
      error: error.message
    });
  }
};

module.exports = {
  getAdminStatistics,
  getAuthorityStatistics,
  getUniversityStatistics,
  getCollegeStatistics,
  getDepartmentStatistics,
  getProgramEvaluationStatistics,
  getStatisticsForUser
};
