import { expect, test } from "bun:test";
import { sample } from "./input";
import { getScore } from "./day-4";

test('it works for sample input', () => {
  expect(getScore(sample)).toEqual(0)
})
