import { useEffect, useState } from "react";

import { eventDetails } from "@/lib/event-data";

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

function getRemaining(): Remaining {
  const distance = Math.max(0, new Date(eventDetails.date).getTime() - Date.now());
  return {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance / 3600000) % 24),
    minutes: Math.floor((distance / 60000) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

export function Countdown() {
  const [remaining, setRemaining] = useState<Remaining>(getRemaining);

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getRemaining()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const items = [
    [remaining.days, "Days", "text-foreground"],
    [remaining.hours, "Hrs", "text-cyan"],
    [remaining.minutes, "Min", "text-accent"],
    [remaining.seconds, "Sec", "text-foreground"],
  ] as const;

  return (
    <div className="qff-glow-border rounded-3xl border border-border bg-panel p-6 backdrop-blur-xl">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">Countdown to launch</p>
      <p className="mt-1 font-display text-lg font-semibold">T-minus to Day 1</p>
      <div className="mt-5 grid grid-cols-4 gap-2 sm:gap-3">
        {items.map(([value, label, color]) => (
          <div key={label} className="rounded-2xl border border-border bg-secondary/70 p-3 text-center">
            <p className={`font-display text-2xl font-semibold sm:text-3xl ${color}`}>{String(value).padStart(2, "0")}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5 text-center">
        <div><p className="font-display text-2xl font-semibold">04</p><p className="text-xs text-muted-foreground">Days</p></div>
        <div><p className="font-display text-2xl font-semibold">TBD</p><p className="text-xs text-muted-foreground">Sessions</p></div>
        <div><p className="font-display text-2xl font-semibold">100%</p><p className="text-xs text-muted-foreground">Virtual</p></div>
      </div>
    </div>
  );
}