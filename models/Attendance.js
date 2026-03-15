import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  year: { type: String, required: true },
  month: { type: String, required: true },
  week: { type: String, required: true },
  roll: [{
    memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
    title: String,
    present: { type: Boolean, default: null }
  }]
}, { timestamps: true });

// CHANGE THIS LINE:
export default mongoose.model('Attendance', attendanceSchema);