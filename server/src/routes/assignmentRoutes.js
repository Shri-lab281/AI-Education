import express from 'express';
import {
  submitAssignment,
  getAssignments,
  getAssignmentById,
  getAllAssignments
} from '../controllers/assignmentController.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

router.post('/', submitAssignment);
router.get('/', getAssignments);
router.get('/all', authorizeRole('admin', 'teacher'), getAllAssignments);
router.get('/:assignmentId', getAssignmentById);

export default router;
