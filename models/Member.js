import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  title: { type: String, required: true },
  phone_number: { type: String, required: true },
  date_of_birth: { type: String },
}, { timestamps: true });

// CHANGE THIS LINE:
export default mongoose.model('Member', memberSchema);