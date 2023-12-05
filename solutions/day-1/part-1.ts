const digits: string[] = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const getTotal = (numbers: string[]): number => {
  return numbers.reduce((total, digits) => {
    const first = digits?.at(0);
    const last = digits?.at(-1);

    const pair = parseInt(`${first}${last}`, 10);

    return total + pair;
  }, 0);
};

export function getDigitValueWithString(input: string): number {
  const lines = input.trimEnd().split("\n");

  let rows: any[] = [];

  for (let i = 0; i < lines.length; i++) {
    let row = [];
    const line = lines[i];

    for (let j = 0; j < line.length; j++) {
      const substr = line.slice(j);
      const char = line[j];

      if (char.match(/^\d$/)) {
        row.push(char);
      }

      const match = digits.find((part) => substr.indexOf(part) === 0);
      const index = digits.findIndex((part) => substr.indexOf(part) === 0);
      if (index >= 0) {
        row.push(index + 1);
      }
    }

    rows.push(row);
  }

  return getTotal(rows);
}

export function getDigitValue(input: string): number {
  const numbers = input
    .trim()
    .split("\n")
    .map((line) => {
      return line.match(/\d/g);
    });

  return getTotal(numbers as any);
}
