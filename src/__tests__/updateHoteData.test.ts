import request from 'supertest';
import express from 'express';

import { updateHotelData, getHotel } from '../controllers/hotelController';
import { updateHotel, getHotelById } from '../utils/filehandler'; // Import the actual service functions for mock

// Mock the service functions
jest.mock('../utils/filehandler', () => ({
  updateHotel: jest.fn(),
  getHotelById: jest.fn(),
}));

const app = express();
app.use(express.json()); // Parse JSON bodies

// Route definition
app.put('/api/hotel/:hotelId', updateHotelData);

describe('Update Hotel Data Tests', () => {
  const hotelId = '0070c91b-1d02-4d1e-97d3-3eefdc7d90e2';

  it('should update hotel data successfully', async () => {
    const updatedData = {
      title: 'Updated Hotel Title',
      description: 'Updated description',
      guestCount: 4,
    };

    const updatedHotel = {
      hotelId,
      title: 'Updated Hotel Title',
      slug: 'updated-hotel-title',
      description: 'Updated description',
      guestCount: 4,
      bedroomCount: 2,
      bathroomCount: 1,
    };

    // Mocking the service function responses
    (updateHotel as jest.Mock).mockResolvedValue(updatedHotel);
    (getHotelById as jest.Mock).mockResolvedValue(updatedHotel);

    const response = await request(app)
      .put(`/api/hotel/${hotelId}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedHotel);
  });

  it('should generate a slug when the title is updated', async () => {
    const updatedData = { title: 'New Unique Hotel Title' };
    const updatedHotel = {
      hotelId,
      title: 'New Unique Hotel Title',
      slug: 'new-unique-hotel-title', // Ensure the slug is correctly generated
    };

    // Mocking service function responses
    (updateHotel as jest.Mock).mockResolvedValue(updatedHotel);
    (getHotelById as jest.Mock).mockResolvedValue(updatedHotel);

    const response = await request(app)
      .put(`/api/hotel/${hotelId}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.slug).toBe('new-unique-hotel-title');
  });

  it('should return a 404 error if hotel is not found', async () => {
    // Mocking the service function to reject when hotel is not found
    (updateHotel as jest.Mock).mockRejectedValue(new Error('Hotel not found'));
    (getHotelById as jest.Mock).mockResolvedValue(null); // Simulate no hotel found

    const response = await request(app)
      .put(`/api/hotel/${hotelId}`)
      .send({ title: 'Nonexistent Hotel' });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Hotel not found');
  });

  it('should return 500 for unexpected errors', async () => {
    // Mocking an unexpected error in the service function
    (updateHotel as jest.Mock).mockRejectedValue(new Error('Unexpected error'));

    const response = await request(app)
      .put(`/api/hotel/${hotelId}`)
      .send({ title: 'Error Hotel' });

    expect(response.status).toBe(500);

  });
});
