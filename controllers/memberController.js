import Member from '../models/Member.js';

export const addMember = async (req, res) => {
    try {
        // This line prevents the "Cannot destructure" crash
        const { title, phone_number, date_of_birth } = req.body || {};

        if (!title || !phone_number) {
            return res.status(400).json({ 
                message: "Body is empty or missing title/phone. Check your Postman settings!" 
            });
        }

        const newMember = new Member({ title, phone_number, date_of_birth });
        await newMember.save();
        res.status(201).json(newMember);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ title: 1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add this to your existing exports
export const updateMember = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMember = await Member.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedMember) return res.status(404).json({ message: "Member not found" });
        res.json(updatedMember);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteMember = async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json({ message: "Member removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};