import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function isUserSubscribed(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('subscribers')
    .select('subscribed')
    .eq('user_id', userId)
    .single()

  if (error || !data) return false
  return data.subscribed === true
}