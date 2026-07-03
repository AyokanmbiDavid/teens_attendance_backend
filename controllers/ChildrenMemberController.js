import ChildrenMember from "../models/ChildrenMember.js";

// Helper function to parse common slash date strings safely into a valid MongoDB Date object
const parseDate = (dateStr) => {
    if (!dateStr) return new Date();
    const parts = dateStr.split('/');
    if (parts.length === 3) {
        // Formats D/M/YYYY or M/D/YYYY strings into a valid ISO string
        return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    }
    return new Date(dateStr);
};

// 1. GET Members for ANY class dynamically
export const getMembersByClass = async (req, res) => {
    const { theclass } = req.params; // Expects 'four', 'six', or 'nine' from URL
    try {
        const members = await ChildrenMember.find({ 
            theclass: theclass.toLowerCase(), 
            active: true 
        });
        return res.status(200).json(members);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// 2. POST (Add) Member to ANY class dynamically
export const addMemberToClass = async (req, res) => {
    const { theclass } = req.params; 
    const { firstname, lastname, middlename, dateofbirth, gender } = req.body;

    if (!firstname || !lastname || !dateofbirth || !gender) {
        return res.status(400).json({ error: 'firstname, lastname, gender, and dateofbirth are required' });
    }

    try {
        const newMember = new ChildrenMember({
            firstname,
            lastname,
            middlename: middlename || "",
            dob: parseDate(dateofbirth),
            gender: gender.toLowerCase(),
            theclass: theclass.toLowerCase() // Automatically captures class from path
        });

        await newMember.save();
        return res.status(201).json({ message: 'new member added', data: newMember });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// 3. PUT (Update) Member details dynamically within their class block
export const updateMemberInClass = async (req, res) => {
    const { theclass, id } = req.params; 
    const { firstname, lastname, middlename, dateofbirth, gender, active } = req.body;

    if (!id) return res.status(400).json({ error: 'id required' });

    try {
        const updateData = {
            firstname,
            lastname,
            middlename,
            active,
            theclass: theclass.toLowerCase()
        };

        if (dateofbirth) updateData.dob = parseDate(dateofbirth);
        if (gender) updateData.gender = gender.toLowerCase();

        const updatedMember = await ChildrenMember.findOneAndUpdate(
            { _id: id, theclass: theclass.toLowerCase() }, // Security layer ensures class containment rules match
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedMember) {
            return res.status(404).json({ error: `Member not found in class ${theclass}` });
        }

        return res.status(200).json({ message: 'member detail updated', data: updatedMember });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// 4. DELETE Member dynamically within their class container
export const deleteMemberFromClass = async (req, res) => {
    const { theclass, id } = req.params;

    if (!id) return res.status(400).json({ error: 'id required' });

    try {
        const deletedMember = await ChildrenMember.findOneAndDelete({ 
            _id: id, 
            theclass: theclass.toLowerCase() 
        });

        if (!deletedMember) {
            return res.status(404).json({ error: `Member not found in class ${theclass}` });
        }

        return res.status(200).json({ message: 'member deleted' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
