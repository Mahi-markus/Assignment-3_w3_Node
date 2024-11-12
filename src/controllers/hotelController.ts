import fs from 'fs';
import { Request, Response, NextFunction } from 'express';
import { Hotel } from '../models/hotel';

import { Room } from '../models/room'; 
import { saveHotel, getHotelById,updateHotel} from '../utils/filehandler';

import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { errorHandler } from '../middleware/errorHandle';
//import { body, validationResult } from 'express-validator';





// Validation middleware



// Create a new hotel with room information
export const createHotel = async (req: Request, res: Response, next: NextFunction) => {
  try {

  //Check validation results

  
 
  //for create purpose
    const hotelData: Hotel = req.body;

    // Generate unique hotel ID and slug for the hotel
    const hotelId = uuidv4();
    const slug = slugify(hotelData.title, { lower: true, strict: true });

    // Prepare room details
    const rooms = hotelData.rooms?.map((room) => ({
      roomSlug: slugify(room.roomTitle, { lower: true, strict: true }),
      roomImage: room.roomImage || '',
      roomTitle: room.roomTitle,
      roomBedroomCount: room.roomBedroomCount,
    })) || [];




    const newHotel: Hotel = {
      hotelId,
      title: hotelData.title,
      description: hotelData.description,
      guestCount: hotelData.guestCount,
      bedroomCount: hotelData.bedroomCount,
      bathroomCount: hotelData.bathroomCount,
      amenities: hotelData.amenities || [],
      hostInfo: hotelData.hostInfo,
      address: hotelData.address,
      latitude: hotelData.latitude,
      longitude: hotelData.longitude,
      slug,
      images: [], // Initialize with empty images
      rooms, // Adding the rooms details
    };

    await saveHotel(newHotel);
    res.status(201).json(newHotel);
  } catch (error) {
    console.error('Error creating hotel:', error);
    next(error);
  }
};







// Get hotel by ID or slug
// src/controllers/hotelController.ts

export const getHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { identifier } = req.params; // `identifier` should be passed in the URL
      let hotel = await getHotelById(identifier); 
      if (!hotel) {
        // Logic to search by slug
        res.status(200).json("not found");
      }
      res.status(200).json(hotel);
    } catch (error) {
      next(error);
    }
  };
  







// Upload images for a hotel


// Handle image uploads and associate them with a hotel
// Handle image uploads and associate them with a hotel
export const uploadImages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
      const { hotelId } = req.body;

      if (!hotelId) {
          res.status(400).json({ message: 'hotelId is required' });
          return; // End early to avoid TypeScript error
      }

      const hotel = await getHotelById(hotelId);
      if (!hotel) {
          res.status(404).json({ message: 'Hotel not found' });
          return;
      }

      if (!req.files || !(req.files instanceof Array)) {
          res.status(400).json({ message: 'No images uploaded' });
          return;
      }

      // Generate URLs for uploaded images
      const imageUrls = (req.files as Express.Multer.File[]).map((file) => {
          return `${req.protocol}://${req.get('host')}/images/${file.filename}`;
      });

      // Add the uploaded image URLs to the hotel
      hotel.images = hotel.images.concat(imageUrls);

      await saveHotel(hotel); // Save the updated hotel with new images

      res.status(200).json({ images: imageUrls });
  } catch (error) {
      console.error('Error uploading images:', error);
      next(error); // Use next(error) and cast as void to satisfy TypeScript
  }
};


//room image upload
// Handle image uploads and associate them with a hotel for room
export const uploadRoomImages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {



    const { hotelId, roomSlug } = req.body;

   

    // Check if hotelId and roomSlug are provided
    if (!hotelId || !roomSlug) {
      res.status(400).json({ message: 'hotelId and roomSlug are required' });
      return;
    }

    // Find the hotel by hotelId
    const hotel = await getHotelById(hotelId);
    if (!hotel) {
      res.status(404).json({ message: 'Hotel not found' });
      return;
    }

    // Find the room by roomSlug
    const room = hotel.rooms.find(r => r.roomSlug === roomSlug);
    if (!room) {
      res.status(404).json({ message: 'Room not found' });
      return;
    }

    // If no images are uploaded
    if (!req.files || !(req.files instanceof Array)) {
      res.status(400).json({ message: 'No images uploaded' });
      return;
    }

    // Generate URLs for uploaded images
    const imageUrls = (req.files as Express.Multer.File[]).map((file) => {
      return `${req.protocol}://${req.get('host')}/images/${file.filename}`;
    });

    // Add the uploaded image URLs to the room's roomImage array
    if (!room.roomImage) {
      room.roomImage = []; // Ensure roomImage array exists
    }
    room.roomImage = room.roomImage.concat(imageUrls); // Append the new images

    // Save the updated hotel with the new room images
    await saveHotel(hotel);

    res.status(200).json({ roomSlug, roomImages: imageUrls });
  } catch (error) {
    console.error('Error uploading room images:', error);
    next(error);
  }
};













//////
  export const updateHotelData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { hotelId } = req.params;
      const updatedData: Partial<Hotel> = req.body;
  
      // Generate slug if title is updated
      if (updatedData.title) {
        updatedData.slug = slugify(updatedData.title, { lower: true, strict: true });
      }
  
      // Update hotel data
      await updateHotel(hotelId, updatedData);
  
      // Retrieve updated hotel data
      const updatedHotel = await getHotelById(hotelId);
      res.status(200).json(updatedHotel);
    } catch (error: any) {  // Type 'error' as 'any' to access properties
      if (error instanceof Error && error.message === 'Hotel not found') {
        res.status(404).json({ message: 'Hotel not found' });
      } else {
        next(error);
      }
    }
  };




