import { Request, Response, NextFunction } from 'express';

const hotelValidation = (req: Request, res: Response, next: NextFunction): void => {
  const requiredFields = [
    'title', 'description', 'guestCount', 'bedroomCount', 'bathroomCount',
    'amenities', 'hostInfo', 'address', 'latitude', 'longitude', 'slug', 'images', 'rooms'
  ];


  const requiredRoomFields = [
    'roomSlug', 'roomImage', 'roomTitle', 'roomBedroomCount'
  ];

 

  // Array to collect all error messages
  const errors: string[] = [];

  // Loop through required fields and collect errors
  for (const field of requiredFields) {
    if (!req.body[field]) {
      errors.push(`'${field}' is required`);
    }
  }


// Validate rooms if present
if (Array.isArray(req.body.rooms)) {
  req.body.rooms.forEach((room: any, index: number) => {
    for (const roomField of requiredRoomFields) {
      if (!room[roomField]) {
        errors.push(`'${roomField}' is required in room at index ${index}`);
      }
    }
  });
} else {
  errors.push("'rooms' must be an array");
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
