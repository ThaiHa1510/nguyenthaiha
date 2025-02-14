import { Request, Response } from 'express';
import User from '../models/user.model';
import { generateToken, generateRefreshToken } from '../utils/token.utils';

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    res.status(401).json({ message: 'Invalid email or password' });
  }
  const userModel = new User(user);
  const token = generateToken(userModel);
  const refreshToken = generateRefreshToken(userModel);

  res.json({ token, refreshToken });
};
