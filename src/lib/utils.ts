import { Index } from "../types/types";

const isPerfectSquare = (num: number): boolean => {
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
      const foundLetter = initials.find((initial) => initial === letter)
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

const isCorrectWord = (word: string, matrix: string[][], func: (row: number, col: number) => Omit<Index, "letter">, startingIndex: Omit<Index, "letter">) => {
  let currentIndex = startingIndex

  for (let letterIndex = 0; letterIndex < word.length - 1; letterIndex++) {
    if (word[letterIndex] !== matrix[currentIndex.row][currentIndex.col])
      return {isFound: false};
    if (letterIndex !== word.length - 1)
      currentIndex = func(currentIndex.row, currentIndex.col);
  }

  return {isFound: true, startingPos: startingIndex, endingPos: currentIndex};
}

export const searchWord = (word: string, matrix: string[][], startingIndex: Index) => {
  const wordLength = word.length;

  const isFittingInHeight = startingIndex.row + wordLength - 1 <= matrix.length
  const isFittingInLength = startingIndex.col + wordLength - 1 <= matrix[0].length
  const isFittingInHeightRev = startingIndex.row >= wordLength - 1
  const isFittingInLengthRev = startingIndex.col >= wordLength - 1

  console.log("Checking word:", word, "Starting index:", startingIndex)

  if (isFittingInHeightRev) {
    const toTheTop = (row: number, col: number) => ({row: row - 1, col})
    const isCorrect = isCorrectWord(word, matrix, toTheTop, startingIndex)
    if (isCorrect.isFound) {
      console.log("Word found! Direction: vertical reversed", startingIndex, isCorrect.endingPos)
      return true
    }
  }

  if (isFittingInHeightRev && isFittingInLength) {
    const toTheTopRight = (row: number, col: number) => ({row: row - 1, col: col + 1})
    const isCorrect = isCorrectWord(word, matrix, toTheTopRight, startingIndex)
    if (isCorrect.isFound) {
      console.log("Word found! Direction: diagonal to top right", startingIndex, isCorrect.endingPos)
      return true
    }
  }

  if (isFittingInLength) {
    const toTheRight = (row: number, col: number) => ({row, col: col + 1})
    const isCorrect = isCorrectWord(word, matrix, toTheRight, startingIndex)
    if (isCorrect.isFound) {
      console.log("Word found! Direction: horizontal", startingIndex, isCorrect.endingPos)
      return true
    }
  }

  if (isFittingInLength && isFittingInHeight) {
    const toTheBottomRight = (row: number, col: number) => ({row: row + 1, col: col + 1})
    const isCorrect = isCorrectWord(word, matrix, toTheBottomRight, startingIndex)
    if (isCorrect.isFound) {
      console.log("Word found! Direction: diagonal to bottom right", startingIndex, isCorrect.endingPos)
      return true
    }
  }

  if (isFittingInHeight) {
    const toTheBottom = (row: number, col: number) => ({row: row + 1, col})
    const isCorrect = isCorrectWord(word, matrix, toTheBottom, startingIndex)
    if (isCorrect.isFound) {
      console.log("Word found! Direction: vertical", startingIndex, isCorrect.endingPos)
      return true
    }
  }

  if (isFittingInHeight && isFittingInLengthRev) {
    const toTheBottomLeft = (row: number, col: number) => ({row: row + 1, col: col - 1})
    const isCorrect = isCorrectWord(word, matrix, toTheBottomLeft, startingIndex)
    if (isCorrect.isFound) {
      console.log("Word found! Direction: diagonal reverse to bottom left", startingIndex, isCorrect.endingPos)
      return true
    }
  }

  if (isFittingInLengthRev) {
    const toTheLeft = (row: number, col: number) => ({row, col: col - 1})
    const isCorrect = isCorrectWord(word, matrix, toTheLeft, startingIndex)
    if (isCorrect.isFound) {
      console.log("Word found! Direction: diagonal reverse to bottom left", startingIndex, isCorrect.endingPos)
      return true
    }
  }

  if (isFittingInHeightRev && isFittingInLengthRev) {
    const toTheTopLeft = (row: number, col: number) => ({row: row - 1, col: col - 1})
    const isCorrect = isCorrectWord(word, matrix, toTheTopLeft, startingIndex)
    if (isCorrect.isFound) {
      console.log("Word found! Direction: diagonal reverse to top left", startingIndex, isCorrect.endingPos)
      return true
    }
  }
  console.log("No word found :(")
  return false
}