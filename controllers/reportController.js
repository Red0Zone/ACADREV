const reportModel = require('../models/reportModel');
const ReportService = require('../services/reportService');
const db = require('../config/db');
const reportService = new ReportService(db);

const getPrompts = async (req, res) => {
    reportService.handlePaginatedRequest(req, res, 'Reports retrieved successfully');
};

// جلب الردود المكتوبة من المقيم (للعرض للأدمن أو المقيم)
const getResults = async (req, res) => {
  try {
    const programId = req.params.programId;
    const data = await reportModel.getResultsByProgram(programId);
    res.json(data);
  } catch (err) {
    console.error('Error fetching report results:', err);
    res.status(500).json({ message: 'Failed to fetch results' });
  }
};

// حفظ أو تعديل رد تقرير
const saveReport = async (req, res) => {
  try {
    const result = await reportModel.saveOrUpdateReport(req.body);
    res.json(result);
  } catch (err) {
    console.error('Error saving report:', err);
    res.status(500).json({ message: 'Failed to save report' });
  }
};

module.exports = {
  getPrompts,
  getResults,
  saveReport
};
