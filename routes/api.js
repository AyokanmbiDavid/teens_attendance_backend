import express from 'express';
const router = express.Router();

import * as memberCtrl from '../controllers/memberController.js';
import * as attendCtrl from '../controllers/attendanceController.js';

router.get('/members', memberCtrl.getAllMembers);
router.post('/members', memberCtrl.addMember);
router.delete('/members/:id', memberCtrl.deleteMember);
router.put('/members/:id', memberCtrl.updateMember);      // Edit Member

router.get('/attendance', attendCtrl.getAllAttendance);
router.post('/attendance', attendCtrl.createAttendance);
router.put('/attendance/mark/:id', attendCtrl.updateAttendance)
// Add these two lines to your existing routes
router.delete('/attendance/:id', attendCtrl.deleteAttendance); // Delete Attendance Record

export default router;