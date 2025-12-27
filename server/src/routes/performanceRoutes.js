import express from 'express';
import { 
  addPerformance, 
  getPerformanceHistory, 
  getAnalytics 
} from '../controllers/performanceController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

router.post('/', addPerformance);
router.get('/', getPerformanceHistory);
router.get('/analytics', getAnalytics);

export default router;
