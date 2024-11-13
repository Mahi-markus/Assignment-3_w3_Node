// src/server.ts

import app from './index';
import fs from 'fs';
import path from 'path';

const PORT =  3001;




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
