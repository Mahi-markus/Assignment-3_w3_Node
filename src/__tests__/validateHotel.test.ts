import request from 'supertest';
import express from 'express';
import hotelValidation from '../middleware/Validations'; // Assuming this is the middleware file
import { createHotel } from '../controllers/hotelController';

const app = express();
app.use(express.json()); // Parse JSON bodies

// Apply validation middleware and controller
app.post('/api/hotel', hotelValidation, createHotel);

describe('Hotel Validation Tests', () => {
  it('should return a validation error for missing title', async () => {
    const response = await request(app)
      .post('/api/hotel')
      .send({
        description: 'A nice hotel',
        guestCount: 2,
        bedroomCount: 1,
        bathroomCount: 1,
        amenities: ['wifi'],
        hostInfo: { name: 'John Doe' },
        address: '123 Main St',
        latitude: 40.7128,
        longitude: -74.0060,
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toContain("'title' is required");
  });

  it('should return validation errors for invalid latitude and longitude', async () => {
    const response = await request(app)
      .post('/api/hotel')
      .send({
        title: 'Test Hotel',
        description: 'A nice hotel',
        guestCount: 2,
        bedroomCount: 1,
        bathroomCount: 1,
        amenities: ['wifi'],
        hostInfo: { name: 'John Doe' },
        address: '123 Main St',
        latitude: 70, // Invalid latitude
        longitude: -100, // Invalid longitude
      });

    expect(response.status).toBe(400);


  });

  it('should pass validation when all fields are correct', async () => {
    const response = await request(app)
      .post('/api/hotel')
      .send({
        title: 'Test Hotel',
        description: 'A nice hotel',
        guestCount: 2,
        bedroomCount: 1,
        bathroomCount: 1,
        amenities: ['wifi'],
        hostInfo: { name: 'John Doe' },
        address: '123 Main St',
        latitude: 40.7128,
        longitude: -74.0060,
        rooms: [
          {
            roomSlug: 'room-1',
            roomImage: ['image1.jpg'],
            roomTitle: 'Room 1',
            roomBedroomCount: 1,
          }
        ]
      });


   
   

  });

  it('should return a validation error for an invalid guest count', async () => {
    const response = await request(app)
      .post('/api/hotel')
      .send({
        title: 'Test Hotel',
        description: 'A nice hotel',
        guestCount: -1, // Invalid guest count
        bedroomCount: 1,
        bathroomCount: 1,
        amenities: ['wifi'],
        hostInfo: { name: 'John Doe' },
        address: '123 Main St',
        latitude: 40.7128,
        longitude: -74.0060,
      });

    expect(response.status).toBe(400);

  });

  it('should return validation error if rooms field is not an array', async () => {
    const response = await request(app)
      .post('/api/hotel')
      .send({
        title: 'Test Hotel',
        description: 'A nice hotel',
        guestCount: 2,
        bedroomCount: 1,
        bathroomCount: 1,
        amenities: ['wifi'],
        hostInfo: { name: 'John Doe' },
        address: '123 Main St',
        latitude: 40.7128,
        longitude: -74.0060,
        rooms: {} // Invalid rooms type (not an array)
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toContain("'rooms' must be an array");
  });
});