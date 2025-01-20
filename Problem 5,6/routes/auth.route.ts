import express, { Router } from 'express';
import { signIn } from '../controllers/auth.controller';

const router: Router = express.Router();

router.post('/login', signIn);

export default router;