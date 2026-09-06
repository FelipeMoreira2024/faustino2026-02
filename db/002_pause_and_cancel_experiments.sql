ALTER TABLE ab_experiments ADD COLUMN IF NOT EXISTS paused_at timestamptz;

ALTER TABLE ab_experiments DROP CONSTRAINT IF EXISTS ab_experiments_status_check;
ALTER TABLE ab_experiments ADD CONSTRAINT ab_experiments_status_check
  CHECK (status IN ('active', 'paused', 'completed', 'inconclusive', 'cancelled'));

DROP INDEX IF EXISTS ab_one_active_experiment;
CREATE UNIQUE INDEX IF NOT EXISTS ab_one_running_experiment
  ON ab_experiments ((1)) WHERE status IN ('active', 'paused');
