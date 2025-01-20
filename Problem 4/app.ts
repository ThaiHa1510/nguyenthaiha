import express, { Application } from 'express';
import mongoose from 'mongoose';
import resourceRoute from './routes/resource.route';
import scoreRoute from './routes/score.route';
import userRoute from './routes/user.route';
import authRoute from './routes/auth.route';
import dotenv from 'dotenv';

dotenv.config();
const app: Application = express();

app.use(express.json());
app.use('/api/resources', resourceRoute);
app.use('/api/scores', scoreRoute);
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
mongoose.connect('mongodb://localhost:27017/mydatabase');

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(err);
});

db.once('open', () => {
  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
});
