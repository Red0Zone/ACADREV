const db = require('../config/db');

// Admin Statistics - Overview of all entities in the system
const getAdminStatistics = async () => {
  try {
    const [authoritiesCount] = await db.promise().query('SELECT COUNT(*) as count FROM authorities');
    const [universitiesCount] = await db.promise().query('SELECT COUNT(*) as count FROM universities');
    const [collegesCount] = await db.promise().query('SELECT COUNT(*) as count FROM colleges');
    const [departmentsCount] = await db.promise().query('SELECT COUNT(*) as count FROM departments');
    const [programsCount] = await db.promise().query('SELECT COUNT(*) as count FROM programs');
    const [usersCount] = await db.promise().query('SELECT COUNT(*) as count FROM users');
    const [responsesCount] = await db.promise().query('SELECT COUNT(*) as count FROM qlt_responses');

    // Users breakdown by role
    const [usersByRole] = await db.promise().query(`
      SELECT role, COUNT(*) as count 
      FROM users 
      GROUP BY role
    `);

    // Simple authorities list with basic info
    const [authorities] = await db.promise().query(`
      SELECT id, name FROM authorities ORDER BY name
    `);

    // Recent activity in last 30 days
    const [recentActivity] = await db.promise().query(`
      SELECT 
        COUNT(CASE WHEN DATE(created_at) >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) THEN 1 END) as programs_last_30_days,
        COUNT(CASE WHEN DATE(created_at) >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) THEN 1 END) as users_last_30_days,
        COUNT(CASE WHEN DATE(created_at) >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) THEN 1 END) as responses_last_30_days
      FROM (
        SELECT created_at FROM programs WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        UNION ALL
        SELECT created_at FROM users WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        UNION ALL
        SELECT created_at FROM qlt_responses WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
      ) as combined
    `);

    // Response value ranges for charts (0=Poor, 1=Good, 2=Excellent)
    const [responseRanges] = await db.promise().query(`
      SELECT 
        SUM(CASE WHEN response = '0' THEN 1 ELSE 0 END) as poor_responses,
        SUM(CASE WHEN response = '1' THEN 1 ELSE 0 END) as good_responses,
        SUM(CASE WHEN response = '2' THEN 1 ELSE 0 END) as excellent_responses,
        COUNT(*) as total_responses
      FROM qlt_responses 
      WHERE response IN ('0', '1', '2')
    `);

    return {
      counts: {
        authorities: authoritiesCount[0].count,
        universities: universitiesCount[0].count,
        colleges: collegesCount[0].count,
        departments: departmentsCount[0].count,
        programs: programsCount[0].count,
        users: usersCount[0].count,
        responses: responsesCount[0].count
      },
      usersByRole: usersByRole.reduce((acc, curr) => {
        acc[curr.role] = curr.count;
        return acc;
      }, {}),
      recentActivity: {
        programs_last_30_days: recentActivity[0].programs_last_30_days,
        users_last_30_days: recentActivity[0].users_last_30_days,
        responses_last_30_days: recentActivity[0].responses_last_30_days
      },
      responseRanges: {
        poor: responseRanges[0].poor_responses,
        good: responseRanges[0].good_responses,
        excellent: responseRanges[0].excellent_responses,
        total: responseRanges[0].total_responses
      },
      authorities
    };
  } catch (error) {
    throw new Error(`Failed to fetch admin statistics: ${error.message}`);
  }
};

