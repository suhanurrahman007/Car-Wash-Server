import { Document } from "mongoose";
import { Schema } from "mongoose";

export type TBookingRequest = {
  serviceId: string;
  slotId: string;
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
};



type Customer = {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  address: string;
};

type Service = {
  _id: Schema.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  duration: number;
  isDeleted: boolean;
};

type Slot = {
  _id: Schema.Types.ObjectId;
  service: Schema.Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: string;
};

export type BookingDocument = Document & {
  customer: Customer;
  service: Service;
  slot: Slot;
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
  createdAt?: Date;
  updatedAt?: Date;
};
