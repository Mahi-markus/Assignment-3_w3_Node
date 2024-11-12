// src/routes/hotelRoutes.ts

import express from 'express';
import upload from '../utils/upload'; // Multer upload setup
import hotelValidation from '../middleware/Validations';
import { validationResult } from 'express-validator';



import {
  createHotel,
  uploadImages,
  getHotel,
  updateHotelData,
  uploadRoomImages
  
} from '../controllers/hotelController';


const router = express.Router();

// POST /hotel
router.post('/hotel', hotelValidation, createHotel);



// GET /hotel/:identifier - Get hotel by ID or slug
router.get('/hotel/:identifier', getHotel);


// PUT /hotel/:hotelId
router.put('/hotel/:hotelId',  updateHotelData);

// image upload
router.post('/hotels/upload-images', upload.array('images'), uploadImages);


//room image upload
router.post('/hotels/upload-room-images', upload.array('roomImage'), uploadRoomImages);

export default router;
