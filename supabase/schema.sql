-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  year_group INTEGER CHECK (year_group IN (12, 13)),
  subjects JSONB DEFAULT '[]'::jsonb,
  exam_board TEXT DEFAULT 'Edexcel',
  exam_date DATE,
  target_grade TEXT,
  primary_obstacle TEXT,
  weekly_revision_hours INTEGER DEFAULT 12,
  onboarding_completed BOOLEAN DEFAULT FALSE
);

-- Migration helper: run these if the users table already exists
-- ALTER TABLE users ADD COLUMN IF NOT EXISTS year_group INTEGER CHECK (year_group IN (12, 13));
-- ALTER TABLE users ADD COLUMN IF NOT EXISTS primary_obstacle TEXT;
-- ALTER TABLE users ADD COLUMN IF NOT EXISTS weekly_revision_hours INTEGER DEFAULT 12;
-- ALTER TABLE users ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON users FOR INSERT WITH CHECK (auth.uid() = id);

-- 2. Topics Table (Static Data)
CREATE TABLE topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject TEXT NOT NULL,
  paper TEXT NOT NULL, -- e.g., "Pure 1", "Statistics"
  module TEXT NOT NULL, -- e.g., "Algebra", "Calculus"
  topic_name TEXT NOT NULL,
  difficulty_weight INTEGER CHECK (difficulty_weight BETWEEN 1 AND 5),
  spec_reference TEXT,
  estimated_hours NUMERIC(4, 2)
);

ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Topics are viewable by everyone" ON topics FOR SELECT USING (true);

-- 3. Past Papers Table (Static Data)
CREATE TABLE past_papers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  year INTEGER NOT NULL,
  session TEXT NOT NULL, -- "June", "November"
  paper_number INTEGER NOT NULL,
  subject TEXT NOT NULL,
  exam_board TEXT NOT NULL DEFAULT 'edexcel',
  total_marks INTEGER NOT NULL
);

ALTER TABLE past_papers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Past papers are viewable by everyone" ON past_papers FOR SELECT USING (true);
