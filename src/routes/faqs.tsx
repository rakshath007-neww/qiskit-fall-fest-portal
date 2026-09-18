import { createFileRoute } from "@tanstack/react-router";

import { EventShell, PageBand, SectionIntro } from "@/components/event-shell";
import { faqs } from "@/lib/event-data";

export const Route = createFileRoute("/faqs")({
  head: () => ({ meta: [
    { title: "FAQs — Qiskit Fall Fest 2026" },
    { name: "description", content: "Answers about virtual access, experience level, registration, and the Qiskit Fall Fest 2026 program." },
    { property: "og:title", content: "FAQs — Qiskit Fall Fest 2026" },
    { property: "og:description", content: "Get ready for four virtual days of quantum computing at R.M.K. Engineering College." },
    { property: "og:type", content: "website" },
  ] }),
  component: FaqPage,
});

function FaqPage() { return <EventShell><SectionIntro eyebrow="06 / FAQs" title="Good questions welcome." description="A few useful answers for participants. Details marked TBD will be updated as the organizing team confirms them." /><PageBand className="mx-auto max-w-4xl"><div className="grid gap-3">{faqs.map(([question, answer]) => <details key={question} className="group rounded-2xl border border-border bg-panel p-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-semibold"><span>{question}</span><span className="text-xl text-cyan transition-transform group-open:rotate-45">+</span></summary><p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">{answer}</p></details>)}</div></PageBand></EventShell>; }