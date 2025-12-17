import express from 'express';
import {
  exportAttendanceCSV,
  getAttendanceSummary
} from '../controllers/exportController.js';

const router = express.Router();

// GET /api/export-attendance/:sessionId - Export attendance as CSV
router.get('/export-attendance/:sessionId', exportAttendanceCSV);

// GET /api/attendance-summary/:sessionId - Get attendance summary (JSON)
router.get('/attendance-summary/:sessionId', getAttendanceSummary);

export default router;

