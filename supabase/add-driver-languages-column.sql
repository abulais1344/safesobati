-- ============================================================
-- SafeSobati — Add languages column to drivers table
-- Run once in Supabase SQL editor for existing databases.
-- Safe to run multiple times (IF NOT EXISTS checks).
-- ============================================================

ALTER TABLE public.drivers
  ADD COLUMN IF NOT EXISTS languages jsonb NOT NULL DEFAULT '[]'::jsonb;
