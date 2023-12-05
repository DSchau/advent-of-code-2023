type Character = {
  value: string;
  part_number?: number;
  symbol: boolean;
  seperator: boolean;
  row: number;
  col: number;
};

const getPartNumber = (line: string, position: number): number | null => {
  if (!line[position].match(/\d/)) {
    return null;
  }
  let start = position;
  let end = position;
  while (line[start - 1]?.match(/\d/)) {
    start -= 1;
  }

  while (line[end]?.match(/\d/)) {
    end += 1;
  }

  return parseInt(line.slice(start, end), 10);
};

export function makeArrayFromInput(input: string): Character[][] {
  const lines = input.trim().split("\n");

  let arr: Character[][] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const split = line.split("");
    const parsed = split?.map((value, col) => {
      const part_number = getPartNumber(line, col);
      return {
        value,
        part_number: Number.isNaN(part_number) ? null : part_number,
        symbol: ["#", "$", "*", "+"].some((special) => special === value),
        seperator: value === ".",
        row: i,
        col,
      };
    });

    arr.push(parsed as any[]);
  }

  return arr;
}

const isAdjacent = (char: Character, board: Character[][]) => {
  if (!char.part_number) {
    return false;
  }

  const top = board[char.row - 1]?.[char.col];
  const right = board[char.row]?.[char.col + 1];
  const bottom = board[char.row + 1]?.[char.col];
  const left = board[char.row]?.[char.col - 1];

  const adjacencies = {
    top_right: board[char.row - 1]?.[char.col + 1],
    bottom_right: board[char.row + 1]?.[char.col + 1],
    bottom_left: board[char.row + 1]?.[char.col - 1],
    top_left: board[char.row - 1]?.[char.col + 1],
  };

  return [
    left,
    right,
    top,
    bottom,
    adjacencies.top_right,
    adjacencies.bottom_right,
    adjacencies.bottom_left,
    adjacencies.bottom_left,
  ].some((part) => {
    return part && part.symbol === true;
  });
};

export function getSum(input: string): number {
  const board = makeArrayFromInput(input);

  let adjacent: number[] = [];

  for (let row of board) {
    const possible = row
      .map((part) => part.value)
      .join("")
      .match(/\d+/g)
      ?.map((part) => parseInt(part, 10)) as number[];
    for (let j = 0; j < row.length; j++) {
      let char = row[j];
      if (char.part_number && isAdjacent(char, board)) {
        const index = possible?.indexOf(char.part_number);
        const part = possible.splice(index, 1)[0];
        if (part) {
          adjacent.push(part);
        }
      }
    }
  }

  return Array.from(adjacent).reduce((total, cur) => total + cur, 0);
}
