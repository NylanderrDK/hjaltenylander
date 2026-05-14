import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-dj-v2.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — DJ Hjalte Nylander" },
      { name: "description", content: "About Danish DJ Hjalte Nylander — biography, sound, and career highlights." },
      { property: "og:title", content: "About — DJ Hjalte Nylander" },
      { property: "og:description", content: "Danish DJ — biography and sound." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="container-narrow grid gap-12 py-20 md:grid-cols-[1.1fr_1fr] md:items-center md:py-28">
        <div>
          <p className="eyebrow">About</p>
          <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight md:text-7xl">
            The DJ.
          </h1>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground/80">
            <p>
              Hjalte Nylander is a Danish DJ based in Copenhagen, performing across clubs,
              festivals, private events and as artist support throughout Denmark and Europe.
            </p>
            <p>
              His sound moves between melodic house, driving club energy, and contemporary
              dance edits — selected and mixed live to match the moment.
            </p>
            <p>
              Whether it's a packed festival main stage or an intimate corporate dinner, every
              set is built around the same principle: read the room, take it somewhere, bring
              it home.
            </p>
          </div>
          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            Get in touch
          </Link>
        </div>
        <div className="aspect-[4/5] overflow-hidden rounded-2xl">
          <img src={heroImg} alt="Hjalte Nylander" className="h-full w-full object-cover" loading="lazy" />
        </div>
      </section>

      <section className="border-t border-border bg-secondary">
        <div className="container-narrow grid gap-10 py-20 md:grid-cols-3">
          {[
            { k: "Clubs", v: "Resident & guest sets across Copenhagen and Aarhus." },
            { k: "Festivals", v: "Main and second stage performances throughout the summer." },
            { k: "Private & corporate", v: "Weddings, brand activations and corporate parties." },
          ].map((b) => (
            <div key={b.k}>
              <p className="eyebrow">{b.k}</p>
              <p className="mt-3 font-display text-2xl">{b.v}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
