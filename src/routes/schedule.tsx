import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays } from "lucide-react";

import { EventShell, PageBand, SectionIntro } from "@/components/event-shell";
import { scheduleDays } from "@/lib/event-data";

export const Route = createFileRoute("/schedule")({
  head: () => ({ meta: [
    { title: "Schedule — Qiskit Fall Fest 2026" },
    { name: "description", content: "Explore the four-day Qiskit Fall Fest 2026 program, with editable placeholders for unconfirmed timings." },
    { property: "og:title", content: "Schedule — Qiskit Fall Fest 2026" },
    { property: "og:description", content: "Four virtual days of talks, workshops, challenges, and a participant showcase." },
    { property: "og:type", content: "website" },
  ] }),
  component: SchedulePage,
});

function SchedulePage() { return <EventShell><SectionIntro eyebrow="02 / Schedule" title="Four days, one connected program." description="The arc is set. Timings, speakers, and individual session details marked TBD are editable placeholders for the organizing team." /><PageBand><div className="grid gap-4 lg:grid-cols-4">{scheduleDays.map((day) => <article key={day.day} className="rounded-3xl border border-border bg-panel p-6"><div className="flex items-center justify-between"><span className={`font-mono text-xs uppercase tracking-[0.16em] ${day.accent === "accent" ? "text-accent" : day.accent === "brand" ? "text-brand" : "text-cyan"}`}>Day {day.day}</span><span className="font-mono text-xs text-muted-foreground">{day.date}</span></div><h2 className="mt-4 font-display text-xl font-semibold">{day.title}</h2><ul className="mt-6 grid gap-4">{day.sessions.map(([time, session]) => <li key={session} className="flex gap-3 border-t border-border pt-4 text-sm"><span className="min-w-16 font-mono text-xs text-muted-foreground">{time}</span><span>{session}</span></li>)}</ul><div className="mt-7 flex items-center gap-2 text-xs text-muted-foreground"><CalendarDays className="size-3.5 text-cyan" /> Virtual access · details TBD</div></article>)}</div></PageBand></EventShell>; }