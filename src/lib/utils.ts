import { Index } from '../types/types';

export const isPerfectSquare = (num: number): boolean => {
  const sqrt = Math.sqrt(num);
  return sqrt === Math.floor(sqrt);
};

export const stringTo2DArray = (str: string): string[][] => {
  if (!str) return [];
  if (!isPerfectSquare(str.length))
    throw new Error('Invalid input: string length is not a perfect square');

  const size = Math.sqrt(str.length);
  const matrix: string[][] = [];

  for (let i = 0; i < size; i++) {
    matrix.push(str.slice(i * size, (i + 1) * size).split(''));
  }

  return matrix;
};

export const getInitialIndexes = (words: string[], matrix: string[][]) => {
  const initials = words.map((word) => word[0]);
  const results: Index[] = [];

  for (let y = 0; y <= matrix.length - 1; y++) {
    for (let x = 0; x <= matrix[y].length - 1; x++) {
      const letter = matrix[y][x];
      const foundLetter = initials.find((initial) => initial === letter);
      if (foundLetter)
        results.push({
          letter: foundLetter,
          row: y,
          col: x
        });
    }
  }
  return results;
};

export const isCorrectWord = (
  word: string,
  matrix: string[][],
  func: (row: number, col: number) => Omit<Index, 'letter'>,
  startingIndex: Omit<Index, 'letter'>
) => {
  let currentIndex = startingIndex;

  for (let letterIndex = 0; letterIndex < word.length - 1; letterIndex++) {
    if (word[letterIndex] !== matrix[currentIndex.row][currentIndex.col])
      return { isFound: false };
    if (letterIndex !== word.length - 1)
      currentIndex = func(currentIndex.row, currentIndex.col);
  }

  return { isFound: true, startingPos: startingIndex, endingPos: currentIndex };
};

export const searchWord = (
  word: string,
  matrix: string[][],
  startingIndex: Index
) => {
  const directions = [
    {
      name: 'vertical reversed',
      func: (row: number, col: number) => ({ row: row - 1, col }),
      condition: () => startingIndex.row >= word.length - 1
    },
    {
      name: 'diagonal to top right',
      func: (row: number, col: number) => ({ row: row - 1, col: col + 1 }),
      condition: () =>
        startingIndex.row >= word.length - 1 &&
        startingIndex.col + word.length - 1 <= matrix[0].length
    },
    {
      name: 'horizontal',
      func: (row: number, col: number) => ({ row, col: col + 1 }),
      condition: () => startingIndex.col + word.length - 1 <= matrix[0].length
    },
    {
      name: 'diagonal to bottom right',
      func: (row: number, col: number) => ({ row: row + 1, col: col + 1 }),
      condition: () =>
        startingIndex.col + word.length - 1 <= matrix[0].length &&
        startingIndex.row + word.length - 1 <= matrix.length
    },
    {
      name: 'vertical',
      func: (row: number, col: number) => ({ row: row + 1, col }),
      condition: () => startingIndex.row + word.length - 1 <= matrix.length
    },
    {
      name: 'diagonal reverse to bottom left',
      func: (row: number, col: number) => ({ row: row + 1, col: col - 1 }),
      condition: () =>
        startingIndex.row + word.length - 1 <= matrix.length &&
        startingIndex.col >= word.length - 1
    },
    {
      name: 'horizontal reversed',
      func: (row: number, col: number) => ({ row, col: col - 1 }),
      condition: () => startingIndex.col >= word.length - 1
    },
    {
      name: 'diagonal reverse to top left',
      func: (row: number, col: number) => ({ row: row - 1, col: col - 1 }),
      condition: () =>
        startingIndex.row >= word.length - 1 &&
        startingIndex.col >= word.length - 1
    }
  ];

  for (const direction of directions) {
    if (direction.condition()) {
      const isCorrect = isCorrectWord(
        word,
        matrix,
        direction.func,
        startingIndex
      );
      if (isCorrect.isFound) {
        console.log(
          `Word found! Direction: ${direction.name}`,
          startingIndex,
          isCorrect.endingPos
        );
        return true;
      }
    }
  }

  return false;
};
