const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../config/db");

// ✅ إعداد تخزين الملفات مع التحقق من وجود مجلد evidence
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/evidence";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }); // ينشئ المسار تلقائيًا
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, unique);
  },
});

// ✅ إعداد مكتبة multer لرفع الملفات
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // الحد الأقصى 20MB
  fileFilter: (req, file, cb) => {
    const allowed = [".pdf", ".docx", ".png", ".jpg", ".jpeg", ".txt"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowed.includes(ext)) {
      return cb(
        new Error(
          `File type ${ext} not allowed. Accepted formats: ${allowed.join(
            ", "
          )}`
        )
      );
    }
    cb(null, true);
  },
});

// ✅ دالة رفع الأدلة المرتبطة بـ response
const uploadEvidence = [
  (req, res, next) => {
    upload.single("file")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .json({ message: "File size exceeds 5MB limit" });
        }
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
          return res.status(400).json({
            message:
              "Unexpected file field, allowed formats: pdf, docx, png, jpg, jpeg, txt",
          });
        }
        return res
          .status(400)
          .json({ message: `Upload error: ${err.message}` });
      }
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  },
  async (req, res) => {
    try {
      const responseId = req.params.responseId;
      const file = req.file;
      const { url } = req.body;

      // Validate responseId
      if (!responseId || isNaN(responseId)) {
        return res
          .status(400)
          .json({ message: "Invalid or missing response ID" });
      }

      // Check if response exists
      const [responseExists] = await db
        .promise()
        .query("SELECT id FROM qlt_responses WHERE id = ?", [responseId]);

      if (responseExists.length === 0) {
        return res.status(404).json({ message: "Response not found" });
      }
      if (!file && !url) {
        return res
          .status(400)
          .json({ message: "No file or URL provided for evidence" });
      }
      // Check if it's a URL submission
      if (url) {
        try {
          new URL(url);
        } catch {
          return res.status(400).json({ message: "Invalid URL format." });
        }

        try {
          await db.promise().query(
            `INSERT INTO files (response_id, name, location, type)
             VALUES (?, ?, ?, ?)`,
            [responseId, "URL Evidence", url, "URL"]
          );
          return res
            .status(200)
            .json({ message: "URL evidence added successfully" });
        } catch (dbErr) {
          console.error("Database error (URL):", dbErr);
          return res
            .status(500)
            .json({ message: "Failed to save URL evidence to database" });
        }
      }

      // Handle file upload
      if (file) {
        try {
          await db.promise().query(
            `INSERT INTO files (response_id, name, location, type)
           VALUES (?, ?, ?, ?)`,
            [responseId, file.originalname, file.path, file.mimetype]
          );
          res.status(200).json({ message: "Evidence uploaded successfully" });
        } catch (dbErr) {
          console.error("Database error (file):", dbErr);
          // Clean up uploaded file if database insert fails
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
          res
            .status(500)
            .json({ message: "Failed to save file evidence to database" });
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      res.status(500).json({
        message: "An unexpected error occurred while processing your request",
      });
    }
  },
];

// ✅ دالة للحصول على الأدلة المرتبطة بـ response
const getEvidence = async (req, res) => {
  try {
    const responseId = req.params.responseId;

    // Validate responseId
    if (!responseId || isNaN(responseId)) {
      return res
        .status(400)
        .json({ message: "Invalid or missing response ID" });
    }

    // Check if response exists
    const [responseExists] = await db
      .promise()
      .query("SELECT id FROM qlt_responses WHERE id = ?", [responseId]);

    if (responseExists.length === 0) {
      return res.status(404).json({ message: "Response not found" });
    }

    // Fetch evidence files
    const [files] = await db
      .promise()
      .query(
        "SELECT id, name, location, type FROM files WHERE response_id = ?",
        [responseId]
      );

    if (files.length === 0) {
      return res
        .status(404)
        .json({ message: "No evidence found for this response" });
    }

    res.status(200).json(files);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({
      message: "An unexpected error occurred while fetching evidence",
    });
  }
};

module.exports = { uploadEvidence, getEvidence };
