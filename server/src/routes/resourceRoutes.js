import express from 'express';
import { supabase } from '../config/database.js';

const router = express.Router();

/**
 * Get all resources
 */
router.get('/', async (req, res) => {
  try {
    const { subject, difficulty_level } = req.query;
    
    let query = supabase.from('resources').select('*');
    
    if (subject) {
      query = query.eq('subject', subject);
    }
    
    if (difficulty_level) {
      query = query.eq('difficulty_level', difficulty_level);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Add new resource
 */
router.post('/', async (req, res) => {
  try {
    const { subject, topic, resourceType, title, url, description, difficultyLevel } = req.body;
    
    const { data, error } = await supabase
      .from('resources')
      .insert([{
        subject,
        topic,
        resource_type: resourceType,
        title,
        url,
        description,
        difficulty_level: difficultyLevel
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
