import Attendance from "../models/ChildrenAttendance.js";
import ChildrenMember from "../models/ChildrenMember.js";

// Helper function to format full display title cleanly
const buildMemberTitle = (m) => {
    return m.middlename ? `${m.lastname} ${m.firstname} ${m.middlename}` : `${m.lastname} ${m.firstname}`;
};

// 1. Get All Attendance Records
export const getallattendance = async (req, res) => {
    try {
        const records = await Attendance.find({});
        return res.status(200).json(records);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// 2. Filter Specific Attendance Periods
export const getattendance = async (req, res) => {
    const { year, month, week } = req.body;
    if (!year || !month || !week) return res.status(400).json({ error: 'attendance header required' });

    try {
        const findatt = await Attendance.find({
            year: { $regex: new RegExp(`^${year}$`, 'i') },
            month: { $regex: new RegExp(`^${month}$`, 'i') },
            week: { $regex: new RegExp(`^${week}$`, 'i') }
        });
        return res.status(200).json(findatt);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// 3. Create Attendance Matrix
export const createattendance = async (req, res) => {
    const { year, month, week } = req.body;
    if (!year || !month || !week) return res.status(400).json({ error: 'attendance header required' });

    try {
        const allChildren = await ChildrenMember.find({ active: true });

        const fourroll = allChildren
            .filter(m => m.theclass === 'four')
            .map(m => ({ id: m._id, title: buildMemberTitle(m), present: null }));

        const sixroll = allChildren
            .filter(m => m.theclass === 'six')
            .map(m => ({ id: m._id, title: buildMemberTitle(m), present: null }));

        const nineroll = allChildren
            .filter(m => m.theclass === 'nine')
            .map(m => ({ id: m._id, title: buildMemberTitle(m), present: null }));

        const newattendance = new Attendance({
            year, month, week,
            attroll: [
                { theclass: 'four', roll: fourroll },
                { theclass: 'six', roll: sixroll },
                { theclass: 'nine', roll: nineroll }
            ]
        });

        await newattendance.save();
        return res.status(201).json({ message: 'new attendance created', data: newattendance });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// 4. Update Attendance Roll Records
export const updateattendance = async (req, res) => {
    const { id } = req.params;
    const { attroll } = req.body;
    if (!id) return res.status(400).json({ error: 'attendance id required' });

    try {
        const updatedRecord = await Attendance.findByIdAndUpdate(
            id,
            { $set: { attroll: attroll } },
            { new: true, runValidators: true }
        );
        if (!updatedRecord) return res.status(404).json({ error: 'Attendance record not found' });
        return res.status(200).json({ message: 'attendance updated', data: updatedRecord });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// 5. Delete Attendance Records
export const deleteattendance = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'attendance id required' });

    try {
        const deletedRecord = await Attendance.findByIdAndDelete(id);
        if (!deletedRecord) return res.status(404).json({ error: 'Attendance record not found' });
        return res.status(200).json({ message: 'attendance deleted' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
