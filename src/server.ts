
import express from 'express';
import * as dotenv from 'dotenv';
import { connectDB } from './utils/db';
import postRoutes from './routes/postRoutes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json()); 


app.use('/api/posts', postRoutes);


connectDB();


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});