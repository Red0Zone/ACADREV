const db = require('../config/db');

// التحقق مما إذا كان التوكن موجود في قائمة السوداء
const checkBlacklist = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token missing' });

    const [rows] = await db.promise().query('SELECT * FROM revoked_tokens WHERE token = ?', [token]);
    if (rows.length > 0) {
      return res.status(401).json({ message: 'Token has been revoked' });
    }

    req.token = token; // تمرير التوكن للراوتات الأخرى
    next();
  } catch (err) {
    console.error('Blacklist check error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { checkBlacklist };
