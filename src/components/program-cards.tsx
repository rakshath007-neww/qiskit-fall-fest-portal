import { ArrowUpRight, Sparkles } from "lucide-react";

import { programCards } from "@/lib/event-data";

export function ProgramCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {programCards.map((item, index) => (
        <article key={item.title} className="group rounded-3xl border border-border bg-panel p-6 transition-transform hover:-translate-y-1 hover:border-brand/50">
          <div className="flex items-center justify-between"><span className={`font-mono text-[10px] uppercase tracking-[0.18em] ${index % 3 === 1 ? "text-accent" : index % 3 === 2 ? "text-brand" : "text-cyan"}`}>{item.type}</span><Sparkles className="size-4 text-muted-foreground transition-colors group-hover:text-cyan" /></div>
          <h2 className="mt-3 font-display text-xl font-semibold">{item.title}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
          <div className="mt-5 flex items-center gap-1 text-xs text-cyan">Program details <ArrowUpRight className="size-3.5" /></div>
        </article>
      ))}
    </div>
  );
}