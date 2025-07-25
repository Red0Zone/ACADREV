const db = require("../config/db");
const { deleteMultipleFiles, getFullFilePath } = require("../utils/fileUtils");

// 1. جلب جميع المجالات (Domains)
const getAllDomains = async () => {
  const [rows] = await db.promise().query(`SELECT * FROM domains`);
  return rows;
};

// 2. جلب المؤشر
// المجال
const getIndicatorsByDomain = async (domainId) => {
  const [rows] = await db
    .promise()
    .query(`SELECT * FROM indicators WHERE domain = ?`, [domainId]);
  return rows;
};

// 3. جلب الردود الخاصة ببرنامج معين
const getResponsesByProgram = async (programId) => {
  const [rows] = await db
    .promise()
    .query(`SELECT * FROM qlt_responses WHERE program_id = ?`, [programId]);
  return rows;
};

// 4. إضافة أو تحديث رد نوعي
const saveOrUpdateResponse = async (data) => {
  const conn = db.promise();

  // جلب الجامعة/الكلية/القسم تلقائياً في حال لم يتم تمريرهم
  if (
    data.user_id &&
    (!data.university_id || !data.college_id || !data.department_id)
  ) {
    const [user] = await conn.query(
      "SELECT university_id, college_id, department_id FROM users WHERE id = ?",
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
        data.user_id,
      ]
    );
    return { inserted: true, id: result.insertId };
  }
};

// 5. المؤشرات غير المجاوب عليها لبرنامج
const getUnansweredIndicators = async (programId) => {
  const [rows] = await db.promise().query(
    `
    SELECT i.*, d.domain_ar FROM indicators i
    JOIN domains d ON i.domain = d.id
    WHERE i.id NOT IN (
      SELECT indicator_id FROM qlt_responses WHERE program_id = ?
    )
  `,
    [programId]
  );
  return rows;
};

// 6. ملخص الإجابة على المجالات
const getSummaryByDomain = async (programId) => {
  const [rows] = await db.promise().query(
    `
    SELECT d.id AS domain_id, d.domain_ar,
           COUNT(i.id) AS total_indicators,
           COUNT(r.id) AS filled
    FROM domains d
    LEFT JOIN indicators i ON i.domain = d.id
    LEFT JOIN qlt_responses r ON r.indicator_id = i.id AND r.program_id = ?
    GROUP BY d.id
  `,
    [programId]
  );
  return rows;
};

// 7. حذف رد نوعي
const deleteResponse = async (responseId) => {
  const conn = db.promise();

  try {
    // First, get all files associated with this response
    const [files] = await conn.query(
      `SELECT id, location, name FROM files WHERE response_id = ?`,
      [responseId]
    );

    // Prepare file paths for deletion
    const filePaths = files
      .filter((file) => file.location) // Only process files with valid locations
      .map((file) => getFullFilePath(file.location));

    // Delete physical files from the file system
    const fileResults = await deleteMultipleFiles(filePaths);

    // Delete file records from database
    const [fileDeleteResult] = await conn.query(
      `DELETE FROM files WHERE response_id = ?`,
      [responseId]
    );

    // Finally, delete the response itself
    const [responseDeleteResult] = await conn.query(
      `DELETE FROM qlt_responses WHERE id = ?`,
      [responseId]
    );

    // Log results
    console.log(`Response ${responseId} deleted successfully:`);
    console.log(`- Files deleted: ${fileResults.deleted.length}`);
    console.log(`- Files not found: ${fileResults.notFound.length}`);
    console.log(`- File deletion errors: ${fileResults.errors.length}`);

    return {
      success: true,
      deletedResponse: responseDeleteResult.affectedRows > 0,
      deletedFiles: {
        total: files.length,
        deleted: fileResults.deleted.length,
        notFound: fileResults.notFound.length,
        errors: fileResults.errors.length,
      },
      fileResults,
      result: responseDeleteResult,
    };
  } catch (error) {
    // Rollback transaction on error
    console.error("Error deleting response and associated files:", error);
    throw error;
  }
};

module.exports = {
  getAllDomains,
  getIndicatorsByDomain,
  getResponsesByProgram,
  saveOrUpdateResponse,
  getUnansweredIndicators,
  getSummaryByDomain,
  deleteResponse,
};
