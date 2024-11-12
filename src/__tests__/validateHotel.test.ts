import request from 'supertest';
import express from 'express';

import { createHotel } from '../controllers/hotelController'; 

const app = express();
app.use(express.json()); // To parse JSON bodies

// Apply your middleware
app.post('/api/hotel',   createHotel);

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
        longitude: 74.0060,
      });

    // Check for 400 status and the correct error message
    expect(response.status).toBe(400);
    expect(response.body.errors).toContainEqual(expect.objectContaining({
      msg: 'Title must be a string',
      param: 'title'
    }));
  });

  it('should return validation errors for invalid latitude and longitude', async () => {
    const response = await request(app)
      .post('/api/hotel')
      .send({
        title: 'Test Hotel',  // Valid title
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

    // Check for 400 status and the latitude and longitude errors
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

  it('should pass validation when all fields are correct', async () => {
    const response = await request(app)
      .post('/api/hotel')
      .send({
        title: 'Test Hotel',  // Valid title
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

    // Check for 201 status (created successfully)
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('title', 'Test Hotel');
    expect(response.body).toHaveProperty('description', 'A nice hotel');
    expect(response.body).toHaveProperty('latitude', 40.7128);
    expect(response.body).toHaveProperty('longitude', -74.0060);
  });

  it('should return a validation error for an invalid guest count', async () => {
    const response = await request(app)
      .post('/api/hotel')
      .send({
        title: 'Test Hotel',  // Valid title
        description: 'A nice hotel',
        guestCount: -1,  // Invalid guest count
        bedroomCount: 1,
        bathroomCount: 1,
        amenities: ['wifi'],
        hostInfo: { name: 'John Doe' },
        address: '123 Main St',
        latitude: 40.7128,
        longitude: -74.0060,
      });

    // Check for 400 status and the guest count error
    expect(response.status).toBe(400);
    expect(response.body.errors).toContainEqual(expect.objectContaining({
      msg: 'Guest count must be a positive integer',
      param: 'guestCount'
    }));
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
        rooms: {}  // Invalid rooms type (not an array)
      });

    // Check for 400 status and the rooms validation error
    expect(response.status).toBe(400);
    expect(response.body.errors).toContainEqual(expect.objectContaining({
      msg: 'Rooms must be an array',
      param: 'rooms'
    }));
  });
});