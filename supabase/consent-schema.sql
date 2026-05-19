-- ============================================================
-- SafeSobati — Consent & Verification Compliance Schema
-- Run AFTER the main schema.sql
-- ============================================================

-- 1. Update drivers.status CHECK constraint to include under_review
-- (Requires dropping and recreating the constraint)
ALTER TABLE drivers DROP CONSTRAINT IF EXISTS drivers_status_check;
ALTER TABLE drivers
  ADD CONSTRAINT drivers_status_check
  CHECK (status IN ('pending', 'under_review', 'approved', 'rejected', 'suspended'));

-- 2. Consent Logs
-- Records every explicit consent action taken by a user or driver.
CREATE TABLE IF NOT EXISTS consent_logs (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid        REFERENCES users(id) ON DELETE SET NULL,
  driver_id       uuid        REFERENCES drivers(id) ON DELETE SET NULL,
  consent_type    text        NOT NULL CHECK (
                                consent_type IN (
                                  'terms_accepted',
                                  'privacy_accepted',
                                  'driver_agreement_accepted',
                                  'document_authenticity_confirmed',
                                  'whatsapp_communication_opt_in'
                                )
                              ),
  accepted_version text       NOT NULL DEFAULT '1.0',
  accepted_at     timestamptz NOT NULL DEFAULT now(),
  ip_address      inet,
  user_agent      text,
  platform        text        CHECK (platform IN ('web', 'whatsapp', 'api'))
);

-- 3. Driver Verification Audit Log
-- Immutable audit trail for every status change on a driver account.
CREATE TABLE IF NOT EXISTS driver_verification_audit (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id        uuid        NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
  previous_status  text        CHECK (previous_status IN ('pending', 'under_review', 'approved', 'rejected', 'suspended')),
  new_status       text        NOT NULL CHECK (new_status IN ('pending', 'under_review', 'approved', 'rejected', 'suspended')),
  changed_by       uuid        REFERENCES users(id) ON DELETE SET NULL,
  reason           text,
  ip_address       inet,
  changed_at       timestamptz NOT NULL DEFAULT now()
);

-- 4. Document Review Status
-- Tracks per-document review state for each driver.
CREATE TABLE IF NOT EXISTS document_review_status (
  id                uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id         uuid        NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
  document_type     text        NOT NULL CHECK (
                                  document_type IN (
                                    'aadhaar',
                                    'driving_licence',
                                    'vehicle_rc',
                                    'puc_certificate',
                                    'commercial_permit',
                                    'insurance',
                                    'fitness_certificate',
                                    'profile_photo'
                                  )
                                ),
  document_url      text        NOT NULL,
  status            text        NOT NULL DEFAULT 'pending' CHECK (
                                  status IN ('pending', 'under_review', 'approved', 'rejected')
                                ),
  rejection_reason  text,
  reviewed_by       uuid        REFERENCES users(id) ON DELETE SET NULL,
  reviewed_at       timestamptz,
  uploaded_at       timestamptz NOT NULL DEFAULT now(),
  expires_at        timestamptz,
  reminder_sent     boolean     NOT NULL DEFAULT false,
  UNIQUE (driver_id, document_type)
);

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE consent_logs           ENABLE ROW LEVEL SECURITY;
ALTER TABLE driver_verification_audit ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_review_status ENABLE ROW LEVEL SECURITY;

-- consent_logs: only admins can read; service role can insert
CREATE POLICY "Admins can view consent logs"
  ON consent_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
        AND users.role = 'admin'
    )
  );

CREATE POLICY "Service role inserts consent logs"
  ON consent_logs FOR INSERT
  WITH CHECK (true);

-- driver_verification_audit: admins read; service role inserts
CREATE POLICY "Admins can view audit trail"
  ON driver_verification_audit FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
        AND users.role = 'admin'
    )
  );

CREATE POLICY "Service role inserts audit trail"
  ON driver_verification_audit FOR INSERT
  WITH CHECK (true);

-- document_review_status: drivers see only their own docs; admins see all
CREATE POLICY "Drivers view own documents"
  ON document_review_status FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM drivers
      WHERE drivers.id = document_review_status.driver_id
        AND drivers.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins view all documents"
  ON document_review_status FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
        AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins update document review"
  ON document_review_status FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
        AND users.role = 'admin'
    )
  );

CREATE POLICY "Service role inserts documents"
  ON document_review_status FOR INSERT
  WITH CHECK (true);

-- ============================================================
-- Indexes
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_consent_logs_user_id       ON consent_logs (user_id);
CREATE INDEX IF NOT EXISTS idx_consent_logs_driver_id     ON consent_logs (driver_id);
CREATE INDEX IF NOT EXISTS idx_consent_logs_type_date     ON consent_logs (consent_type, accepted_at DESC);

CREATE INDEX IF NOT EXISTS idx_audit_driver_id            ON driver_verification_audit (driver_id);
CREATE INDEX IF NOT EXISTS idx_audit_changed_at           ON driver_verification_audit (changed_at DESC);

CREATE INDEX IF NOT EXISTS idx_docreview_driver_id        ON document_review_status (driver_id);
CREATE INDEX IF NOT EXISTS idx_docreview_status           ON document_review_status (status);
