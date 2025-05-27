const qualModel = require('../models/qualModel');

const getDomains = async (req, res) => {
  const data = await qualModel.getAllDomains();
  res.json(data);
};

const getIndicators = async (req, res) => {
  const domainId = req.params.domainId;
  const data = await qualModel.getIndicatorsByDomain(domainId);
  res.json(data);
};

const getResponses = async (req, res) => {
  const programId = req.params.programId;
  const data = await qualModel.getResponsesByProgram(programId);
  res.json(data);
};

const submitResponse = async (req, res) => {
  const data = req.body;
  data.user_id = req.user.id;
  const result = await qualModel.saveOrUpdateResponse(data);
  res.json(result);
};

const getUnanswered = async (req, res) => {
  const programId = req.params.programId;
  const data = await qualModel.getUnansweredIndicators(programId);
  res.json(data);
};

const getDomainSummary = async (req, res) => {
  const programId = req.params.programId;
  const data = await qualModel.getSummaryByDomain(programId);
  res.json(data);
};

const removeResponse = async (req, res) => {
  const responseId = req.params.id;
  const result = await qualModel.deleteResponse(responseId);
  res.json({ deleted: true, affectedRows: result.affectedRows });
};

module.exports = {
  getDomains,
  getIndicators,
  getResponses,
  submitResponse,
  getUnanswered,
  getDomainSummary,
  removeResponse
};