// Authority Statistics - All entities under a specific authority
const getAuthorityStatistics = async (authorityId) => {
  try {
    // Authority basic info
    const [authorityInfo] = await db.promise().query(`
      SELECT id, name FROM authorities WHERE id = ?
    `, [authorityId]);

    if (authorityInfo.length === 0) {
      throw new Error('Authority not found');
    }

    // Count entities under this authority
    const [counts] = await db.promise().query(`
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
    `, [authorityId]);

    // Universities list with basic info
    const [universities] = await db.promise().query(`
      SELECT id, name FROM universities WHERE authority_id = ? ORDER BY name
    `, [authorityId]);

    // Colleges list with basic info
    const [colleges] = await db.promise().query(`
      SELECT c.id, c.name, u.name as university_name
      FROM colleges c
      JOIN universities u ON c.university_id = u.id
      WHERE u.authority_id = ?
      ORDER BY u.name, c.name
    `, [authorityId]);

    // Departments list with basic info
    const [departments] = await db.promise().query(`
      SELECT d.id, d.name, c.name as college_name
      FROM departments d
      JOIN colleges c ON d.college_id = c.id
      JOIN universities u ON c.university_id = u.id
      WHERE u.authority_id = ?
      ORDER BY c.name, d.name
    `, [authorityId]);

    // Programs list with basic info
    const [programs] = await db.promise().query(`
      SELECT p.id, p.name, d.name as department_name
      FROM programs p
      JOIN departments d ON p.dep = d.id
      JOIN colleges c ON d.college_id = c.id
      JOIN universities u ON c.university_id = u.id
      WHERE u.authority_id = ?
      ORDER BY d.name, p.name
    `, [authorityId]);

    // Users count
    const [usersCount] = await db.promise().query(`
      SELECT COUNT(*) as count
      FROM users us
      LEFT JOIN universities u ON us.university_id = u.id
      WHERE us.authority_id = ? OR u.authority_id = ?
    `, [authorityId, authorityId]);

    // Recent activity in last 30 days for this authority
    const [recentActivity] = await db.promise().query(`
      SELECT 
        COUNT(CASE WHEN p.created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) THEN 1 END) as programs_last_30_days,
        COUNT(CASE WHEN us.created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) THEN 1 END) as users_last_30_days,
        COUNT(CASE WHEN qr.created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) THEN 1 END) as responses_last_30_days
      FROM universities u
      LEFT JOIN colleges c ON u.id = c.university_id
      LEFT JOIN departments d ON c.id = d.college_id
      LEFT JOIN programs p ON d.id = p.dep
      LEFT JOIN users us ON (us.authority_id = u.authority_id OR us.university_id = u.id)
      LEFT JOIN qlt_responses qr ON qr.program_id = p.id
      WHERE u.authority_id = ?
    `, [authorityId]);

    // Response value ranges for this authority
    const [responseRanges] = await db.promise().query(`
      SELECT 
        SUM(CASE WHEN qr.response = '0' THEN 1 ELSE 0 END) as poor_responses,
        SUM(CASE WHEN qr.response = '1' THEN 1 ELSE 0 END) as good_responses,
        SUM(CASE WHEN qr.response = '2' THEN 1 ELSE 0 END) as excellent_responses,
        COUNT(*) as total_responses
      FROM qlt_responses qr
      JOIN programs p ON qr.program_id = p.id
      JOIN departments d ON p.dep = d.id
      JOIN colleges c ON d.college_id = c.id
      JOIN universities u ON c.university_id = u.id
      WHERE u.authority_id = ? AND qr.response IN ('0', '1', '2')
    `, [authorityId]);

    return {
      authority: authorityInfo[0],
      counts: {
        universities: counts[0].universities,
        colleges: counts[0].colleges,
        departments: counts[0].departments,
        programs: counts[0].programs,
        users: usersCount[0].count
      },
      recentActivity: {
        programs_last_30_days: recentActivity[0].programs_last_30_days,
        users_last_30_days: recentActivity[0].users_last_30_days,
        responses_last_30_days: recentActivity[0].responses_last_30_days
      },
      responseRanges: {
        poor: responseRanges[0].poor_responses,
        good: responseRanges[0].good_responses,
        excellent: responseRanges[0].excellent_responses,
        total: responseRanges[0].total_responses
      },
      universities,
      colleges,
      departments,
      programs
    };
  } catch (error) {
    throw new Error(`Failed to fetch authority statistics: ${error.message}`);
  }
};

