import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Mail, LockKeyhole, Chrome, ArrowRight } from "lucide-react";

import { lovable } from "@/integrations/lovable";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AuthCard({ returnTo = "/registration" }: { returnTo?: string }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus("");
    setError("");

    const result = mode === "signup"
      ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin } })
      : await supabase.auth.signInWithPassword({ email, password });

    setBusy(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }

    if (mode === "signup" && !result.data.session) {
      setStatus("Check your inbox to confirm your email. Then return here to sign in.");
      setMode("signin");
      return;
    }

    await navigate({ to: returnTo });
  }

  async function googleSignIn() {
    setBusy(true);
    setError("");
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) setError(result.error.message);
    setBusy(false);
  }

  return (
    <div className="rounded-3xl border border-border bg-panel p-6 shadow-2xl shadow-brand/10 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">Participant access</p>
          <h2 className="mt-2 font-display text-2xl font-semibold">{mode === "signup" ? "Create your access" : "Welcome back"}</h2>
        </div>
        <LockKeyhole className="size-5 text-accent" aria-hidden="true" />
      </div>

      <Button type="button" variant="outline" className="mt-6 h-11 w-full rounded-full border-border bg-secondary/80" onClick={googleSignIn} disabled={busy}>
        <Chrome className="size-4" /> Continue with Google
      </Button>
      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" /> or use email <span className="h-px flex-1 bg-border" /></div>

      <form className="grid gap-4" onSubmit={submit}>
        <div className="grid gap-2"><Label htmlFor="auth-email">Email</Label><div className="relative"><Mail className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" /><Input id="auth-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@college.edu" className="pl-10" /></div></div>
        <div className="grid gap-2"><Label htmlFor="auth-password">Password</Label><div className="relative"><LockKeyhole className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" /><Input id="auth-password" type="password" required minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" className="pl-10" /></div></div>
        {error ? <p role="alert" className="text-sm text-destructive">{error}</p> : null}
        {status ? <p role="status" className="text-sm text-cyan">{status}</p> : null}
        <Button type="submit" className="h-11 rounded-full bg-gradient-to-r from-brand to-accent text-primary-foreground" disabled={busy}>{busy ? "Working…" : mode === "signup" ? "Create participant access" : "Sign in"}<ArrowRight className="size-4" /></Button>
      </form>

      <button type="button" className="mt-5 w-full text-sm text-muted-foreground hover:text-foreground" onClick={() => { setMode(mode === "signup" ? "signin" : "signup"); setError(""); setStatus(""); }}>
        {mode === "signup" ? "Already registered? Sign in" : "New participant? Create access"}
      </button>
    </div>
  );
}