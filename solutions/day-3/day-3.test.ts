import { expect, test } from "bun:test";
import { getSum, makeArrayFromInput } from "./day-3";
import { part_one, sample } from "./input";

const adjacent = (numberEntity: any, symbolEntity: any) => {
  // Expand the number entity by one in each direction => point in a rectangle test.
  const x0 = numberEntity.x - 1
  const x1 = numberEntity.x + numberEntity.token.length
  const y0 = numberEntity.y - 1
  const y1 = numberEntity.y + 1
  return symbolEntity.x >= x0 && symbolEntity.x <= x1 && symbolEntity.y >= y0 && symbolEntity.y <= y1
}

const parse = (s: string) => {
  const entities = []
  for (const [y, line] of s.split('\n').entries()) {
    for (const m of line.matchAll(/\d+/g))
      entities.push({ type: 'number', x: m.index, y, token: m[0], value: +m[0] })

    for (const m of line.matchAll(/[^0-9\.]/g))
      entities.push({ type: 'symbol', x: m.index, y, token: m[0] })
  }
  return entities
}

const part1 = (s: string) => {
  const entities = parse(s)
  const numbers = entities.filter(e => e.type === 'number')
  const symbols = entities.filter(e => e.type === 'symbol')

  return numbers
    .filter(n => symbols.some(s => adjacent(n, s)))
    .map(n => n.value)
    .reduce((a, b) => a + b, 0)
}

const part2 = (s: string) => {
  const entities = parse(s)
  const numbers = entities.filter(e => e.type === 'number')
  const symbols = entities.filter(e => e.type === 'symbol')

  return symbols
    .filter(s => s.token === '*')
    .map(s => {
      const adjacentNumbers = numbers.filter(n => adjacent(n, s)).map(n => n.value) as any
      return adjacentNumbers.length === 2 ? adjacentNumbers[0] * adjacentNumbers[1] : 0
    })
    .reduce((a, b) => a + b, 0)
}

test("it produces accurate array", () => {
  const arr = makeArrayFromInput(sample);

  const [first_row] = arr;

  const [first_item] = first_row;

  expect(first_item).toEqual({
    value: "4",
    symbol: false,
    part_number: 467,
    seperator: false,
    row: 0,
    col: 0,
  });
});

test("it produces sample sum from sample input", () => {
  expect(getSum(sample)).toEqual(4361);
});

test("it produces correct input for part one", () => {
  expect(getSum(part_one)).toEqual(527446);
});

test("it produces correct input for part two", () => {
  expect(part2(part_one)).toEqual(73201705)
})
