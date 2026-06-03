import {
  BookHeart,
  ShoppingBag,
  Home,
  Wallet,
  CalendarDays,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { href: "/journal", label: "Diario", icon: BookHeart },
  { href: "/shopping", label: "Compras", icon: ShoppingBag },
  { href: "/dashboard", label: "Inicio", icon: Home },
  { href: "/finance", label: "Finanzas", icon: Wallet },
  { href: "/events", label: "Eventos", icon: CalendarDays },
];