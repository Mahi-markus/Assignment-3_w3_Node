// src/routes/hotelRoutes.ts

import express from 'express';
import upload from '../utils/upload'; // Multer upload setup
import {validateHotel, checkValidationErrors } from '../middleware/Validations';



import {
  createHotel,
  uploadImages,
  getHotel,
  updateHotelData,
  uploadRoomImages
  
} from '../controllers/hotelController';


const router = express.Router();

// POST /hotel
router.post('/hotel',createHotel);



// GET /hotel/:identifier - Get hotel by ID or slug
router.get('/hotel/:identifier', getHotel);


// PUT /hotel/:hotelId
router.put('/hotel/:hotelId',  updateHotelData);


router.post('/hotels/upload-images', upload.array('images'), uploadImages);

router.post('/hotels/upload-room-images', upload.array('roomImage'), uploadRoomImages);

export default router;
