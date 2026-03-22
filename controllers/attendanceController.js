import Attendance from '../models/Attendance.js';
import Member from '../models/Member.js';

export const createAttendance = async (req, res) => {
    try {
        const { year, month, week } = req.body;
        const members = await Member.find();
        const roll = members.map(m => ({ memberId: m._id, title: m.title, present: null }));
        const newRecord = new Attendance({ year, month, week, roll });
        await newRecord.save();
        res.status(201).json(newRecord);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const markPresent = async (req, res) => {
    try {
        const { id, memberId } = req.body;
        const record = await Attendance.findById(id);
        const person = record.roll.find(p => p.memberId.toString() === memberId);
        if (person) {
            person.present = !person.present;
            await record.save();
            res.json(record);
        } else {
            res.status(404).json({ message: "Member not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateAttendance = async (req,res) => {
    try{
        const {id} = req.params;
        const findattendance = await Attendance.findByIdAndUpdate(id, req.body, {new:true});
        if(!findattendance) return res.status(400).json({message: "attendance does not exist || not found"})
        res.json(req.body)
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
}

export const getAllAttendance = async (req, res) => {
    try {
        const history = await Attendance.find().sort({ createdAt: -1 });
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add this to your existing exports
export const deleteAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Attendance.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: "Record not found" });
        res.json({ message: "Attendance record deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};