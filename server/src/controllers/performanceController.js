import { supabase } from '../config/database.js';
import { predictPerformance } from '../services/aiService.js';
import { AppError } from '../middleware/errorHandler.js';

/**
 * Add performance data
 */
export const addPerformance = async (req, res, next) => {
  try {
    const { testName, subject, score, maxScore, topicsCovered, testDate } = req.body;
    const studentId = req.user.userId;

    if (!testName || !subject || score === undefined || !maxScore) {
      throw new AppError('Test name, subject, score, and max score are required', 400);
    }

    // Get recent performance history for prediction
    const { data: performanceHistory } = await supabase
      .from('performance_data')
      .select('*')
      .eq('student_id', studentId)
      .order('test_date', { ascending: false })
      .limit(5);

    // Add current data to history
    const fullHistory = [
      ...performanceHistory || [],
      { test_name: testName, subject, score, max_score: maxScore }
    ];

    // Get AI prediction
    const prediction = await predictPerformance(fullHistory);

    // Save performance data
    const { data: performance, error } = await supabase
      .from('performance_data')
      .insert([
        {
          student_id: studentId,
          test_name: testName,
          subject,
          score,
          max_score: maxScore,
          topics_covered: JSON.stringify(topicsCovered || []),
          weak_chapters: JSON.stringify(prediction.weak_chapters),
          strong_chapters: JSON.stringify(prediction.strong_chapters),
          decline_patterns: JSON.stringify(prediction.decline_patterns),
          areas_needing_revision: JSON.stringify(prediction.areas_needing_revision),
          risk_level: prediction.risk_level,
          recommendations: prediction.recommendations.join('\n'),
          test_date: testDate || new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Performance data added successfully',
      data: {
        performance,
        prediction
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get student performance history
 */
export const getPerformanceHistory = async (req, res, next) => {
  try {
    const studentId = req.user.userId;

    const { data: performances, error } = await supabase
      .from('performance_data')
      .select('*')
      .eq('student_id', studentId)
      .order('test_date', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data: performances
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get performance analytics
 */
export const getAnalytics = async (req, res, next) => {
  try {
    const studentId = req.user.userId;

    const { data: performances, error } = await supabase
      .from('performance_data')
      .select('*')
      .eq('student_id', studentId)
      .order('test_date', { ascending: true });

    if (error) throw error;

    // Calculate analytics
    const subjectStats = {};
    const riskLevelCounts = { low: 0, moderate: 0, high: 0 };
    const weeklyProgress = [];

    performances.forEach(perf => {
      const percentage = (perf.score / perf.max_score) * 100;
      
      if (!subjectStats[perf.subject]) {
        subjectStats[perf.subject] = {
          totalTests: 0,
          avgScore: 0,
          totalScore: 0
        };
      }
      
      subjectStats[perf.subject].totalTests++;
      subjectStats[perf.subject].totalScore += percentage;
      subjectStats[perf.subject].avgScore = 
        subjectStats[perf.subject].totalScore / subjectStats[perf.subject].totalTests;

      if (perf.risk_level) {
        riskLevelCounts[perf.risk_level]++;
      }

      weeklyProgress.push({
        date: perf.test_date,
        score: percentage,
        subject: perf.subject
      });
    });

    res.json({
      success: true,
      data: {
        subjectStats,
        riskLevelCounts,
        weeklyProgress,
        totalTests: performances.length,
        overallAverage: 
          Object.values(subjectStats).reduce((sum, s) => sum + s.avgScore, 0) / 
          Object.keys(subjectStats).length || 0
      }
    });
  } catch (error) {
    next(error);
  }
};
