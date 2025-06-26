const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../config/db');

// ✅ إعداد تخزين الملفات مع التحقق من وجود مجلد evidence
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/evidence';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }); // ينشئ المسار تلقائيًا
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
    cb(null, unique);
  }
});

// ✅ إعداد مكتبة multer لرفع الملفات
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // الحد الأقصى 5MB
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.docx', '.png', '.jpg', '.jpeg'];
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, allowed.includes(ext));
  }
});

// ✅ دالة رفع الأدلة المرتبطة بـ response
const uploadEvidence = [
  upload.single('file'),
  async (req, res) => {
    try {
      const responseId = req.params.responseId;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      await db.promise().query(
        `INSERT INTO files (response_id, name, location, type)
         VALUES (?, ?, ?, ?)`,
        [responseId, file.originalname, file.path, file.mimetype]
      );

      res.status(200).json({ message: 'Evidence uploaded successfully' });
    } catch (err) {
      console.error('Upload error:', err);
      res.status(500).json({ message: 'File upload failed' });
    }
  }
];

module.exports = { uploadEvidence };
