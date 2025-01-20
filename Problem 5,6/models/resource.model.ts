import mongoose, { Document, Schema } from 'mongoose';

export interface Resource extends Document {
  name: string;
  description: string;
}

const resourceSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model<Resource>('Resource', resourceSchema);