-- ============================================================
-- SafeSobati — Admin Managed Popular Routes
-- Adds popular_routes table so admin can manage corridor cards and images
-- ============================================================

CREATE TABLE IF NOT EXISTS public.popular_routes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_city text NOT NULL,
  to_city text NOT NULL,
  distance text NOT NULL,
  travel_time text NOT NULL,
  base_fare text NOT NULL,
  image_url text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 100,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_popular_routes_active_order
  ON public.popular_routes(is_active, sort_order);

ALTER TABLE public.popular_routes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS popular_routes_read_all ON public.popular_routes;
CREATE POLICY popular_routes_read_all ON public.popular_routes FOR SELECT USING (true);

DROP TRIGGER IF EXISTS popular_routes_set_updated_at ON public.popular_routes;
CREATE TRIGGER popular_routes_set_updated_at
BEFORE UPDATE ON public.popular_routes
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- Seed defaults only if table is empty
INSERT INTO public.popular_routes (from_city, to_city, distance, travel_time, base_fare, image_url, is_active, sort_order)
SELECT * FROM (
  VALUES
    ('Nanded', 'Hyderabad Airport', '280 km', '5 hr 20 min', 'INR 8,400', 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1200&q=80', true, 10),
    ('Nanded', 'Hazur Sahib', '8 km', '22 min', 'INR 220', 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80', true, 20),
    ('Nanded', 'Pune', '520 km', '9 hr 10 min', 'INR 14,500', 'https://images.unsplash.com/photo-1533473359331-35acda7ce3c1?auto=format&fit=crop&w=1200&q=80', true, 30),
    ('Nanded', 'Aurangabad', '265 km', '4 hr 50 min', 'INR 7,900', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80', true, 40),
    ('Ardhapur', 'Nanded', '22 km', '38 min', 'INR 780', 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?auto=format&fit=crop&w=1200&q=80', true, 50),
    ('Nanded', 'Pusad', '170 km', '3 hr 20 min', 'INR 4,950', 'https://images.unsplash.com/photo-1488070537510-e21cc028cb29?auto=format&fit=crop&w=1200&q=80', true, 60),
    ('Nanded', 'Bangalore', '690 km', '12 hr 20 min', 'INR 18,900', 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80', true, 70)
) AS seed(from_city, to_city, distance, travel_time, base_fare, image_url, is_active, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.popular_routes);
