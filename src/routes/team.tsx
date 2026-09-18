import { createFileRoute } from "@tanstack/react-router";

import { EventShell, PageBand, SectionIntro } from "@/components/event-shell";
import { placeholderTeam } from "@/lib/event-data";

export const Route = createFileRoute("/team")({
  head: () => ({ meta: [
    { title: "Organizing Team — Qiskit Fall Fest 2026" },
    { name: "description", content: "Meet the R.M.K. Engineering College organizing team behind Qiskit Fall Fest 2026." },
    { property: "og:title", content: "Organizing Team — Qiskit Fall Fest 2026" },
    { property: "og:description", content: "The student crew organizing a fully virtual quantum computing festival." },
    { property: "og:type", content: "website" },
  ] }),
  component: TeamPage,
});

function TeamPage() { return <EventShell><SectionIntro eyebrow="05 / Organizing team" title="Built by students who want more people in the room." description="Role-based placeholders are ready for the team’s confirmed names, portraits, and contact details." /><PageBand><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{placeholderTeam.map((role, index) => <article key={role} className="rounded-3xl border border-border bg-panel p-5"><div className="grid aspect-square place-items-center rounded-2xl border border-dashed border-border bg-secondary font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Portrait TBD</div><h2 className="mt-4 font-display font-semibold">{role}</h2><p className="mt-1 text-sm text-muted-foreground">Name TBD</p><p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-cyan">Team slot 0{index + 1}</p></article>)}</div></PageBand></EventShell>; }