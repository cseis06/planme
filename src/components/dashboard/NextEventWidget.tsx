import { CalendarDays } from "lucide-react";
import type { DashboardEvent } from "@/lib/dashboard";

type NextEventWidgetProps = {
  event: DashboardEvent | null;
};

export default function NextEventWidget({ event }: NextEventWidgetProps) {
  return (
    <div className="col-span-3 flex items-center gap-3 rounded-3xl border border-brown-line/20 bg-pink-soft/40 p-4">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-pink-soft/60">
        <CalendarDays strokeWidth={1.75} className="size-5 text-pink-deep" />
      </span>
      <div className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-medium text-ink">Próximo</span>
        {event ? (
          <span className="truncate text-xs text-ink-soft">
            {event.title} · {event.date}
          </span>
        ) : (
          <span className="text-xs text-ink-soft">Sin eventos</span>
        )}
      </div>
    </div>
  );
}