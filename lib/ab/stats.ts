type ParticipantResult = { visits: number; conversions: number };

function seededRandom(seed: string) {
  let state = 2166136261;
  for (const character of seed) {
    state ^= character.charCodeAt(0);
    state = Math.imul(state, 16777619);
  }
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 4294967296;
  };
}

function bootstrapRate(rows: ParticipantResult[], random: () => number) {
  let visits = 0;
  let conversions = 0;
  for (let index = 0; index < rows.length; index += 1) {
    const selected = rows[Math.floor(random() * rows.length)];
    visits += selected.visits;
    conversions += selected.conversions;
  }
  return visits === 0 ? 0 : conversions / visits;
}

export function evaluateAutomaticWinner(
  experimentId: string,
  baseline: ParticipantResult[],
  challenger: ParticipantResult[],
  iterations = 10_000
) {
  const baselineConversions = baseline.reduce((sum, row) => sum + row.conversions, 0);
  const challengerConversions = challenger.reduce((sum, row) => sum + row.conversions, 0);
  if (
    baseline.length < 1_000 || challenger.length < 1_000 ||
    baselineConversions < 30 ||
    challengerConversions < 30 ||
    baseline.length === 0 ||
    challenger.length === 0
  ) {
    return { outcome: "inconclusive" as const, reason: "minimum_sample" as const };
  }

  const random = seededRandom(experimentId);
  const differences = Array.from({ length: iterations }, () =>
    bootstrapRate(challenger, random) - bootstrapRate(baseline, random)
  ).sort((left, right) => left - right);
  const lower = differences[Math.floor(iterations * 0.025)];
  const upper = differences[Math.floor(iterations * 0.975)];

  if (lower > 0) return { outcome: "challenger" as const, lower, upper };
  if (upper < 0) return { outcome: "baseline" as const, lower, upper };
  return { outcome: "inconclusive" as const, reason: "confidence_interval" as const, lower, upper };
}
