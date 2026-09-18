import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Atom, Braces, Globe2 } from "lucide-react";

import { EventShell, PageBand, SectionIntro } from "@/components/event-shell";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About Qiskit Fall Fest 2026" },
    { name: "description", content: "Discover the fully virtual quantum computing festival hosted by R.M.K. Engineering College." },
    { property: "og:title", content: "About Qiskit Fall Fest 2026" },
    { property: "og:description", content: "A four-day virtual quantum computing festival for curious builders." },
    { property: "og:type", content: "website" },
  ] }),
  component: AboutPage,
});

function AboutPage() {
  return <EventShell><SectionIntro eyebrow="01 / About" title="A shared quantum campus, open from anywhere." description="Qiskit Fall Fest 2026 brings students, educators, and curious builders together for four focused days of quantum computing exploration." />
    <PageBand className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
      <div className="rounded-3xl border border-border bg-panel p-7 sm:p-10"><p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Why this festival exists</p><h2 className="mt-4 font-display text-3xl font-semibold">Start with questions. Leave with a circuit.</h2><p className="mt-5 max-w-xl leading-7 text-muted-foreground">This original student-led program is designed to make quantum computing feel tangible. Every session moves from concept to experiment, with room for beginners and builders to meet at the same signal.</p><Link to="/schedule" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan hover:underline">See the four-day arc <ArrowRight className="size-4" /></Link></div>
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1"><Info icon={<Atom />} title="Learn by doing" text="Short talks lead into guided notebooks and labs." /><Info icon={<Braces />} title="Build in public" text="Challenges are shaped around practice, not hype." /><Info icon={<Globe2 />} title="Fully virtual" text="Join from any browser, wherever you are." /></div>
    </PageBand>
  </EventShell>;
}

function Info({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <div className="rounded-2xl border border-border bg-secondary/60 p-5"><div className="text-cyan">{icon}</div><h3 className="mt-4 font-display font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></div>; }