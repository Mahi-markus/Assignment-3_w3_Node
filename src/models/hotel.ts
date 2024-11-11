// src/models/hotel.ts

import { Room } from './room';

export interface Hotel {
  hotelId: string;
  title: string;
  description: string;
  guestCount: number;
  bedroomCount: number;
  bathroomCount: number;
  amenities: string[];
  hostInfo: string;
  address: string;
  latitude: number;
  longitude: number;
  slug: string;
  images: string[];
  rooms: Room[]; // Array of rooms associated with the hotel
}
