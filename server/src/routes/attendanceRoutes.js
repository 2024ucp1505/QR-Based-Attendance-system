import express from 'express';
import {
  markAttendance,
  getAttendance,
  checkAttendance
} from '../controllers/attendanceController.js';

const router = express.Router();

// POST /api/mark-attendance - Mark attendance for a student
router.post('/mark-attendance', markAttendance);

// GET /api/attendance/:sessionId - Get attendance for a session
router.get('/attendance/:sessionId', getAttendance);

// GET /api/check-attendance/:sessionId/:studentId - Check if student already marked attendance
router.get('/check-attendance/:sessionId/:studentId', checkAttendance);

export default router;

