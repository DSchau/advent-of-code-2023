type WinningLookup = {
  [key: string]: boolean;
}

interface Game {
 id: number;
 options: number[];
 winning: WinningLookup;
}

export function getScore(input: string): number {
  const rows = input.trim().split('\n')

  const game: Game[] = rows.map(row => {
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
  })

  return game.reduce((total: number, game: Game) => {
    const winning_numbers = game.options
      .filter(option => game.winning[option])

    const score = winning_numbers.length === 0 ? 0 : Math.pow(2, winning_numbers.length - 1)
    return total + score
  }, 0)
}
