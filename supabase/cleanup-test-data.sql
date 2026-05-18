-- ============================================================
-- SafeSobati — Clean Test Data
-- Deletes all test marketplace data while preserving schema
-- ============================================================

-- Delete in order of foreign key dependencies

-- 1. Delete all ride request interactions
DELETE FROM whatsapp_notifications;

-- 2. Delete driver quotes (references ride_requests + drivers)
DELETE FROM driver_quotes;

-- 3. Delete ride requests (references users + drivers)
DELETE FROM ride_requests;

-- 4. Delete vehicles (references drivers)
DELETE FROM vehicles;

-- 5. Delete driver profiles
DELETE FROM drivers;

-- 6. Delete users with role='driver' (but keep admin/system users)
DELETE FROM users WHERE role IN ('driver', 'customer');

-- 7. Verification: Show remaining data
SELECT 'Users remaining:' as check_item, COUNT(*) as count FROM users
UNION ALL
SELECT 'Drivers remaining:', COUNT(*) FROM drivers
UNION ALL
SELECT 'Vehicles remaining:', COUNT(*) FROM vehicles
UNION ALL
SELECT 'Ride requests remaining:', COUNT(*) FROM ride_requests
UNION ALL
SELECT 'Driver quotes remaining:', COUNT(*) FROM driver_quotes
UNION ALL
SELECT 'WhatsApp notifications remaining:', COUNT(*) FROM whatsapp_notifications;
