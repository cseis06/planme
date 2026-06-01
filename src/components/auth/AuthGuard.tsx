"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { fetchProfile } from "@/lib/auth";
import { usePlanMeStore } from "@/store/usePlanMeStore";
import AuthPage from "@/app/auth/AuthPage";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const setUser = usePlanMeStore((s) => s.setUser);
  const user    = usePlanMeStore((s) => s.user);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    let settled = false;

    function done() {
      if (!settled) {
        settled = true;
        setChecking(false);
      }
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          const profile = await fetchProfile(session.user.id);
          setUser(profile ?? {
            id:    session.user.id,
            name:  session.user.user_metadata?.name ?? session.user.email!.split("@")[0],
            email: session.user.email!,
          });
        } else {
          setUser(null);
        }
        done();
      }
    );

    // Timeout de seguridad: si onAuthStateChange no dispara en 3s
    // (sin conexión, error de red), salimos del estado de carga igual.
    const timeout = setTimeout(done, 3000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, [setUser]);

  if (checking) {
    return <div suppressHydrationWarning style={{ minHeight: "100dvh" }} />;
  }

  if (!user) return <AuthPage />;

  return <>{children}</>;
}