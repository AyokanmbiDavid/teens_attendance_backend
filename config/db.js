import mongoose from 'mongoose';
import 'dotenv/config'; // This ensures env variables are loaded here too

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    
    if (!uri) {
      throw new Error("MONGO_URI is undefined. Check your .env file location!");
    }

    // Pass dbName in the options object to force Mongoose into teens_db
    const conn = await mongoose.connect(uri, {
      dbName: 'teens_db' 
    });
    
    console.log(`✅ MongoDB Connected to: ${conn.connection.name}`); // Changed .host to .name to verify the DB name
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
