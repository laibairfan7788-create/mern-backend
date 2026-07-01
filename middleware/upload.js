const multer = require('multer');

// NOTE: Vercel's filesystem is not persistent — files written to disk
// are lost after the function ends. Using memoryStorage() here so uploads
// work on Vercel. For permanent file storage, integrate Cloudinary or S3
// and upload the buffer from req.file.buffer there inside your controller.

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: fileFilter,
});

module.exports = upload;
