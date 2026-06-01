"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import PmIcon from "@/components/icons/PmIcon";
import { usePlanMeStore, type Tab } from "@/store/usePlanMeStore";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "diario",   label: "Diario",   icon: "book"     },
  { id: "compras",  label: "Compras",  icon: "basket"   },
  { id: "inicio",   label: "Inicio",   icon: "home"     },
  { id: "finanzas", label: "Finanzas", icon: "jar"      },
  { id: "eventos",  label: "Eventos",  icon: "calendar" },
];

const BUBBLE_ACTIVE = {
  background:  "var(--pink-soft)",
  border:      "2px solid var(--brown-line)",
  boxShadow:   "0 0 0 3px #fff",
  y:           -3,
  scale:       1.08,
  opacity:     1,
};

const BUBBLE_IDLE = {
  background:  "transparent",
  border:      "2px solid transparent",
  boxShadow:   "none",
  y:           0,
  scale:       1,
  opacity:     1,
};

export default function BottomNav() {
  const activeTab    = usePlanMeStore((s) => s.activeTab);
  const setActiveTab = usePlanMeStore((s) => s.setActiveTab);

  const bubbleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const labelRefs  = useRef<(HTMLSpanElement | null)[]>([]);
  const travelRef  = useRef<HTMLSpanElement | null>(null);
  const prevIndex  = useRef<number>(TABS.findIndex((t) => t.id === activeTab));
  const mounted    = useRef(false);

  // Estado visual inicial — GSAP es dueño desde el primer render
  useEffect(() => {
    const idx = TABS.findIndex((t) => t.id === activeTab);
    bubbleRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, i === idx ? BUBBLE_ACTIVE : BUBBLE_IDLE);
    });
    labelRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { color: i === idx ? "var(--ink)" : "var(--ink-soft)" });
    });
    mounted.current = true;
  }, []);

  useEffect(() => {
    if (!mounted.current) return;

    const nextIndex = TABS.findIndex((t) => t.id === activeTab);
    const fromIndex = prevIndex.current;

    if (fromIndex === nextIndex) return;

    const fromEl  = bubbleRefs.current[fromIndex];
    const toEl    = bubbleRefs.current[nextIndex];
    const travel  = travelRef.current;
    const fromLbl = labelRefs.current[fromIndex];
    const toLbl   = labelRefs.current[nextIndex];

    if (!fromEl || !toEl || !travel) return;

    const fromRect = fromEl.getBoundingClientRect();
    const toRect   = toEl.getBoundingClientRect();

    // Burbuja viajera: aparece en el origen y vuela al destino
    gsap.set(travel, {
      display:  "block",
      x:        fromRect.left + fromRect.width  / 2,
      y:        fromRect.top  + fromRect.height / 2,
      xPercent: -50,
      yPercent: -50,
      scale:    1,
      opacity:  1,
    });

    gsap.to(travel, {
      x:        toRect.left + toRect.width  / 2,
      y:        toRect.top  + toRect.height / 2,
      duration: 0.42,
      ease:     "back.out(1.4)",
      onComplete: () => gsap.set(travel, { display: "none" }),
    });

    // Origen: se apaga
    gsap.to(fromEl, {
      ...BUBBLE_IDLE,
      duration: 0.15,
      ease:     "power2.in",
    });
    if (fromLbl) gsap.to(fromLbl, { color: "var(--ink-soft)", duration: 0.15 });

    // Destino: pop de entrada
    gsap.fromTo(
      toEl,
      { scale: 0.6, opacity: 0, y: 0 },
      {
        ...BUBBLE_ACTIVE,
        duration: 0.32,
        delay:    0.26,
        ease:     "back.out(2)",
      }
    );
    if (toLbl) gsap.to(toLbl, { color: "var(--ink)", duration: 0.15, delay: 0.26 });

    prevIndex.current = nextIndex;
  }, [activeTab]);

  return (
    <>
      <span
        ref={travelRef}
        className="fixed z-[9999] hidden pointer-events-none"
        style={{
          width:        44,
          height:       44,
          borderRadius: 16,
          background:   "var(--pink-soft)",
          border:       "2px solid var(--brown-line)",
          boxShadow:    "0 0 0 3px #fff",
        }}
      />

      <nav
        className="fixed bottom-0 inset-x-0 z-30 flex items-center"
        style={{
          height:        72,
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          background:    "var(--paper)",
          borderTop:     "2px solid var(--brown-line)",
          boxShadow:     "0 -10px 24px -18px rgba(122,72,72,.5)",
        }}
      >
        {TABS.map((tab, i) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex flex-col items-center gap-[3px] flex-1 cursor-pointer border-none bg-transparent py-1"
            style={{ fontFamily: "var(--font-pixelify), monospace", fontWeight: 700, fontSize: 10 }}
            aria-label={tab.label}
          >
            <span
              ref={(el) => { bubbleRefs.current[i] = el; }}
              className="flex items-center justify-center"
              style={{
                width:           44,
                height:          44,
                borderRadius:    16,
                transformOrigin: "center",
              }}
            >
              <PmIcon name={tab.icon as never} size={24} style={{ color: "var(--ink)" }} />
            </span>

            <span ref={(el) => { labelRefs.current[i] = el; }}>
              {tab.label}
            </span>
          </button>
        ))}
      </nav>
    </>
  );
}