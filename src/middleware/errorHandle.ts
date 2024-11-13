// src/middleware/errorHandler.ts

import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Log the error stack trace for debugging
  console.error(err.stack);

  // Use the provided status code or default to 500 if none is set
  const statusCode = err.status || err.statusCode || 500;
  
  // Determine the message based on error details or provide a generic message
  const message = err.message || 'Internal Server Error';

  // Send the error response with dynamic status code and message
  res.status(statusCode).json({ message });
};
