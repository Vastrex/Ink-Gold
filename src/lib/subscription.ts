import { supabase } from '@/lib/supabase';

/**
 * Checks a user's subscription status and how many appointments they have this month.
 * Returns:
 *  - isPro: true if the user has a Pro subscription.
 *  - appointmentsThisMonth: number of appointments created in the current month.
 *  - limit: appointment limit (Infinity for Pro, 5 for Free).
 */
export async function checkUserSubscriptionStatus(userId: string) {
  // Fetch subscription status from users table
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('subscription_status')
    .eq('id', userId)
    .single();

  const isPro = userData?.subscription_status === 'pro';

  // Compute start of current month in ISO format (UTC)
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startISO = startOfMonth.toISOString();

  // Count appointments for this user created after start of month
  const { count, error: countError } = await supabase
    .from('appointments')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gt('created_at', startISO);

  const appointmentsThisMonth = count ?? 0;
  const limit = isPro ? Infinity : 5;

  if (userError) console.error('Error fetching subscription status:', userError);
  if (countError) console.error('Error counting appointments:', countError);

  return { isPro, appointmentsThisMonth, limit };
}
