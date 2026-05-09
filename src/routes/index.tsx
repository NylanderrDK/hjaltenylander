import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Headphones, Sparkles, Users } from "lucide-react";
import heroImg from "@/assets/hero-dj.jpg";
import crowdImg from "@/assets/crowd.jpg";
import decksImg from "@/assets/decks.jpg";
import { GigList } from "@/components/gig-list";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DJ Hjalte Nylander" },
      {
        name: "description",
        content: "Danish DJ Hjalte Nylander — klub, festival, privat og corporate.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <img
          src={heroImg}
          alt="DJ Hjalte Nylander live"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary" />
        <div className="container-narrow relative grid min-h-[90vh] items-end gap-12 py-24">
          <div>
            <p className="eyebrow text-primary-foreground/70">DJ · est. Hobro</p>
            <h1 className="display-xl mt-6 max-w-4xl text-balance">
              Hjalte
              <br />
              Nylander.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-primary-foreground/80">
              Klub, festival, privat &amp; corporate events, og support for artister.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-medium text-ink transition-transform hover:translate-y-[-1px]"
              >
                Bookingforespørgsel <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/tour"
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-medium hover:bg-primary-foreground/10"
              >
                Se tourplan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="container-narrow grid gap-12 py-24 md:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="eyebrow">About</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Sound that moves the room.
          </h2>
        </div>
        <div className="space-y-4 text-lg leading-relaxed text-foreground/80">
          <p>
            Hjalte Nylander is a Danish DJ working across the Nordic and European scene — from late-night club
            residencies to main-stage festival slots and intimate private events.
          </p>
          <p>
            His sets blend driving house and melodic energy with a sharp ear for the dancefloor — crafted in real time,
            never from a USB on autopilot.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
          >
            Read more <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Reasons */}
      <section className="bg-secondary">
        <div className="container-narrow py-24">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Why book</p>
              <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">Built for the moment.</h2>
            </div>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <div key={r.title} className="bg-card p-8">
                <r.icon className="h-6 w-6" strokeWidth={1.5} />
                <h3 className="mt-6 font-display text-xl font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tour preview */}
      <section className="container-narrow py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Upcoming</p>
            <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">Tour dates</h2>
          </div>
          <Link to="/tour" className="text-sm font-medium underline-offset-4 hover:underline">
            View all →
          </Link>
        </div>
        <div className="mt-12">
          <GigList limit={4} />
        </div>
      </section>

      {/* Media strip */}
      <section className="container-narrow grid gap-4 pb-24 md:grid-cols-2">
        <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-primary md:aspect-[4/5]">
          <img src={decksImg} alt="DJ decks close-up" loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="aspect-video flex-1 overflow-hidden rounded-2xl">
            <img src={crowdImg} alt="Festival crowd" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="rounded-2xl bg-primary p-8 text-primary-foreground">
            <p className="eyebrow text-primary-foreground/60">Latest aftermovie</p>
            <h3 className="mt-3 font-display text-2xl font-semibold">Summer ’25 highlights</h3>
            <p className="mt-2 text-sm text-primary-foreground/70">
              Festival main stages, club residencies, and a few late-night surprises.
            </p>
            <Link to="/about" className="mt-6 inline-flex items-center gap-1 text-sm font-medium hover:opacity-80">
              Watch on Instagram <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-secondary">
        <div className="container-narrow flex flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-center">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">Got a date in mind?</h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            Send a booking request <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

const reasons = [
  {
    icon: Headphones,
    title: "Versatile range",
    body: "Clubs, festivals, weddings, brand activations — adapted to room and crowd.",
  },
  {
    icon: Sparkles,
    title: "Live mixing",
    body: "Every set is read and built in real time. Never preset, never on autopilot.",
  },
  {
    icon: Users,
    title: "Crowd-first",
    body: "Reads energy and pacing to keep the floor exactly where it should be.",
  },
  {
    icon: Calendar,
    title: "Reliable pro",
    body: "Punctual, prepared, with full pro rider — handle the show, you handle the night.",
  },
];
