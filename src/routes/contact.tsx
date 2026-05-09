import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, Instagram, MapPin } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Booking — DJ Hjalte Nylander" },
      { name: "description", content: "Book DJ Hjalte Nylander for clubs, festivals, private and corporate events." },
      { property: "og:title", content: "Booking — DJ Hjalte Nylander" },
      { property: "og:description", content: "Book DJ Hjalte Nylander for your event." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  eventType: z.string().min(1).max(60),
  message: z.string().trim().min(10).max(1500),
});

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      eventType: fd.get("eventType"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      toast.error("Please fill all fields correctly.");
      return;
    }
    setSubmitting(true);
    const subject = encodeURIComponent(`Booking inquiry — ${parsed.data.eventType}`);
    const body = encodeURIComponent(
      `Name: ${parsed.data.name}\nEmail: ${parsed.data.email}\nEvent type: ${parsed.data.eventType}\n\n${parsed.data.message}`,
    );
    window.location.href = `mailto:booking@hjaltenylander.com?subject=${subject}&body=${body}`;
    setTimeout(() => setSubmitting(false), 800);
    toast.success("Opening your mail client…");
  };

  return (
    <section className="container-narrow grid gap-16 py-20 md:grid-cols-[1fr_1.2fr] md:py-28">
      <div>
        <p className="eyebrow">Booking</p>
        <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight md:text-6xl">
          Let's make it happen.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          For clubs, festivals, private and corporate events, or artist support requests —
          send a few details and you'll get a reply within 48 hours.
        </p>
        <ul className="mt-10 space-y-4 text-sm">
          <li className="flex items-center gap-3">
            <Mail className="h-4 w-4" />
            <a href="mailto:booking@hjaltenylander.com" className="hover:underline">
              booking@hjaltenylander.com
            </a>
          </li>
          <li className="flex items-center gap-3">
            <Instagram className="h-4 w-4" />
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:underline">
              @hjaltenylander
            </a>
          </li>
          <li className="flex items-center gap-3">
            <MapPin className="h-4 w-4" />
            <span>Based in Copenhagen, Denmark</span>
          </li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-8 md:p-10">
        <div className="grid gap-5">
          <Field label="Your name">
            <input name="name" required maxLength={100} className="input" />
          </Field>
          <Field label="Email">
            <input name="email" type="email" required maxLength={255} className="input" />
          </Field>
          <Field label="Event type">
            <select name="eventType" required className="input">
              <option value="">Select…</option>
              <option>Club</option>
              <option>Festival</option>
              <option>Private event</option>
              <option>Corporate event</option>
              <option>Artist support</option>
              <option>Other</option>
            </select>
          </Field>
          <Field label="Tell me about it">
            <textarea name="message" rows={5} required maxLength={1500} className="input resize-none" />
          </Field>
          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Send inquiry"}
          </button>
        </div>
      </form>

      <style>{`
        .input {
          width: 100%;
          border: 1px solid var(--color-border);
          background: var(--color-background);
          border-radius: 0.5rem;
          padding: 0.65rem 0.85rem;
          font-size: 0.9rem;
          color: var(--color-foreground);
          outline: none;
          transition: border-color .15s;
        }
        .input:focus {
          border-color: var(--color-ring);
        }
      `}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
