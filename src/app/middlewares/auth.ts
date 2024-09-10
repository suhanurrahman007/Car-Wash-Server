import { NextFunction, Request, Response } from 'express';
import catchAsync from './catchAsync';
import AppError from '../error/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const Auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    const token = authorizationHeader.split(' ')[1]; 
    const decoded = jwt.verify(
      token,
      config?.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userEmail } = decoded;
    // checking if the user is exist
    const user = await User.isUserExists(userEmail);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default Auth;
