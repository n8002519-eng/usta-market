import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

// If configured, create Supabase client; otherwise null
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (!isSupabaseConfigured) {
  // Helpful log for developers
  console.info(
    '💡 [USTA MARKET] Supabase credentials not found. Running in full offline LocalStorage mode.'
  );
}

/**
 * Service bridge that can seamlessly route queries to Supabase when connected,
 * or fall back to local storage.
 */
export const dataBridge = {
  isCloudConnected: isSupabaseConfigured,
  
  // Future Supabase sync helper
  syncWithCloud: async () => {
    if (!isSupabaseConfigured) {
      return { success: false, message: 'Supabase credentials are not configured.' };
    }
    // Future sync implementation
    return { success: true, message: 'Ready for Supabase sync.' };
  }
};
