const db = require('../config/db');

// جلب جميع التصنيفات (المجالات)
const getAllAreas = async () => {
  const [rows] = await db.promise().query(`SELECT * FROM qnt_areas`);
  return rows;
};

// جلب جميع المؤشرات المرتبطة بـ area معين
const getHeadersByArea = async (areaId) => {
  const [rows] = await db.promise().query(`SELECT * FROM qnt_headers WHERE num = ?`, [areaId]);
  return rows;
};

// جلب البنود الفرعية المرتبطة بـ area
const getItemsByArea = async (areaId) => {
  const [rows] = await db.promise().query(`SELECT * FROM qnt_items WHERE area_id = ?`, [areaId]);
  return rows;
};

// حفظ ردود التقييمات
const submitResponses = async (responses, programId, userId) => {
  const insertQuery = `
    INSERT INTO qnt_responses (header_id, item_id, program_id, user_id, value)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE value = VALUES(value)
  `;

  const conn = db.promise();
  for (const res of responses) {
    const itemId = res.item_id || null;
    await conn.query(insertQuery, [res.header_id, itemId, programId, userId, res.value]);
  }
};

// جلب الردود لبرنامج معيّن
const getResponsesByProgram = async (programId) => {
  const [rows] = await db.promise().query(`
    SELECT r.*, h.text AS header_text, i.name AS item_name
    FROM qnt_responses r
    LEFT JOIN qnt_headers h ON r.header_id = h.id
    LEFT JOIN qnt_items i ON r.item_id = i.id
    WHERE r.program_id = ?
  `, [programId]);
  return rows;
};

// تعديل قيمة واحدة
const updateResponseValue = async (id, value) => {
  const [result] = await db.promise().query(
    `UPDATE qnt_responses SET value = ? WHERE id = ?`,
    [value, id]
  );
  return result;
};

// حذف رد
const deleteResponse = async (id) => {
  await db.promise().query(`DELETE FROM qnt_responses WHERE id = ?`, [id]);
};

// qntModel.js
const getAllResponses = async () => {
    const [rows] = await db.promise().query(`
      SELECT r.*, h.text AS header_text, i.name AS item_name,
             a.text_ar AS area_name, p.name AS program_name, u.username AS user_name
      FROM qnt_responses r
      LEFT JOIN qnt_headers h ON r.header_id = h.id
      LEFT JOIN qnt_items i ON r.item_id = i.id
      LEFT JOIN qnt_areas a ON h.num = a.id
      LEFT JOIN programs p ON r.program_id = p.id
      LEFT JOIN users u ON r.user_id = u.id
    `);
    return rows;
  };
  
  // qntModel.js
const getAreaSummary = async (areaId) => {
    const [rows] = await db.promise().query(`
      SELECT h.text AS header, i.name AS item, AVG(r.value) AS avg_value
      FROM qnt_responses r
      JOIN qnt_headers h ON r.header_id = h.id
      LEFT JOIN qnt_items i ON r.item_id = i.id
      WHERE h.num = ?
      GROUP BY r.header_id, r.item_id
    `, [areaId]);
    return rows;
  };
  
// qntModel.js
const getUserSubmittedAreas = async (userId, programId) => {
    const [rows] = await db.promise().query(`
      SELECT DISTINCT h.num AS area_id
      FROM qnt_responses r
      JOIN qnt_headers h ON r.header_id = h.id
      WHERE r.user_id = ? AND r.program_id = ?
    `, [userId, programId]);
    return rows;
  };
  
  // 13. جميع المجالات المكتملة لبرنامج معين
const getCompletedAreasForProgram = async (programId) => {
    const [rows] = await db.promise().query(`
      SELECT a.id, a.text_ar, COUNT(DISTINCT h.id) AS total_headers,
             COUNT(DISTINCT r.header_id) AS filled_headers
      FROM qnt_areas a
      JOIN qnt_headers h ON h.num = a.id
      LEFT JOIN qnt_responses r ON r.header_id = h.id AND r.program_id = ?
      GROUP BY a.id, a.text_ar
      HAVING total_headers = filled_headers
    `, [programId]);
    return rows;
  };
  
  // 14. نسبة إنجاز كل مجال
  const getAreaProgress = async (programId) => {
    const [rows] = await db.promise().query(`
      SELECT a.id AS area_id, a.text_ar AS area_name,
             COUNT(DISTINCT h.id) AS total_headers,
             COUNT(DISTINCT r.header_id) AS filled_headers,
             ROUND(COUNT(DISTINCT r.header_id) / COUNT(DISTINCT h.id) * 100, 1) AS completion_percent
      FROM qnt_areas a
      JOIN qnt_headers h ON h.num = a.id
      LEFT JOIN qnt_responses r ON r.header_id = h.id AND r.program_id = ?
      GROUP BY a.id, a.text_ar
    `, [programId]);
    return rows;
  };
  
  // 15. المؤشرات الناقصة لبرنامج معين في مجال معين
  const getMissingResponses = async (programId, areaId) => {
    const [rows] = await db.promise().query(`
      SELECT h.id AS header_id, h.text
      FROM qnt_headers h
      WHERE h.num = ?
      AND h.id NOT IN (
        SELECT r.header_id FROM qnt_responses r WHERE r.program_id = ?
      )
    `, [areaId, programId]);
    return rows;
  };
  
  // 16. أكثر المؤشرات التي تم تخطيها
  const getMostSkippedHeaders = async () => {
    const [rows] = await db.promise().query(`
      SELECT h.id, h.text, COUNT(r.id) AS filled_count
      FROM qnt_headers h
      LEFT JOIN qnt_responses r ON r.header_id = h.id
      GROUP BY h.id
      ORDER BY filled_count ASC
      LIMIT 10
    `);
    return rows;
  };
  
  // 17. البرامج التي قام المستخدم بتقييمها
  const getDistinctProgramsFilledByUser = async (userId) => {
    const [rows] = await db.promise().query(`
      SELECT DISTINCT p.id, p.name
      FROM qnt_responses r
      JOIN programs p ON r.program_id = p.id
      WHERE r.user_id = ?
    `, [userId]);
    return rows;
  };

module.exports = {
  getAllAreas,
  getHeadersByArea,
  getItemsByArea,
  submitResponses,
  getResponsesByProgram,
  updateResponseValue,
  deleteResponse,
  getAllResponses,
  getAreaSummary,
  getUserSubmittedAreas,
  getCompletedAreasForProgram,
  getAreaProgress,
  getMissingResponses,
  getMostSkippedHeaders,
  getDistinctProgramsFilledByUser
};
