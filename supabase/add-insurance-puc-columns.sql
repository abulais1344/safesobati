-- ============================================================
-- SafeSobati — Add insurance and PUC columns to drivers table
-- Run once in Supabase SQL editor for existing databases.
-- Safe to run multiple times (IF NOT EXISTS checks).
-- ============================================================

ALTER TABLE public.drivers
  ADD COLUMN IF NOT EXISTS insurance_url text,
  ADD COLUMN IF NOT EXISTS insurance_expiry date,
  ADD COLUMN IF NOT EXISTS puc_url text,
  ADD COLUMN IF NOT EXISTS puc_expiry date;
