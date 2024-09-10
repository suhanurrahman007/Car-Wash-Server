/* eslint-disable no-unused-vars */
// import { Model } from "mongoose";
import { User_Role } from "./user.constant";

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'admin' | 'user';
  address: string;
};


export type TUserRole = keyof typeof User_Role;
