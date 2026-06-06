import Link from "next/link";
import { Wallet } from "lucide-react";

type BalanceWidgetProps = {
  balance: number;
};

const amountFormatter = new Intl.NumberFormat("es-ES");

export default function BalanceWidget({ balance }: BalanceWidgetProps) {
  return (
    <Link
      href="/finance"
      className="col-span-4 flex flex-col justify-between rounded-3xl border border-brown-line/20 bg-paper p-4 transition-colors hover:bg-cream-2"
    >
      <span className="flex items-center gap-2 text-ink-soft">
        <Wallet strokeWidth={1.75} className="size-4" />
        <span className="text-sm font-medium">Balance</span>
      </span>
      <span className="mt-4 text-3xl text-ink">
        ${amountFormatter.format(balance)}
      </span>
    </Link>
  );
}