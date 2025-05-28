const qntModel = require('../models/qntModel');

const getAreas = async (req, res) => {
  const data = await qntModel.getAllAreas();
  res.json(data);
};

const getHeaders = async (req, res) => {
  const areaId = req.params.areaId;
  const data = await qntModel.getHeadersByArea(areaId);
  res.json(data);
};

const getItems = async (req, res) => {
  const areaId = req.params.areaId;
  const data = await qntModel.getItemsByArea(areaId);
  res.json(data);
};

const submitResponses = async (req, res) => {
  const { program_id, user_id, responses } = req.body;
  await qntModel.submitResponses(responses, program_id, user_id);
  res.status(200).json({ message: 'Responses saved successfully' });
};

const getProgramResponses = async (req, res) => {
  const programId = req.params.programId;
  const data = await qntModel.getResponsesByProgram(programId);
  res.json(data);
};

const updateResponse = async (req, res) => {
  const id = req.params.id;
  const { value } = req.body;
  await qntModel.updateResponseValue(id, value);
  res.json({ message: 'Response updated' });
};

const deleteResponse = async (req, res) => {
  const id = req.params.id;
  await qntModel.deleteResponse(id);
  res.json({ message: 'Response deleted' });
};
const getAllResponses = async (req, res) => {
    const data = await qntModel.getAllResponses();
    res.json(data);
  };
  
  const getAreaSummary = async (req, res) => {
    const areaId = req.params.areaId;
    const data = await qntModel.getAreaSummary(areaId);
    res.json(data);
  };
  
  const getUserSubmittedAreas = async (req, res) => {
    const { userId, programId } = req.params;
    const data = await qntModel.getUserSubmittedAreas(userId, programId);
    res.json(data);
  };
  
  // 13
const completedAreas = async (req, res) => {
    const programId = req.params.programId;
    const data = await qntModel.getCompletedAreasForProgram(programId);
    res.json(data);
  };
  
  // 14
  const areaProgress = async (req, res) => {
    const programId = req.params.programId;
    const data = await qntModel.getAreaProgress(programId);
    res.json(data);
  };
  
  // 15
  const missingResponses = async (req, res) => {
    const { programId, areaId } = req.params;
    const data = await qntModel.getMissingResponses(programId, areaId);
    res.json(data);
  };
  
  // 16
  const mostSkippedHeaders = async (req, res) => {
    const data = await qntModel.getMostSkippedHeaders();
    res.json(data);
  };
  
  // 17
  const programsFilledByUser = async (req, res) => {
    const userId = req.params.userId;
    const data = await qntModel.getDistinctProgramsFilledByUser(userId);
    res.json(data);
  };

module.exports = {
  getAreas,
  getHeaders,
  getItems,
  submitResponses,
  getProgramResponses,
  updateResponse,
  deleteResponse,
  getAllResponses,
  getAreaSummary,
  getUserSubmittedAreas,
  completedAreas,
  areaProgress,
  missingResponses,
  mostSkippedHeaders,
  programsFilledByUser
};
