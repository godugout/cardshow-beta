
import { createClient } from '@supabase/supabase-js'

// Create and export the supabase client so we don't need to duplicate this in every file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!
export const supabase = createClient(supabaseUrl, supabaseKey)
