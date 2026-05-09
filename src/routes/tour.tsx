import { createFileRoute } from "@tanstack/react-router";
import { GigList } from "@/components/gig-list";

export const Route = createFileRoute("/tour")({
  head: () => ({
    meta: [
      { title: "DJ Hjalte Nylander - Tourdatoer" },
      { name: "description", content: "Kommende shows hvor du kan opleve DJ Hjalte Nylander." },
      { property: "og:title", content: "DJ Hjalte Nylander - Tourdatoer" },
      { property: "og:description", content: "Kommende shows." },
    ],
  }),
  component: TourPage,
});

function TourPage() {
  return (
    <div className="container-narrow py-20 md:py-28">
      <p className="eyebrow">Live</p>
      <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight md:text-7xl">Tourdatoer</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Alle bekræftede datoer. Køb billetter til offentlige arrangementer - for private bookinger, læs mere på booking
        siden.
      </p>
      <div className="mt-16">
        <GigList />
      </div>

      <h2 className="mt-24 font-display text-3xl font-semibold">Tidligere shows</h2>
      <div className="mt-8 opacity-80">
        <GigList upcomingOnly={false} />
      </div>
    </div>
  );
}
