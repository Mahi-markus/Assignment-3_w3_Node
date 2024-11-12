import { Request, Response, NextFunction } from 'express';

const hotelValidation = (req: Request, res: Response, next: NextFunction): void => {
  const requiredFields = [
    'title', 'description', 'guestCount', 'bedroomCount', 'bathroomCount',
    'amenities', 'hostInfo', 'address', 'latitude', 'longitude', 'slug', 'images', 'rooms'
  ];

  // Array to collect all error messages
  const errors: string[] = [];

  // Loop through required fields and collect errors
  for (const field of requiredFields) {
    if (!req.body[field]) {
      errors.push(`'${field}' is required`);
    }
  }

  // If there are any errors, return them as a response
  if (errors.length > 0) {
     res.status(400).json({
      errors: errors
    });
  }

  // If no errors, continue to the next middleware or controller
  next();
};

export default hotelValidation;
