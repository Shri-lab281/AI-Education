import express from 'express';
import { supabase } from '../config/database.js';

const router = express.Router();

/**
 * Get all exam plans for a student
 */
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('exam_plans')
      .select('*')
      .order('exam_date', { ascending: true });
    
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Create new exam plan
 */
router.post('/', async (req, res) => {
  try {
    const { examName, examDate, subjects } = req.body;
    
    const { data, error } = await supabase
      .from('exam_plans')
      .insert([{ 
        exam_name: examName,
        exam_date: examDate,
        subjects: JSON.stringify(subjects),
        revision_plan: JSON.stringify([]),
        completion_percentage: 0
      }])
      .select()
      .single();
    
    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
