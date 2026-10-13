import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return (
    typeof supabaseUrl === 'string' &&
    supabaseUrl.trim().length > 0 &&
    typeof supabaseAnonKey === 'string' &&
    supabaseAnonKey.trim().length > 0 &&
    !supabaseUrl.includes('placeholder') &&
    !supabaseUrl.includes('your-project')
  );
};

// Safe client creation - if credentials are not configured, export null-safe fallback
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
