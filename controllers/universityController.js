const bcrypt = require('bcrypt');
const universityModel = require('../models/universityModel');
const userModel = require('../models/userModel');

// 1. إنشاء جامعة وحساب مستخدم لها (من قبل هيئة الاعتماد)
const addUniversity = async (req, res) => {
  const { name, username,email, password } = req.body;
  const authority_id = req.user.authority_id;

  // Validate required fields
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    // Check if authority name already exists
    const existingUniversity = await universityModel.getUniversityByName(name);
    if (existingUniversity) {
      return res.status(400).json({ message: 'University name already exists' });
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
    const universityId = await universityModel.createUniversity({
      name,
      email: null,
      website: null,
      address: null,
      logo: null,
      authority_id,
      head_name: null,
      phone: null,
      tax: null
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.createUser({
      username,
      email,
      password: hashedPassword,
      role: 'university',
      authority_id,
      university_id: universityId,
      college_id: null,
      department_id: null
    });

    res.status(201).json({
      message: 'University created. Waiting for university to complete its information.',
      universityId
    });
  } catch (err) {
    res.status(500).json({ message: 'Error creating university', error: err });
  }
};

// For Delete
const deleteUniversity = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await universityModel.deleteUniversity(id);


    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'University not found' });
    }

    res.status(200).json({ message: 'University deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting university', error: err });
  }
};

// 2. عرض كل الجامعات (لـ هيئة الاعتماد أو الأدمن)
const getAllUniversities = async (req, res) => {
  try {
    const universities = await universityModel.getAllUniversities();
    res.status(200).json(universities);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching universities', error: err });
  }
};

// 3. عرض جامعة واحدة (عرض ذاتي)
const getMyUniversity = async (req, res) => {
  if (req.user.role == 'college') {
    const uni = await universityModel.getUniversityByCollegeId(req.user.college_id);
    return res.status(200).json(uni);
  }
  else if (req.user.role == 'department') {
    const uni = await universityModel.getUniversityByDepartmentId(req.user.department_id);
    return res.status(200).json(uni);
  }
  else{
    
  const id = req.user.university_id;


  try {
    const uni = await universityModel.getUniversityById(id);
    res.status(200).json(uni);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching university', error: err });
  }
}
};

// 4. تحديث بيانات الجامعة (من قبل الجامعة نفسها)
const updateUniversity = async (req, res) => {
  const id = req.user.university_id;

  if ('name' in req.body) {
    return res.status(403).json({ message: 'Name is not editable' });
  }

  try {
    const result = await universityModel.updateUniversity(id, req.body);
    res.status(200).json({ message: 'University updated', result });
  } catch (err) {
    res.status(500).json({ message: 'Error updating university', error: err });
  }
};

const getUniversityNamesAndIds = async (req, res) => {
  try {
    const universities = await universityModel.getUniversityNamesAndIds();
    res.status(200).json(universities);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching university names and IDs', error: err });
  }
};

module.exports = {
  addUniversity,
  getAllUniversities,
  getMyUniversity,
  updateUniversity,
  getUniversityNamesAndIds,
  deleteUniversity
};
