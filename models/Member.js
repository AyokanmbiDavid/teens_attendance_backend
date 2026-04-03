import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  surname: {type: String, required: true},
  firstName : { type: String, required: true },
  middleName : {type: String, required: true},
  gender: {type: String, required: true},
  phoneNumber: { type: String, trim: true, required: true},
  dateOfBirth: { type: String, required: true},
  emailAddress: {type: String, trim:true, lowercase: true, required:true},
}, { timestamps: true });

// CHANGE THIS LINE:
export default mongoose.model('Member', memberSchema);