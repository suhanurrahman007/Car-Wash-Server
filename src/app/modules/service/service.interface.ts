import { Types } from 'mongoose';

export type TService = {
  name: string;
  description: string;
  price: number;
  duration: number;
  isDeleted: boolean;
};

export type TSlot = {
  service: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: 'available' | 'booked' | 'canceled';
};
