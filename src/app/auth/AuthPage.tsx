"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
} from "@/lib/auth";
import { usePlanMeStore } from "@/store/usePlanMeStore";
import PmIcon from "@/components/icons/PmIcon";

type Mode = "login" | "register";

const inputStyle: React.CSSProperties = {
  width:        "100%",
  fontFamily:   "var(--font-pixelify), monospace",
  fontWeight:   600,
  fontSize:     14,
  color:        "var(--ink)",
  background:   "var(--cream)",
  border:       "2px solid var(--brown)",
  borderRadius: 14,
  padding:      "11px 13px",
  outline:      "none",
  boxSizing:    "border-box",
};

const labelStyle: React.CSSProperties = {
  fontFamily:   "var(--font-pixelify), monospace",
  fontWeight:   700,
  fontSize:     12,
  color:        "var(--ink-soft)",
  display:      "block",
  marginBottom: 5,
  marginLeft:   4,
};

const btnStyle: React.CSSProperties = {
  width:        "100%",
  fontFamily:   "var(--font-pixelify), monospace",
  fontWeight:   700,
  fontSize:     15,
  color:        "#fff",
  background:   "var(--pink)",
  border:       "2px solid var(--brown-line)",
  borderRadius: 999,
  padding:      "12px 18px",
  cursor:       "pointer",
  boxShadow:    "0 4px 0 var(--brown-line)",
  transition:   "transform .08s, box-shadow .08s",
};

const googleBtnStyle: React.CSSProperties = {
  ...btnStyle,
  background:   "var(--paper)",
  color:        "var(--ink)",
  boxShadow:    "0 4px 0 var(--brown-line)",
  display:      "flex",
  alignItems:   "center",
  justifyContent: "center",
  gap:          8,
};

export default function AuthPage() {
  const router    = useRouter();
  const setUser   = usePlanMeStore((s) => s.setUser);

  const [mode, setMode]         = useState<Mode>("login");
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = mode === "login"
      ? await signInWithEmail(email, password)
      : await signUpWithEmail(email, password, name);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    if (result.user) {
      setUser(result.user);
      router.replace("/");
    } else {
      setError("Revisá tu email para confirmar tu cuenta.");
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    setError(null);
    const { error } = await signInWithGoogle();
    if (error) {
      setError(error);
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight:      "100dvh",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        padding:        "24px 20px",
      }}
    >
      {/* Logo / mascota */}
      <div
        style={{
          width:          88,
          height:         88,
          borderRadius:   "50%",
          background:     "var(--pink-soft)",
          border:         "2px solid var(--brown-line)",
          boxShadow:      "0 0 0 4px #fff, var(--shadow)",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          marginBottom:   16,
        }}
      >
        <PmIcon name="cat-happy" size={56} />
      </div>

      <p
        style={{
          fontFamily:   "var(--font-pixelify), monospace",
          fontWeight:   800,
          fontSize:     26,
          color:        "var(--ink)",
          marginBottom: 4,
        }}
      >
        PlanMe
      </p>
      <p
        style={{
          fontWeight:   600,
          fontSize:     13,
          color:        "var(--ink-soft)",
          marginBottom: 28,
        }}
      >
        {mode === "login" ? "Bienvenida de vuelta." : "Crea tu cuenta."}
      </p>

      {/* Card formulario */}
      <div
        style={{
          width:        "100%",
          maxWidth:     400,
          background:   "var(--paper)",
          border:       "2px solid var(--brown-line)",
          borderRadius: "var(--r-lg)",
          boxShadow:    "0 0 0 4px #fff, var(--shadow)",
          padding:      24,
        }}
      >
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {mode === "register" && (
            <div>
              <label style={labelStyle}>Tu nombre</label>
              <input
                style={inputStyle}
                type="text"
                placeholder="¿Cómo te llamás?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
          )}

          <div>
            <label style={labelStyle}>Email</label>
            <input
              style={inputStyle}
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label style={labelStyle}>Contraseña</label>
            <input
              style={inputStyle}
              type="password"
              placeholder={mode === "register" ? "Mínimo 6 caracteres" : "Tu contraseña"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
          </div>

          {error && (
            <p
              style={{
                fontFamily:   "var(--font-pixelify), monospace",
                fontWeight:   700,
                fontSize:     12,
                color:        "var(--pink-deep)",
                background:   "var(--pink-soft)",
                border:       "1.5px solid var(--pink)",
                borderRadius: 10,
                padding:      "8px 12px",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            style={btnStyle}
            disabled={loading}
            onMouseDown={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform  = "translateY(3px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow  = "0 1px 0 var(--brown-line)";
            }}
            onMouseUp={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform  = "";
              (e.currentTarget as HTMLButtonElement).style.boxShadow  = "0 4px 0 var(--brown-line)";
            }}
          >
            {loading ? "…" : mode === "login" ? "Entrar" : "Crear cuenta"}
          </button>
        </form>

        {/* Divisor */}
        <div
          style={{
            display:       "flex",
            alignItems:    "center",
            gap:           10,
            margin:        "18px 0",
            color:         "var(--ink-soft)",
            fontWeight:    700,
            fontSize:      12,
          }}
        >
          <span style={{ flex: 1, height: 2, background: "var(--cream-2)", borderRadius: 99 }} />
          o
          <span style={{ flex: 1, height: 2, background: "var(--cream-2)", borderRadius: 99 }} />
        </div>

        {/* Google */}
        <button
          style={googleBtnStyle}
          onClick={handleGoogle}
          disabled={loading}
        >
          {/* Ícono G de Google inline, sin SVG externo */}
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.8-6.8C35.8 2.5 30.2 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.9 6.1C12.5 13.2 17.8 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17z"/>
            <path fill="#FBBC05" d="M10.6 28.6A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.1.7-4.6l-7.9-6.1A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.6 10.7l8-6.1z"/>
            <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2 1.4-4.7 2.2-7.7 2.2-6.2 0-11.5-4.2-13.4-9.9l-8 6.1C6.7 42.7 14.7 48 24 48z"/>
          </svg>
          Continuar con Google
        </button>

        {/* Toggle login/register */}
        <p
          style={{
            textAlign:  "center",
            marginTop:  20,
            fontSize:   13,
            fontWeight: 600,
            color:      "var(--ink-soft)",
          }}
        >
          {mode === "login" ? "¿No tenés cuenta?" : "¿Ya tenés cuenta?"}
          {" "}
          <button
            onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(null); }}
            style={{
              background:  "none",
              border:      "none",
              cursor:      "pointer",
              color:       "var(--pink-deep)",
              fontWeight:  700,
              fontSize:    13,
              fontFamily:  "var(--font-pixelify), monospace",
              padding:     0,
            }}
          >
            {mode === "login" ? "Registrate" : "Iniciá sesión"}
          </button>
        </p>
      </div>
    </div>
  );
}