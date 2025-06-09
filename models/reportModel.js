const db = require('../config/db');

// جلب المتطلبات (الأسئلة) من جدول report لمجال معين
const getPromptsByDomain = async (domainId) => {
  const [rows] = await db.promise().query(
    `SELECT * FROM report WHERE dom = ? ORDER BY id`, [domainId]
  );
  return rows;
};

// جلب الردود المدخلة لتقارير برنامج معين
const getResultsByProgram = async (programId) => {
  const [rows] = await db.promise().query(
    `SELECT * FROM report_result WHERE program = ? ORDER BY ind`, [programId]
  );
  return rows;
};

// حفظ أو تعديل الرد
const saveOrUpdateReport = async (data) => {
  const [existing] = await db.promise().query(
    `SELECT id FROM report_result WHERE ind = ? AND program = ?`,
    [data.ind, data.program]
  );

  if (existing.length > 0) {
    await db.promise().query(
      `UPDATE report_result
       SET result = ?, weak = ?, improve_weak = ?, power = ?, improve_power = ?
       WHERE id = ?`,
      [
        data.result,
        data.weak,
        data.improve_weak,
        data.power,
        data.improve_power,
        existing[0].id
      ]
    );
    return { updated: true };
  } else {
    const [inserted] = await db.promise().query(
      `INSERT INTO report_result
       (ind, domain, program, result, weak, improve_weak, power, improve_power)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.ind,
        data.domain,
        data.program,
        data.result,
        data.weak,
        data.improve_weak,
        data.power,
        data.improve_power
      ]
    );
    return { inserted: true, id: inserted.insertId };
  }
};

module.exports = {
  getPromptsByDomain,
  getResultsByProgram,
  saveOrUpdateReport
};
