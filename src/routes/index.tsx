import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, ExternalLink, Sparkles } from "lucide-react";

import fieldImage from "@/assets/qff-quantum-field.jpg";
import { Countdown } from "@/components/countdown";
import { EventShell, PageBand } from "@/components/event-shell";
import { eventDetails, programCards } from "@/lib/event-data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Qiskit Fall Fest 2026 — Four days. One quantum campus." },
    { name: "description", content: "Join R.M.K. Engineering College for four fully virtual days of quantum computing, workshops, and challenges." },
    { property: "og:title", content: "Qiskit Fall Fest 2026 — Four days. One quantum campus." },
    { property: "og:description", content: "A fully virtual quantum computing festival, October 11–14, 2026." },
    { property: "og:type", content: "website" },
  ] }),
  component: Index,
});

function Index() {
  return <EventShell>
    <section className="relative isolate overflow-hidden border-b border-border">
      <img src={fieldImage} alt="Abstract quantum field with luminous blue and violet particles" className="absolute inset-0 -z-20 size-full object-cover object-center opacity-40" />
      <div className="absolute inset-0 -z-10 bg-background/75" />
      <div className="absolute inset-0 -z-10 qff-grid opacity-40" />
      <PageBand className="relative grid min-h-[720px] items-center gap-12 py-20 lg:grid-cols-[1.1fr_.9fr] lg:py-28">
        <div className="qff-rise max-w-3xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-background/60 px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-cyan backdrop-blur"><Sparkles className="size-3.5" /> {eventDetails.virtualLabel} · {eventDetails.dateLabel}</div>
          <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[0.98] tracking-tight text-foreground sm:text-7xl">Four days.<br /><span className="text-cyan">One quantum campus.</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">Qiskit Fall Fest 2026 is a student-led virtual gathering for people ready to learn, build, and ask better questions about quantum computing.</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild className="h-12 rounded-full bg-gradient-to-r from-brand to-accent px-6 text-primary-foreground shadow-lg shadow-brand/25"><Link to="/registration">Register Now <ArrowRight className="size-4" /></Link></Button>
            <Button asChild variant="outline" className="h-12 rounded-full border-border bg-background/50 px-6"><Link to="/schedule">Explore the schedule</Link></Button>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground"><span className="inline-flex items-center gap-2"><CalendarDays className="size-4 text-cyan" /> October 11–14, 2026</span><span>Hosted by {eventDetails.host}</span></div>
        </div>
        <div className="qff-float lg:justify-self-end"><Countdown /></div>
      </PageBand>
    </section>
    <PageBand className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
      <div><p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">The signal</p><h2 className="mt-4 max-w-md font-display text-3xl font-semibold sm:text-4xl">A practical introduction to a very big field.</h2><p className="mt-5 max-w-md leading-7 text-muted-foreground">From first gates to collaborative builds, the program keeps the theory close to the keyboard.</p><Link to="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan hover:underline">Why Qiskit Fall Fest <ArrowRight className="size-4" /></Link></div>
      <div className="grid gap-4 sm:grid-cols-2">{programCards.slice(0, 4).map((item, index) => <article key={item.title} className="rounded-2xl border border-border bg-panel p-5"><div className="flex items-center justify-between"><span className={`font-mono text-[10px] uppercase tracking-[0.18em] ${index % 2 ? "text-accent" : "text-cyan"}`}>{item.type}</span><ExternalLink className="size-3.5 text-muted-foreground" /></div><h3 className="mt-3 font-display text-lg font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p></article>)}</div>
    </PageBand>
    <section className="border-y border-border bg-secondary/35"><PageBand className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-display text-2xl font-semibold">Ready to enter the field?</p><p className="mt-1 text-sm text-muted-foreground">Registration opens your participant space for confirmed links and updates.</p></div><Button asChild className="rounded-full bg-primary text-primary-foreground"><Link to="/registration">Get participant access <ArrowRight className="size-4" /></Link></Button></PageBand></section>
  </EventShell>;
}
