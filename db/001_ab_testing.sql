CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS ab_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  path text NOT NULL UNIQUE CHECK (path ~ '^/[a-z0-9/_-]*$'),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ab_experiments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  baseline_page_id uuid NOT NULL REFERENCES ab_pages(id),
  challenger_page_id uuid NOT NULL REFERENCES ab_pages(id),
  baseline_allocation integer NOT NULL DEFAULT 50 CHECK (baseline_allocation BETWEEN 1 AND 99),
  mode text NOT NULL CHECK (mode IN ('manual', 'automatic')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'inconclusive')),
  started_at timestamptz NOT NULL DEFAULT now(),
  ends_at timestamptz,
  ended_at timestamptz,
  winner_page_id uuid REFERENCES ab_pages(id),
  decision_type text CHECK (decision_type IN ('manual', 'automatic')),
  decision_details jsonb,
  final_metrics jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (baseline_page_id <> challenger_page_id)
);

CREATE UNIQUE INDEX IF NOT EXISTS ab_one_active_experiment
  ON ab_experiments ((status)) WHERE status = 'active';

CREATE TABLE IF NOT EXISTS ab_participants (
  id uuid NOT NULL,
  experiment_id uuid NOT NULL REFERENCES ab_experiments(id) ON DELETE CASCADE,
  page_id uuid NOT NULL REFERENCES ab_pages(id),
  variant text NOT NULL CHECK (variant IN ('a', 'b')),
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (experiment_id, id)
);

CREATE TABLE IF NOT EXISTS ab_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  experiment_id uuid NOT NULL REFERENCES ab_experiments(id) ON DELETE CASCADE,
  participant_id uuid NOT NULL,
  page_id uuid NOT NULL REFERENCES ab_pages(id),
  variant text NOT NULL CHECK (variant IN ('a', 'b')),
  started_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  converted_at timestamptz,
  FOREIGN KEY (experiment_id, participant_id)
    REFERENCES ab_participants(experiment_id, id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS ab_sessions_experiment_variant
  ON ab_sessions (experiment_id, variant, started_at);
CREATE INDEX IF NOT EXISTS ab_sessions_recent_participant
  ON ab_sessions (experiment_id, participant_id, last_seen_at DESC);

CREATE TABLE IF NOT EXISTS ab_settings (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO ab_pages (name, path) VALUES
  ('Home original', '/'),
  ('Home B', '/b')
ON CONFLICT (path) DO NOTHING;

INSERT INTO ab_settings (key, value)
SELECT 'current_home_page_id', id::text FROM ab_pages WHERE path = '/'
ON CONFLICT (key) DO NOTHING;
