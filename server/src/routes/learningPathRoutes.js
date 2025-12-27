import express from 'express';
import {
  createLearningPath,
  getLearningPaths,
  updateProgress,
  deleteLearningPath
} from '../controllers/learningPathController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

router.post('/', createLearningPath);
router.get('/', getLearningPaths);
router.put('/:pathId/progress', updateProgress);
router.delete('/:pathId', deleteLearningPath);

export default router;
