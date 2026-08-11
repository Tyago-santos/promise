import { createClient } from "@supabase/supabase-js";
import { env } from "@/config/env.js";

// service_role ignora RLS: este client nunca pode ser exposto ao frontend.
export const supabaseAdmin = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});
