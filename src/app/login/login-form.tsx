"use client";

import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { createClient } from "@/lib/supabase/client";
import { authSchema, type AuthInput } from "./schema";
import { signIn, signUp } from "./actions";

type Mode = "login" | "register";

export function LoginForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("login");
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthInput>({
    resolver: zodResolver(authSchema),
    mode: "onBlur",
  });

  const raisedButton =
  "rounded-2xl py-3 transition-all duration-150 active:translate-y-[3px] disabled:cursor-not-allowed disabled:opacity-70";

  useGSAP(
    () => {
      gsap.fromTo(
        ".auth-card",
        { opacity: 0, y: 48, rotation: -1.5 },
        { opacity: 1, y: 0, rotation: 0, duration: 0.85, ease: "back.out(1.2)" }
      );
      gsap.fromTo(
        ".auth-stagger",
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.07,
          delay: 0.25,
        }
      );
    },
    { scope: containerRef }
  );

  const onSubmit = (values: AuthInput) => {
    setServerError(null);
    startTransition(async () => {
      const action = mode === "login" ? signIn : signUp;
      const result = await action(values);
      if (result?.error) setServerError(result.error);
    });
  };

  const onGoogle = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  return (
    <div ref={containerRef} className="w-full max-w-sm">
      <div className="auth-card rounded-3xl border border-brown-line/30 bg-paper p-8 shadow-[0_10px_40px_-15px_rgba(110,86,69,0.25)]">
        <div className="auth-stagger flex flex-col items-center gap-3">
          <div className="flex size-20 items-center justify-center rounded-full border-2 border-ink/70">
            <CatLogo />
          </div>
          <h1 className="text-3xl text-ink">PlanMe</h1>
          <p className="text-sm text-ink-soft">
            {mode === "login" ? "Bienvenida de vuelta." : "Creá tu cuenta."}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-4">
          <div className="auth-stagger flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm text-ink-soft">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="tu@email.com"
              autoComplete="email"
              {...register("email")}
              className="rounded-2xl border border-brown-line/30 bg-cream px-4 py-3 text-ink placeholder:text-ink-soft/60 outline-none transition focus:border-sage focus:ring-2 focus:ring-sage-soft"
            />
            {errors.email ? (
              <span className="text-xs text-pink-deep">{errors.email.message}</span>
            ) : null}
          </div>

          <div className="auth-stagger flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm text-ink-soft">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Tu contraseña"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              {...register("password")}
              className="rounded-2xl border border-brown-line/30 bg-cream px-4 py-3 text-ink placeholder:text-ink-soft/60 outline-none transition focus:border-sage focus:ring-2 focus:ring-sage-soft"
            />
            {errors.password ? (
              <span className="text-xs text-pink-deep">{errors.password.message}</span>
            ) : null}
          </div>

          {serverError ? (
            <p className="text-center text-xs text-pink-deep">{serverError}</p>
          ) : null}

          <button
            type="submit"
            disabled={isPending}
            className={`auth-stagger mt-1 font-medium text-paper bg-gradient-to-r from-pink to-pink-deep border border-pink-deep/40 shadow-[0_4px_0_0_var(--color-pink-deep)] hover:brightness-105 active:shadow-[0_1px_0_0_var(--color-pink-deep)] ${raisedButton}`}
          >
            {isPending ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Spinner />
                Cargando...
              </span>
            ) : mode === "login" ? (
              "Entrar"
            ) : (
              "Registrarme"
            )}
          </button>
        </form>

        <div className="auth-stagger my-5 flex items-center gap-3 text-ink-soft/50">
          <span className="h-px flex-1 bg-brown-line/20" />
          <span className="text-xs">o</span>
          <span className="h-px flex-1 bg-brown-line/20" />
        </div>

        <button
          type="button"
          onClick={onGoogle}
          disabled={isPending}
          className={`auth-stagger flex w-full items-center justify-center gap-2 bg-paper text-ink border border-brown-line/50 shadow-[0_4px_0_0_var(--color-brown-line)] hover:bg-cream-2 active:shadow-[0_1px_0_0_var(--color-brown-line)] ${raisedButton}`}
        >
          <GoogleIcon />
          Continuar con Google
        </button>

        <p className="auth-stagger mt-6 text-center text-sm text-ink-soft">
          {mode === "login" ? "¿No tenés cuenta? " : "¿Ya tenés cuenta? "}
          <button
            type="button"
            onClick={() => {
              setServerError(null);
              setMode((m) => (m === "login" ? "register" : "login"));
            }}
            className="text-pink-deep underline-offset-2 transition hover:underline"
          >
            {mode === "login" ? "Registrate" : "Iniciá sesión"}
          </button>
        </p>
      </div>
    </div>
  );
}

function CatLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-10 text-ink" aria-hidden>
      <path
        d="M5 4l3 3M19 4l-3 3M5 7c-1 4 0 9 7 9s8-5 7-9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 12.5h.01M15 12.5h.01M10.5 14.5c.5.5 2.5.5 3 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-5" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C39.9 36.5 44 31 44 24c0-1.3-.1-2.3-.4-3.5z" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}