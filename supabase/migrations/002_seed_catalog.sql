insert into public.products (catalog_id, slug, name, description, price_kes, category, image_url)
values
  (1, 'premium-chocolate-box', 'Premium Chocolate Box', 'A premium selection of handcrafted chocolates.', 3250, 'Sweets', '/placeholder.svg'),
  (2, 'artisan-coffee-beans', 'Artisan Coffee Beans', 'Locally roasted artisan coffee beans.', 2470, 'Beverages', '/placeholder.svg'),
  (3, 'scented-candle-set', 'Scented Candle Set', 'A calming set of scented candles.', 4290, 'Home', '/placeholder.svg'),
  (4, 'gourmet-cookies', 'Gourmet Cookies', 'Freshly baked gourmet cookies.', 2210, 'Sweets', '/placeholder.svg'),
  (5, 'herbal-tea-collection', 'Herbal Tea Collection', 'A relaxing collection of herbal teas.', 2990, 'Beverages', '/placeholder.svg'),
  (6, 'luxury-hand-cream', 'Luxury Hand Cream', 'Nourishing hand cream for a thoughtful self-care gift.', 3770, 'Beauty', '/placeholder.svg'),
  (7, 'organic-honey-jar', 'Organic Honey Jar', 'A jar of organic honey.', 2600, 'Food', '/placeholder.svg'),
  (8, 'silk-scarf', 'Silk Scarf', 'A soft silk scarf in a versatile style.', 5980, 'Fashion', '/placeholder.svg')
on conflict (catalog_id) do update set
  name = excluded.name,
  description = excluded.description,
  price_kes = excluded.price_kes,
  category = excluded.category,
  image_url = excluded.image_url,
  is_active = true,
  updated_at = now();

insert into public.inventory (product_id, quantity)
select id, 100 from public.products where catalog_id between 1 and 8
on conflict (product_id) do nothing;
