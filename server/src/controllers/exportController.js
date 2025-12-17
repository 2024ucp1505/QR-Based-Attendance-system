import exportService from '../services/exportService.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';

/**
 * Export attendance as CSV
 * GET /api/export-attendance/:sessionId
 */
export const exportAttendanceCSV = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;

  try {
    const result = await exportService.exportAttendanceCSV(sessionId);

    // Set headers for CSV download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);
    
    res.send(result.csv);
  } catch (error) {
    if (error.message.includes('not found')) {
      throw new AppError(error.message, 404);
    }
    throw error;
  }
});

/**
 * Get attendance summary (JSON)
 * GET /api/attendance-summary/:sessionId
 */
export const getAttendanceSummary = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;

  try {
    const summary = await exportService.getAttendanceSummary(sessionId);

    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    if (error.message.includes('not found')) {
      throw new AppError(error.message, 404);
    }
    throw error;
  }
});

