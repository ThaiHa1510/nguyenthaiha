import express, { Router } from 'express';
import { getTopScores, updateScore } from '../controllers/score.controller';

const router: Router = express.Router();

router.get('/top', getTopScores);
router.put('/', updateScore);

export default router;