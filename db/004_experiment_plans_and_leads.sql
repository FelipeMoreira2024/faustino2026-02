BEGIN;

ALTER TABLE ab_experiments ADD COLUMN IF NOT EXISTS plan jsonb;

ALTER TABLE ab_participants
  ADD COLUMN IF NOT EXISTS contact_reference text CHECK (contact_reference ~ '^[A-F0-9]{16}$'),
  ADD COLUMN IF NOT EXISTS contacted_at timestamptz,
  ADD COLUMN IF NOT EXISTS qualified_at timestamptz;

CREATE UNIQUE INDEX IF NOT EXISTS ab_participants_contact_reference
  ON ab_participants (contact_reference) WHERE contact_reference IS NOT NULL;

COMMIT;
