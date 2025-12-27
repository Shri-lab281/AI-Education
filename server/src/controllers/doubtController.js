import { supabase } from '../config/database.js';
import { answerDoubt } from '../services/aiService.js';
import { AppError } from '../middleware/errorHandler.js';

/**
 * Submit a doubt/question
 */
export const submitDoubt = async (req, res, next) => {
  try {
    const { subject, question } = req.body;
    const studentId = req.user.userId;

    if (!subject || !question) {
      throw new AppError('Subject and question are required', 400);
    }

    // Get AI-generated answer
    const aiResponse = await answerDoubt(question, subject);

    // Save doubt query
    const { data: doubt, error } = await supabase
      .from('doubt_queries')
      .insert([
        {
          student_id: studentId,
          subject,
          question,
          ai_explanation: aiResponse.step_by_step_explanation,
          practice_questions: JSON.stringify(aiResponse.practice_questions),
          solved_examples: JSON.stringify(aiResponse.solved_examples),
          status: 'answered'
        }
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Doubt answered successfully',
      data: {
        doubt,
        ai_response: aiResponse
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get student's doubt history
 */
export const getDoubtHistory = async (req, res, next) => {
  try {
    const studentId = req.user.userId;

    const { data: doubts, error } = await supabase
      .from('doubt_queries')
      .select('*')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data: doubts
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Rate a doubt answer
 */
export const rateDoubt = async (req, res, next) => {
  try {
    const { doubtId } = req.params;
    const { rating } = req.body;

    if (rating < 1 || rating > 5) {
      throw new AppError('Rating must be between 1 and 5', 400);
    }

    const { data: updatedDoubt, error } = await supabase
      .from('doubt_queries')
      .update({ rating })
      .eq('id', doubtId)
      .eq('student_id', req.user.userId)
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      message: 'Rating submitted successfully',
      data: updatedDoubt
    });
  } catch (error) {
    next(error);
  }
};
