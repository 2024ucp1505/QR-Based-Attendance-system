import { v4 as uuidv4 } from 'uuid';
import storage from '../storage/index.js';
import { validateLocation } from '../utils/locationValidator.js';
import sessionService from './sessionService.js';

/**
 * Attendance Service
 * Handles business logic for marking and managing attendance
 */
class AttendanceService {
  /**
   * Mark attendance for a student
   */
  async markAttendance({ sessionId, studentId, studentName, latitude, longitude }) {
    // 1. Verify session exists and is active
    const session = await sessionService.getSession(sessionId);
    
    if (!session) {
      throw new Error('Session not found');
    }

    if (session.status !== 'active') {
      throw new Error('Session is no longer active');
    }

    // 2. Check for duplicate attendance
    const isDuplicate = await storage.checkDuplicateAttendance(sessionId, studentId);
    
    if (isDuplicate) {
      throw new Error('Attendance already marked for this session');
    }

    // 3. Validate location
    const locationResult = validateLocation(
      {
        latitude: session.latitude,
        longitude: session.longitude,
        radius: session.radius
      },
      {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      }
    );

    if (!locationResult.isValid) {
      throw new Error(locationResult.message);
    }

    // 4. Create attendance record
    const recordId = uuidv4();
    const markedAt = new Date().toISOString();

    const attendanceData = {
      recordId,
      sessionId,
      studentId,
      studentName,
      markedAt,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      distance: locationResult.distance
    };

    // 5. Store attendance
    await storage.markAttendance(attendanceData);

    return {
      success: true,
      message: locationResult.message,
      record: attendanceData
    };
  }

  /**
   * Get all attendance records for a session
   */
  async getAttendanceBySession(sessionId) {
    const session = await sessionService.getSession(sessionId);
    
    if (!session) {
      throw new Error('Session not found');
    }

    const attendance = await storage.getAttendanceBySession(sessionId);
    
    return {
      session,
      attendance,
      totalCount: attendance.length
    };
  }

  /**
   * Get single attendance record
   */
  async getAttendanceRecord(recordId) {
    return await storage.getAttendanceRecord(recordId);
  }

  /**
   * Check if student already marked attendance
   */
  async checkDuplicate(sessionId, studentId) {
    return await storage.checkDuplicateAttendance(sessionId, studentId);
  }
}

export default new AttendanceService();

