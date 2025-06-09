const db = require('../config/db');

// 1. جلب جميع المجالات (Domains)
const getAllDomains = async () => {
  const [rows] = await db.promise().query(`SELECT * FROM domanis`);
  return rows;
};

// 2. جلب المؤشر
// المجال
const getIndicatorsByDomain = async (domainId) => {
  const [rows] = await db.promise().query(
    `SELECT * FROM indicators WHERE domain = ?`, [domainId]
  );
  return rows;
};

// 3. جلب الردود الخاصة ببرنامج معين
const getResponsesByProgram = async (programId) => {
  const [rows] = await db.promise().query(
    `SELECT * FROM qlt_responses WHERE program_id = ?`, [programId]
  );
  return rows;
};

// 4. إضافة أو تحديث رد نوعي
const saveOrUpdateResponse = async (data) => {
  const conn = db.promise();

  // جلب الجامعة/الكلية/القسم تلقائياً في حال لم يتم تمريرهم
  if (data.user_id && (!data.university_id || !data.college_id || !data.department_id)) {
    const [user] = await conn.query(
      'SELECT university_id, college_id, department_id FROM users WHERE id = ?',
      [data.user_id]
    );

    if (user.length > 0) {
      data.university_id = user[0].university_id;
      data.college_id = user[0].college_id;
      data.department_id = user[0].department_id;
    }
  }

  // تحقق مما إذا كان الرد موجوداً بالفعل
  const [existing] = await conn.query(
    `SELECT id FROM qlt_responses WHERE indicator_id = ? AND program_id = ? AND user_id = ?`,
    [data.indicator_id, data.program_id, data.user_id]
  );

  if (existing.length > 0) {
    await conn.query(
      `UPDATE qlt_responses
       SET response = ?, comment = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [data.response, data.comment || null, existing[0].id]
    );
    return { updated: true, id: existing[0].id };
  } else {
    const [result] = await conn.query(
      `INSERT INTO qlt_responses
       (indicator_id, domain_id, program_id, university_id, college_id, department_id, response, comment, user_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.indicator_id,
        data.domain_id,
        data.program_id,
        data.university_id,
        data.college_id,
        data.department_id,
        data.response,
        data.comment || null,
        data.user_id
      ]
    );
    return { inserted: true, id: result.insertId };
  }
};

// 5. المؤشرات غير المجاوب عليها لبرنامج
const getUnansweredIndicators = async (programId) => {
  const [rows] = await db.promise().query(`
    SELECT i.*, d.domain_ar FROM indicators i
    JOIN domanis d ON i.domain = d.id
    WHERE i.id NOT IN (
      SELECT indicator_id FROM qlt_responses WHERE program_id = ?
    )
  `, [programId]);
  return rows;
};

// 6. ملخص الإجابة على المجالات
const getSummaryByDomain = async (programId) => {
  const [rows] = await db.promise().query(`
    SELECT d.id AS domain_id, d.domain_ar,
           COUNT(i.id) AS total_indicators,
           COUNT(r.id) AS filled
    FROM domanis d
    LEFT JOIN indicators i ON i.domain = d.id
    LEFT JOIN qlt_responses r ON r.indicator_id = i.id AND r.program_id = ?
    GROUP BY d.id
  `, [programId]);
  return rows;
};

// 7. حذف رد نوعي
const deleteResponse = async (responseId) => {
  const [result] = await db.promise().query(
    `DELETE FROM qlt_responses WHERE id = ?`,
    [responseId]
  );
  return result;
};

module.exports = {
  getAllDomains,
  getIndicatorsByDomain,
  getResponsesByProgram,
  saveOrUpdateResponse,
  getUnansweredIndicators,
  getSummaryByDomain,
  deleteResponse
};
