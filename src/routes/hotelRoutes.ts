// src/routes/hotelRoutes.ts

import express from 'express';
import upload from '../utils/upload'; // Multer upload setup
import hotelValidation from '../middleware/Validations';
import { errorHandler } from '../middleware/errorHandle';



import {
  createHotel,
  uploadImages,
  getHotel,
  updateHotelData,
  uploadRoomImages
  
} from '../controllers/hotelController';


const router = express.Router();

// POST 
//    api/hotel
router.post('/hotel',errorHandler, hotelValidation, createHotel);



// GET 
//   /api/hotel/:identifier           - Get hotel by ID or slug
router.get('/hotel/:identifier',errorHandler, getHotel);


// PUT 
//      /api/hotel/:hotelId
router.put('/hotel/:hotelId', errorHandler,hotelValidation, updateHotelData);

// image upload
//       /api/hotels/upload-images
router.post('/hotels/upload-images', upload.array('images'),errorHandler, uploadImages);


//room image upload
//       /api/hotels/upload-room-images
router.post('/hotels/upload-room-images', upload.array('roomImage'),errorHandler, uploadRoomImages);

export default router;
