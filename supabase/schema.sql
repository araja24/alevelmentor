-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ═══════════════════════════════════════════════
--  PROFILES TABLE (onboarding + user preferences)
-- ═══════════════════════════════════════════════
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  year_group TEXT CHECK (year_group IN ('12', '13')),
  exam_board TEXT,
  subjects JSONB DEFAULT '[]'::jsonb,
  exam_dates JSONB DEFAULT '{}'::jsonb,
  target_grades JSONB DEFAULT '{}'::jsonb,
  primary_struggle TEXT CHECK (
    primary_struggle IN (
      'Procrastination',
      'Lack of structure',
      'Poor revision techniques',
      'Time management',
      'Burnout'
    )
  ),
  weekly_revision_hours INTEGER CHECK (weekly_revision_hours BETWEEN 5 AND 40),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);


-- ═══════════════════════════════════════════════
--  ONBOARDING EVENTS (analytics instrumentation)
-- ═══════════════════════════════════════════════
CREATE TABLE onboarding_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  step_index INTEGER,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE onboarding_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own events"
  ON onboarding_events FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own events"
  ON onboarding_events FOR SELECT USING (auth.uid() = user_id);
