type Color = "red" | "green" | "blue";

interface Move {
  count: number;
  color: Color;
}

interface Game {
  id: number;
  moves: Move[][];
}

export function parseGame(input: string): Game[] {
  const sanitized = input.trim().split("\n");
  let games: Game[] = [];

  for (let line of sanitized) {
    const [game_id_text, all_moves] = line.split(":");
    const game_id = parseInt(game_id_text.match(/\d+/)?.at(0) as string, 10);

    const moves: Move[][] = all_moves.split(";").map((all_move) => {
      const move = all_move.split(",");

      return move.map((part) => {
        const [count, color] = part.trim().split(" ");
        return {
          color: color as Color,
          count: parseInt(count, 10),
        };
      });
    });

    games.push({
      id: game_id,
      moves,
    });
  }

  return games;
}

export function possibleGameScore(game: Game[], gameRules: any): number {
  let possible: number[] = [];
  for (let { id, moves } of game) {
    const copy = Object.assign({}, gameRules);
    let add = true;
    for (let move of moves.flat()) {
      if (move.count > gameRules[move.color]) {
        add = false;
        break;
      }
    }

    if (add) {
      possible.push(id);
    }
  }
  return possible.reduce((count, id) => count + id, 0);
}
