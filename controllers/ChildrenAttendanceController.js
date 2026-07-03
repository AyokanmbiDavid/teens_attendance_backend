import ChildrenAttendance from '../models/ChildrenAttendance.js';
import ChildrenMember from '../models/ChildrenMember.js';

export const createattendance = async (req, res) => {
    try {
        const { year, month, week } = req.body;
        
        // 1. Fetch only active children
        const allChildren = await ChildrenMember.find({ active: true });

        // Helper to format names using correct lowercase database fields
        const buildTitle = (m) => m.middlename ? `${m.lastname} ${m.firstname} ${m.middlename}` : `${m.lastname} ${m.firstname}`;

        // 2. Separate into specific class rosters matching your original schema
        const fourroll = allChildren.filter(m => m.theclass === 'four').map(m => ({ id: m._id.toString(), title: buildTitle(m), present: null }));
        const sixroll = allChildren.filter(m => m.theclass === 'six').map(m => ({ id: m._id.toString(), title: buildTitle(m), present: null }));
        const nineroll = allChildren.filter(m => m.theclass === 'nine').map(m => ({ id: m._id.toString(), title: buildTitle(m), present: null }));

        // 3. Save matching your exact nested attroll configuration
        const newRecord = new ChildrenAttendance({ 
            year, 
            month: month.toLowerCase(), 
            week: week.toLowerCase(), 
            attroll: [
                { theclass: 'four', roll: fourroll },
                { theclass: 'six', roll: sixroll },
                { theclass: 'nine', roll: nineroll }
            ] 
        });

        await newRecord.save();
        return res.status(201).json(newRecord);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// 2. Update Attendance Roll Records (FIXED)
export const updateattendance = async (req, res) => {
    try {
        const { id } = req.params;
        const { attroll } = req.body; // Safely destructure the incoming payload

        if (!attroll) {
            return res.status(400).json({ message: "attroll data array is required for update" });
        }

        // FIXED: Uses explicit $set operator to protect year/month fields from corruption
        const findattendance = await ChildrenAttendance.findByIdAndUpdate(
            id, 
            { $set: { attroll: attroll } }, 
            { new: true, runValidators: true }
        );

        if (!findattendance) {
            return res.status(404).json({ message: "attendance does not exist || not found" }); 
        }

        return res.json(findattendance); 
    } catch (error) {
        return res.status(500).json({ message: error.message }); 
    }
};


// 3. Get All Attendance Records
export const getallattendance = async (req, res) => {
    try {
        const history = await ChildrenAttendance.find().sort({ createdAt: -1 });
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}; 

// 4. Delete Attendance Records
export const deleteattendance = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await ChildrenAttendance.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: "Record not found" });
        res.json({ message: "Attendance record deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 5. Filter Specific Attendance (Added to handle incoming frontend POST syncs)
export const getattendance = async (req, res) => {
    try {
        const { year, month, week } = req.body;
        if (!year || !month || !week) {
            return res.status(400).json({ message: "attendance header required" });
        }

        const findatt = await ChildrenAttendance.findOne({
            year: year.toString().trim(),
            month: month.toString().trim(),
            week: week.toString().trim()
        });

        res.json(findatt);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
