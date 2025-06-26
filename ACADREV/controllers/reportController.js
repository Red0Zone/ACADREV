const reportModel = require('../models/reportModel');

// جلب المتطلبات الخاصة بتقارير مجال محدد
const getPrompts = async (req, res) => {
  try {
    const domainId = req.params.domainId;
    const data = await reportModel.getPromptsByDomain(domainId);
    res.json(data);
  } catch (err) {
    console.error('Error fetching prompts:', err);
    res.status(500).json({ message: 'Failed to fetch prompts' });
  }
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
