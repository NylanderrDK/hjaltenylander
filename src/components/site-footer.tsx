import { Link } from "@tanstack/react-router";
import { Instagram, Music } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container-narrow grid gap-10 py-16 md:grid-cols-3">
        <div>
          <div className="font-display text-xl font-bold tracking-tight">
            HJALTE NYLANDER
          </div>
          <p className="mt-3 max-w-xs text-sm text-primary-foreground/70">
            Danish DJ playing clubs, festivals, private events and artist support across Europe.
          </p>
        </div>
        <div>
          <p className="eyebrow text-primary-foreground/60">Navigate</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="hover:opacity-70">Home</Link></li>
            <li><Link to="/tour" className="hover:opacity-70">Tour</Link></li>
            <li><Link to="/about" className="hover:opacity-70">About</Link></li>
            <li><Link to="/contact" className="hover:opacity-70">Booking</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-primary-foreground/60">Follow</p>
          <div className="mt-4 flex gap-3">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="rounded-full border border-primary-foreground/20 p-2 hover:bg-primary-foreground/10">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://soundcloud.com" target="_blank" rel="noreferrer" className="rounded-full border border-primary-foreground/20 p-2 hover:bg-primary-foreground/10">
              <Music className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-narrow flex flex-col items-start justify-between gap-2 py-6 text-xs text-primary-foreground/60 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Hjalte Nylander. All rights reserved.</span>
          <Link to="/admin" className="hover:opacity-80">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
