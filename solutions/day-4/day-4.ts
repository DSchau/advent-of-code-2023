type WinningLookup = {
  [key: string]: boolean;
}

interface Game {
 id: number;
 options: number[];
 winning: WinningLookup;
 winning_mumbers?: number[];
}

export function getGame(input: string): Game[] {
  const rows = input.trim().split('\n')
  
  return rows.map(row => {
    const id: number = row.match(/Card\s(\d+)/)?.pop() as any
    
    let [winning, options] = row.replace(/Card[^:]+:/, '').trim().split('|').map(part => part.trim())

    winning = winning.match(/\d+/g)?.reduce((merged: WinningLookup, num: string) => {
      merged[num] = true
      return merged
    }, {}) as any
    options = options.match(/\d+/g)?.map(part => parseInt(part, 10)) as any

    return {
      id,
      options,
      winning
    }
  }) as any
}

export function getWinningNumbers(game: Game[]): number[][] {
  return game.map(row => {
    const winning_numbers = row.options
      .filter(option => row.winning[option])

    return winning_numbers
  })
}

export function getScore(input: string): number {
  const game = getGame(input)

  const numbers = getWinningNumbers(game)

  return numbers.reduce((total, row) => {
    const score = row.length === 0 ? 0 : Math.pow(2, row.length - 1)

    return total + score
  }, 0)
}

export function getScoreWithCards(input: string): number {
  const game = getGame(input)
    .map(row => {
      return Object.assign({}, row, {
        winning_numbers: row.options
          .filter(option => row.winning[option])
      })
    })

  let clone = [...game]
  let counter = 0
  
  while (clone.length > 0) {
    const card = clone.shift() as any

    const originalIndex = game.indexOf(card)
    const next = originalIndex + 1

    const copies = game.slice(next, next + card.winning_numbers.length)

    if (originalIndex === 0) {
      console.log({
        copies,
        next,
        card,
      })
    }

    counter += copies.length

    clone = clone.concat(copies)
  }

  return counter
}
