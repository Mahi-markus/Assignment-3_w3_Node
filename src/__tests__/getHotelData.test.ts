import request from 'supertest';
import express from 'express';
import { getHotel } from '../controllers/hotelController';
import { getHotelById } from '../utils/filehandler'; // Import the actual service function

// Mock the service function
jest.mock('../utils/filehandler', () => ({
  getHotelById: jest.fn(),
}));

const app = express();
app.use(express.json()); // Parse JSON bodies

// Route definition for GET request
app.get('/api/hotel/:hotelId', getHotel);

describe('Get Hotel Data Tests', () => {
  const hotelId = '0070c91b-1d02-4d1e-97d3-3eefdc7d90e2';

  it('should get hotel data successfully', async () => {
    const hotelData = {
      hotelId,
      title: 'Test Hotel',
      slug: 'test-hotel',
      description: 'A nice hotel',
      guestCount: 2,
      bedroomCount: 1,
      bathroomCount: 1,
    };

    // Mock the service function to return hotel data
    (getHotelById as jest.Mock).mockResolvedValue(hotelData);

    const response = await request(app).get(`/api/hotel/${hotelId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(hotelData);
  });

  it('should return a 404 error if hotel is not found', async () => {
    // Mock the service function to return null (hotel not found)
    (getHotelById as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get(`/api/hotel/${hotelId}`);

   
    
  });

  it('should return 500 for unexpected errors', async () => {
    // Mock an unexpected error in the service function
    (getHotelById as jest.Mock).mockRejectedValue(new Error('Unexpected error'));

    const response = await request(app).get(`/api/hotel/${hotelId}`);

    expect(response.status).toBe(500);
    
  });
});
