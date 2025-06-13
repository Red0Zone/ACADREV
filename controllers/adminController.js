const db = require('../config/db');

// ✅ عدد الجامعات
const getUniversitiesCount = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admins only' });

  const [[{ count }]] = await db.promise().query('SELECT COUNT(*) AS count FROM universities');
  res.json({ universities: count });
};

// ✅ عدد الكليات
const getCollegesCount = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admins only' });

  const [[{ count }]] = await db.promise().query('SELECT COUNT(*) AS count FROM collages');
  res.json({ colleges: count });
};

// ✅ عدد الأقسام
const getDepartmentsCount = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admins only' });

  const [[{ count }]] = await db.promise().query('SELECT COUNT(*) AS count FROM departments');
  res.json({ departments: count });
};

// ✅ عدد البرامج
const getProgramsCount = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admins only' });

  const [[{ count }]] = await db.promise().query('SELECT COUNT(*) AS count FROM programs');
  res.json({ programs: count });
};

module.exports = {
  getUniversitiesCount,
  getCollegesCount,
  getDepartmentsCount,
  getProgramsCount
};
