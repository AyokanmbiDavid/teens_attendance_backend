import mongoose from 'mongoose';

// Renamed from StudentRollSchema to MemberRollSchema
const MemberRollSchema = new mongoose.Schema({
    id: { 
        type: mongoose.Schema.Types.ObjectId, // Connects directly to the ChildrenMember ObjectId string
        required: true 
    },
    title: { 
        type: String, 
        required: true, 
        trim: true 
    },
    present: { 
        type: Boolean, 
        default: null 
    }
}, { _id: false });

const ClassRollSchema = new mongoose.Schema({
    theclass: { 
        type: String, 
        required: true,
        enum: ['four', 'six', 'nine']
    },
    roll: [MemberRollSchema] // Uses the updated schema reference
}, { _id: false });

const ChildrenAttendanceSchema = new mongoose.Schema({
    year: { type: String, required: true, trim: true },
    month: { type: String, required: true, trim: true },
    week: { type: String, required: true, trim: true },
    attroll: [ClassRollSchema]
}, { 
    timestamps: true 
});

const ChildrenAttendance = mongoose.model('ChildrenAttendance', ChildrenAttendanceSchema);
export default ChildrenAttendance;
