// src/server.ts

import app from './index';
import fs from 'fs';
import path from 'path';

const PORT = process.env.PORT || 3001;

// Ensure data and images directories exist
const dataDir = path.join(__dirname, './fileDate');
//const imagesDir = path.join(__dirname, '../fileDate/images');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// if (!fs.existsSync(imagesDir)) {
//   fs.mkdirSync(imagesDir);
// }

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
