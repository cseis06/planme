"use client";

import { useEffect, useState } from "react";
import { Cat } from "lucide-react";
import WindowChrome from "./WindowChrome";

const REMINDERS = [
  "No olvides hidratarte",
  "Es hora de estirar un poco",
  "Haz una pausa para respirar",
  "Tomá agua y estirarse",
];

const SIX_HOURS = 1000 * 60 * 60 * 6;

const currentIndex = () =>
  Math.floor(Date.now() / SIX_HOURS) % REMINDERS.length;

export default function ReminderWindow() {
  const [index, setIndex] = useState(() => currentIndex());

  useEffect(() => {
    const msToNext = SIX_HOURS - (Date.now() % SIX_HOURS);
    const timeout = setTimeout(() => setIndex(currentIndex()), msToNext);
    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <article className="overflow-hidden rounded-3xl border border-brown-line/20 bg-cream-2/50 shadow-sm">
      <WindowChrome title="REMINDER.TODAY" />
      <div className="flex items-center gap-4 p-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-pink-soft/60">
          <Cat strokeWidth={1.75} className="size-6 text-pink-deep" />
        </span>
        <p className="text-base text-ink" suppressHydrationWarning>
          {REMINDERS[index]}
        </p>
      </div>
    </article>
  );
}