import express from 'express';
import { submitDoubt, getDoubtHistory, rateDoubt } from '../controllers/doubtController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

router.post('/', submitDoubt);
router.get('/', getDoubtHistory);
router.put('/:doubtId/rate', rateDoubt);

export default router;
