create extension if not exists pgcrypto;

create type public.order_status as enum ('pending', 'awaiting_payment', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded');
create type public.payment_status as enum ('pending', 'authorized', 'paid', 'failed', 'refunded');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  first_name text,
  last_name text,
  phone text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  catalog_id integer unique,
  slug text not null unique,
  name text not null,
  description text not null default '',
  price_kes integer not null check (price_kes >= 0),
  image_url text,
  category text not null default 'gifts',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.inventory (
  product_id uuid primary key references public.products(id) on delete cascade,
  quantity integer not null default 0 check (quantity >= 0),
  updated_at timestamptz not null default now()
);

create table public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  recipient_name text not null,
  phone text not null,
  address_line text not null,
  city text not null,
  delivery_instructions text,
  created_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  user_id uuid references public.profiles(id) on delete set null,
  recipient_user_id uuid references public.profiles(id) on delete set null,
  recipient_email text,
  email text not null,
  phone text not null,
  recipient_name text not null,
  recipient_phone text,
  address_id uuid references public.addresses(id) on delete set null,
  gift_message text,
  is_incognito boolean not null default false,
  delivery_date date,
  is_surprise boolean not null default false,
  subtotal_kes integer not null check (subtotal_kes >= 0),
  shipping_kes integer not null check (shipping_kes >= 0),
  tax_kes integer not null check (tax_kes >= 0),
  total_kes integer not null check (total_kes >= 0),
  status public.order_status not null default 'pending',
  payment_status public.payment_status not null default 'pending',
  payment_provider text,
  payment_reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  unit_price_kes integer not null check (unit_price_kes >= 0),
  quantity integer not null check (quantity > 0),
  created_at timestamptz not null default now()
);

create index orders_user_id_idx on public.orders(user_id);
create index orders_recipient_user_id_idx on public.orders(recipient_user_id);
create index orders_status_idx on public.orders(status);
create index order_items_order_id_idx on public.order_items(order_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger products_updated_at before update on public.products for each row execute function public.set_updated_at();
create trigger inventory_updated_at before update on public.inventory for each row execute function public.set_updated_at();
create trigger orders_updated_at before update on public.orders for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.inventory enable row level security;
alter table public.addresses enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create policy "Public can view active products" on public.products for select using (is_active = true);
create policy "Public can view inventory for active products" on public.inventory for select using (exists (select 1 from public.products where products.id = inventory.product_id and products.is_active));
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can manage own addresses" on public.addresses for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can view own orders" on public.orders for select using (auth.uid() = user_id);
create policy "Users can view own order items" on public.order_items for select using (exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid()));

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

create policy "Admins can view all orders" on public.orders for select using (public.is_admin());
create policy "Tagged recipients can view non-incognito orders" on public.orders for select using (auth.uid() = recipient_user_id and not is_incognito);
create policy "Admins can view all order items" on public.order_items for select using (public.is_admin());
