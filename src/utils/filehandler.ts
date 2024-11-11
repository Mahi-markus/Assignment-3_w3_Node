// src/utils/fileHandler.ts

import fs from 'fs';
import path from 'path';
import { Hotel } from '../models/hotel';
import multer from 'multer';

const dataDir = path.join(__dirname, '../../data');




export const saveHotel = (hotel: Hotel): Promise<void> => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(dataDir, `${hotel.hotelId}.json`);
    fs.writeFile(filePath, JSON.stringify(hotel, null, 2), 'utf8', (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

export const getHotelById = (hotelId: string): Promise<Hotel | null> => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(dataDir, `${hotelId}.json`);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') resolve(null);
        else reject(err);
      } else {
        resolve(JSON.parse(data) as Hotel);
      }
    });
  });
};

export const updateHotel = (hotelId: string, updatedData: Partial<Hotel>): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingHotel = await getHotelById(hotelId);
      if (!existingHotel) {
        return reject(new Error('Hotel not found'));
      }
      const updatedHotel = { ...existingHotel, ...updatedData };
      await saveHotel(updatedHotel);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
