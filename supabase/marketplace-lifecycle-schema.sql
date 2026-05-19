-- ============================================================
-- SafeSobati — Marketplace Lifecycle & Privacy Alignment
-- Applies booking lifecycle and trip-type updates for production DBs
-- ============================================================

-- CRITICAL: Run these UPDATEs FIRST to migrate existing data
-- Before dropping the old constraint

-- Migrate 'quoted' → 'responded' (15 rows affected)
UPDATE ride_requests SET status = 'responded' WHERE status = 'quoted';

-- Migrate 'accepted' → 'confirmed' (5 rows affected)
UPDATE ride_requests SET status = 'confirmed' WHERE status = 'accepted';

-- Migrate 'in_progress' → 'confirmed' (if any exist)
UPDATE ride_requests SET status = 'confirmed' WHERE status = 'in_progress';

-- Now drop the old constraints
ALTER TABLE ride_requests DROP CONSTRAINT IF EXISTS ride_requests_status_check;
ALTER TABLE ride_requests DROP CONSTRAINT IF EXISTS ride_requests_trip_type_check;

-- Apply new trip_type constraint
ALTER TABLE ride_requests
  ADD CONSTRAINT ride_requests_trip_type_check
  CHECK (
    trip_type IN (
      'city',
      'airport',
      'station',
      'outstation',
      'religious',
      'full_day',
      'half_day',
      'evening',
      'hospital'
    )
  );

-- Apply new booking status constraint
ALTER TABLE ride_requests
  ADD CONSTRAINT ride_requests_status_check
  CHECK (
    status IN (
      'pending',
      'responded',
      'shortlisted',
      'confirmed',
      'completed',
      'cancelled'
    )
  );

-- Verification: confirm new status distribution
SELECT status, COUNT(*) as count FROM ride_requests GROUP BY status ORDER BY status;
