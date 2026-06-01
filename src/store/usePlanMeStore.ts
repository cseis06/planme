import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Tab = "inicio" | "diario" | "compras" | "finanzas" | "eventos";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface DiarioEntry {
  id: string;
  fecha: string;
  titulo: string;
  contenido: string;
  mood?: string;
  createdAt: string;
}

export interface ShopItem {
  id: string;
  nombre: string;
  comprado: boolean;
  createdAt: string;
}

export type MovTipo = "in" | "out";

export interface Movimiento {
  id: string;
  monto: number;
  tipo: MovTipo;
  categoria: string;
  nota: string;
  fecha: string;
  createdAt: string;
}

export interface Evento {
  id: string;
  titulo: string;
  fecha: string;
  hora?: string;
  nota?: string;
  createdAt: string;
}

interface PlanMeState {
  user: User | null;
  setUser: (user: User | null) => void;

  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;

  diarioEntries: DiarioEntry[];
  addDiarioEntry: (entry: Omit<DiarioEntry, "id" | "createdAt">) => void;
  updateDiarioEntry: (id: string, data: Partial<DiarioEntry>) => void;
  deleteDiarioEntry: (id: string) => void;

  shopItems: ShopItem[];
  addShopItem: (nombre: string) => void;
  toggleShopItem: (id: string) => void;
  deleteShopItem: (id: string) => void;
  clearComprados: () => void;

  movimientos: Movimiento[];
  addMovimiento: (mov: Omit<Movimiento, "id" | "createdAt">) => void;
  deleteMovimiento: (id: string) => void;

  eventos: Evento[];
  addEvento: (evento: Omit<Evento, "id" | "createdAt">) => void;
  updateEvento: (id: string, data: Partial<Evento>) => void;
  deleteEvento: (id: string) => void;
}

const uid = () => Math.random().toString(36).slice(2, 10);

export const usePlanMeStore = create<PlanMeState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),

      activeTab: "inicio",
      setActiveTab: (tab) => set({ activeTab: tab }),

      diarioEntries: [],
      addDiarioEntry: (entry) =>
        set((s) => ({
          diarioEntries: [
            { ...entry, id: uid(), createdAt: new Date().toISOString() },
            ...s.diarioEntries,
          ],
        })),
      updateDiarioEntry: (id, data) =>
        set((s) => ({
          diarioEntries: s.diarioEntries.map((e) =>
            e.id === id ? { ...e, ...data } : e
          ),
        })),
      deleteDiarioEntry: (id) =>
        set((s) => ({
          diarioEntries: s.diarioEntries.filter((e) => e.id !== id),
        })),

      shopItems: [],
      addShopItem: (nombre) =>
        set((s) => ({
          shopItems: [
            { id: uid(), nombre, comprado: false, createdAt: new Date().toISOString() },
            ...s.shopItems,
          ],
        })),
      toggleShopItem: (id) =>
        set((s) => ({
          shopItems: s.shopItems.map((i) =>
            i.id === id ? { ...i, comprado: !i.comprado } : i
          ),
        })),
      deleteShopItem: (id) =>
        set((s) => ({ shopItems: s.shopItems.filter((i) => i.id !== id) })),
      clearComprados: () =>
        set((s) => ({ shopItems: s.shopItems.filter((i) => !i.comprado) })),

      movimientos: [],
      addMovimiento: (mov) =>
        set((s) => ({
          movimientos: [
            { ...mov, id: uid(), createdAt: new Date().toISOString() },
            ...s.movimientos,
          ],
        })),
      deleteMovimiento: (id) =>
        set((s) => ({
          movimientos: s.movimientos.filter((m) => m.id !== id),
        })),

      eventos: [],
      addEvento: (evento) =>
        set((s) => ({
          eventos: [
            { ...evento, id: uid(), createdAt: new Date().toISOString() },
            ...s.eventos,
          ],
        })),
      updateEvento: (id, data) =>
        set((s) => ({
          eventos: s.eventos.map((e) => (e.id === id ? { ...e, ...data } : e)),
        })),
      deleteEvento: (id) =>
        set((s) => ({ eventos: s.eventos.filter((e) => e.id !== id) })),
    }),
    {
      name: "planme-storage",
      partialize: (state) => ({
        activeTab:     state.activeTab,
        diarioEntries: state.diarioEntries,
        shopItems:     state.shopItems,
        movimientos:   state.movimientos,
        eventos:       state.eventos,
      }),
    }
  )
);

export const selectBalance = (movs: Movimiento[]) => {
  const ingresos = movs.filter((m) => m.tipo === "in").reduce((a, m) => a + m.monto, 0);
  const gastos   = movs.filter((m) => m.tipo === "out").reduce((a, m) => a + m.monto, 0);
  return { ingresos, gastos, balance: ingresos - gastos };
};