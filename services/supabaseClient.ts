
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Configured with provided credentials
const supabaseUrl = 'https://ihhmsaqalspmqnbzdtnw.supabase.co';
const supabaseAnonKey = 'sb_publishable_RBObI7QrXtHev-9JyO7bdw_JpChNGAO';

export const supabase: SupabaseClient | null = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseConfigured = (): boolean => {
  return !!supabase;
};
