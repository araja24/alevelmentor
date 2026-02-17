/**
 * In-memory daily signup counter for waitlist financial protection.
 * Resets each calendar day. For multi-instance deployments, replace with
 * Redis/Upstash or DB-backed counter so all instances share the same limit.
 */
const MAX_DAILY_SIGNUPS = 1000;

let currentDay: string | null = null;
let count = 0;

function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function checkAndIncrementDailyWaitlist(): boolean {
  const today = getTodayKey();
  if (currentDay !== today) {
    currentDay = today;
    count = 0;
  }
  if (count >= MAX_DAILY_SIGNUPS) {
    return false;
  }
  count += 1;
  return true;
}

export function isWaitlistApiEnabled(): boolean {
  const env = process.env.WAITLIST_API_ENABLED;
  if (env === "false" || env === "0") return false;
  return true;
}
