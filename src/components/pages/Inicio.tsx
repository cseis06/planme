"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { usePlanMeStore, selectBalance } from "@/store/usePlanMeStore";
import { getDailyPhrase, getCurrentReminder } from "@/lib/phrases";
import { signOut } from "@/lib/auth";
import Win from "@/components/ui/Win";
import PmIcon from "@/components/icons/PmIcon";
import ConfigSheet from "@/components/ui/ConfigSheet";

export default function Inicio() {
  const setActiveTab  = usePlanMeStore((s) => s.setActiveTab);
  const user          = usePlanMeStore((s) => s.user);
  const shopItems     = usePlanMeStore((s) => s.shopItems);
  const movimientos   = usePlanMeStore((s) => s.movimientos);
  const diarioEntries = usePlanMeStore((s) => s.diarioEntries);
  const eventos       = usePlanMeStore((s) => s.eventos);

  const phrase   = useMemo(() => getDailyPhrase(), []);
  const reminder = useMemo(() => getCurrentReminder(), []);

  const [menuOpen, setMenuOpen]     = useState(false);
  const [configOpen, setConfigOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Animación del menú desplegable
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    if (menuOpen) {
      gsap.set(el, { display: "flex" });
      gsap.fromTo(el,
        { opacity: 0, y: -6, scale: 0.96 },
        { opacity: 1, y: 0,  scale: 1, duration: 0.18, ease: "power2.out" }
      );
    } else {
      gsap.to(el, {
        opacity: 0, y: -6, scale: 0.96, duration: 0.14, ease: "power2.in",
        onComplete: () => gsap.set(el, { display: "none" }),
      });
    }
  }, [menuOpen]);

  // Cerrar menú al tocar afuera
  useEffect(() => {
    if (!menuOpen) return;
    function handleOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [menuOpen]);

  const pendientes = shopItems.filter((i) => !i.comprado).length;
  const { balance } = selectBalance(movimientos);

  const today     = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  const entradasSemana = diarioEntries.filter(
    (e) => new Date(e.createdAt) >= weekStart
  ).length;

  const proximoEvento = eventos
    .filter((e) => new Date(e.fecha) >= today)
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())[0];

  const fechaLabel = today.toLocaleDateString("es", {
    weekday: "long", day: "numeric", month: "short",
  });

  const formatBalance = (n: number) =>
    new Intl.NumberFormat("es", { style: "decimal", minimumFractionDigits: 0 }).format(n);

  const menuItemStyle: React.CSSProperties = {
    display:        "flex",
    alignItems:     "center",
    gap:            8,
    width:          "100%",
    padding:        "10px 14px",
    background:     "none",
    border:         "none",
    cursor:         "pointer",
    fontFamily:     "var(--font-pixelify), monospace",
    fontWeight:     700,
    fontSize:       13,
    color:          "var(--ink)",
    textAlign:      "left",
    borderRadius:   "var(--r-sm)",
    transition:     "background .12s",
  };

  return (
    <div style={{ padding: "56px 16px 24px" }}>

      {/* Botones superiores */}
      <div style={{ position: "fixed", top: 12, right: 16, zIndex: 50, display: "flex", gap: 8, alignItems: "flex-start" }}>

        {/* Notificaciones */}
        <button
          aria-label="Notificaciones"
          style={{
            width: 36, height: 36,
            borderRadius: "var(--r-sm)",
            background: "var(--paper)",
            border: "2px solid var(--brown-line)",
            boxShadow: "0 0 0 2px #fff, var(--shadow)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "var(--ink)",
          }}
        >
          <PmIcon name="envelope" size={18} />
        </button>

        {/* Configuración — abre menú */}
        <div style={{ position: "relative" }}>
          <button
            aria-label="Configuración"
            onClick={() => setMenuOpen((v) => !v)}
            style={{
              width: 36, height: 36,
              borderRadius: "var(--r-sm)",
              background: menuOpen ? "var(--pink-soft)" : "var(--paper)",
              border: "2px solid var(--brown-line)",
              boxShadow: "0 0 0 2px #fff, var(--shadow)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "var(--ink)",
              transition: "background .15s",
            }}
          >
            <PmIcon name="sparkle" size={18} />
          </button>

          {/* Menú desplegable */}
          <div
            ref={menuRef}
            style={{
              display:      "none",
              flexDirection:"column",
              position:     "absolute",
              top:          "calc(100% + 8px)",
              right:        0,
              minWidth:     170,
              background:   "var(--paper)",
              border:       "2px solid var(--brown-line)",
              borderRadius: "var(--r-md)",
              boxShadow:    "0 0 0 3px #fff, var(--shadow)",
              overflow:     "hidden",
              padding:      6,
              gap:          2,
            }}
          >
            <button
              style={menuItemStyle}
              onClick={() => { setMenuOpen(false); setConfigOpen(true); }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--cream)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              <PmIcon name="sparkle" size={16} />
              Configuración
            </button>

            <div style={{ height: 2, background: "var(--cream-2)", margin: "2px 0", borderRadius: 99 }} />

            <button
              style={{ ...menuItemStyle, color: "var(--pink-deep)" }}
              onClick={async () => { setMenuOpen(false); await signOut(); }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--pink-soft)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              <PmIcon name="bow" size={16} />
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      {/* Header — saludo */}
      <Win title="PLANME.HOME" className="mb-4">
        <div className="gingham" style={{ margin: -14, padding: 14, display: "flex", gap: 13, alignItems: "center" }}>
          <div
            style={{
              width: 72, height: 72, borderRadius: "50%", flexShrink: 0,
              background: "var(--cream-2)", border: "2px solid var(--brown-line)",
              boxShadow: "0 0 0 3px #fff",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <PmIcon name="cat-normal" size={48} />
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-pixelify), monospace", fontWeight: 700, fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--pink-deep)" }}>
              {fechaLabel}
            </p>
            <p style={{ fontFamily: "var(--font-pixelify), monospace", fontWeight: 800, fontSize: 22, color: "var(--ink)", marginTop: 2, lineHeight: 1.1 }}>
              ¡Hola, {user?.name ?? "bonita"}!
            </p>
            <p style={{ fontWeight: 600, fontSize: 13, color: "var(--ink-soft)", marginTop: 3 }}>
              Un día a la vez.
            </p>
          </div>
        </div>
      </Win>

      {/* Frase rotativa */}
      <div
        style={{
          textAlign: "center", fontFamily: "var(--font-pixelify), monospace",
          fontWeight: 700, color: "var(--ink)",
          background: "var(--cream-2)", border: "2px dashed var(--brown)",
          borderRadius: 999, padding: "11px 18px", fontSize: 14, marginBottom: 20,
        }}
      >
        {phrase}
      </div>

      {/* Sección resumen */}
      <p style={{ fontFamily: "var(--font-pixelify), monospace", fontWeight: 700, fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--pink-deep)", marginBottom: 10, paddingLeft: 4 }}>
        Tu resumen de hoy
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "auto auto auto",
          gridTemplateAreas: `
            "balance  diario"
            "balance  compras"
            "proximo  proximo"
          `,
          gap: 10, marginBottom: 16,
        }}
      >
        <button onClick={() => setActiveTab("finanzas")} style={{ gridArea: "balance", textAlign: "left", cursor: "pointer", background: "var(--cream-2)", border: "2px solid var(--brown-line)", borderRadius: "var(--r-md)", boxShadow: "0 0 0 3px #fff, var(--shadow)", padding: 16, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 152 }}>
          <PmIcon name="jar" size={32} />
          <div>
            <p style={{ fontFamily: "var(--font-pixelify), monospace", fontWeight: 800, fontSize: 17, color: "var(--ink)", marginTop: 4 }}>Balance</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: "var(--sage-deep)", marginTop: 2 }}>$ {formatBalance(balance)}</p>
          </div>
        </button>

        <button onClick={() => setActiveTab("diario")} style={{ gridArea: "diario", textAlign: "left", cursor: "pointer", background: "var(--paper)", border: "2px solid var(--brown-line)", borderRadius: "var(--r-md)", boxShadow: "0 0 0 3px #fff, var(--shadow)", padding: 14 }}>
          <PmIcon name="book" size={26} />
          <p style={{ fontFamily: "var(--font-pixelify), monospace", fontWeight: 800, fontSize: 15, color: "var(--ink)", marginTop: 4 }}>Diario</p>
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-soft)", marginTop: 2 }}>{entradasSemana} {entradasSemana === 1 ? "entrada" : "entradas"} esta semana</p>
        </button>

        <button onClick={() => setActiveTab("compras")} style={{ gridArea: "compras", textAlign: "left", cursor: "pointer", background: "var(--sage-soft)", border: "2px solid var(--brown-line)", borderRadius: "var(--r-md)", boxShadow: "0 0 0 3px #fff, var(--shadow)", padding: 14 }}>
          <PmIcon name="basket" size={26} />
          <p style={{ fontFamily: "var(--font-pixelify), monospace", fontWeight: 800, fontSize: 15, color: "var(--ink)", marginTop: 4 }}>Compras</p>
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-soft)", marginTop: 2 }}>{pendientes} {pendientes === 1 ? "ítem pendiente" : "ítems pendientes"}</p>
        </button>

        <button onClick={() => setActiveTab("eventos")} style={{ gridArea: "proximo", textAlign: "left", cursor: "pointer", background: "var(--pink-soft)", border: "2px solid var(--brown-line)", borderRadius: "var(--r-md)", boxShadow: "0 0 0 3px #fff, var(--shadow)", padding: 14, display: "flex", alignItems: "center", gap: 10 }}>
          <PmIcon name="bow" size={26} style={{ flexShrink: 0 }} />
          <div>
            <p style={{ fontFamily: "var(--font-pixelify), monospace", fontWeight: 800, fontSize: 15, color: "var(--ink)" }}>Próximo</p>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-soft)", marginTop: 2 }}>
              {proximoEvento
                ? `${proximoEvento.titulo} · ${new Date(proximoEvento.fecha).toLocaleDateString("es", { day: "numeric", month: "short" })}`
                : "Sin eventos próximos"}
            </p>
          </div>
        </button>
      </div>

      {/* Reminder rotativo */}
      <Win title="REMINDER.TODAY" variant="sage">
        <div style={{ display: "flex", gap: 11, alignItems: "center" }}>
          <div style={{ width: 46, height: 46, flexShrink: 0, borderRadius: "50%", background: "var(--cream)", border: "2px solid var(--brown-line)", boxShadow: "0 0 0 3px #fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <PmIcon name="cat-wink" size={30} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: "var(--font-pixelify), monospace", fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>{reminder.text}</p>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-soft)", marginTop: 2 }}>{reminder.note}</p>
          </div>
          <PmIcon name={reminder.icon as never} size={22} style={{ flexShrink: 0, color: "var(--ink-soft)" }} />
        </div>
      </Win>

      {/* Config bottom sheet */}
      <ConfigSheet open={configOpen} onClose={() => setConfigOpen(false)} />

    </div>
  );
}