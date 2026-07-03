import express from 'express';
const router = express.Router();

// 1. Check your path casing here (must match your files exactly)
import * as memberCtrl from '../controllers/memberController.js';
import * as attendCtrl from '../controllers/attendanceController.js';
import * as childrenAttendCtrl from '../controllers/ChildrenAttendanceController.js';
import * as childrenMemberCtrl from '../controllers/ChildrenMemberController.js';

// ==========================================
// ADULT MEMBER & ATTENDANCE ROUTES
// ==========================================
router.get('/members', memberCtrl.getAllMembers);
router.post('/members', memberCtrl.addMember);
router.delete('/members/:id', memberCtrl.deleteMember);
router.put('/members/:id', memberCtrl.updateMember);

router.get('/allattendance', attendCtrl.getAllAttendance);
router.post('/attendance', attendCtrl.createAttendance);
router.put('/attendance/mark/:id', attendCtrl.updateAttendance);
router.delete('/attendance/:id', attendCtrl.deleteAttendance);

// ==========================================
// CHILDREN ATTENDANCE ROUTES
// ==========================================
router.get('/children/allattendance', childrenAttendCtrl.getallattendance);
router.post('/children/attendance/filter', childrenAttendCtrl.getattendance);
router.post('/children/attendance', childrenAttendCtrl.createattendance);
router.put('/children/attendance/:id', childrenAttendCtrl.updateattendance);
router.delete('/children/attendance/:id', childrenAttendCtrl.deleteattendance);

// ==========================================
// FUSED DYNAMIC CLASS MEMBER ROUTES
// ==========================================
// Make sure these match the exported names in childrenMemberController.js
router.get('/member/:theclass', childrenMemberCtrl.getMembersByClass);
router.post('/member/:theclass', childrenMemberCtrl.addMemberToClass);
router.put('/member/:theclass/:id', childrenMemberCtrl.updateMemberInClass);
router.delete('/member/:theclass/:id', childrenMemberCtrl.deleteMemberFromClass);

export default router;
