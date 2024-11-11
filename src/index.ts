import express from 'express';
 import hotelRoutes from './routes/hotelRoutes';
// import { errorHandler } from './middleware/errorHandler';
import path from 'path';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Serve static images
app.use('/images', express.static(path.join(__dirname, '../images')));

// Routes
app.use('/api', hotelRoutes);

// Error Handling Middleware
// app.use(errorHandler);

export default app;