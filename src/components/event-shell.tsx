import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState, type ReactNode } from "react";

import mark from "@/assets/qff-mark.png";
import { eventDetails } from "@/lib/event-data";
import { Button } from "@/components/ui/button";

const navigation = [
  ["About", "/about"],
  ["Schedule", "/schedule"],
  ["Workshops", "/workshops"],
  ["Speakers", "/speakers"],
  ["Team", "/team"],
  ["FAQs", "/faqs"],
] as const;

export function EventShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen overflow-hidden bg-background font-body text-foreground antialiased">
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8" aria-label="Main navigation">
          <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
            <img src={mark} alt="Qiskit Fall Fest mark" width={38} height={38} className="size-9 shrink-0 object-contain" />
            <span className="truncate font-display text-sm font-semibold tracking-tight text-foreground sm:text-base">
              Qiskit Fall Fest <span className="text-accent">2026</span>
            </span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {navigation.map(([label, to]) => (
              <Link
                key={to}
                to={to}
                activeProps={{ className: "text-cyan" }}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button asChild className="hidden rounded-full bg-gradient-to-r from-brand to-accent px-5 text-primary-foreground shadow-lg shadow-brand/20 hover:scale-[1.02] hover:from-brand hover:to-accent sm:inline-flex">
              <Link to="/registration">Register Now</Link>
            </Button>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </nav>

        {open ? (
          <div className="border-t border-border bg-panel-strong px-5 py-4 lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-1">
              {navigation.map(([label, to]) => (
                <Link key={to} to={to} onClick={() => setOpen(false)} className={`rounded-lg px-3 py-3 text-sm ${location.pathname === to ? "bg-secondary text-cyan" : "text-muted-foreground"}`}>
                  {label}
                </Link>
              ))}
              <Button asChild className="mt-2 rounded-full bg-gradient-to-r from-brand to-accent text-primary-foreground">
                <Link to="/registration" onClick={() => setOpen(false)}>Register Now</Link>
              </Button>
            </div>
          </div>
        ) : null}
      </header>

      <main>{children}</main>

      <footer className="border-t border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <img src={mark} alt="" width={38} height={38} className="size-9 object-contain" />
              <p className="font-display text-lg font-semibold">Qiskit Fall Fest <span className="text-accent">2026</span></p>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">A fully virtual quantum computing festival hosted by {eventDetails.host}.</p>
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.16em] text-cyan">{eventDetails.dateLabel} · {eventDetails.virtualLabel}</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Explore</p>
            <div className="mt-4 grid gap-3 text-sm">
              <Link to="/schedule" className="text-muted-foreground transition-colors hover:text-foreground">Four-day schedule</Link>
              <Link to="/workshops" className="text-muted-foreground transition-colors hover:text-foreground">Workshops & challenges</Link>
              <Link to="/dashboard" className="text-muted-foreground transition-colors hover:text-foreground">Participant dashboard</Link>
            </div>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Contact</p>
            <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
              <p>{eventDetails.emailPlaceholder}</p>
              <p>{eventDetails.phonePlaceholder}</p>
              <Link to="/contact" className="inline-flex items-center gap-1 text-cyan hover:underline">Contact the team <ArrowUpRight className="size-3.5" /></Link>
            </div>
          </div>
        </div>
        <div className="border-t border-border px-5 py-5 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          © 2026 Qiskit Fall Fest · R.M.K. Engineering College · Details marked TBD are editable placeholders
        </div>
      </footer>
    </div>
  );
}

export function SectionIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 lg:px-8 lg:pt-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">{eyebrow}</p>
      <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">{title}</h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">{description}</p>
    </div>
  );
}

export function PageBand({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16 ${className}`}>{children}</section>;
}