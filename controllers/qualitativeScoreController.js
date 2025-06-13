const model = require('../models/qualitativeScoreModel');

// /wi
const getWi = async (req, res) => {
  const data = await model.getDomainWeights();
  res.json(data);
};

// /si/:programId
const getSi = async (req, res) => {
  const data = await model.getDomainScores(req.params.programId);
  res.json(data);
};

// /wisi/:programId
const getWiSi = async (req, res) => {
  const data = await model.getWeightedResults(req.params.programId);
  res.json(data);
};

module.exports = { getWi, getSi, getWiSi };
