"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import AuthGuard from "@/components/auth/AuthGuard";
import BottomNav from "@/components/layout/BottomNav";
import { usePlanMeStore, type Tab } from "@/store/usePlanMeStore";

import Inicio from "@/components/pages/Inicio";
import Diario from "@/components/pages/Diario";
import Compras from "@/components/pages/Compras";
import Finanzas from "@/components/pages/Finanzas";
import Eventos from "@/components/pages/Eventos";

const PAGES: Record<Tab, React.ReactNode> = {
  inicio:   <Inicio />,
  diario:   <Diario />,
  compras:  <Compras />,
  finanzas: <Finanzas />,
  eventos:  <Eventos />,
};

function AnimatedPage({ id, active, children }: { id: Tab; active: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !active) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 10, scale: 0.99 },
      { opacity: 1, y: 0,  scale: 1, duration: 0.28, ease: "power2.out" }
    );
  }, [active]);

  return (
    <div
      ref={ref}
      id={`page-${id}`}
      className="no-scrollbar"
      style={{
        display:    active ? "block" : "none",
        position:   "absolute",
        inset:      0,
        overflowY:  "auto",
      }}
    >
      {children}
    </div>
  );
}

function AppShell() {
  const activeTab = usePlanMeStore((s) => s.activeTab);

  return (
    <main style={{ position: "relative", minHeight: "100dvh" }}>
      <div style={{ position: "relative", paddingBottom: 72, minHeight: "100dvh" }}>
        {(Object.keys(PAGES) as Tab[]).map((tab) => (
          <AnimatedPage key={tab} id={tab} active={tab === activeTab}>
            {PAGES[tab]}
          </AnimatedPage>
        ))}
      </div>
      <BottomNav />
    </main>
  );
}

export default function Home() {
  return (
    <AuthGuard>
      <AppShell />
    </AuthGuard>
  );
}