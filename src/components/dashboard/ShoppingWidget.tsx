import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function ShoppingWidget() {
  return (
    <Link
      href="/shopping"
      className="col-span-2 row-span-2 flex flex-col items-center justify-center gap-2 rounded-3xl border border-brown-line/20 bg-sage-soft/40 p-4 text-center transition-colors hover:bg-sage-soft/60"
    >
      <ShoppingBag strokeWidth={1.75} className="size-7 text-sage-deep" />
      <span className="text-sm font-medium text-ink">Compras</span>
    </Link>
  );
}