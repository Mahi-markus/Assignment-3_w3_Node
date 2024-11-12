import request from 'supertest';
import express from 'express';
import { validateHotel, checkValidationErrors } from '../middleware/Validations'
import { createHotel } from '../controllers/hotelController'; 

const app = express();
app.use(express.json()); // To parse JSON bodies

// Apply your middleware
app.post('/api/hotel', validateHotel,  createHotel);

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
    expect(response.status).toBe(400); // Validation should fail
    expect(response.body.errors).toContainEqual(expect.objectContaining({
      msg: 'Title must be a string',
      param: 'title'
    }));
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
        latitude: 200,  // Invalid latitude
        longitude: -200, // Invalid longitude
      });
    expect(response.status).toBe(400);
    expect(response.body.errors).toContainEqual(expect.objectContaining({
      msg: 'Latitude must be between -90 and 90',
      param: 'latitude'
    }));
    expect(response.body.errors).toContainEqual(expect.objectContaining({
      msg: 'Longitude must be between -180 and 180',
      param: 'longitude'
    }));
  });
});
