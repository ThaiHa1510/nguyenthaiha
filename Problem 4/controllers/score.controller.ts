import { Request, Response } from 'express';
import Score from '../models/score.model';
import { RESOURCE_MESSAGES, ERROR_MESSAGES } from '../utils/constants';
import { authenticate } from '../middlewares/auth.middleware';
// import { updateScoreToRedis , getTopScoresFromRedis} from '../utils/score.utils'
export const getTopScores = async (req: Request, res: Response) => {
  authenticate(req, res, async () => {
    const topUsers = await Score.find()
      .sort({ score: -1 })
      .limit(10)
      .populate('scores');
    //  Can use the following code to get the top 10 users . Use redis to store the top 10 users
    //  const topUsers = await getTopScoresFromRedis();
    try {
      res.status(201).json(topUsers);
    } catch (err) {
      res.status(400).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  });
};

export const getScore = async (req: Request, res: Response) => {
  authenticate(req, res, async () => {
    const id = req.params.user_id;
    const score = await Score.findOne({ user_id: id}).exec();
    try {
      if (!score) {
        const score = new Score(req.body);
        await score.save();
        res.status(201).json(score);
      } else {
        res.json(score);
      }
    } catch (err) {
      res.status(400).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    };
  });
}

export const updateScore = async (req: Request, res: Response) => {
  authenticate(req, res, async () => {
    const user_id = req.body.user_id;
    const resource = await Score.findOneAndUpdate({user_id: user_id}, req.body, { new: true }).exec();
    // update the score in redis
    // updateScoreToRedis(req.body);
    if (!resource) {
      res.status(404).json({ message: RESOURCE_MESSAGES.NOT_FOUND });
    } else {
      res.json(resource);
    }
  });
};