// University Statistics - All entities under a specific university
const getUniversityStatistics = async (universityId) => {
  try {
    // University basic info
    const [universityInfo] = await db.promise().query(`
      SELECT u.id, u.name, a.name as authority_name
      FROM universities u
      LEFT JOIN authorities a ON u.authority_id = a.id
      WHERE u.id = ?
    `, [universityId]);

    if (universityInfo.length === 0) {
      throw new Error('University not found');
    }

    // Count entities under this university
    const [counts] = await db.promise().query(`
      SELECT 
        COUNT(DISTINCT c.id) as colleges,
        COUNT(DISTINCT d.id) as departments,
        COUNT(DISTINCT p.id) as programs
      FROM colleges c
      LEFT JOIN departments d ON c.id = d.college_id
      LEFT JOIN programs p ON d.id = p.dep
      WHERE c.university_id = ?
    `, [universityId]);

    // Colleges list with basic info
    const [colleges] = await db.promise().query(`
      SELECT id, name FROM colleges WHERE university_id = ? ORDER BY name
    `, [universityId]);

    // Departments list with basic info
    const [departments] = await db.promise().query(`
      SELECT d.id, d.name, c.name as college_name
      FROM departments d
      JOIN colleges c ON d.college_id = c.id
      WHERE c.university_id = ?
      ORDER BY c.name, d.name
    `, [universityId]);

    // Programs list with basic info
    const [programs] = await db.promise().query(`
      SELECT p.id, p.name, d.name as department_name
      FROM programs p
      JOIN departments d ON p.dep = d.id
      JOIN colleges c ON d.college_id = c.id
      WHERE c.university_id = ?
      ORDER BY d.name, p.name
    `, [universityId]);

    // Users count
    const [usersCount] = await db.promise().query(`
      SELECT COUNT(*) as count FROM users WHERE university_id = ?
    `, [universityId]);

    // Responses count
    const [responsesCount] = await db.promise().query(`
      SELECT COUNT(*) as count
      FROM qlt_responses qr
      JOIN programs p ON qr.program_id = p.id
      JOIN departments d ON p.dep = d.id
      JOIN colleges c ON d.college_id = c.id
      WHERE c.university_id = ?
    `, [universityId]);

    // Recent activity in last 30 days for this university
    const [recentActivity] = await db.promise().query(`
      SELECT 
        COUNT(CASE WHEN p.created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) THEN 1 END) as programs_last_30_days,
        COUNT(CASE WHEN us.created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) THEN 1 END) as users_last_30_days,
        COUNT(CASE WHEN qr.created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) THEN 1 END) as responses_last_30_days
      FROM colleges c
      LEFT JOIN departments d ON c.id = d.college_id
      LEFT JOIN programs p ON d.id = p.dep
      LEFT JOIN users us ON us.university_id = c.university_id
      LEFT JOIN qlt_responses qr ON qr.program_id = p.id
      WHERE c.university_id = ?
    `, [universityId]);

    // Response value ranges for this university
    const [responseRanges] = await db.promise().query(`
      SELECT 
        SUM(CASE WHEN qr.response = '0' THEN 1 ELSE 0 END) as poor_responses,
        SUM(CASE WHEN qr.response = '1' THEN 1 ELSE 0 END) as good_responses,
        SUM(CASE WHEN qr.response = '2' THEN 1 ELSE 0 END) as excellent_responses,
        COUNT(*) as total_responses
      FROM qlt_responses qr
      JOIN programs p ON qr.program_id = p.id
      JOIN departments d ON p.dep = d.id
      JOIN colleges c ON d.college_id = c.id
      WHERE c.university_id = ? AND qr.response IN ('0', '1', '2')
    `, [universityId]);

    return {
      university: universityInfo[0],
      counts: {
        colleges: counts[0].colleges,
        departments: counts[0].departments,
        programs: counts[0].programs,
        users: usersCount[0].count,
        responses: responsesCount[0].count
      },
      recentActivity: {
        programs_last_30_days: recentActivity[0].programs_last_30_days,
        users_last_30_days: recentActivity[0].users_last_30_days,
        responses_last_30_days: recentActivity[0].responses_last_30_days
      },
      responseRanges: {
        poor: responseRanges[0].poor_responses,
        good: responseRanges[0].good_responses,
        excellent: responseRanges[0].excellent_responses,
        total: responseRanges[0].total_responses
      },
      colleges,
      departments,
      programs
    };
  } catch (error) {
    throw new Error(`Failed to fetch university statistics: ${error.message}`);
  }
};

