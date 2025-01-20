import { sign } from 'jsonwebtoken';

export const generateToken = (user: any) => {
  const payload = { userId: user._id, email: user.email };
  if (!process.env.SECRET_KEY) {
    throw new Error('SECRET_KEY is not defined');
  }
  const token = sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
  return token;
};

export const generateRefreshToken = (user: any) => {
  const payload = { userId: user._id, email: user.email };
  if (!process.env.REFRESH_SECRET_KEY) {
    throw new Error('REFRESH_SECRET_KEY is not defined');
  }
  const refreshToken = sign(payload, process.env.REFRESH_SECRET_KEY, { expiresIn: '7d' });
  return refreshToken;
};