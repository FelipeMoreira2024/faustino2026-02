import assert from "node:assert/strict";
import test from "node:test";
import { evaluateAutomaticWinner } from "@/lib/ab/stats";

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
