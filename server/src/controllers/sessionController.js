import sessionService from '../services/sessionService.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';
import { isValidCoordinate } from '../utils/locationValidator.js';

/**
 * Create a new attendance session
 * POST /api/create-session
 */
export const createSession = asyncHandler(async (req, res) => {
  const { facultyName, subject, latitude, longitude, radius } = req.body;

  // Validation
  if (!facultyName || !subject) {
    throw new AppError('Faculty name and subject are required', 400);
  }

  if (!latitude || !longitude) {
    throw new AppError('Location coordinates are required', 400);
  }

  if (!isValidCoordinate(parseFloat(latitude), parseFloat(longitude))) {
    throw new AppError('Invalid coordinates provided', 400);
  }

  const session = await sessionService.createSession({
    facultyName,
    subject,
    latitude,
    longitude,
    radius
  });

  res.status(201).json({
    success: true,
    message: 'Session created successfully',
    data: session
  });
});

/**
 * Get session by ID
 * GET /api/session/:sessionId
 */
export const getSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;
  const { withQR } = req.query;

  let session;
  
  if (withQR === 'true') {
    session = await sessionService.getSessionWithQR(sessionId);
  } else {
    session = await sessionService.getSession(sessionId);
  }

  if (!session) {
    throw new AppError('Session not found', 404);
  }

  res.json({
    success: true,
    data: session
  });
});

/**
 * Get all sessions
 * GET /api/sessions
 */
export const getAllSessions = asyncHandler(async (req, res) => {
  const sessions = await sessionService.getAllSessions();

  res.json({
    success: true,
    count: sessions.length,
    data: sessions
  });
});

/**
 * Close a session
 * PATCH /api/session/:sessionId/close
 */
export const closeSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;

  const session = await sessionService.closeSession(sessionId);

  if (!session) {
    throw new AppError('Session not found', 404);
  }

  res.json({
    success: true,
    message: 'Session closed successfully',
    data: session
  });
});

