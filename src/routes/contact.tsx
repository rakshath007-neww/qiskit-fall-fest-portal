import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";

import { EventShell, PageBand, SectionIntro } from "@/components/event-shell";
import { eventDetails } from "@/lib/event-data";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact — Qiskit Fall Fest 2026" },
    { name: "description", content: "Contact the Qiskit Fall Fest 2026 organizing team at R.M.K. Engineering College." },
    { property: "og:title", content: "Contact — Qiskit Fall Fest 2026" },
    { property: "og:description", content: "Reach the Qiskit Fall Fest 2026 organizing team with questions or updates." },
    { property: "og:type", content: "website" },
  ] }),
  component: ContactPage,
});

function ContactPage() { return <EventShell><SectionIntro eyebrow="07 / Contact" title="Send a signal to the organizing team." description="Contact details are placeholders until the event team confirms the official inbox and phone line." /><PageBand className="grid gap-5 md:grid-cols-2"><div className="rounded-3xl border border-border bg-panel p-7"><Mail className="size-6 text-cyan" /><h2 className="mt-5 font-display text-2xl font-semibold">Email</h2><p className="mt-2 text-muted-foreground">{eventDetails.emailPlaceholder}</p><p className="mt-5 text-sm leading-6 text-muted-foreground">Use this placeholder for registration questions, accessibility needs, or program updates once the official address is confirmed.</p></div><div className="rounded-3xl border border-border bg-panel p-7"><MessageCircle className="size-6 text-accent" /><h2 className="mt-5 font-display text-2xl font-semibold">Participant access</h2><p className="mt-2 text-muted-foreground">Already registered? Sign in to see announcements and confirmed session details.</p><Link to="/dashboard" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan hover:underline">Open dashboard <ArrowRight className="size-4" /></Link></div></PageBand></EventShell>; }