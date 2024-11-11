// src/routes/hotelRoutes.ts

import express from 'express';
import upload from '../utils/upload'; // Multer upload setup


import {
  createHotel,
  uploadImages,
  getHotel,
  updateHotelData,
  
} from '../controllers/hotelController';


const router = express.Router();

// POST /hotel
router.post('/hotel', createHotel);



// GET /hotel/:identifier - Get hotel by ID or slug
router.get('/hotel/:identifier', getHotel);


// PUT /hotel/:hotelId
router.put('/hotel/:hotelId',  updateHotelData);


// POST /images
//router.post('/images', upload.array('images', 10), uploadImages); // Limit to 10 images


export default router;
