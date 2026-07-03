import mongoose from 'mongoose';

const ChildrenMemberSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    middlename: {
        type: String,
        default: "",
        trim: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female'],
        lowercase: true
    },
    theclass: {
        type: String,
        required: true,
        enum: ['four', 'six', 'nine'],
        lowercase: true
    },
    active: {
        type: Boolean,
        default: true
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true }, // Sends calculated age property to frontend
    toObject: { virtuals: true }
});

// Calculates current age on-the-fly from the date of birth
ChildrenMemberSchema.virtual('age').get(function () {
    if (!this.dob) return null;
    const diff = Date.now() - this.dob.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
});

const ChildrenMember = mongoose.model('ChildrenMember', ChildrenMemberSchema);
export default ChildrenMember;
