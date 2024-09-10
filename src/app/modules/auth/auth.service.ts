import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
import config from '../../config';

const createSignUpUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExists(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const userPassword = await User.isPasswordMatched(payload?.password, user?.password)

    if (!userPassword) {
      throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
    }
  // create token and sent to the  client

  const jwtPayload = {
    userEmail: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    user,
  };
};

export const AuthService = {
  createSignUpUserIntoDB,
  loginUser,
};