// College Statistics - All entities under a specific college
const getCollegeStatistics = async (collegeId) => {
  try {
    // College basic info
    const [collegeInfo] = await db.promise().query(`
      SELECT c.id, c.name, u.name as university_name
      FROM colleges c
      JOIN universities u ON c.university_id = u.id
      WHERE c.id = ?
    `, [collegeId]);

    if (collegeInfo.length === 0) {
      throw new Error('College not found');
    }

    // Count entities under this college
    const [counts] = await db.promise().query(`
      SELECT 
        COUNT(DISTINCT d.id) as departments,
        COUNT(DISTINCT p.id) as programs
      FROM departments d
      LEFT JOIN programs p ON d.id = p.dep
      WHERE d.college_id = ?
    `, [collegeId]);

    // Departments list with basic info
    const [departments] = await db.promise().query(`
      SELECT id, name FROM departments WHERE college_id = ? ORDER BY name
    `, [collegeId]);

    // Programs list with basic info
    const [programs] = await db.promise().query(`
      SELECT p.id, p.name, d.name as department_name
      FROM programs p
      JOIN departments d ON p.dep = d.id
      WHERE d.college_id = ?
      ORDER BY d.name, p.name
    `, [collegeId]);

    // Users count
    const [usersCount] = await db.promise().query(`
      SELECT COUNT(*) as count FROM users WHERE college_id = ?
    `, [collegeId]);

    // Responses count
    const [responsesCount] = await db.promise().query(`
      SELECT COUNT(*) as count
      FROM qlt_responses qr
      JOIN programs p ON qr.program_id = p.id
      JOIN departments d ON p.dep = d.id
      WHERE d.college_id = ?
    `, [collegeId]);

    // Recent activity in last 30 days for this college
    const [recentActivity] = await db.promise().query(`
      SELECT 
        COUNT(CASE WHEN p.created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) THEN 1 END) as programs_last_30_days,
        COUNT(CASE WHEN us.created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) THEN 1 END) as users_last_30_days,
        COUNT(CASE WHEN qr.created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) THEN 1 END) as responses_last_30_days
      FROM departments d
      LEFT JOIN programs p ON d.id = p.dep
      LEFT JOIN users us ON us.college_id = d.college_id
      LEFT JOIN qlt_responses qr ON qr.program_id = p.id
      WHERE d.college_id = ?
    `, [collegeId]);

    // Response value ranges for this college
    const [responseRanges] = await db.promise().query(`
      SELECT 
        SUM(CASE WHEN qr.response = '0' THEN 1 ELSE 0 END) as poor_responses,
        SUM(CASE WHEN qr.response = '1' THEN 1 ELSE 0 END) as good_responses,
        SUM(CASE WHEN qr.response = '2' THEN 1 ELSE 0 END) as excellent_responses,
        COUNT(*) as total_responses
      FROM qlt_responses qr
      JOIN programs p ON qr.program_id = p.id
      JOIN departments d ON p.dep = d.id
      WHERE d.college_id = ? AND qr.response IN ('0', '1', '2')
    `, [collegeId]);

    return {
      college: collegeInfo[0],
      counts: {
        departments: counts[0].departments,
        programs: counts[0].programs,
        users: usersCount[0].count,
        responses: responsesCount[0].count
      },
      recentActivity: {
        programs_last_30_days: recentActivity[0].programs_last_30_days,
        users_last_30_days: recentActivity[0].users_last_30_days,
        responses_last_30_days: recentActivity[0].responses_last_30_days
      },
      responseRanges: {
        poor: responseRanges[0].poor_responses,
        good: responseRanges[0].good_responses,
        excellent: responseRanges[0].excellent_responses,
        total: responseRanges[0].total_responses
      },
      departments,
      programs
    };
  } catch (error) {
    throw new Error(`Failed to fetch college statistics: ${error.message}`);
  }
};

