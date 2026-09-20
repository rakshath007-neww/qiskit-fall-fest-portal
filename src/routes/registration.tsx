import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, UserRound } from "lucide-react";
import { useEffect, useState } from "react";

import { AuthCard } from "@/components/auth-card";
import { EventShell, PageBand, SectionIntro } from "@/components/event-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/registration")({
  head: () => ({ meta: [
    { title: "Registration — Qiskit Fall Fest 2026" },
    { name: "description", content: "Create participant access for Qiskit Fall Fest 2026 and receive confirmed session updates." },
    { property: "og:title", content: "Registration — Qiskit Fall Fest 2026" },
    { property: "og:description", content: "Register for four fully virtual days of quantum computing." },
    { property: "og:type", content: "website" },
  ] }),
  component: RegistrationPage,
});

function RegistrationPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [institution, setInstitution] = useState("");
  const [experience, setExperience] = useState("Curious beginner");
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    void supabase.auth.getUser().then(async ({ data }) => {
      if (!active || !data.user) return;
      setUserEmail(data.user.email ?? null);
      const { data: existing } = await supabase.from("event_registrations").select("full_name, institution, experience_level").eq("user_id", data.user.id).maybeSingle();
      if (existing && active) {
        setFullName(existing.full_name);
        setInstitution(existing.institution);
        setExperience(existing.experience_level);
        setSaved(true);
      }
    });
    return () => { active = false; };
  }, []);

  async function saveRegistration(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setError("");
    const { data: authData } = await supabase.auth.getUser();
    const user = authData.user;
    if (!user) { setBusy(false); setError("Your session ended. Please sign in again."); return; }
    const profileResult = await supabase.from("event_profiles").upsert({ id: user.id, full_name: fullName, institution, experience_level: experience }, { onConflict: "id" });
    const registrationResult = await supabase.from("event_registrations").upsert({ user_id: user.id, email: user.email ?? "", full_name: fullName, institution, experience_level: experience, confirmed_at: new Date().toISOString() }, { onConflict: "user_id" });
    setBusy(false);
    if (profileResult.error || registrationResult.error) { setError(profileResult.error?.message ?? registrationResult.error?.message ?? "Registration could not be saved."); return; }
    setSaved(true);
  }

  return <EventShell><SectionIntro eyebrow="Register" title="Take your seat in the virtual room." description="Create access once, then use your participant space for confirmed session links, resources, and announcements." /><PageBand className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
    <div className="rounded-3xl border border-border bg-panel p-7 sm:p-9"><UserRound className="size-6 text-cyan" /><h2 className="mt-5 font-display text-2xl font-semibold">Participant access</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Email sign-up requires confirmation. Google access can continue directly when enabled for the event.</p><div className="mt-7 grid gap-3 text-sm text-muted-foreground"><p className="flex gap-3"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-cyan" /> Session links stay restricted to registered participants.</p><p className="flex gap-3"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-cyan" /> Your details can be updated before the event.</p></div></div>
    <div>{!userEmail ? <AuthCard /> : saved ? <div className="rounded-3xl border border-cyan/30 bg-panel p-8 shadow-xl shadow-brand/10"><CheckCircle2 className="size-8 text-cyan" /><p className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-cyan">Registration saved</p><h2 className="mt-3 font-display text-3xl font-semibold">You’re on the signal.</h2><p className="mt-3 max-w-lg leading-7 text-muted-foreground">Participant updates and any confirmed access details will appear in your dashboard.</p><Button asChild className="mt-7 rounded-full bg-gradient-to-r from-brand to-accent text-primary-foreground"><Link to="/dashboard">Open participant space <ArrowRight className="size-4" /></Link></Button></div> : <form onSubmit={saveRegistration} className="grid gap-5 rounded-3xl border border-border bg-panel p-7 sm:p-9"><div><p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">Almost there</p><h2 className="mt-2 font-display text-2xl font-semibold">Tell us who’s joining</h2><p className="mt-2 text-sm text-muted-foreground">Signed in as {userEmail}</p></div><div className="grid gap-2"><Label htmlFor="full-name">Full name</Label><Input id="full-name" required value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Your name" /></div><div className="grid gap-2"><Label htmlFor="institution">College or organization</Label><Input id="institution" required value={institution} onChange={(event) => setInstitution(event.target.value)} placeholder="Where you learn or build" /></div><div className="grid gap-2"><Label htmlFor="experience">Experience level</Label><select id="experience" value={experience} onChange={(event) => setExperience(event.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"><option>Curious beginner</option><option>Some Python experience</option><option>Quantum learner</option><option>Experienced builder</option></select></div>{error ? <p role="alert" className="text-sm text-destructive">{error}</p> : null}<Button type="submit" disabled={busy} className="h-11 rounded-full bg-gradient-to-r from-brand to-accent text-primary-foreground">{busy ? "Saving…" : "Complete registration"} <ArrowRight className="size-4" /></Button></form>}</div>
  </PageBand></EventShell>;
}