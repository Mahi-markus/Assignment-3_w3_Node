// hotelValidation.ts
import { checkSchema, ValidationChain } from 'express-validator';

export const hotelValidation = checkSchema({
  hotelId: {
    in: ['body'],
    isString: true,
    errorMessage: 'Hotel ID must be a string.',
  },
  title: {
    in: ['body'],
    isString: true,
    errorMessage: 'Title must be a string.',
  },
  description: {
    in: ['body'],
    isString: true,
    errorMessage: 'Description must be a string.',
  },
  guestCount: {
    in: ['body'],
    isInt: true,
    toInt: true,
    errorMessage: 'Guest count must be an integer.',
  },
  bedroomCount: {
    in: ['body'],
    isInt: true,
    toInt: true,
    errorMessage: 'Bedroom count must be an integer.',
  },
  bathroomCount: {
    in: ['body'],
    isInt: true,
    toInt: true,
    errorMessage: 'Bathroom count must be an integer.',
  },
  amenities: {
    in: ['body'],
    isArray: true,
    errorMessage: 'Amenities must be an array of strings.',
  },
  hostInfo: {
    in: ['body'],
    isString: true,
    errorMessage: 'Host information must be a string.',
  },
  address: {
    in: ['body'],
    isString: true,
    errorMessage: 'Address must be a string.',
  },
  latitude: {
    in: ['body'],
    isFloat: true,
    toFloat: true,
    errorMessage: 'Latitude must be a number.',
  },
  longitude: {
    in: ['body'],
    isFloat: true,
    toFloat: true,
    errorMessage: 'Longitude must be a number.',
  },
  slug: {
    in: ['body'],
    isString: true,
    errorMessage: 'Slug must be a string.',
  },
  images: {
    in: ['body'],
    isArray: true,
    errorMessage: 'Images must be an array of strings.',
  },
  rooms: {
    in: ['body'],
    isArray: true,
    errorMessage: 'Rooms must be an array of room objects.',
  },
});

export const roomValidation = checkSchema({
  roomSlug: {
    in: ['body'],
    isString: true,
    errorMessage: 'Room slug must be a string.',
  },
  roomImage: {
    in: ['body'],
    isArray: true,
    errorMessage: 'Room image must be an array of strings.',
  },
  roomTitle: {
    in: ['body'],
    isString: true,
    errorMessage: 'Room title must be a string.',
  },
  roomBedroomCount: {
    in: ['body'],
    isInt: true,
    toInt: true,
    errorMessage: 'Room bedroom count must be an integer.',
  },
});
