import { getDigitValue, getDigitValueWithString } from './part-1'
import { input_two, part_one, sample, sample_two } from './inputs'
import { expect, test } from 'bun:test'

test('part one returns sample result', () => {
  expect(getDigitValue(sample)).toEqual(142)
})

test('part one returns expected value', () => {
  expect(getDigitValue(part_one)).toEqual(54953)
})

test('part two returns sample result', () => {
  expect(getDigitValueWithString(sample_two)).toEqual(281)
})

test('part two returns expected value', () => {
  expect(getDigitValueWithString(input_two)).toEqual(53868)
})