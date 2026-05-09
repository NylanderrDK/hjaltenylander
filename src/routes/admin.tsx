import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import type { Gig } from "@/components/gig-list";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Gigs" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

type GigType = Gig["gig_type"];
const TYPES: GigType[] = ["club", "festival", "private", "corporate", "support"];

function AdminPage() {
  const { session, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [editing, setEditing] = useState<Gig | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!loading && !session) navigate({ to: "/auth" });
  }, [loading, session, navigate]);

  const refresh = async () => {
    const { data } = await supabase.from("gigs").select("*").order("event_date", { ascending: false });
    setGigs((data as Gig[]) ?? []);
  };

  useEffect(() => {
    if (session) refresh();
  }, [session]);

  if (loading || !session) {
    return <div className="container-narrow py-20 text-muted-foreground">Loading…</div>;
  }

  if (!isAdmin) {
    return (
      <div className="container-narrow py-20">
        <h1 className="font-display text-3xl font-semibold">Not authorized</h1>
        <p className="mt-3 text-muted-foreground">
          Your account isn't set as admin yet. Your user ID:
        </p>
        <code className="mt-2 block rounded-lg bg-secondary px-3 py-2 text-xs">{session.user.id}</code>
        <p className="mt-4 text-sm text-muted-foreground">
          Add a row to <code>user_roles</code> with this user_id and role <code>admin</code> from the backend, then refresh.
        </p>
        <div className="mt-6 flex gap-3">
          <button onClick={signOut} className="rounded-full border border-border px-4 py-2 text-sm">
            Sign out
          </button>
          <Link to="/" className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground">
            Home
          </Link>
        </div>
      </div>
    );
  }

  const remove = async (id: string) => {
    if (!confirm("Delete this gig?")) return;
    const { error } = await supabase.from("gigs").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      refresh();
    }
  };

  return (
    <div className="container-narrow py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="mt-2 font-display text-4xl font-semibold">Manage gigs</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground"
          >
            <Plus className="h-4 w-4" /> New gig
          </button>
          <button onClick={signOut} className="rounded-full border border-border px-4 py-2 text-sm">
            Sign out
          </button>
        </div>
      </div>

      {showForm && (
        <GigForm
          initial={editing}
          onClose={() => setShowForm(false)}
          onSaved={() => {
            setShowForm(false);
            refresh();
          }}
        />
      )}

      <div className="mt-10 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-left">
            <tr>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Venue</th>
              <th className="px-4 py-3 font-medium">City</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {gigs.map((g) => (
              <tr key={g.id} className="border-t border-border">
                <td className="px-4 py-3">{g.event_date}</td>
                <td className="px-4 py-3 font-medium">{g.venue}</td>
                <td className="px-4 py-3">{g.city}, {g.country}</td>
                <td className="px-4 py-3 uppercase tracking-wider text-xs">{g.gig_type}</td>
                <td className="px-4 py-3">{g.is_sold_out ? "Sold out" : g.ticket_url ? "On sale" : "—"}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => {
                      setEditing(g);
                      setShowForm(true);
                    }}
                    className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary"
                    aria-label="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => remove(g.id)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-destructive hover:bg-destructive/10"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {gigs.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                  No gigs yet — add your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GigForm({
  initial,
  onClose,
  onSaved,
}: {
  initial: Gig | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    event_date: initial?.event_date ?? "",
    event_time: initial?.event_time ?? "",
    venue: initial?.venue ?? "",
    city: initial?.city ?? "",
    country: initial?.country ?? "Denmark",
    gig_type: initial?.gig_type ?? ("club" as GigType),
    ticket_url: initial?.ticket_url ?? "",
    notes: initial?.notes ?? "",
    is_sold_out: initial?.is_sold_out ?? false,
  });
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      event_time: form.event_time || null,
      ticket_url: form.ticket_url || null,
      notes: form.notes || null,
    };
    const op = initial
      ? supabase.from("gigs").update(payload).eq("id", initial.id)
      : supabase.from("gigs").insert(payload);
    const { error } = await op;
    setSaving(false);
    if (error) toast.error(error.message);
    else {
      toast.success(initial ? "Updated" : "Created");
      onSaved();
    }
  };

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-semibold">
          {initial ? "Edit gig" : "New gig"}
        </h2>
        <button onClick={onClose} aria-label="Close" className="rounded-full p-2 hover:bg-secondary">
          <X className="h-4 w-4" />
        </button>
      </div>
      <form onSubmit={submit} className="mt-6 grid gap-4 md:grid-cols-2">
        <Input label="Date" type="date" value={form.event_date} onChange={(v) => set("event_date", v)} required />
        <Input label="Time (optional)" placeholder="e.g. 23:00" value={form.event_time ?? ""} onChange={(v) => set("event_time", v)} />
        <Input label="Venue" value={form.venue} onChange={(v) => set("venue", v)} required />
        <Input label="City" value={form.city} onChange={(v) => set("city", v)} required />
        <Input label="Country" value={form.country} onChange={(v) => set("country", v)} />
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Type</span>
          <select
            value={form.gig_type}
            onChange={(e) => set("gig_type", e.target.value as GigType)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
          >
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>
        <Input label="Ticket URL (optional)" value={form.ticket_url ?? ""} onChange={(v) => set("ticket_url", v)} />
        <label className="md:col-span-2 block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Notes</span>
          <textarea
            value={form.notes ?? ""}
            onChange={(e) => set("notes", e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
          />
        </label>
        <label className="flex items-center gap-2 text-sm md:col-span-2">
          <input
            type="checkbox"
            checked={form.is_sold_out}
            onChange={(e) => set("is_sold_out", e.target.checked)}
          />
          Sold out
        </label>
        <div className="md:col-span-2 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-full border border-border px-5 py-2 text-sm">
            Cancel
          </button>
          <button
            disabled={saving}
            className="rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring"
      />
    </label>
  );
}
