import { createClient } from "@supabase/supabase-js";

const apiKey = import.meta.env.VITE_SUPABASE_API_KEY;

export const supabaseUrl = "https://zavgobasvghlftfixxnd.supabase.co";

const supabaseKey = apiKey;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
