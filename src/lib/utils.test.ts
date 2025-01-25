import { Index } from '../types/types';
import {
  isPerfectSquare,
  getInitialIndexes,
  isCorrectWord,
  searchWord,
  stringTo2DArray
} from './utils';

test('isPerfectSquare', () => {
  expect(isPerfectSquare(16)).toBe(true);
  expect(isPerfectSquare(15)).toBe(false);
});

test('stringTo2DArray valid array', () => {
  const str = 'abcd';
  const expected = [
    ['a', 'b'],
    ['c', 'd']
  ];
  expect(stringTo2DArray(str)).toEqual(expected);
});

test('stringTo2DArray invalid array', () => {
  const str = 'abc';
  expect(() => stringTo2DArray(str)).toThrow();
});

test('getInitialIndexes with valid values', () => {
  const words = ['cat', 'dog'];
  const matrix = [
    ['c', 'a', 't'],
    ['d', 'o', 'g'],
    ['r', 'a', 't']
  ];
  const expected = [
    { letter: 'c', row: 0, col: 0 },
    { letter: 'd', row: 1, col: 0 }
  ];
  expect(getInitialIndexes(words, matrix)).toEqual(expected);
});

test('getInitialIndexes with invalid values', () => {
  const words = ['cat', 'dog'];
  const matrix = [
    ['a', 'b', 's'],
    ['r', 'o', 'g'],
    ['r', 'a', 't']
  ];
  const expected: Index[] = [];
  expect(getInitialIndexes(words, matrix)).toEqual(expected);
});

test('isCorrectWord with valid values reversed vertical', () => {
  const word = 'cat';
  const matrix = [
    ['c', 't', 't'],
    ['d', 'a', 'g'],
    ['r', 'c', 't']
  ];
  const func = (row: number, col: number) => ({ row: row - 1, col });
  const startingIndex = { row: 2, col: 1 };
  const expected = {
    isFound: true,
    startingPos: { row: 2, col: 1 },
    endingPos: { row: 0, col: 1 }
  };
  expect(isCorrectWord(word, matrix, func, startingIndex)).toEqual(expected);
});

test('isCorrectWord with valid values diagonal to top right', () => {
  const word = 'cat';
  const matrix = [
    ['c', 'z', 't'],
    ['a', 'a', 'g'],
    ['c', 'e', 't']
  ];
  const func = (row: number, col: number) => ({ row: row - 1, col: col + 1 });
  const startingIndex = { row: 2, col: 0 };
  const expected = {
    isFound: true,
    startingPos: { row: 2, col: 0 },
    endingPos: { row: 0, col: 2 }
  };
  expect(isCorrectWord(word, matrix, func, startingIndex)).toEqual(expected);
});

test('isCorrectWord with valid values horizontal', () => {
  const word = 'cat';
  const matrix = [
    ['c', 'a', 't'],
    ['d', 'o', 'g'],
    ['r', 'a', 't']
  ];
  const func = (row: number, col: number) => ({ row, col: col + 1 });
  const startingIndex = { row: 0, col: 0 };
  const expected = {
    isFound: true,
    startingPos: { row: 0, col: 0 },
    endingPos: { row: 0, col: 2 }
  };
  expect(isCorrectWord(word, matrix, func, startingIndex)).toEqual(expected);
});

test('isCorrectWord with valid values diagonal to bottom right', () => {
  const word = 'cat';
  const matrix = [
    ['c', 'z', 't'],
    ['a', 'a', 'g'],
    ['r', 'e', 't']
  ];
  const func = (row: number, col: number) => ({ row: row + 1, col: col + 1 });
  const startingIndex = { row: 0, col: 0 };
  const expected = {
    isFound: true,
    startingPos: { row: 0, col: 0 },
    endingPos: { row: 2, col: 2 }
  };
  expect(isCorrectWord(word, matrix, func, startingIndex)).toEqual(expected);
});

test('isCorrectWord with valid values vertical', () => {
  const word = 'cat';
  const matrix = [
    ['c', 'z', 't'],
    ['a', 'o', 'g'],
    ['t', 'a', 't']
  ];
  const func = (row: number, col: number) => ({ row: row + 1, col });
  const startingIndex = { row: 0, col: 0 };
  const expected = {
    isFound: true,
    startingPos: { row: 0, col: 0 },
    endingPos: { row: 2, col: 0 }
  };
  expect(isCorrectWord(word, matrix, func, startingIndex)).toEqual(expected);
});

test('isCorrectWord with valid values diagonal reverse to bottom left', () => {
  const word = 'cat';
  const matrix = [
    ['b', 'z', 'c'],
    ['a', 'a', 'g'],
    ['t', 'c', 't']
  ];
  const func = (row: number, col: number) => ({ row: row + 1, col: col - 1 });
  const startingIndex = { row: 0, col: 2 };
  const expected = {
    isFound: true,
    startingPos: { row: 0, col: 2 },
    endingPos: { row: 2, col: 0 }
  };
  expect(isCorrectWord(word, matrix, func, startingIndex)).toEqual(expected);
});

test('isCorrectWord with valid values horizontal reversed', () => {
  const word = 'cat';
  const matrix = [
    ['t', 'a', 'c'],
    ['d', 'o', 'g'],
    ['r', 'a', 't']
  ];
  const func = (row: number, col: number) => ({ row, col: col - 1 });
  const startingIndex = { row: 0, col: 2 };
  const expected = {
    isFound: true,
    startingPos: { row: 0, col: 2 },
    endingPos: { row: 0, col: 0 }
  };
  expect(isCorrectWord(word, matrix, func, startingIndex)).toEqual(expected);
});

test('isCorrectWord with valid values diagonal reverse to top left', () => {
  const word = 'cat';
  const matrix = [
    ['t', 'z', 'c'],
    ['a', 'a', 'g'],
    ['r', 'e', 'c']
  ];
  const func = (row: number, col: number) => ({ row: row - 1, col: col - 1 });
  const startingIndex = { row: 2, col: 2 };
  const expected = {
    isFound: true,
    startingPos: { row: 2, col: 2 },
    endingPos: { row: 0, col: 0 }
  };
  expect(isCorrectWord(word, matrix, func, startingIndex)).toEqual(expected);
});

test('isCorrectWord with invalid values', () => {
  const word = 'cat';
  const matrix = [
    ['c', 'a', 't'],
    ['d', 'o', 'g'],
    ['r', 'a', 't']
  ];
  const func = (row: number, col: number) => ({ row, col });
  const startingIndex = { row: 0, col: 0 };
  const expected = { isFound: false };
  expect(isCorrectWord(word, matrix, func, startingIndex)).toEqual(expected);
});

test('searchWord with valid values', () => {
  const word = 'cat';
  const matrix = [
    ['c', 'a', 't'],
    ['d', 'o', 'g'],
    ['r', 'a', 't']
  ];
  const startingIndex = { letter: 'c', row: 0, col: 0 };
  const expected = true;
  expect(searchWord(word, matrix, startingIndex)).toEqual(expected);
});

test('searchWord with invalid values', () => {
  const word = 'cat';
  const matrix = [
    ['c', 'a', 'r'],
    ['d', 'o', 'g'],
    ['r', 'a', 't']
  ];
  const startingIndex = { letter: 'c', row: 0, col: 0 };
  const expected = false;
  expect(searchWord(word, matrix, startingIndex)).toEqual(expected);
});
