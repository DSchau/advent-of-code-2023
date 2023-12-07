import { expect, test } from "bun:test";
import { day_one, sample } from "./input";
import { getScore } from "./day-4";

test('it works for sample input', () => {
  expect(getScore(sample)).toEqual(13)
})

test('it works for puzzle input', () => {
  expect(getScore(day_one)).toEqual(20107)
})