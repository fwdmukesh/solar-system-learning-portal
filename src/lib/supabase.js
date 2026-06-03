import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

export async function getChildProfile() {
  const { data, error } = await supabase
    .from('child_profiles')
    .select('*')
    .single()

  if (error) throw error
  return data
}

export async function saveProgress(progress) {
  const { data, error } = await supabase
    .from('progress')
    .upsert(progress)

  if (error) throw error
  return data
}

export async function getQuizScores() {
  const { data, error } = await supabase
    .from('quiz_scores')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}
