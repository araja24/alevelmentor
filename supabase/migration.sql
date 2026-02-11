-- ============================================
-- Alevelmentor Waitlist — Supabase Migration
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================

-- 1. Create the waitlist table
CREATE TABLE IF NOT EXISTS waitlist_users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           TEXT UNIQUE NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT now(),
  referral_code   TEXT UNIQUE NOT NULL,
  referred_by     TEXT,
  referral_count  INTEGER DEFAULT 0
);

-- 2. Indexes for fast rank calculation
CREATE INDEX IF NOT EXISTS idx_waitlist_referral_count ON waitlist_users (referral_count DESC);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist_users (created_at ASC);

-- 3. Enable Row Level Security (service role key bypasses this)
ALTER TABLE waitlist_users ENABLE ROW LEVEL SECURITY;

-- No policies = anon key has zero access.
-- All operations go through the API route using the service role key.

-- 4. Function: calculate a user's rank
--    Rank = number of users ahead (more referrals, or same referrals but earlier) + 1
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

-- 5. Function: atomically increment a referrer's count
CREATE OR REPLACE FUNCTION increment_referral_count(p_referral_code TEXT)
RETURNS VOID
LANGUAGE sql
VOLATILE
AS $$
  UPDATE waitlist_users
  SET referral_count = referral_count + 1
  WHERE referral_code = p_referral_code;
$$;
