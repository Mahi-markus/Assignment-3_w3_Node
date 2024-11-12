import { body, ValidationChain, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateHotel: ValidationChain[] = [
  body('title').isString().withMessage('Title must be a string'),
  body('description').isString().withMessage('Description must be a string'),
  body('guestCount').isInt({ min: 1 }).withMessage('Guest count must be a positive integer'),
  body('bedroomCount').isInt({ min: 1 }).withMessage('Bedroom count must be a positive integer'),
  body('bathroomCount').isInt({ min: 1 }).withMessage('Bathroom count must be a positive integer'),
  body('amenities').optional().isArray().withMessage('Amenities must be an array'),
  body('hostInfo').isObject().withMessage('Host info must be an object'),
  body('address').isString().withMessage('Address must be a string'),
  body('latitude').isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90'),
  body('longitude').isFloat({ min: -180, max: 180 }).withMessage('Longitude must be between -180 and 180'),

  // Room validation
  body('rooms').optional().isArray().withMessage('Rooms must be an array'),
  body('rooms.*.roomTitle').isString().withMessage('Room title must be a string'),
  body('rooms.*.roomBedroomCount').isInt({ min: 1 }).withMessage('Room bedroom count must be a positive integer'),
  body('rooms.*.roomImage').optional().isURL().withMessage('Room image must be a valid URL'),
];



export const checkValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };