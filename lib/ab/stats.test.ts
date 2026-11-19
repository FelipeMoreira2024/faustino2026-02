import assert from "node:assert/strict";
import test from "node:test";
import { browserRateDifference, evaluateAutomaticWinner, evaluatePlannedWinner, planSample } from "@/lib/ab/stats";

function sample(size: number, conversionRate: number) {
  const converted = Math.round(size * conversionRate);
  return Array.from({ length: size }, (_, index) => ({
    visits: 1,
    conversions: index < converted ? 1 : 0,
  }));
}

test("declara a concorrente quando a diferença tem evidência", () => {
  const result = evaluateAutomaticWinner("challenger-wins", sample(1000, 0.1), sample(1000, 0.2));
  assert.equal(result.outcome, "challenger");
});

test("mantém a base quando ela tem evidência de superioridade", () => {
  const result = evaluateAutomaticWinner("baseline-wins", sample(1000, 0.2), sample(1000, 0.1));
  assert.equal(result.outcome, "baseline");
});

test("exige mil navegadores em cada variante", () => {
  const result = evaluateAutomaticWinner("unequal", sample(1500, 0.1), sample(999, 0.4));
  assert.equal(result.outcome, "inconclusive");
  assert.equal("reason" in result ? result.reason : null, "minimum_sample");
});

test("não decide com amostra insuficiente", () => {
  const result = evaluateAutomaticWinner("small-sample", sample(100, 0.2), sample(100, 0.3));
  assert.equal(result.outcome, "inconclusive");
  assert.equal("reason" in result ? result.reason : null, "minimum_sample");
});

test("bloqueia decisão com desequilíbrio significativo apesar de amostra suficiente", () => {
  const result = evaluateAutomaticWinner("unequal", sample(1500, 0.1), sample(1000, 0.4));
  assert.deepEqual(result, { outcome: "inconclusive", reason: "allocation_mismatch" });
});

test("dimensiona um teste que parte de 30% e busca 10 pontos de melhora", () => {
  assert.deepEqual(planSample(30, 10, 8), { perVariant: 356, collectionDays: 89 });
  assert.equal(planSample(90, 10, 8), null);
  assert.equal(planSample(30, 10, 0), null);
});

test("usa o tamanho planejado por variante e exige evidência e melhora prática", () => {
  const plan = { perVariant: 356, minimumLift: 10 };
  const group = (browsers: number, outcomes: number) => ({ browsers, outcomes });
  const baseline = group(400, 120);
  const reason = (attempt: ReturnType<typeof evaluatePlannedWinner>) => attempt.outcome === "inconclusive" ? attempt.reason : null;
  assert.equal(reason(evaluatePlannedWinner(plan, baseline, group(355, 200))), "minimum_sample");
  assert.equal(reason(evaluatePlannedWinner(plan, baseline, group(650, 325))), "allocation_mismatch");
  assert.equal(reason(evaluatePlannedWinner(plan, baseline, group(400, 122))), "confidence_interval");
  assert.equal(reason(evaluatePlannedWinner(plan, baseline, group(400, 155))), "minimum_lift");
  assert.equal(evaluatePlannedWinner(plan, baseline, group(400, 160)).outcome, "challenger");
  assert.equal(evaluatePlannedWinner(plan, group(400, 160), baseline).outcome, "baseline");
  assert.equal(browserRateDifference(group(0, 0), baseline), null);
});
