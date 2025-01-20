import { sign, verify} from 'jsonwebtoken';
import { JWT_MESSAGES } from './constants';
import { User } from '../models/user.model';

export const generateToken = (user: User) => {
  const { _id, email } = user;
  if (!_id || !email) {
    throw new Error(JWT_MESSAGES.USER_REQUIRED);
  }
  const payload = { userId: user?._id, email: user?.email };
  if (!process.env.SECRET_KEY) {
    throw new Error(JWT_MESSAGES.SECRET_KEY_NOT_DEFINED);
  }
  const token = sign(payload, process.env.SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN ||  '1h' });
  return token;
};

export const generateRefreshToken = (user: User) => {
  const payload = { userId: user._id, email: user.email };
  if (!process.env.REFRESH_SECRET_KEY) {
    throw new Error(JWT_MESSAGES.REFRESH_SECRET_KEY_NOT_DEFINED);
  }
  const refreshToken = sign(payload, process.env.REFRESH_SECRET_KEY, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d' });
  return refreshToken;
};

export const verifyToken = (token: string) => {
  if (!process.env.SECRET_KEY) {
    throw new Error(JWT_MESSAGES.SECRET_KEY_NOT_DEFINED);
  }
  const decoded = verify(token, process.env.SECRET_KEY);
  return decoded;
};