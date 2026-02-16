'use client';

import { useRef, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export function useOnboardingAnalytics(userId: string) {
  const supabase = createClient();
  const stepTimers = useRef<Record<number, number>>({});

  const trackStepEnter = useCallback(
    (stepIndex: number) => {
      stepTimers.current[stepIndex] = Date.now();
    },
    []
  );

  const trackStepComplete = useCallback(
    async (stepIndex: number, metadata?: Record<string, unknown>) => {
      const enterTime = stepTimers.current[stepIndex];
      const duration = enterTime ? Date.now() - enterTime : 0;

      await supabase.from('onboarding_events').insert({
        user_id: userId,
        event_type: 'step_complete',
        step_index: stepIndex,
        metadata: { ...metadata, duration_ms: duration },
      }).then(() => {});
    },
    [userId, supabase]
  );

  const trackDropoff = useCallback(
    async (stepIndex: number) => {
      await supabase.from('onboarding_events').insert({
        user_id: userId,
        event_type: 'step_dropoff',
        step_index: stepIndex,
      }).then(() => {});
    },
    [userId, supabase]
  );

  const trackEvent = useCallback(
    async (eventType: string, stepIndex: number, metadata?: Record<string, unknown>) => {
      await supabase.from('onboarding_events').insert({
        user_id: userId,
        event_type: eventType,
        step_index: stepIndex,
        metadata: metadata ?? {},
      }).then(() => {});
    },
    [userId, supabase]
  );

  return { trackStepEnter, trackStepComplete, trackDropoff, trackEvent };
}
