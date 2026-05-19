-- ============================================================
-- SafeSobati — Add driver approval audit columns
-- Run once in Supabase SQL editor for existing databases.
-- Safe to run multiple times (IF NOT EXISTS checks).
-- ============================================================

ALTER TABLE public.drivers
  ADD COLUMN IF NOT EXISTS approved_by uuid REFERENCES public.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS approved_at timestamptz,
  ADD COLUMN IF NOT EXISTS rejection_reason text;
