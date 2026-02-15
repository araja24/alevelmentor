-- ============================================
-- Alevelmentor — FULL DATABASE RESET
-- Run this in: Supabase Dashboard → SQL Editor
-- WARNING: Drops ALL tables and starts fresh
-- ============================================

-- 1. Drop all existing functions to avoid conflicts
DROP FUNCTION IF EXISTS get_waitlist_rank(INTEGER, TIMESTAMPTZ);
DROP FUNCTION IF EXISTS increment_referral_count(TEXT);

-- 2. Drop ALL existing tables (Cascade to remove dependents)
DROP TABLE IF EXISTS ai_chat_logs CASCADE;
DROP TABLE IF EXISTS calendar_events CASCADE;
DROP TABLE IF EXISTS chat_messages CASCADE;
DROP TABLE IF EXISTS dream_universities CASCADE;
DROP TABLE IF EXISTS exam_attempts CASCADE;
DROP TABLE IF EXISTS extracurricular_activities CASCADE;
DROP TABLE IF EXISTS flashcards CASCADE;
DROP TABLE IF EXISTS google_auth_tokens CASCADE;
DROP TABLE IF EXISTS grade_records CASCADE;
DROP TABLE IF EXISTS paper_attempts CASCADE;
DROP TABLE IF EXISTS past_papers CASCADE;
DROP TABLE IF EXISTS pdf_extraction_logs CASCADE;
DROP TABLE IF EXISTS progress_logs CASCADE;
DROP TABLE IF EXISTS question_answers CASCADE;
DROP TABLE IF EXISTS recommended_activities CASCADE;
DROP TABLE IF EXISTS roadmap_tasks CASCADE;
DROP TABLE IF EXISTS subjects CASCADE;
DROP TABLE IF EXISTS upcoming_tests CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TABLE IF EXISTS waitlist_users CASCADE;

-- 3. Create the waitlist table
CREATE TABLE waitlist_users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           TEXT UNIQUE NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT now(),
  referral_code   TEXT UNIQUE NOT NULL,
  referred_by     TEXT,
  referral_count  INTEGER DEFAULT 0
);

-- 4. Indexes for fast rank calculation
CREATE INDEX idx_waitlist_referral_count ON waitlist_users (referral_count DESC);
CREATE INDEX idx_waitlist_created_at ON waitlist_users (created_at ASC);
CREATE INDEX idx_waitlist_referral_code ON waitlist_users (referral_code);
CREATE INDEX idx_waitlist_email ON waitlist_users (email);

-- 5. Enable Row Level Security (service role key bypasses this)
ALTER TABLE waitlist_users ENABLE ROW LEVEL SECURITY;

-- 6. Policy: Allow public read access (optional, mainly for checking rank if needed from client, but usually done via API)
-- For now, we'll keep it restricted and only allow service_role (API) to write.
-- If you want public read (e.g. for a ticker), uncomment:
-- CREATE POLICY "Public read access" ON waitlist_users FOR SELECT USING (true);

-- 7. Function: calculate a user's rank
CREATE OR REPLACE FUNCTION get_waitlist_rank(p_referral_count INTEGER, p_created_at TIMESTAMPTZ)
RETURNS INTEGER
LANGUAGE sql
STABLE
AS $$
  SELECT COALESCE(COUNT(*), 0)::INTEGER + 1
  FROM waitlist_users
  WHERE referral_count > p_referral_count
     OR (referral_count = p_referral_count AND created_at < p_created_at);
$$;

-- 8. Function: atomically increment a referrer's count
CREATE OR REPLACE FUNCTION increment_referral_count(p_referral_code TEXT)
RETURNS VOID
LANGUAGE sql
VOLATILE
AS $$
  UPDATE waitlist_users
  SET referral_count = referral_count + 1
  WHERE referral_code = p_referral_code;
$$;
