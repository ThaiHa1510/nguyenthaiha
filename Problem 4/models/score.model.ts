import mongoose, { Document, Schema } from 'mongoose';

export interface Score extends Document {
  score: number;
  description: string;
}

const scoreSchema: Schema = new Schema({
  score: { type: Number, required: true, default: 0 },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model<Score>('Score', scoreSchema);