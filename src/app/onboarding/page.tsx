import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { OnboardingShell } from '@/components/onboarding/OnboardingShell';

export const dynamic = 'force-dynamic';

export default async function OnboardingPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .maybeSingle();

  if (profile?.onboarding_completed) redirect('/dashboard');

  return (
    <OnboardingShell
      userId={session.user.id}
      userEmail={session.user.email ?? ''}
      existingProfile={profile}
    />
  );
}
