"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { authSchema, type AuthInput } from "./schema";

type ActionResult = { error: string } | undefined;

export async function signIn(values: AuthInput): Promise<ActionResult> {
  const parsed = authSchema.safeParse(values);
  if (!parsed.success) return { error: "Datos inválidos" };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) return { error: "Email o contraseña incorrectos" };

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signUp(values: AuthInput): Promise<ActionResult> {
  const parsed = authSchema.safeParse(values);
  if (!parsed.success) return { error: "Datos inválidos" };

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp(parsed.data);

  if (error) return { error: "No se pudo crear la cuenta" };

  revalidatePath("/", "layout");
  redirect("/dashboard");
}