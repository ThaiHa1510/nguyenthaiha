import { Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import { USER_MESSAGES, ERROR_MESSAGES } from '../utils/constants';
import { authenticate } from '../middlewares/auth.middleware';
export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).json({ message: USER_MESSAGES.MISSING_FIELDS });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(401).json({ message: USER_MESSAGES.USER_EXISTS });
    }
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

export const getUserProfile = async (req: Request, res: Response) => {
    authenticate(req, res, async () => {
        try {
            const userId = req.body.user_id;
            const user = await User.findById(userId);
            if (!user) {
              return res.status(404).json({ message: USER_MESSAGES.USER_NOT_FOUND });
            }
            const userProfile = {
              id: user.id,
              email: user.email,
            };
            res.json(userProfile);
          } catch (error) {
            res.status(500).json({ message:  ERROR_MESSAGES.INTERNAL_SERVER_ERROR});
          }
    });
};

export const deleteUser = async (req: Request, res: Response) => {
    authenticate(req, res, async () => {
        try {
            const userId = req.body.user_id;
            await User.findByIdAndDelete(userId);
            res.json({ message: USER_MESSAGES.USER_DELETED });
          } catch (error) {
            res.status(500).json({ message:  ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
          }
    });
};