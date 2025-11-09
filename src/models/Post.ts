
import { Schema, model, Document } from 'mongoose';


export interface IPost extends Document {
  title: string;
  body: string;
  author: string;
  tags: string[];
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: String, required: true },
    tags: [{ type: String }], 
  },
  { timestamps: true }
);

export const Post = model<IPost>('Post', PostSchema);