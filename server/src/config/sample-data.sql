-- Sample Data for AI Education Platform
-- Run this AFTER running schema.sql

-- Insert sample admin user (password: admin123)
INSERT INTO users (email, password_hash, full_name, role, grade_level, school_name) VALUES
('admin@aieducation.com', '$2a$10$xZ1YqP5HV7KZvJ3RqPqX1.5qYuX3L5gJ7qPz7H5qX3L5gJ7qPz7H5', 'Admin User', 'admin', 'Teacher', 'AI Education Platform'),
('teacher@aieducation.com', '$2a$10$xZ1YqP5HV7KZvJ3RqPqX1.5qYuX3L5gJ7qPz7H5qX3L5gJ7qPz7H5', 'Demo Teacher', 'teacher', 'Teacher', 'Demo School');

-- Insert more sample subjects
INSERT INTO subjects (name, description, icon, difficulty_level) VALUES
('Physics', 'Mechanics, Thermodynamics, Optics', '⚛️', 'advanced'),
('Chemistry', 'Organic, Inorganic, Physical Chemistry', '🧪', 'advanced'),
('Biology', 'Cell Biology, Genetics, Ecology', '🧬', 'intermediate'),
('Economics', 'Micro, Macro, International Economics', '💰', 'intermediate'),
('Geography', 'Physical, Human, Environmental Geography', '🌏', 'beginner');

-- Insert sample resources for different subjects
INSERT INTO resources (subject, topic, resource_type, title, url, description, difficulty_level) VALUES
('Mathematics', 'Algebra', 'video', 'Quadratic Equations Explained', 'https://youtube.com/watch?v=example1', 'Complete guide to solving quadratic equations', 'medium'),
('Mathematics', 'Geometry', 'notes', 'Properties of Triangles PDF', 'https://example.com/triangles.pdf', 'Comprehensive notes on triangle properties', 'easy'),
('Mathematics', 'Calculus', 'practice', 'Integration Practice Set', 'https://example.com/integration', '50 integration problems with solutions', 'hard'),

('Science', 'Physics', 'video', 'Newton Laws Animation', 'https://youtube.com/watch?v=example2', 'Visual explanation of Newton''s three laws', 'medium'),
('Science', 'Chemistry', 'notes', 'Periodic Table Guide', 'https://example.com/periodic.pdf', 'Detailed periodic table with element properties', 'easy'),
('Science', 'Biology', 'practice', 'Cell Structure Quiz', 'https://example.com/cell-quiz', 'Interactive quiz on cell organelles', 'medium'),

('English', 'Grammar', 'video', 'Tenses Masterclass', 'https://youtube.com/watch?v=example3', 'Complete guide to English tenses', 'easy'),
('English', 'Literature', 'notes', 'Shakespeare Analysis', 'https://example.com/shakespeare.pdf', 'Character and theme analysis', 'hard'),
('English', 'Writing', 'article', 'Essay Writing Tips', 'https://example.com/essay-tips', '10 tips for excellent essays', 'medium'),

('History', 'World History', 'video', 'World War II Documentary', 'https://youtube.com/watch?v=example4', 'Comprehensive WW2 history', 'medium'),
('History', 'Indian History', 'notes', 'Freedom Movement Notes', 'https://example.com/freedom.pdf', 'Indian independence struggle', 'easy'),

('Computer Science', 'Programming', 'video', 'Python Basics Tutorial', 'https://youtube.com/watch?v=example5', 'Learn Python from scratch', 'easy'),
('Computer Science', 'Data Structures', 'practice', 'Linked List Problems', 'https://example.com/linkedlist', 'Practice problems on linked lists', 'hard'),
('Computer Science', 'Algorithms', 'notes', 'Sorting Algorithms Guide', 'https://example.com/sorting.pdf', 'All sorting algorithms explained', 'medium');

-- Insert sample platform analytics
INSERT INTO analytics (metric_name, metric_value, category) VALUES
('total_users', '{"count": 0}', 'users'),
('total_doubts_solved', '{"count": 0}', 'doubts'),
('total_assignments_evaluated', '{"count": 0}', 'assignments'),
('average_performance_score', '{"score": 0}', 'performance');

-- Success message
SELECT 'Sample data inserted successfully!' AS message;
