const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const authorityModel = require('../models/authorityModel');
const db = require('../config/db');

// 1. إنشاء هيئة اعتماد من قبل الأدمن
const adminAddAuthority = async (req, res) => {
  const { name, username, email, password } = req.body;

  
  // Validate required fields
  if (!name || !username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  // Check if authority name already exists
  const existingAuthority = await authorityModel.getAuthorityByName(name);
  if (existingAuthority) {
    return res.status(400).json({ message: 'Authority name already exists' });
  }
  // Check if username already exists
  const existingUsername = await userModel.getUserByUsername(username);
  if (existingUsername) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  // Check if email already exists
  const existingEmail = await userModel.getUserByEmail(email);
  if (existingEmail) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  try {
    // 1. إدخال الهيئة في جدول authorities
    const authorityId = await authorityModel.createAuthority(name);

    // 2. إنشاء مستخدم مرتبط بها
    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.createUser({
      username,
      email,
      password: hashedPassword,
      role: 'authority',
      authority_id: authorityId,
      university_id: null,
      college_id: null,
      department_id: null
    });

    res.status(201).json({ message: 'Authority and user created successfully' });
  } catch (err) {
    console.log('Error creating authority:', err);
    res.status(500).json({ message: 'Error creating authority', error: err });
  }
};

// For Delete
const deleteAuthority = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await authorityModel.deleteAuthority(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Authority not found' });
    }

    res.status(200).json({ message: 'Authority deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting authority', error: err });
  }
};

// 2. تعديل بيانات الهيئة من قبل نفسها
const updateAuthorityProfile = async (req, res) => {
  const authorityId = req.user.authority_id;

  if ('name' in req.body) {
    return res.status(403).json({ message: 'You are not allowed to change the authority name' });
  }

  try {
    const result = await authorityModel.updateAuthorityProfile(authorityId, req.body);
    res.status(200).json({ message: 'Authority profile updated', result });
  } catch (err) {
    res.status(500).json({ message: 'Error updating authority profile', error: err });
  }
};

// 3. عرض بيانات الهيئة
const getMyAuthority = async (req, res) => {
  const authorityId = req.user.authority_id;

  try {
    const authority = await authorityModel.getAuthorityById(authorityId);
    res.status(200).json(authority);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching authority info', error: err });
  }
}


const getAuthorityById = async (req, res) => {
  const id = req.params.id;

  try {
    const authority = await authorityModel.getAuthorityById(id);

    if (!authority) {
      return res.status(404).json({ message: 'Authority not found' });
    }

    res.status(200).json(authority);
  } catch (err) {
    console.error('Error retrieving authority:', err);
    res.status(500).json({ message: 'Error retrieving authority', error: err });
  }
};


const getAllAuthorities = async (req, res) => {
  try {
    const [rows] = await db.promise().query(
      `SELECT id, name, email, website, description, logo, created_at FROM authorities`
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No authorities found' });
    }

    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Database error', error: err });
  }
};



module.exports = {
  adminAddAuthority,
  updateAuthorityProfile,
  getMyAuthority,
  getAllAuthorities,
  getAuthorityById,
  deleteAuthority
};
