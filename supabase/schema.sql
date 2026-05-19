create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete set null,
  name text not null,
  phone text not null unique,
  role text not null check (role in ('customer', 'driver', 'admin')) default 'customer',
  city text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.drivers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.users(id) on delete cascade,
  aadhaar_verified boolean not null default false,
  license_verified boolean not null default false,
  aadhaar_url text,
  license_url text,
  rc_url text,
  insurance_url text,
  insurance_expiry date,
  puc_url text,
  puc_expiry date,
  languages jsonb not null default '[]'::jsonb,
  approved_by uuid references public.users(id) on delete set null,
  approved_at timestamptz,
  rejection_reason text,
  rating numeric(2,1) not null default 5.0,
  status text not null check (status in ('pending', 'approved', 'rejected', 'suspended')) default 'pending',
  available boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  driver_id uuid not null references public.drivers(id) on delete cascade,
  vehicle_type text not null check (vehicle_type in ('auto', 'hatchback', 'sedan', 'suv', 'taxi')),
  brand text not null,
  model text not null,
  seat_count int not null check (seat_count between 1 and 8),
  ac boolean not null default false,
  registration_number text not null unique,
  photos jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.ride_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  pickup text not null,
  drop text not null,
  trip_type text not null check (trip_type in ('city', 'airport', 'station', 'outstation', 'religious', 'full_day', 'half_day', 'evening', 'hospital')),
  date timestamptz not null,
  status text not null check (status in ('pending', 'responded', 'shortlisted', 'confirmed', 'completed', 'cancelled')) default 'pending',
  city text not null,
  selected_quote_id uuid,
  selected_driver_id uuid references public.drivers(id) on delete set null,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.driver_quotes (
  id uuid primary key default gen_random_uuid(),
  ride_request_id uuid not null references public.ride_requests(id) on delete cascade,
  driver_id uuid not null references public.drivers(id) on delete cascade,
  quote_amount numeric(10,2) not null check (quote_amount > 0),
  message text,
  status text not null check (status in ('active', 'accepted', 'rejected', 'expired')) default 'active',
  created_at timestamptz not null default now(),
  unique (ride_request_id, driver_id)
);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'ride_requests_selected_quote_fk'
  ) then
    alter table public.ride_requests
      add constraint ride_requests_selected_quote_fk
      foreign key (selected_quote_id)
      references public.driver_quotes(id)
      on delete set null;
  end if;
end
$$;

create table if not exists public.whatsapp_notifications (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  target_phone text not null,
  payload jsonb not null,
  delivered boolean not null default false,
  provider_response text,
  created_at timestamptz not null default now()
);

create table if not exists public.popular_routes (
  id uuid primary key default gen_random_uuid(),
  from_city text not null,
  to_city text not null,
  distance text not null,
  travel_time text not null,
  base_fare text not null,
  image_url text not null,
  is_active boolean not null default true,
  sort_order int not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_users_phone on public.users(phone);
create index if not exists idx_users_role_city on public.users(role, city);
create index if not exists idx_drivers_status_available on public.drivers(status, available);
create index if not exists idx_vehicles_driver_id on public.vehicles(driver_id);
create index if not exists idx_ride_requests_user_status on public.ride_requests(user_id, status);
create index if not exists idx_ride_requests_city_status on public.ride_requests(city, status);
create index if not exists idx_driver_quotes_request_status on public.driver_quotes(ride_request_id, status);
create index if not exists idx_driver_quotes_driver_id on public.driver_quotes(driver_id);
create index if not exists idx_popular_routes_active_order on public.popular_routes(is_active, sort_order);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists drivers_set_updated_at on public.drivers;
create trigger drivers_set_updated_at
before update on public.drivers
for each row
execute function public.set_updated_at();

drop trigger if exists popular_routes_set_updated_at on public.popular_routes;
create trigger popular_routes_set_updated_at
before update on public.popular_routes
for each row
execute function public.set_updated_at();

alter table public.users enable row level security;
alter table public.drivers enable row level security;
alter table public.vehicles enable row level security;
alter table public.ride_requests enable row level security;
alter table public.driver_quotes enable row level security;
alter table public.whatsapp_notifications enable row level security;
alter table public.popular_routes enable row level security;

-- Open read policy for development and MVP demos. Tighten for production role-based auth.
drop policy if exists users_read_all on public.users;
create policy users_read_all on public.users for select using (true);

drop policy if exists drivers_read_all on public.drivers;
create policy drivers_read_all on public.drivers for select using (true);

drop policy if exists vehicles_read_all on public.vehicles;
create policy vehicles_read_all on public.vehicles for select using (true);

drop policy if exists ride_requests_read_all on public.ride_requests;
create policy ride_requests_read_all on public.ride_requests for select using (true);

drop policy if exists driver_quotes_read_all on public.driver_quotes;
create policy driver_quotes_read_all on public.driver_quotes for select using (true);

drop policy if exists popular_routes_read_all on public.popular_routes;
create policy popular_routes_read_all on public.popular_routes for select using (true);

-- Inserts/updates are expected through service role API handlers.
