import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://dknllbsnoyivczsmoesd.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_jL3HK4yUy0zpmf5MeSUDnQ_BSd0G7-T";

export const isSupabaseConfigured = !!supabaseUrl && !!supabaseAnonKey;

export const supabase = isSupabaseConfigured ? createClient(supabaseUrl!, supabaseAnonKey!) : null;
