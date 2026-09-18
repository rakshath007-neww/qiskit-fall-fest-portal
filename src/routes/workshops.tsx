import { createFileRoute } from "@tanstack/react-router";

import { EventShell, PageBand, SectionIntro } from "@/components/event-shell";
import { ProgramCards } from "@/components/program-cards";

export const Route = createFileRoute("/workshops")({
  head: () => ({ meta: [
    { title: "Workshops & Challenges — Qiskit Fall Fest 2026" },
    { name: "description", content: "Hands-on Qiskit workshops and quantum challenges for beginners and builders." },
    { property: "og:title", content: "Workshops & Challenges — Qiskit Fall Fest 2026" },
    { property: "og:description", content: "Explore a practical, student-friendly quantum computing program." },
    { property: "og:type", content: "website" },
  ] }),
  component: WorkshopsPage,
});

function WorkshopsPage() { return <EventShell><SectionIntro eyebrow="03 / Program" title="Learn the language, then test the signal." description="A program of guided workshops and build challenges. Final briefs, timing, and facilitator details will be added as they are confirmed." /><PageBand><ProgramCards /></PageBand></EventShell>; }