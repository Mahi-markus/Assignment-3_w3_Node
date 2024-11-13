import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Define the images directory
const imagesDir = path.join(__dirname, '../../images');

// Ensure the images directory exists
try {
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
} catch (error) {
  console.error('Error creating images directory:', error);
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDir); // Store images inside the 'images' folder
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`; // Ensure unique filenames
    cb(null, filename);
  },
});

// Multer configuration: Limits to 10 files and specific MIME types
const upload = multer({
  storage,
  limits: { files: 4, fileSize: 5 * 1024 * 1024 }, // Limit to 4 images, max 5MB each
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      // req.fileValidationError = 'Only image files are allowed (JPEG, PNG, GIF)';
      // cb(new Error('Only image files are allowed (JPEG, PNG, GIF)'), false);
    } else {
      cb(null, true);
    }
  },
});

export default upload;
