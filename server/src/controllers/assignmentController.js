import { supabase } from '../config/database.js';
import { evaluateAssignment } from '../services/aiService.js';
import { AppError } from '../middleware/errorHandler.js';

/**
 * Submit assignment for evaluation
 */
export const submitAssignment = async (req, res, next) => {
  try {
    const { title, subject, content, submissionType, maxScore } = req.body;
    const studentId = req.user.userId;

    if (!title || !subject || !content) {
      throw new AppError('Title, subject, and content are required', 400);
    }

    // Get AI evaluation
    const evaluation = await evaluateAssignment({
      title,
      content,
      subject,
      maxScore: maxScore || 100
    });

    // Save assignment
    const { data: assignment, error } = await supabase
      .from('assignments')
      .insert([
        {
          student_id: studentId,
          title,
          subject,
          content,
          submission_type: submissionType || 'typed',
          score: evaluation.score,
          max_score: maxScore || 100,
          feedback: JSON.stringify(evaluation.content_feedback),
          grammar_corrections: JSON.stringify(evaluation.grammar_corrections),
          plagiarism_score: evaluation.plagiarism_score,
          rubric_evaluation: JSON.stringify(evaluation),
          highlighted_mistakes: JSON.stringify(evaluation.highlighted_mistakes),
          status: 'evaluated',
          evaluated_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Assignment evaluated successfully',
      data: {
        assignment,
        evaluation
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get student's assignment history
 */
export const getAssignments = async (req, res, next) => {
  try {
    const studentId = req.user.userId;

    const { data: assignments, error } = await supabase
      .from('assignments')
      .select('*')
      .eq('student_id', studentId)
      .order('submitted_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data: assignments
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get assignment details by ID
 */
export const getAssignmentById = async (req, res, next) => {
  try {
    const { assignmentId } = req.params;

    const { data: assignment, error } = await supabase
      .from('assignments')
      .select('*')
      .eq('id', assignmentId)
      .eq('student_id', req.user.userId)
      .single();

    if (error) throw error;

    res.json({
      success: true,
      data: assignment
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all assignments (admin only)
 */
export const getAllAssignments = async (req, res, next) => {
  try {
    const { data: assignments, error } = await supabase
      .from('assignments')
      .select(`
        *,
        users (full_name, email, grade_level)
      `)
      .order('submitted_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data: assignments
    });
  } catch (error) {
    next(error);
  }
};
