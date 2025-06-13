const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const [users] = await db.promise().query(
      'SELECT * FROM users WHERE username = ?', [username]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = users[0];
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
      authority_id: user.authority_id,
      university_id: user.university_id,
      college_id: user.college_id,
      department_id: user.department_id
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

    

    //  تعديل الرد
    let userData = {
      id: user.id,
      username: user.username,
      role: user.role
    };

    if (user.authority_id !== null && user.authority_id !== undefined && user.role === 'authority') {
      userData.authority_id = user.authority_id;
    }
    if (user.university_id !== null && user.university_id !== undefined && user.role === 'university') {
      userData.university_id = user.university_id;
    }
    if (user.college_id !== null && user.college_id !== undefined && user.role === 'college') {
      userData.college_id = user.college_id;
    }
    if (user.department_id !== null && user.department_id !== undefined && user.role === 'department') {
      userData.department_id = user.department_id;
    }

    res.status(200).json({
      message: 'Login successful',
      token,
      user: userData
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error', error: err });
  }
};

// تسجيل الخروج: إضافة التوكن للقائمة السوداء
const logout = async (req, res) => {
  try {
    const token = req.token; // تم تمريره من checkBlacklist
    if (!token) return res.status(400).json({ message: 'Token not found' });

    await db.promise().query(
      'INSERT INTO revoked_tokens (token) VALUES (?)',
      [token]
    );

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ message: 'Logout failed' });
  }
};

module.exports = { login ,logout};
