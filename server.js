import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import apiRoutes from './routes/api.js';

const app = express();

// These two lines are the "Cheat Code" to fix your error
app.use(cors());
app.use(express.json()); 

// Now your routes can use req.body
app.use('/api', apiRoutes);

connectDB();
app.listen(5000, () => console.log('🚀 Server running'));