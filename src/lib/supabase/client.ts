import { createBrowserClient } from "@supabase/ssr";

const SESSION_MAX_AGE = 60 * 60 * 24; // 24h en segundos

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: {
        maxAge: SESSION_MAX_AGE,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      },
    }
  );
}