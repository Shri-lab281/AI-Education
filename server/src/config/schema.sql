-- Supabase SQL Schema for AI Education Platform
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table (Students & Admins)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'student' CHECK (role IN ('student', 'admin', 'teacher')),
    grade_level VARCHAR(50),
    school_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Subjects Table
CREATE TABLE subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
    created_at TIMESTAMP DEFAULT NOW()
);

-- 3. Learning Paths Table
CREATE TABLE learning_paths (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    subjects JSONB NOT NULL, -- Array of subject names
    weak_topics JSONB, -- Array of weak topics
    strong_topics JSONB, -- Array of strong topics
    study_plan JSONB NOT NULL, -- Daily/weekly schedule
    difficulty_breakdown JSONB, -- Topic difficulty analysis
    recommended_resources JSONB, -- Videos, notes, links
    target_exam_date DATE,
    progress_percentage INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 4. Doubt Queries Table
CREATE TABLE doubt_queries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    subject VARCHAR(100) NOT NULL,
    question TEXT NOT NULL,
    ai_explanation TEXT,
    diagrams_url TEXT,
    practice_questions JSONB, -- Array of generated questions
    solved_examples JSONB,
    voice_explanation_url TEXT,
    status VARCHAR(20) DEFAULT 'answered' CHECK (status IN ('pending', 'answered', 'clarified')),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP DEFAULT NOW()
);

-- 5. Assignments Table
CREATE TABLE assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    submission_type VARCHAR(20) CHECK (submission_type IN ('typed', 'handwritten', 'file')),
    file_url TEXT,
    score INTEGER,
    max_score INTEGER DEFAULT 100,
    feedback JSONB, -- Grammar, content, structure feedback
    grammar_corrections JSONB,
    plagiarism_score INTEGER,
    rubric_evaluation JSONB,
    highlighted_mistakes JSONB,
    status VARCHAR(20) DEFAULT 'submitted' CHECK (status IN ('submitted', 'evaluated', 'returned')),
    submitted_at TIMESTAMP DEFAULT NOW(),
    evaluated_at TIMESTAMP
);

-- 6. Exam Preparation Plans Table
CREATE TABLE exam_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    exam_name VARCHAR(255) NOT NULL,
    exam_date DATE NOT NULL,
    subjects JSONB NOT NULL, -- Array of subjects
    revision_plan JSONB NOT NULL, -- Day-wise plan
    topic_tests JSONB, -- Generated tests
    flashcards JSONB,
    mock_tests JSONB,
    question_predictions JSONB,
    study_reminders JSONB,
    difficulty_strategy JSONB,
    completion_percentage INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 7. Performance Data Table
CREATE TABLE performance_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    test_name VARCHAR(255),
    subject VARCHAR(100),
    score INTEGER NOT NULL,
    max_score INTEGER NOT NULL,
    topics_covered JSONB,
    weak_chapters JSONB,
    strong_chapters JSONB,
    decline_patterns JSONB,
    areas_needing_revision JSONB,
    risk_level VARCHAR(20) CHECK (risk_level IN ('low', 'moderate', 'high')),
    recommendations TEXT,
    test_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 8. Study Sessions Table (Track learning activity)
CREATE TABLE study_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    subject VARCHAR(100),
    topic VARCHAR(255),
    duration_minutes INTEGER,
    activities JSONB, -- What they did (practice, video, notes)
    session_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 9. Resources Table (Videos, Notes, Practice Questions)
CREATE TABLE resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject VARCHAR(100) NOT NULL,
    topic VARCHAR(255) NOT NULL,
    resource_type VARCHAR(50) CHECK (resource_type IN ('video', 'notes', 'practice', 'article')),
    title VARCHAR(255) NOT NULL,
    url TEXT,
    description TEXT,
    difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('easy', 'medium', 'hard')),
    created_at TIMESTAMP DEFAULT NOW()
);

-- 10. Analytics Table (Platform-wide metrics)
CREATE TABLE analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    metric_name VARCHAR(100) NOT NULL,
    metric_value JSONB NOT NULL,
    category VARCHAR(50),
    recorded_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample subjects
INSERT INTO subjects (name, description, icon, difficulty_level) VALUES
('Mathematics', 'Algebra, Geometry, Calculus, Statistics', '📐', 'intermediate'),
('Science', 'Physics, Chemistry, Biology', '🔬', 'intermediate'),
('English', 'Grammar, Literature, Writing', '📚', 'beginner'),
('History', 'World History, Geography', '🌍', 'beginner'),
('Computer Science', 'Programming, Algorithms, Data Structures', '💻', 'advanced');

-- Insert sample resources
INSERT INTO resources (subject, topic, resource_type, title, url, difficulty_level) VALUES
('Mathematics', 'Algebra', 'video', 'Introduction to Linear Equations', 'https://youtube.com/example', 'easy'),
('Science', 'Physics', 'notes', 'Newton Laws of Motion PDF', 'https://example.com/notes', 'medium'),
('Mathematics', 'Calculus', 'practice', 'Differentiation Practice Questions', 'https://example.com/practice', 'hard');

-- Create indexes for performance
CREATE INDEX idx_learning_paths_student ON learning_paths(student_id);
CREATE INDEX idx_doubt_queries_student ON doubt_queries(student_id);
CREATE INDEX idx_assignments_student ON assignments(student_id);
CREATE INDEX idx_exam_plans_student ON exam_plans(student_id);
CREATE INDEX idx_performance_student ON performance_data(student_id);
CREATE INDEX idx_study_sessions_student ON study_sessions(student_id);
CREATE INDEX idx_users_email ON users(email);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_learning_paths_updated_at BEFORE UPDATE ON learning_paths
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_exam_plans_updated_at BEFORE UPDATE ON exam_plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
