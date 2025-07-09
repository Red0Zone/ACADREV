const qualModel = require("../models/qualModel");

// 1. جلب جميع المجالات
const getDomains = async (req, res) => {
  const data = await qualModel.getAllDomains();
  res.json(data);
};

// 2. جلب مؤشرات مجال معين
const getIndicators = async (req, res) => {
  const domainId = req.params.domainId;
  const data = await qualModel.getIndicatorsByDomain(domainId);
  res.json(data);
};

// 3. جلب الردود لبرنامج معين
const getResponses = async (req, res) => {
  const programId = req.params.programId;
  const data = await qualModel.getResponsesByProgram(programId);
  res.json(data);
};

// 4. إرسال أو تعديل رد نوعي
const submitResponse = async (req, res) => {
  const data = req.body;
  data.user_id = req.user.id; // المستخرج من التوكن
  const result = await qualModel.saveOrUpdateResponse(data);
  res.json(result);
};

// 5. المؤشرات غير المجاوب عنها
const getUnanswered = async (req, res) => {
  const programId = req.params.programId;
  const data = await qualModel.getUnansweredIndicators(programId);
  res.json(data);
};

// 6. ملخص المجال والتعبئة
const getDomainSummary = async (req, res) => {
  const programId = req.params.programId;
  const data = await qualModel.getSummaryByDomain(programId);
  res.json(data);
};

// 7. حذف رد نوعي
const removeResponse = async (req, res) => {
  try {
    const responseId = req.params.id;
    const result = await qualModel.deleteResponse(responseId);

    if (result.success) {
      const message = result.deletedResponse
        ? `Response deleted successfully. ${result.deletedFiles.total} files processed: ${result.deletedFiles.deleted} deleted, ${result.deletedFiles.notFound} not found, ${result.deletedFiles.errors} errors.`
        : "Response not found";

      res.json({
        success: true,
        message,
        deletedResponse: result.deletedResponse,
        filesDeletionSummary: result.deletedFiles,
        affectedRows: result.result.affectedRows,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Response not found",
      });
    }
  } catch (error) {
    console.error("Error in removeResponse:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete response and associated files",
      error: error.message,
    });
  }
};

module.exports = {
  getDomains,
  getIndicators,
  getResponses,
  submitResponse,
  getUnanswered,
  getDomainSummary,
  removeResponse,
};
