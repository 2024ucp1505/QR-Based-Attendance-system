import express from 'express';
import {
  createSession,
  getSession,
  getAllSessions,
  closeSession
} from '../controllers/sessionController.js';

const router = express.Router();

// POST /api/create-session - Create new attendance session
router.post('/create-session', createSession);

// GET /api/session/:sessionId - Get session by ID
router.get('/session/:sessionId', getSession);

// GET /api/sessions - Get all sessions
router.get('/sessions', getAllSessions);

// PATCH /api/session/:sessionId/close - Close a session
router.patch('/session/:sessionId/close', closeSession);

export default router;

