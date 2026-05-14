import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowUpRight } from "lucide-react";

export type Gig = {
  id: string;
  event_date: string;
  event_time: string | null;
  venue: string;
  city: string;
  country: string;
  gig_type: "club" | "festival" | "private" | "corporate" | "support";
  ticket_url: string | null;
  notes: string | null;
  is_sold_out: boolean;
};

const typeLabel: Record<Gig["gig_type"], string> = {
  club: "Club",
  festival: "Festival",
  private: "Private",
  corporate: "Corporate",
  support: "Support",
};

function formatDate(d: string) {
  const date = new Date(d);
  return {
    day: date.getDate().toString().padStart(2, "0"),
    month: date.toLocaleString("en-US", { month: "short" }).toUpperCase(),
    year: date.getFullYear(),
  };
}

export function GigList({ limit, upcomingOnly = true }: { limit?: number; upcomingOnly?: boolean }) {
  const [gigs, setGigs] = useState<Gig[] | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    let q = supabase
      .from("gigs")
      .select("*")
      .order("event_date", { ascending: upcomingOnly });
    q = upcomingOnly ? q.gte("event_date", today) : q.lt("event_date", today);
    if (limit) q = q.limit(limit);
    q.then(({ data }) => setGigs((data as Gig[]) ?? []));
  }, [limit, upcomingOnly]);

  if (gigs === null) {
    return <div className="py-12 text-center text-muted-foreground">Loading tour dates…</div>;
  }

  if (gigs.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-12 text-center">
        <p className="font-display text-2xl">No dates announced yet</p>
        <p className="mt-2 text-sm text-muted-foreground">Check back soon — new shows added regularly.</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-border border-y border-border">
      {gigs.map((g) => {
        const d = formatDate(g.event_date);
        return (
          <li
            key={g.id}
            className="group grid grid-cols-1 items-center gap-4 py-6 md:grid-cols-[120px_1fr_auto] md:gap-8"
          >
            <div className="flex items-baseline gap-2 md:flex-col md:gap-0">
              <span className="font-display text-4xl font-bold leading-none">{d.day}</span>
              <span className="text-xs font-medium tracking-widest text-muted-foreground">
                {d.month} {d.year}
              </span>
            </div>
            <div>
              <p className="font-display text-xl font-semibold">{g.venue}</p>
              <p className="text-sm text-muted-foreground">
                {g.city}, {g.country}
                {g.event_time ? ` · ${g.event_time}` : ""}
                {" · "}
                <span className="uppercase tracking-wider">{typeLabel[g.gig_type]}</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              {g.is_sold_out ? (
                <span className="rounded-full border border-border px-4 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Sold out
                </span>
              ) : g.ticket_url ? (
                <a
                  href={g.ticket_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity group-hover:opacity-90"
                >
                  Tickets <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ) : (
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  Private event
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
