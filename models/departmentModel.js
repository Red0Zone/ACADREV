const db = require('../config/db');

// إنشاء قسم جديد
const createDepartment = async (data) => {
  const { name, email, website, address, logo, college_id, head_name } = data;
  const [result] = await db.promise().query(
    `INSERT INTO departments (name, email, website, address, logo, college_id, head_name)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, email, website, address, logo, college_id, head_name]
  );
  return result.insertId;
};

//For Delete
const deleteDepartment = async (id) => {
  const [result] = await db.promise().query(
    'DELETE FROM departments WHERE id = ?',
    [id]
  );
  return result;
};

// جلب كل الأقسام
const getAllDepartments = async () => {
  const [rows] = await db.promise().query(
    `SELECT d.*, c.name AS college_name
     FROM departments d
     LEFT JOIN colleges c ON d.college_id = c.id` // Assuming the table is 'collages', if it's 'colleges', adjust here.
  );
  return rows;
};

// جلب قسم حسب ID
const getDepartmentById = async (id) => {
  const [rows] = await db.promise().query('SELECT * FROM departments WHERE id = ?', [id]);
  if (rows.length === 0) return null;
  
  const department = rows[0];
  
  // Get count of programs in this department
  const [programCount] = await db.promise().query(
    'SELECT COUNT(*) as programs_count FROM programs WHERE dep = ?', 
    [id]
  );

  department.programs_count = programCount[0].programs_count;
  return department;
};

// تعديل بيانات القسم
const updateDepartment = async (id, data) => {
  const { email, website, address, logo, head_name } = data;
  const [result] = await db.promise().query(
    `UPDATE departments SET email = ?, website = ?, address = ?, logo = ?, head_name = ? WHERE id = ?`,
    [email, website, address, logo, head_name, id]
  );
  return result;
};

// جلب الأقسام المرتبطة بكلية معينة
const getDepartmentsByCollege = async (college_id) => {
  const [rows] = await db.promise().query('SELECT * FROM departments WHERE college_id = ?', [college_id]);
  return rows;
};

const getDepartmenNameByCollegeId = async (college_id) => {
  const [rows] = await db.promise().query('SELECT name, id FROM departments WHERE college_id = ?', [college_id]);
  return rows;
}

getDepartmentUniversity = async (university_id) => {
  const [rows] = await db.promise().query('SELECT * FROM colleges WHERE university_id = ?', [university_id]);
  for (const college of rows) {
    college.departments = await getDepartmentsByCollege(college.id);
  }
  return rows;
};


module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  getDepartmentsByCollege,
  getDepartmenNameByCollegeId,
  deleteDepartment
};
