import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Bell, BookOpen, CalendarDays, ExternalLink, LogOut, LockKeyhole } from "lucide-react";
import { useEffect, useState } from "react";

import { EventShell, PageBand, SectionIntro } from "@/components/event-shell";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [
    { title: "Participant Space — Qiskit Fall Fest 2026" },
    { name: "description", content: "Your registered participant space for Qiskit Fall Fest 2026 session access and updates." },
    { property: "og:title", content: "Participant Space — Qiskit Fall Fest 2026" },
    { property: "og:description", content: "Access confirmed Qiskit Fall Fest 2026 sessions, resources, and announcements." },
    { property: "og:type", content: "website" },
  ] }),
  component: DashboardPage,
});

type Session = Tables<"event_sessions">;
type Resource = Tables<"event_resources">;
type Announcement = Tables<"event_announcements">;

function DashboardPage() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    void (async () => {
      const [{ data: userData }, sessionResult, resourceResult, announcementResult] = await Promise.all([
        supabase.auth.getUser(),
        supabase.from("event_sessions").select("*").order("day_number").order("session_time"),
        supabase.from("event_resources").select("*").order("created_at"),
        supabase.from("event_announcements").select("*").order("published_at", { ascending: false }),
      ]);
      if (!active) return;
      setEmail(userData.user?.email ?? "participant");
      setSessions(sessionResult.data ?? []); setResources(resourceResult.data ?? []); setAnnouncements(announcementResult.data ?? []); setLoading(false);
    })();
    return () => { active = false; };
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    await navigate({ to: "/registration", replace: true });
  }

  return <EventShell><SectionIntro eyebrow="Participant space" title="Your place in the field." description={`Signed in as ${email || "participant"}. Confirmed access details will appear here as the program is finalized.`} /><PageBand className="space-y-12">
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6"><div className="flex items-center gap-3 text-sm text-muted-foreground"><LockKeyhole className="size-4 text-cyan" /> Registered participant access</div><Button variant="outline" className="rounded-full" onClick={signOut}><LogOut className="size-4" /> Sign out</Button></div>
    {loading ? <div className="rounded-3xl border border-border bg-panel p-8 text-muted-foreground">Loading your participant space…</div> : <>
      <section><div className="flex items-end justify-between gap-4"><div><p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">Schedule</p><h2 className="mt-2 font-display text-3xl font-semibold">Session access</h2></div><Link to="/schedule" className="hidden items-center gap-2 text-sm text-cyan hover:underline sm:flex">Public schedule <ArrowRight className="size-4" /></Link></div><div className="mt-5 grid gap-3">{sessions.map((session) => <article key={session.id} className="flex flex-col gap-4 rounded-2xl border border-border bg-panel p-5 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"><span className="text-cyan">Day {String(session.day_number).padStart(2, "0")}</span><span>{session.session_time}</span><span>{session.session_type}</span></div><h3 className="mt-2 font-display text-lg font-semibold">{session.title}</h3><p className="mt-1 text-sm text-muted-foreground">{session.description}</p></div>{session.meeting_url ? <Button asChild size="sm" className="rounded-full bg-primary text-primary-foreground"><a href={session.meeting_url} target="_blank" rel="noreferrer">Join session <ExternalLink className="size-3.5" /></a></Button> : <span className="inline-flex shrink-0 items-center gap-2 text-xs text-muted-foreground"><LockKeyhole className="size-3.5" /> Link TBD</span>}</article>)}</div></section>
      <div className="grid gap-10 lg:grid-cols-2"><section><div className="flex items-center gap-3"><BookOpen className="size-5 text-accent" /><h2 className="font-display text-2xl font-semibold">Resources</h2></div><div className="mt-5 grid gap-3">{resources.map((resource) => <article key={resource.id} className="rounded-2xl border border-border bg-panel p-5"><h3 className="font-display font-semibold">{resource.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{resource.description}</p>{resource.resource_url ? <a href={resource.resource_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm text-cyan hover:underline">Open resource <ExternalLink className="size-3.5" /></a> : <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Resource link TBD</p>}</article>)}</div></section><section><div className="flex items-center gap-3"><Bell className="size-5 text-cyan" /><h2 className="font-display text-2xl font-semibold">Announcements</h2></div><div className="mt-5 grid gap-3">{announcements.map((announcement) => <article key={announcement.id} className="rounded-2xl border border-border bg-panel p-5"><p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{new Date(announcement.published_at).toLocaleDateString()}</p><h3 className="mt-3 font-display font-semibold">{announcement.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{announcement.body}</p></article>)}</div></section></div>
    </>}
  </PageBand></EventShell>;
}