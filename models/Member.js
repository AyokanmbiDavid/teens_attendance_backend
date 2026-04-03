import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  surname: {type: String, required: true},
  first_name : { type: String, required: true },
  middle_name : {type: String, required: true},
  gender: {type: String},
  phone_number: { type: String},
  date_of_birth: { type: String },
  email_address: {type: String},
}, { timestamps: true });

// CHANGE THIS LINE:
export default mongoose.model('Member', memberSchema);