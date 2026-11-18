BEGIN;

ALTER TABLE ab_pages
  ADD COLUMN IF NOT EXISTS host text NOT NULL DEFAULT 'goiania.rodrigofaustinoadvocacia.com.br',
  ADD COLUMN IF NOT EXISTS discovered boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS available boolean NOT NULL DEFAULT true;
ALTER TABLE ab_pages DROP CONSTRAINT IF EXISTS ab_pages_path_key;
CREATE UNIQUE INDEX IF NOT EXISTS ab_pages_host_path ON ab_pages (host, path);

ALTER TABLE ab_experiments ADD COLUMN IF NOT EXISTS entry_page_id uuid REFERENCES ab_pages(id);
UPDATE ab_experiments SET entry_page_id = (
  SELECT id FROM ab_pages WHERE host = 'goiania.rodrigofaustinoadvocacia.com.br' AND path = '/'
) WHERE entry_page_id IS NULL;
ALTER TABLE ab_experiments ALTER COLUMN entry_page_id SET NOT NULL;

CREATE TABLE IF NOT EXISTS ab_publications (
  entry_page_id uuid PRIMARY KEY REFERENCES ab_pages(id),
  page_id uuid NOT NULL REFERENCES ab_pages(id),
  CHECK (entry_page_id <> page_id)
);

INSERT INTO ab_publications (entry_page_id, page_id)
SELECT entry.id, winner.id
FROM ab_settings s
JOIN ab_pages winner ON winner.id::text = s.value
JOIN ab_pages entry ON entry.host = 'goiania.rodrigofaustinoadvocacia.com.br' AND entry.path = '/'
WHERE s.key = 'current_home_page_id' AND entry.id <> winner.id
ON CONFLICT DO NOTHING;

WITH reach AS (
  SELECT experiment_id,
    count(DISTINCT participant_id) FILTER (WHERE variant = 'a') AS baseline_participants,
    count(DISTINCT participant_id) FILTER (WHERE variant = 'b') AS challenger_participants
  FROM ab_sessions GROUP BY experiment_id
)
UPDATE ab_experiments e
SET final_metrics = e.final_metrics || jsonb_build_object(
  'baseline_participants', r.baseline_participants, 'challenger_participants', r.challenger_participants
)
FROM reach r
WHERE r.experiment_id = e.id AND e.final_metrics IS NOT NULL
  AND NOT e.final_metrics ? 'baseline_participants';

COMMIT;
