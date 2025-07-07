const db = require('../config/db');
const { get } = require('../routes/universityRoutes');

// إنشاء جامعة جديدة
const createUniversity = async (data) => {
  const { name, email, website, address, logo, authority_id, head_name, phone, tax } = data;

  const [result] = await db.promise().query(
    `INSERT INTO universities 
      (name, email, website, address, logo, authority_id, head_name, phone, tax)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, email, website, address, logo, authority_id, head_name, phone, tax]
  );

  return result.insertId;
};


// جلب جميع الجامعات
const getAllUniversities = async () => {
  const [rows] = await db.promise().query(
    `SELECT u.*, a.name AS authority_name
     FROM universities u
     LEFT JOIN authorities a ON u.authority_id = a.id`
  );
  return rows;
};

// جلب جامعة حسب ID
const getUniversityById = async (id) => {
  const [rows] = await db.promise().query('SELECT * FROM universities WHERE id = ?', [id]);
  return rows[0];
};

// تعديل بيانات جامعة
const updateUniversity = async (id, data) => {
  const { email, website, address, logo, head_name, phone, tax } = data;

  const [result] = await db.promise().query(
    `UPDATE universities 
     SET email = ?, website = ?, address = ?, logo = ?, head_name = ?, phone = ?, tax = ?
     WHERE id = ?`,
    [email, website, address, logo, head_name, phone, tax, id]
  );

  return result;
};

// حذف جامعة (اختياري)
const deleteUniversity = async (id) => {
  const [result] = await db.promise().query('DELETE FROM universities WHERE id = ?', [id]);
  return result;
};

const getUniversityNamesAndIds = async () => {
  const [rows] = await db.promise().query('SELECT id, name FROM universities');
  return rows;
}

const getUniversityByCollegeId = async (collegeId) => {
  const [rows] = await db.promise().query(
    `SELECT u.* FROM universities u
     JOIN colleges c ON u.id = c.university_id
     WHERE c.id = ?`, [collegeId]
  );
  return rows[0];
};

const getUniversityByDepartmentId = async (departmentId) => {
  const [rows] = await db.promise().query(
    `SELECT u.* 
     FROM universities u
     JOIN colleges c ON u.id = c.university_id
     JOIN departments d ON c.id = d.college_id 
     WHERE d.id = ?`, [departmentId]
  );
  return rows[0];
};

const getUniversityByName = async (name) => {
  const [rows] = await db.promise().query(
    'SELECT * FROM universities WHERE name = ?',
    [name]
  );
  return rows[0];
};

module.exports = {
  createUniversity,
  getAllUniversities,
  getUniversityById,
  updateUniversity,
  deleteUniversity,
  getUniversityNamesAndIds,
  getUniversityByCollegeId,
  getUniversityByDepartmentId,
  getUniversityByName
};
