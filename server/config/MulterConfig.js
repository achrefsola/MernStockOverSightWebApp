
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Generate a unique filename
  },
});

// Define file filter to accept only certain types of files
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/; // Allowed file types
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!'); // Reject file if not allowed type
  }
};

// Create Multer instance with storage and file filter options
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1000000 }, // 1MB file size limit
});

module.exports = upload;