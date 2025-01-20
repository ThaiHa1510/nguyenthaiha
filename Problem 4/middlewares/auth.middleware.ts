import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload} from 'jsonwebtoken';
import User from '../models/user.model';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    if (!process.env.SECRET_KEY) {
      return res.status(500).json({ message: 'Internal server error. Secret key not provided.' });
    }
    const decoded = verify(token.split(' ')[1], process.env.SECRET_KEY);
    const user = await User.findById((decoded as JwtPayload).userId);

    if (!user) {
      return res.status(401).json({ message: 'Access denied. User not found.' });
    }

    req.body.user = user;
    req.body.token = token;
    req.body.user_id = (decoded as JwtPayload).userId;
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};