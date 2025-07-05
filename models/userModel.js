const db = require('../config/db');

// إنشاء مستخدم
const createUser = async (data) => {
  const { username, email, password, role, authority_id, university_id, college_id, department_id } = data;

  const [result] = await db.promise().query(
    `INSERT INTO users (username, email, password, role, authority_id, university_id, college_id, department_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [username, email, password, role, authority_id, university_id, college_id, department_id]
  );

  return result;
};

const getAllUsers = async () => {
  const [rows] = await db.promise().query(`
    SELECT 
      id, username, email, role, authority_id, university_id, college_id, department_id, image_url FROM users`);
  return rows;
};


// تحديث جزئي للمستخدم (PATCH)
const updateUser = async (id, data) => {
  // Build the SQL query dynamically based on provided fields
  const updateFields = [];
  const values = [];
  
  // Only include fields that are actually provided
  if (data.username !== undefined) {
    updateFields.push('username = ?');
    values.push(data.username);
  }
  if (data.email !== undefined) {
    updateFields.push('email = ?');
    values.push(data.email);
  }
  if (data.password !== undefined) {
    updateFields.push('password = ?');
    values.push(data.password);
  }
  if (data.role !== undefined) {
    updateFields.push('role = ?');
    values.push(data.role);
  }
  if (data.authority_id !== undefined) {
    updateFields.push('authority_id = ?');
    values.push(data.authority_id);
  }
  if (data.university_id !== undefined) {
    updateFields.push('university_id = ?');
    values.push(data.university_id);
  }
  if (data.college_id !== undefined) {
    updateFields.push('college_id = ?');
    values.push(data.college_id);
  }
  if (data.department_id !== undefined) {
    updateFields.push('department_id = ?');
    values.push(data.department_id);
  }
  if (data.image_url !== undefined) {
    updateFields.push('image_url = ?');
    values.push(data.image_url);
  }

  // If no fields to update, return early
  if (updateFields.length === 0) {
    return { affectedRows: 0 };
  }

  // Add the ID to the end of values array
  values.push(id);

  const query = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
  
  const [result] = await db.promise().query(query, values);
  return result;
};

// حذف مستخدم
const deleteUser = async (id) => {
  const [result] = await db.promise().query(
    'DELETE FROM users WHERE id = ?', [id]
  );
  return result;
};

// جلب معلومات مستخدم حسب ID
const getUserProfileById = async (id) => {
  const [rows] = await db.promise().query(
    `SELECT id, username, email, role, authority_id, university_id, college_id, department_id, created_at, image_url
     FROM users
     WHERE id = ?`,
    [id]
  );
  return rows[0];
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  getUserProfileById,
  deleteUser
};
