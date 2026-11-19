import type { ExperimentPlanInput } from "@/lib/ab/types";

type ParticipantResult = { visits: number; conversions: number };
type BrowserResult = { browsers: number; outcomes: number };

export const MAX_COLLECTION_DAYS = 90;
export const MAX_ATTRIBUTION_DAYS = 14;

export function planSample(baselineRate: number, minimumLift: number, dailyBrowsers: number) {
  if (!Number.isFinite(baselineRate) || baselineRate < 0.1 || !Number.isFinite(minimumLift) ||
      minimumLift < 0.1 || baselineRate + minimumLift >= 100 ||
      !Number.isSafeInteger(dailyBrowsers) || dailyBrowsers < 1) return null;
  const a = baselineRate / 100;
  const b = (baselineRate + minimumLift) / 100;
  const pooled = (a + b) / 2;
  const error = 1.959964 * Math.sqrt(2 * pooled * (1 - pooled));
  const power = 0.841621 * Math.sqrt(a * (1 - a) + b * (1 - b));
  const perVariant = Math.ceil(((error + power) / (b - a)) ** 2);
  return { perVariant, collectionDays: Math.ceil(2 * perVariant / dailyBrowsers) };
}

function wilson({ browsers, outcomes }: BrowserResult) {
  const z = 1.959964;
  const rate = outcomes / browsers;
  const denominator = 1 + z ** 2 / browsers;
  const center = (rate + z ** 2 / (2 * browsers)) / denominator;
  const margin = z * Math.sqrt((rate * (1 - rate) + z ** 2 / (4 * browsers)) / browsers) / denominator;
  return { rate, lower: Math.max(0, center - margin), upper: Math.min(1, center + margin) };
}

export function browserRateDifference(baseline: BrowserResult, challenger: BrowserResult) {
  if (!baseline.browsers || !challenger.browsers) return null;
  const a = wilson(baseline);
  const b = wilson(challenger);
  const difference = b.rate - a.rate;
  return {
    difference,
    lower: difference - Math.hypot(b.rate - b.lower, a.upper - a.rate),
    upper: difference + Math.hypot(b.upper - b.rate, a.rate - a.lower),
  };
}

export function evaluatePlannedWinner(
  plan: Pick<ExperimentPlanInput, "minimumLift"> & { perVariant: number },
  baseline: BrowserResult,
  challenger: BrowserResult,
) {
  const result = browserRateDifference(baseline, challenger);
  if (!result || baseline.browsers < plan.perVariant || challenger.browsers < plan.perVariant) {
    return { ...result, outcome: "inconclusive" as const, reason: "minimum_sample" };
  }
  if (hasAllocationMismatch(baseline.browsers, challenger.browsers)) {
    return { ...result, outcome: "inconclusive" as const, reason: "allocation_mismatch" };
  }
  if (result.lower <= 0 && result.upper >= 0) {
    return { ...result, outcome: "inconclusive" as const, reason: "confidence_interval" };
  }
  if (Math.abs(result.difference) * 100 + 1e-9 < plan.minimumLift) {
    return { ...result, outcome: "inconclusive" as const, reason: "minimum_lift" };
  }
  return { ...result, outcome: result.lower > 0 ? "challenger" as const : "baseline" as const };
}


export function hasAllocationMismatch(baseline: number, challenger: number) {
  const total = baseline + challenger;
  return total >= 10 && (baseline - challenger) ** 2 / total > 10.827566;
}

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

  if (hasAllocationMismatch(baseline.length, challenger.length)) {
    return { outcome: "inconclusive" as const, reason: "allocation_mismatch" as const };
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
