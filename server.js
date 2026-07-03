import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import apiRoutes from './routes/api.js';
import dns from 'dns';

dns.setServers(['1.1.1.1', '8.8.8.8']);
dns.setDefaultResultOrder('ipv4first'); 
const app = express();

app.use(cors({
  origin: [
    'https://miracle-center-teenager-attendance.vercel.app',
    'https://miracle-center-children-attendance.vercel.app', // Removed trailing slash
    'http://localhost:5173',
    'http://localhost:5174'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));

app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Fix: Connect to DB first, then start the server
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000; // Dynamic port for production
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

startServer();
