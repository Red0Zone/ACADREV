const bcrypt = require('bcrypt');
const departmentModel = require('../models/departmentModel');
const userModel = require('../models/userModel');
const db = require('../config/db');
const DepartmentService = require('../services/departmentService');

const departmentService = new DepartmentService(db);
const {buildFilters, handlePaginatedRequest} = departmentService;


// 1. الكلية تنشئ القسم + مستخدم مرتبط
const addDepartment = async (req, res) => {
  const { name, username, email, password } = req.body;
  const college_id = req.user.college_id;

  try {
    const departmentId = await departmentModel.createDepartment({
      name,
      email: null,
      website: null,
      address: null,
      logo: null,
      college_id,
      head_name: null
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.createUser({
      username,
      email,
      password: hashedPassword,
      role: 'department',
      authority_id: null,
      university_id: null,
      college_id,
      department_id: departmentId
    });

    res.status(201).json({ message: 'Department and user created successfully', departmentId });
  } catch (err) {
    res.status(500).json({ message: 'Error creating department', error: err });
  }
};

// 2. عرض كل الأقسام
const getAllDepartments = async (req, res) => {
  const filters = buildFilters(req.query);
  await handlePaginatedRequest(req, res, filters, 'All departments retrieved successfully');
};

// 3. عرض قسم حالي (من قبل المسؤول)
const getMyDepartment = async (req, res) => {
  const id = req.user.department_id;

  try {
    const dept = await departmentModel.getDepartmentById(id);
    res.status(200).json(dept);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching department', error: err });
  }
};

// 4. تعديل بيانات القسم
const updateDepartment = async (req, res) => {
  const id = req.user.department_id;

  if ('name' in req.body) {
    return res.status(500).json({ message: 'Name is not editable' });
  }

  try {
    const result = await departmentModel.updateDepartment(id, req.body);
    res.status(200).json({ message: 'Department updated', result });
  } catch (err) {
    res.status(500).json({ message: 'Error updating department', error: err });
  }
};

// 5. عرض الأقسام حسب الكلية
const getDepartmentsByCollege = async (req, res) => {
  const filters = buildFilters(req.query, req.params.college_id);
  await handlePaginatedRequest(req, res, filters, 'Departments by college retrieved successfully');
};

// 6. عرض أسماء الأقسام حسب الكلية
const getDepartmenNameByCollegeId = async (req, res) => {
  const college_id = req.params.college_id;
  if (!college_id) {
    return res.status(400).json({ message: 'College ID is required' });
  }
  try {
    const departments = await departmentModel.getDepartmenNameByCollegeId(college_id);
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching department names', error: err });
  }
};

// 7. عرض الأقسام حسب الجامعة
const getDepartmentUniversity = async (req, res) => {
  const university_id = req.params.university_id;
  if (!university_id) {
    return res.status(400).json({ message: 'University ID is required' });
  }
  const filters = buildFilters(req.query, null, university_id);
  await handlePaginatedRequest(req, res, filters, 'Departments by university retrieved successfully');
};

//TODO: Implement the function to get department using college_id and university_id with departmentService new functions


module.exports = {
  addDepartment,
  getAllDepartments,
  getMyDepartment,
  updateDepartment,
  getDepartmentsByCollege,
  getDepartmentUniversity,
  getDepartmenNameByCollegeId
};