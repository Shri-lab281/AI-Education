import express from 'express';
import { supabase } from '../config/database.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

/**
 * Get platform-wide analytics (admin only)
 */
router.get('/', authenticateToken, authorizeRole('admin', 'teacher'), async (req, res) => {
  try {
    // Get total users
    const { count: totalUsers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'student');

    // Get total doubts answered
    const { count: totalDoubts } = await supabase
      .from('doubt_queries')
      .select('*', { count: 'exact', head: true });

    // Get total assignments
    const { count: totalAssignments } = await supabase
      .from('assignments')
      .select('*', { count: 'exact', head: true });

    // Get performance risk distribution
    const { data: performances } = await supabase
      .from('performance_data')
      .select('risk_level');

    const riskDistribution = {
      low: performances?.filter(p => p.risk_level === 'low').length || 0,
      moderate: performances?.filter(p => p.risk_level === 'moderate').length || 0,
      high: performances?.filter(p => p.risk_level === 'high').length || 0
    };

    // Get subject popularity
    const { data: subjects } = await supabase
      .from('doubt_queries')
      .select('subject');

    const subjectCounts = {};
    subjects?.forEach(s => {
      subjectCounts[s.subject] = (subjectCounts[s.subject] || 0) + 1;
    });

    res.json({
      success: true,
      data: {
        totalUsers: totalUsers || 0,
        totalDoubts: totalDoubts || 0,
        totalAssignments: totalAssignments || 0,
        riskDistribution,
        popularSubjects: Object.entries(subjectCounts)
          .map(([subject, count]) => ({ subject, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
