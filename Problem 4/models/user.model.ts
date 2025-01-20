import mongoose, { Document, Schema } from "mongoose";
import bcrypt from 'bcrypt';

var userSchema: Schema = new Schema({
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        scores: { type: String, ref: 'Score' },
  });

export interface User extends Document {

  email: string;

  password: string;

  comparePassword(candidatePassword: string): Promise<boolean>;

}

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {

    return bcrypt.compare(candidatePassword, this.password);
  
  };
export default mongoose.model<User>('User', userSchema);