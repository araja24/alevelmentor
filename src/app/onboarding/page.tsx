import { redirect } from 'next/navigation';
import { getSession, getProfile } from '@/lib/supabase/get-session-profile';
import { OnboardingShell } from '@/components/onboarding/OnboardingShell';

export const dynamic = 'force-dynamic';

export default async function OnboardingPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const profile = await getProfile(session.user.id);
  if (profile?.onboarding_completed) redirect('/dashboard');

  return (
    <OnboardingShell
      userId={session.user.id}
      userEmail={session.user.email ?? ''}
      existingProfile={profile}
    />
  );
}
