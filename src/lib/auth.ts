import { createClient } from "@/lib/supabase/browser";
import type { User } from "@/store/usePlanMeStore";

export async function signUpWithEmail(
  email: string,
  password: string,
  name: string
): Promise<{ user: User | null; error: string | null }> {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (error) return { user: null, error: error.message };
  if (!data.user) return { user: null, error: "No se pudo crear la cuenta." };

  return {
    user: {
      id:       data.user.id,
      name,
      email:    data.user.email!,
      avatarUrl: undefined,
    },
    error: null,
  };
}

export async function signInWithEmail(
  email: string,
  password: string
): Promise<{ user: User | null; error: string | null }> {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { user: null, error: error.message };
  if (!data.user) return { user: null, error: "No se pudo iniciar sesión." };

  const profile = await fetchProfile(data.user.id);

  return {
    user: profile ?? {
      id:       data.user.id,
      name:     data.user.user_metadata?.name ?? email.split("@")[0],
      email:    data.user.email!,
      avatarUrl: undefined,
    },
    error: null,
  };
}

export async function signInWithGoogle(): Promise<{ error: string | null }> {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options:  { redirectTo: `${window.location.origin}/auth/callback` },
  });

  return { error: error?.message ?? null };
}

export async function signOut(): Promise<void> {
  const supabase = createClient();
  await supabase.auth.signOut();
}

export async function fetchProfile(userId: string): Promise<User | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, name, email, avatar_url")
    .eq("id", userId)
    .single();

  if (error || !data) return null;

  return {
    id:        data.id,
    name:      data.name,
    email:     data.email,
    avatarUrl: data.avatar_url ?? undefined,
  };
}

export async function getSessionUser(): Promise<User | null> {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.user) return null;
  return fetchProfile(session.user.id);
}

export async function updateName(
  userId: string,
  name: string
): Promise<{ error: string | null }> {
  const supabase = createClient();

  const { error: dbError } = await supabase
    .from("profiles")
    .update({ name })
    .eq("id", userId);

  if (dbError) return { error: dbError.message };

  const { error: authError } = await supabase.auth.updateUser({
    data: { name },
  });

  return { error: authError?.message ?? null };
}

export async function updatePassword(
  newPassword: string
): Promise<{ error: string | null }> {
  const supabase = createClient();

  const { error } = await supabase.auth.updateUser({ password: newPassword });
  return { error: error?.message ?? null };
}