// Department Statistics - All entities under a specific department
const getDepartmentStatistics = async (departmentId) => {
  try {
    // Department basic info
    const [departmentInfo] = await db.promise().query(`
      SELECT 
        d.id, d.name, d.email, d.head_name, d.created_at,
        c.name as college_name,
        u.name as university_name,
        a.name as authority_name
      FROM departments d
      JOIN colleges c ON d.college_id = c.id
      JOIN universities u ON c.university_id = u.id
      LEFT JOIN authorities a ON u.authority_id = a.id
      WHERE d.id = ?
    `, [departmentId]);

    if (departmentInfo.length === 0) {
      throw new Error('Department not found');
    }

    // Programs under this department
    const [programs] = await db.promise().query(`
      SELECT 
        p.id,
        p.name,
        p.language,
        p.evaluator_name,
        p.evaluator_id,
        p.created_at
      FROM programs p
      WHERE p.dep = ?
      ORDER BY p.name
    `, [departmentId]);

    // Users under this department
    const [users] = await db.promise().query(`
      SELECT 
        us.id,
        us.username,
        us.email,
        us.role,
        us.is_active,
        us.created_at
      FROM users us
      WHERE us.department_id = ?
      ORDER BY us.role, us.username
    `, [departmentId]);

    // Detailed evaluation responses statistics for this department
    const [responsesStats] = await db.promise().query(`
      SELECT 
        COUNT(*) as total_responses,
        COUNT(DISTINCT qr.program_id) as programs_with_responses,
        COUNT(DISTINCT qr.domain_id) as domains_evaluated,
        AVG(CAST(qr.response AS UNSIGNED)) as average_score,
        SUM(CASE WHEN qr.response = '2' THEN 1 ELSE 0 END) as excellent_responses,
        SUM(CASE WHEN qr.response = '1' THEN 1 ELSE 0 END) as good_responses,
        SUM(CASE WHEN qr.response = '0' THEN 1 ELSE 0 END) as poor_responses
      FROM qlt_responses qr
      JOIN programs p ON qr.program_id = p.id
      WHERE p.dep = ? AND qr.response IN ('0', '1', '2')
    `, [departmentId]);

    // Responses by domain for this department
    const [responsesByDomain] = await db.promise().query(`
      SELECT 
        d.id as domain_id,
        d.domain_en as domain_name,
        COUNT(*) as responses_count,
        AVG(CAST(qr.response AS UNSIGNED)) as average_score
      FROM qlt_responses qr
      JOIN programs p ON qr.program_id = p.id
      JOIN domains d ON qr.domain_id = d.id
      WHERE p.dep = ? AND qr.response IN ('0', '1', '2')
      GROUP BY d.id, d.domain_en
      ORDER BY d.id
    `, [departmentId]);

    // Recent evaluation activity
    const [recentActivity] = await db.promise().query(`
      SELECT 
        qr.id,
        qr.response,
        qr.created_at,
        qr.updated_at,
        p.name as program_name,
        d.domain_en as domain_name,
        i.text_en as indicator_text
      FROM qlt_responses qr
      JOIN programs p ON qr.program_id = p.id
      JOIN domains d ON qr.domain_id = d.id
      JOIN indicators i ON qr.indicator_id = i.id
      WHERE p.dep = ?
      ORDER BY COALESCE(qr.updated_at, qr.created_at) DESC
      LIMIT 10
    `, [departmentId]);

    // Recent activity counts in last 30 days for this department
    const [recentActivityCounts] = await db.promise().query(`
      SELECT 
        COUNT(CASE WHEN p.created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) THEN 1 END) as programs_last_30_days,
        COUNT(CASE WHEN us.created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) THEN 1 END) as users_last_30_days,
        COUNT(CASE WHEN qr.created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) THEN 1 END) as responses_last_30_days
      FROM programs p
      LEFT JOIN users us ON us.department_id = p.dep
      LEFT JOIN qlt_responses qr ON qr.program_id = p.id
      WHERE p.dep = ?
    `, [departmentId]);

    // Response value ranges for this department
    const [responseRanges] = await db.promise().query(`
      SELECT 
        SUM(CASE WHEN qr.response = '0' THEN 1 ELSE 0 END) as poor_responses,
        SUM(CASE WHEN qr.response = '1' THEN 1 ELSE 0 END) as good_responses,
        SUM(CASE WHEN qr.response = '2' THEN 1 ELSE 0 END) as excellent_responses,
        COUNT(*) as total_responses
      FROM qlt_responses qr
      JOIN programs p ON qr.program_id = p.id
      WHERE p.dep = ? AND qr.response IN ('0', '1', '2')
    `, [departmentId]);

    return {
      department: departmentInfo[0],
      summary: {
        programs: programs.length,
        users: users.length,
        responses: responsesStats[0]
      },
      recentActivityCounts: {
        programs_last_30_days: recentActivityCounts[0].programs_last_30_days,
        users_last_30_days: recentActivityCounts[0].users_last_30_days,
        responses_last_30_days: recentActivityCounts[0].responses_last_30_days
      },
      responseRanges: {
        poor: responseRanges[0].poor_responses,
        good: responseRanges[0].good_responses,
        excellent: responseRanges[0].excellent_responses,
        total: responseRanges[0].total_responses
      },
      programs,
      users,
      responsesByDomain,
      recentActivity
    };
  } catch (error) {
    throw new Error(`Failed to fetch department statistics: ${error.message}`);
  }
};

