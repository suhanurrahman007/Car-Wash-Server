/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Model, Schema, model, Document } from 'mongoose';
import config from '../../config';
import { TUser } from './user.interface';

// Define UserDocument to include the instance methods
interface UserDocument extends Document, TUser {}

// Define the UserModel interface to include static methods
interface UserModel extends Model<UserDocument> {
  isUserExists(email: string): Promise<UserDocument | null>;
  isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
} 


const userSchema = new Schema<UserDocument, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExists = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<UserDocument, UserModel>('User', userSchema);
