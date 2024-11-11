import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Define the images directory
const imagesDir = path.join(__dirname, '../../images');

// Ensure the images directory exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save images to './images' directory
    cb(null, imagesDir); // Store images inside the 'images' folder
  },
  filename: (req, file, cb) => {
    // Generate a unique filename
    const ext = path.extname(file.originalname);
    const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext; // Ensure unique filenames
    cb(null, filename);
  },
});

// Multer configuration: Limits to 10 files and specific mime types
const upload = multer({
  storage,
  limits: { files: 10, fileSize: 5 * 1024 * 1024 }, // Limit to 10 images, max 5MB each
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      // Pass `null` as the first argument and `false` for the second argument to indicate rejection
      cb(null, false);
      //req.fileValidationError = 'Only image files are allowed (JPEG, PNG, GIF)'; // Custom error message
    } else {
      cb(null, true);
    }
  },
});

export default upload;
