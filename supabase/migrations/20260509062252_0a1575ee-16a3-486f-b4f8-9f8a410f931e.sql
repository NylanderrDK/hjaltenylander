
-- Roles
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  );
$$;

create policy "Users can view their own roles"
  on public.user_roles for select to authenticated
  using (auth.uid() = user_id);

create policy "Admins can manage roles"
  on public.user_roles for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- Gig type enum
create type public.gig_type as enum ('club', 'festival', 'private', 'corporate', 'support');

-- Gigs
create table public.gigs (
  id uuid primary key default gen_random_uuid(),
  event_date date not null,
  event_time text,
  venue text not null,
  city text not null,
  country text not null default 'Denmark',
  gig_type gig_type not null default 'club',
  ticket_url text,
  notes text,
  is_sold_out boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.gigs enable row level security;

create policy "Gigs are viewable by everyone"
  on public.gigs for select
  using (true);

create policy "Admins can insert gigs"
  on public.gigs for insert to authenticated
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update gigs"
  on public.gigs for update to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete gigs"
  on public.gigs for delete to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create or replace function public.update_updated_at_column()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger gigs_updated_at
  before update on public.gigs
  for each row execute function public.update_updated_at_column();

create index gigs_event_date_idx on public.gigs(event_date);
