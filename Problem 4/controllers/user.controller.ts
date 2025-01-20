import { Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import { USER_MESSAGES, ERROR_MESSAGES } from '../utils/constants';
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = new User({
    name,
    email,
    password: await bcrypt.hash(password, 10),
  });

  try {
    await user.save();
    res.json({ message: USER_MESSAGES.REGISTERED });
  } catch (error) {
    res.status(400).json({ message: USER_MESSAGES.ERROR_REGISTERING });
  }
};