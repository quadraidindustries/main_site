import { createClient } from '@supabase/supabase-js'

let supabaseUrl = import.meta.env.VITE_SUPABASE_URL
let supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || supabaseUrl === 'your-supabase-url-here' || !supabaseUrl.startsWith('http')) {
  console.warn('Missing or invalid Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env.local file.')
  // Fallback to a valid URL format so createClient doesn't throw a synchronous error and crash the app
  supabaseUrl = 'https://placeholder.supabase.co'
  supabaseAnonKey = 'placeholder'
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
