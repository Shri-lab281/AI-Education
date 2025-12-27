import { supabase } from '../config/database.js';
import { generateStudyPlan } from '../services/aiService.js';
import { AppError } from '../middleware/errorHandler.js';

/**
 * Create personalized learning path
 */
export const createLearningPath = async (req, res, next) => {
  try {
    const { subjects, weakTopics, strongTopics, examDate } = req.body;
    const studentId = req.user.userId;

    // Validate input
    if (!subjects || subjects.length === 0) {
      throw new AppError('At least one subject is required', 400);
    }

    // Get user data for context
    const { data: student } = await supabase
      .from('users')
      .select('grade_level, full_name')
      .eq('id', studentId)
      .single();

    // Generate AI study plan
    const aiPlan = await generateStudyPlan({
      subjects,
      weakTopics: weakTopics || [],
      examDate,
      gradeLevel: student.grade_level
    });

    // Save learning path
    const { data: learningPath, error } = await supabase
      .from('learning_paths')
      .insert([
        {
          student_id: studentId,
          subjects: JSON.stringify(subjects),
          weak_topics: JSON.stringify(weakTopics || []),
          strong_topics: JSON.stringify(strongTopics || []),
          study_plan: JSON.stringify(aiPlan.daily_schedule),
          difficulty_breakdown: JSON.stringify(aiPlan.difficulty_breakdown),
          recommended_resources: JSON.stringify(aiPlan.recommended_resources),
          target_exam_date: examDate,
          progress_percentage: 0
        }
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Learning path created successfully',
      data: {
        ...learningPath,
        ai_generated: aiPlan
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get student's learning paths
 */
export const getLearningPaths = async (req, res, next) => {
  try {
    const studentId = req.user.userId;

    const { data: learningPaths, error } = await supabase
      .from('learning_paths')
      .select('*')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data: learningPaths
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update learning path progress
 */
export const updateProgress = async (req, res, next) => {
  try {
    const { pathId } = req.params;
    const { progressPercentage } = req.body;

    const { data: updatedPath, error } = await supabase
      .from('learning_paths')
      .update({ progress_percentage: progressPercentage })
      .eq('id', pathId)
      .eq('student_id', req.user.userId)
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      message: 'Progress updated successfully',
      data: updatedPath
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete learning path
 */
export const deleteLearningPath = async (req, res, next) => {
  try {
    const { pathId } = req.params;

    const { error } = await supabase
      .from('learning_paths')
      .delete()
      .eq('id', pathId)
      .eq('student_id', req.user.userId);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Learning path deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
