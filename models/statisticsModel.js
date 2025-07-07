const db = require("../config/db");

// Admin Statistics - Overview of all entities in the system
const getAdminStatistics = async () => {
  try {
    const [authoritiesCount] = await db
      .promise()
      .query("SELECT COUNT(*) as count FROM authorities");
    const [universitiesCount] = await db
      .promise()
      .query("SELECT COUNT(*) as count FROM universities");
    const [collegesCount] = await db
      .promise()
      .query("SELECT COUNT(*) as count FROM colleges");
    const [departmentsCount] = await db
      .promise()
      .query("SELECT COUNT(*) as count FROM departments");
    const [programsCount] = await db
      .promise()
      .query("SELECT COUNT(*) as count FROM programs");
    const [usersCount] = await db
      .promise()
      .query("SELECT COUNT(*) as count FROM users");

    return {
      counts: {
        authorities: authoritiesCount[0].count,
        universities: universitiesCount[0].count,
        colleges: collegesCount[0].count,
        departments: departmentsCount[0].count,
        programs: programsCount[0].count,
        users: usersCount[0].count,
      },
    };
  } catch (error) {
    throw new Error(`Failed to fetch admin statistics: ${error.message}`);
  }
};

// Authority Statistics - All entities under a specific authority
const getAuthorityStatistics = async (authorityId) => {
  try {
    // Authority basic info
    const [authorityInfo] = await db
      .promise()
      .query(`SELECT id, name FROM authorities WHERE id = ?`, [authorityId]);

    if (authorityInfo.length === 0) {
      throw new Error("Authority not found");
    }

    // Count entities under this authority
    const [counts] = await db.promise().query(
      `
      SELECT 
        COUNT(DISTINCT u.id) as universities,
        COUNT(DISTINCT c.id) as colleges,
        COUNT(DISTINCT d.id) as departments,
        COUNT(DISTINCT p.id) as programs
      FROM universities u
      LEFT JOIN colleges c ON u.id = c.university_id
      LEFT JOIN departments d ON c.id = d.college_id
      LEFT JOIN programs p ON d.id = p.dep
      WHERE u.authority_id = ?
    `,
      [authorityId]
    );

    // Structure the hierarchical data

    return {
      authority: authorityInfo[0],
      counts: {
        universities: counts[0].universities,
        colleges: counts[0].colleges,
        departments: counts[0].departments,
        programs: counts[0].programs,
      },
    };
  } catch (error) {
    throw new Error(`Failed to fetch authority statistics: ${error.message}`);
  }
};

// University Statistics - All entities under a specific university
const getUniversityStatistics = async (universityId) => {
  try {
    // University basic info
    const [universityInfo] = await db
      .promise()
      .query(`SELECT id, name FROM universities WHERE id = ?`, [universityId]);

    if (universityInfo.length === 0) {
      throw new Error("University not found");
    }

    // Count entities under this university
    const [counts] = await db.promise().query(
      `
      SELECT 
        COUNT(DISTINCT c.id) as colleges,
        COUNT(DISTINCT d.id) as departments,
        COUNT(DISTINCT p.id) as programs
      FROM colleges c
      LEFT JOIN departments d ON c.id = d.college_id
      LEFT JOIN programs p ON d.id = p.dep
      WHERE c.university_id = ?
    `,
      [universityId]
    );

    return {
      university: universityInfo[0],
      counts: {
        colleges: counts[0].colleges,
        departments: counts[0].departments,
        programs: counts[0].programs,
      },
    };
  } catch (error) {
    throw new Error(`Failed to fetch university statistics: ${error.message}`);
  }
};

// College Statistics - All entities under a specific college
const getCollegeStatistics = async (collegeId) => {
  try {
    // College basic info
    const [collegeInfo] = await db
      .promise()
      .query(`SELECT id, name FROM colleges WHERE id = ?`, [collegeId]);

    if (collegeInfo.length === 0) {
      throw new Error("College not found");
    }

    // Count entities under this college
    const [counts] = await db.promise().query(
      `
      SELECT 
        COUNT(DISTINCT d.id) as departments,
        COUNT(DISTINCT p.id) as programs
      FROM departments d
      LEFT JOIN programs p ON d.id = p.dep
      WHERE d.college_id = ?
    `,
      [collegeId]
    );

    return {
      college: collegeInfo[0],
      counts: {
        departments: counts[0].departments,
        programs: counts[0].programs,
      },
    };
  } catch (error) {
    throw new Error(`Failed to fetch college statistics: ${error.message}`);
  }
};

// Department Statistics - All entities under a specific department
const getDepartmentStatistics = async (departmentId) => {
  try {
    // Department basic info
    const [departmentInfo] = await db
      .promise()
      .query(`SELECT id, name FROM departments WHERE id = ?`, [departmentId]);

    if (departmentInfo.length === 0) {
      throw new Error("Department not found");
    }

    // Count entities under this department
    const [counts] = await db.promise().query(
      `
      SELECT 
        COUNT(DISTINCT p.id) as programs
      FROM programs p
      WHERE p.dep = ?
    `,
      [departmentId]
    );

    return {
      department: departmentInfo[0],
      counts: {
        programs: counts[0].programs,
      },
    };
  } catch (error) {
    throw new Error(`Failed to fetch department statistics: ${error.message}`);
  }
};

module.exports = {
  getAdminStatistics,
  getAuthorityStatistics,
  getUniversityStatistics,
  getCollegeStatistics,
  getDepartmentStatistics,
  // Add other statistics functions here as needed
};
