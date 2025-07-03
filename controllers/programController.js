const programModel = require('../models/programModel');
const ProgramService = require('../services/programService');
const db = require('../config/db');

const programService = new ProgramService(db);
const { buildFilters, handlePaginatedRequest } = programService;

// إضافة برنامج
const addProgram = async (req, res) => {
  const { name, language, evaluator_name } = req.body;
  const dep = req.user.department_id;

  try {
    const programId = await programModel.createProgram({
      name,
      language,
      dep,
      evaluator_name: evaluator_name || null
    });

    res.status(201).json({ message: 'Program created', programId });
  } catch (err) {
    res.status(500).json({ message: 'Error creating program', error: err });
  }
};

const deleteProgram = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await programModel.deleteProgram(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Program not found' });
    }

    res.status(200).json({ message: 'Program deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting program', error: err });
  }
};


// عرض جميع البرامج
const getAllPrograms = async (req, res) => {
  try {
    const programs = await programModel.getAllPrograms();
    res.status(200).json(programs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching programs', error: err });
  }
};

// عرض برامج القسم الحالي
const getMyPrograms = async (req, res) => {
  const dep = req.user.department_id;

//   try {
//     const all = await programModel.getAllPrograms();
//     const filtered = all.filter(p => p.dep === dep);
//     res.status(200).json(filtered);
//   } catch (err) {
//     res.status(500).json({ message: 'Error filtering programs', error: err });
//   }
 };

// تعديل البرنامج
const updateProgram = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await programModel.updateProgram(id, req.body);
    res.status(200).json({ message: 'Program updated', result });
  } catch (err) {
    res.status(500).json({ message: 'Error updating program', error: err });
  }
};

const getProgramById = async (req, res) => {
  const id = req.params.id;

  try {
    const program = await programModel.getProgramById(id);
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }
    res.status(200).json(program);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching program', error: err });
  }
}

const getProgramNameByDepartmentId = async (req, res) => {
  const department_id = req.params.Department_id;

  if (!department_id) {
    return res.status(400).json({ message: 'Department ID is required' });
  }

  try {
    const programs = await programModel.getProgramNameByDepartmentId(department_id);
    res.status(200).json(programs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching program names', error: err });
  }
};

module.exports = {
  addProgram,
  getAllPrograms,
  updateProgram,
  getProgramById,
  getProgramNameByDepartmentId,
  deleteProgram
};
