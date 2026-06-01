"use client";

import { useState } from "react";
import { updateName, updatePassword } from "@/lib/auth";
import { usePlanMeStore } from "@/store/usePlanMeStore";
import BottomSheet from "@/components/ui/BottomSheet";
import PmIcon from "@/components/icons/PmIcon";

interface ConfigSheetProps {
  open: boolean;
  onClose: () => void;
}

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

function SaveBtn({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      style={{
        fontFamily:   "var(--font-pixelify), monospace",
        fontWeight:   700,
        fontSize:     14,
        color:        "#fff",
        background:   "var(--sage)",
        border:       "2px solid var(--brown-line)",
        borderRadius: 999,
        padding:      "9px 20px",
        cursor:       "pointer",
        boxShadow:    "0 3px 0 var(--brown-line)",
        transition:   "transform .08s, box-shadow .08s",
        marginTop:    4,
      }}
    >
      {loading ? "…" : label}
    </button>
  );
}

function FeedbackMsg({ msg }: { msg: { text: string; ok: boolean } | null }) {
  if (!msg) return null;
  return (
    <p
      style={{
        fontFamily:   "var(--font-pixelify), monospace",
        fontWeight:   700,
        fontSize:     12,
        color:        msg.ok ? "var(--sage-deep)" : "var(--pink-deep)",
        background:   msg.ok ? "var(--sage-soft)" : "var(--pink-soft)",
        border:       `1.5px solid ${msg.ok ? "var(--sage)" : "var(--pink)"}`,
        borderRadius: 10,
        padding:      "8px 12px",
        marginTop:    8,
      }}
    >
      {msg.text}
    </p>
  );
}

export default function ConfigSheet({ open, onClose }: ConfigSheetProps) {
  const user    = usePlanMeStore((s) => s.user);
  const setUser = usePlanMeStore((s) => s.setUser);

  const [name, setName]         = useState(user?.name ?? "");
  const [nameMsg, setNameMsg]   = useState<{ text: string; ok: boolean } | null>(null);
  const [nameLoading, setNameLoading] = useState(false);

  const [currentPwd, setCurrentPwd]   = useState("");
  const [newPwd, setNewPwd]           = useState("");
  const [pwdMsg, setPwdMsg]           = useState<{ text: string; ok: boolean } | null>(null);
  const [pwdLoading, setPwdLoading]   = useState(false);

  async function handleNameSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || name.trim() === user.name) return;
    setNameLoading(true);
    setNameMsg(null);

    const { error } = await updateName(user.id, name.trim());

    if (error) {
      setNameMsg({ text: error, ok: false });
    } else {
      setUser({ ...user, name: name.trim() });
      setNameMsg({ text: "Nombre actualizado.", ok: true });
    }
    setNameLoading(false);
  }

  async function handlePwdSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newPwd.length < 6) {
      setPwdMsg({ text: "La contraseña debe tener al menos 6 caracteres.", ok: false });
      return;
    }
    setPwdLoading(true);
    setPwdMsg(null);

    const { error } = await updatePassword(newPwd);

    if (error) {
      setPwdMsg({ text: error, ok: false });
    } else {
      setPwdMsg({ text: "Contraseña actualizada.", ok: true });
      setCurrentPwd("");
      setNewPwd("");
    }
    setPwdLoading(false);
  }

  return (
    <BottomSheet open={open} onClose={onClose} title="Configuración">

      {/* Avatar + nombre actual */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div
          style={{
            width:          52,
            height:         52,
            borderRadius:   "50%",
            background:     "var(--pink-soft)",
            border:         "2px solid var(--brown-line)",
            boxShadow:      "0 0 0 3px #fff",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            flexShrink:     0,
          }}
        >
          <PmIcon name="cat-wink" size={32} />
        </div>
        <div>
          <p style={{ fontFamily: "var(--font-pixelify), monospace", fontWeight: 800, fontSize: 16, color: "var(--ink)" }}>
            {user?.name}
          </p>
          <p style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-soft)" }}>
            {user?.email}
          </p>
        </div>
      </div>

      {/* Cambiar nombre */}
      <form onSubmit={handleNameSubmit} style={{ marginBottom: 24 }}>
        <p style={{ fontFamily: "var(--font-pixelify), monospace", fontWeight: 700, fontSize: 13, color: "var(--ink)", marginBottom: 10 }}>
          Cambiar nombre
        </p>
        <label style={labelStyle}>Nuevo nombre</label>
        <input
          style={inputStyle}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
        />
        <FeedbackMsg msg={nameMsg} />
        <SaveBtn loading={nameLoading} label="Guardar nombre" />
      </form>

      {/* Cambiar contraseña */}
      <form onSubmit={handlePwdSubmit} style={{ marginBottom: 90 }}>
        <p style={{ fontFamily: "var(--font-pixelify), monospace", fontWeight: 700, fontSize: 13, color: "var(--ink)", marginBottom: 10 }}>
          Cambiar contraseña
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div>
            <label style={labelStyle}>Contraseña actual</label>
            <input
              style={inputStyle}
              type="password"
              value={currentPwd}
              onChange={(e) => setCurrentPwd(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="Tu contraseña actual"
            />
          </div>
          <div>
            <label style={labelStyle}>Nueva contraseña</label>
            <input
              style={inputStyle}
              type="password"
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
              placeholder="Mínimo 6 caracteres"
            />
          </div>
        </div>
        <FeedbackMsg msg={pwdMsg} />
        <SaveBtn loading={pwdLoading} label="Guardar contraseña" />
      </form>

    </BottomSheet>
  );
}