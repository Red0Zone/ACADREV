const db = require('../config/db');

// إضافة هيئة اعتماد
const createAuthority = async (name) => {
  const [result] = await db.promise().query(
    `INSERT INTO authorities (name) VALUES (?)`,
    [name]
  );
  return result.insertId;
};

// For Delete
const deleteAuthority = async (id) => {
  const [result] = await db.promise().query(
    `DELETE FROM authorities WHERE id = ?`,
    [id]
  );
  return result;
};

// تعديل بيانات الهيئة (بدون الاسم)
const updateAuthorityProfile = async (id, data) => {
  const { email, website, description, logo } = data;

  const [result] = await db.promise().query(
    `UPDATE authorities SET email = ?, website = ?, description = ?, logo = ? WHERE id = ?`,
    [email, website, description, logo, id]
  );

  return result;
};

const getAuthorityById = async (id) => {
  const [rows] = await db.promise().query(
    `SELECT * FROM authorities WHERE id = ?`,
    [id]
  );
  return rows[0];
};

const getAuthorityByName = async (name) => {
  const [rows] = await db.promise().query(
    `SELECT * FROM authorities WHERE name = ?`,
    [name]
  );
  return rows[0];
};


module.exports = {
  createAuthority,
  updateAuthorityProfile,
  getAuthorityById,
  deleteAuthority,
  getAuthorityByName
};
