'use client';

import { useRef, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export function useOnboardingAnalytics(userId: string) {
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
      const supabase = createClient();
      await supabase.from('onboarding_events').insert({
        user_id: userId,
        event_type: 'step_complete',
        step_index: stepIndex,
        metadata: { ...metadata, duration_ms: duration },
      }).then(() => {});
    },
    [userId]
  );

  const trackDropoff = useCallback(
    async (stepIndex: number) => {
      const supabase = createClient();
      await supabase.from('onboarding_events').insert({
        user_id: userId,
        event_type: 'step_dropoff',
        step_index: stepIndex,
      }).then(() => {});
    },
    [userId]
  );

  const trackEvent = useCallback(
    async (eventType: string, stepIndex: number, metadata?: Record<string, unknown>) => {
      const supabase = createClient();
      await supabase.from('onboarding_events').insert({
        user_id: userId,
        event_type: eventType,
        step_index: stepIndex,
        metadata: metadata ?? {},
      }).then(() => {});
    },
    [userId]
  );

  return { trackStepEnter, trackStepComplete, trackDropoff, trackEvent };
}
