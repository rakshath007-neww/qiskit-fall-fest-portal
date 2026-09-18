import { createFileRoute } from "@tanstack/react-router";
import { Mic2 } from "lucide-react";

import { EventShell, PageBand, SectionIntro } from "@/components/event-shell";

export const Route = createFileRoute("/speakers")({
  head: () => ({ meta: [
    { title: "Speakers — Qiskit Fall Fest 2026" },
    { name: "description", content: "Meet the Qiskit Fall Fest 2026 speakers as the line-up is confirmed." },
    { property: "og:title", content: "Speakers — Qiskit Fall Fest 2026" },
    { property: "og:description", content: "Speaker profiles and affiliations will be published here as the line-up is finalized." },
    { property: "og:type", content: "website" },
  ] }),
  component: SpeakersPage,
});

const speakers = [["Speaker profile TBD", "Quantum computing", "Affiliation TBD"], ["Speaker profile TBD", "Qiskit development", "Affiliation TBD"], ["Speaker profile TBD", "Quantum hardware", "Affiliation TBD"], ["Speaker profile TBD", "Student research", "Affiliation TBD"] as const];
function SpeakersPage() { return <EventShell><SectionIntro eyebrow="04 / Speakers" title="The people shaping the signal." description="The line-up is being finalized. This page is ready for speaker names, portraits, talks, and affiliations when confirmed." /><PageBand><div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-xs text-muted-foreground"><Mic2 className="size-4 text-cyan" /> Line-up being finalized</div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{speakers.map(([name, role, affiliation]) => <article key={role} className="rounded-3xl border border-border bg-panel p-5"><div className="grid aspect-square place-items-center rounded-2xl border border-dashed border-border bg-secondary text-center"><span className="px-4 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Portrait TBD</span></div><h2 className="mt-4 font-display font-semibold">{name}</h2><p className="mt-1 text-sm text-muted-foreground">{role}</p><p className="mt-1 text-xs text-muted-foreground">{affiliation}</p></article>)}</div></PageBand></EventShell>; }