import { Router } from 'express';
import { registerUser, getUserProfile, deleteUser } from '../controllers/user.controller';

const router = Router();

router.post('/register', registerUser);
router.get('/profile',getUserProfile)
router.delete('/profile',deleteUser);
export default router;