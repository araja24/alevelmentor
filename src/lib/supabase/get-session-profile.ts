import { cache } from "react";
import { createClient } from "./server";

/**
 * Cached getSession — deduplicates within a single server request.
 * Uses React.cache so layout + page share one Supabase auth round-trip.
 */
export const getSession = cache(async () => {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
});

/**
 * Cached getProfile — fetches the profile once per request.
 * Returns all columns needed by dashboard layout/page and onboarding.
 */
export const getProfile = cache(async (userId: string) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select(
      "id, subjects, target_grades, weekly_revision_hours, exam_board, year_group, exam_dates, primary_struggle, onboarding_completed, created_at"
    )
    .eq("id", userId)
    .maybeSingle();
  return data;
});