// Get statistics by domain and indicators for a specific program
const getProgramEvaluationStatistics = async (programId) => {
  try {
    // Program basic info
    const [programInfo] = await db.promise().query(`
      SELECT 
        p.id, p.name, p.language, p.evaluator_name, p.created_at,
        d.name as department_name,
        c.name as college_name,
        u.name as university_name,
        a.name as authority_name
      FROM programs p
      JOIN departments d ON p.dep = d.id
      JOIN colleges c ON d.college_id = c.id
      JOIN universities u ON c.university_id = u.id
      LEFT JOIN authorities a ON u.authority_id = a.id
      WHERE p.id = ?
    `, [programId]);

    if (programInfo.length === 0) {
      throw new Error('Program not found');
    }

    // Evaluation statistics by domain
    const [domainStats] = await db.promise().query(`
      SELECT 
        d.id as domain_id,
        d.domain_en as domain_name,
        d.domain_ar as domain_name_ar,
        COUNT(*) as total_indicators,
        COUNT(qr.id) as answered_indicators,
        AVG(CASE WHEN qr.response IN ('0', '1', '2') THEN CAST(qr.response AS UNSIGNED) END) as average_score,
        SUM(CASE WHEN qr.response = '2' THEN 1 ELSE 0 END) as excellent_count,
        SUM(CASE WHEN qr.response = '1' THEN 1 ELSE 0 END) as good_count,
        SUM(CASE WHEN qr.response = '0' THEN 1 ELSE 0 END) as poor_count
      FROM domains d
      LEFT JOIN indicators i ON d.id = i.domain
      LEFT JOIN qlt_responses qr ON i.id = qr.indicator_id AND qr.program_id = ?
      GROUP BY d.id, d.domain_en, d.domain_ar
      ORDER BY d.id
    `, [programId]);

    // Overall program completion percentage
    const [completionStats] = await db.promise().query(`
      SELECT 
        COUNT(DISTINCT i.id) as total_indicators,
        COUNT(DISTINCT qr.indicator_id) as answered_indicators,
        (COUNT(DISTINCT qr.indicator_id) / COUNT(DISTINCT i.id)) * 100 as completion_percentage
      FROM indicators i
      LEFT JOIN qlt_responses qr ON i.id = qr.indicator_id AND qr.program_id = ?
    `, [programId]);

    // Recent activity in last 30 days for this program
    const [recentActivity] = await db.promise().query(`
      SELECT 
        COUNT(CASE WHEN qr.created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) THEN 1 END) as responses_last_30_days,
        COUNT(CASE WHEN qr.updated_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) THEN 1 END) as updates_last_30_days
      FROM qlt_responses qr
      WHERE qr.program_id = ?
    `, [programId]);

    // Response value ranges for this program
    const [responseRanges] = await db.promise().query(`
      SELECT 
        SUM(CASE WHEN response = '0' THEN 1 ELSE 0 END) as poor_responses,
        SUM(CASE WHEN response = '1' THEN 1 ELSE 0 END) as good_responses,
        SUM(CASE WHEN response = '2' THEN 1 ELSE 0 END) as excellent_responses,
        COUNT(*) as total_responses,
        AVG(CASE WHEN response IN ('0', '1', '2') THEN CAST(response AS UNSIGNED) END) as average_score
      FROM qlt_responses
      WHERE program_id = ? AND response IN ('0', '1', '2')
    `, [programId]);

    return {
      program: programInfo[0],
      completion: completionStats[0],
      recentActivity: {
        responses_last_30_days: recentActivity[0].responses_last_30_days,
        updates_last_30_days: recentActivity[0].updates_last_30_days
      },
      responseRanges: {
        poor: responseRanges[0].poor_responses,
        good: responseRanges[0].good_responses,
        excellent: responseRanges[0].excellent_responses,
        total: responseRanges[0].total_responses,
        average_score: responseRanges[0].average_score
      },
      domainStatistics: domainStats
    };
  } catch (error) {
    throw new Error(`Failed to fetch program evaluation statistics: ${error.message}`);
  }
};

module.exports = {
  getAdminStatistics,
  getAuthorityStatistics,
  getUniversityStatistics,
  getCollegeStatistics,
  getDepartmentStatistics,
  getProgramEvaluationStatistics
};
