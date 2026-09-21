alter table public.profiles add column if not exists email text unique;
alter table public.orders add column if not exists recipient_user_id uuid references public.profiles(id) on delete set null;
alter table public.orders add column if not exists recipient_email text;
alter table public.orders add column if not exists is_incognito boolean not null default false;

create index if not exists orders_recipient_user_id_idx on public.orders(recipient_user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, first_name, last_name)
  values (
    new.id,
    lower(new.email),
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name'
  )
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

drop policy if exists "Admins can view all orders" on public.orders;
create policy "Admins can view all orders" on public.orders for select using (public.is_admin());
drop policy if exists "Tagged recipients can view non-incognito orders" on public.orders;
create policy "Tagged recipients can view non-incognito orders" on public.orders for select using (auth.uid() = recipient_user_id and not is_incognito);
drop policy if exists "Admins can view all order items" on public.order_items;
create policy "Admins can view all order items" on public.order_items for select using (public.is_admin());