import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export class SupabaseConfigError extends Error {
  constructor(message = "Supabase environment variables are not configured") {
    super(message);
    this.name = "SupabaseConfigError";
  }
}

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseServiceKey);

// Admin client with service role key - bypasses RLS
export const createAdminClient = (): SupabaseClient => {
  if (!isSupabaseConfigured) {
    throw new SupabaseConfigError();
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};

let cachedClient: SupabaseClient | null = null;

export const getSupabaseAdmin = (): SupabaseClient => {
  if (!cachedClient) {
    cachedClient = createAdminClient();
  }
  return cachedClient;
};
