import { test, expect } from 'bun:test'
import { parseGame, possibleGameScore } from './day-2'
import { part_one, sample } from './inputs'

test('parses game appropriately', () => {
  const game = parseGame(sample)

  for (let i = 0; i < game.length; i++) {
    const row = game[i]
    expect(row.id).toBe(i + 1)
  }

  // spot check

  const [move_one, move_two] = game[0].moves[0]

  expect(move_one).toEqual(
    {
      color: 'blue',
      count: 3
    }
  )

  expect(move_two).toEqual({
    color: 'red',
    count: 4
  })
})

test('generates sample input correctly', () => {
  const game = parseGame(sample)

  const score = possibleGameScore(game, {
    red: 12,
    green: 13,
    blue: 14
  })

  expect(score).toBe(8)
})

test('generates example correctly', () => {
  const game = parseGame(part_one)

  const score = possibleGameScore(game, {
    red: 12,
    green: 13,
    blue: 14
  })

  expect(score).toBe(366)
})