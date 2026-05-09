import { createFileRoute } from "@tanstack/react-router";
import { GigList } from "@/components/gig-list";

export const Route = createFileRoute("/tour")({
  head: () => ({
    meta: [
      { title: "Tour Dates — DJ Hjalte Nylander" },
      { name: "description", content: "Upcoming shows and tour dates for DJ Hjalte Nylander across Denmark and Europe." },
      { property: "og:title", content: "Tour Dates — DJ Hjalte Nylander" },
      { property: "og:description", content: "Upcoming shows and tour dates." },
    ],
  }),
  component: TourPage,
});

function TourPage() {
  return (
    <div className="container-narrow py-20 md:py-28">
      <p className="eyebrow">Live</p>
      <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight md:text-7xl">
        Tour dates
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        All confirmed shows. Tickets where applicable — for private bookings,
        head to the booking page.
      </p>
      <div className="mt-16">
        <GigList />
      </div>

      <h2 className="mt-24 font-display text-3xl font-semibold">Past shows</h2>
      <div className="mt-8 opacity-80">
        <GigList upcomingOnly={false} />
      </div>
    </div>
  );
}
