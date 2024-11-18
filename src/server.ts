// src/server.ts

import app from './index';
import fs from 'fs';
import path from 'path';
var cors = require('cors')

const PORT =  3001;


// Test route to check connection
app.get("/api/test", (req, res) => {
  res.json({ message: "Connection to API is successful!" });
});



app.use(cors())

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
