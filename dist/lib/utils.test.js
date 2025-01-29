"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
test('isPerfectSquare', () => {
    expect((0, utils_1.isPerfectSquare)(16)).toBe(true);
    expect((0, utils_1.isPerfectSquare)(15)).toBe(false);
});
test('stringTo2DArray valid array', () => {
    const str = 'abcd';
    const expected = [
        ['a', 'b'],
        ['c', 'd']
    ];
    expect((0, utils_1.stringTo2DArray)(str)).toEqual(expected);
});
test('stringTo2DArray invalid array', () => {
    const str = 'abc';
    expect(() => (0, utils_1.stringTo2DArray)(str)).toThrow();
});
test('getInitialIndexes with valid values', () => {
    const words = ['cat', 'dog'];
    const matrix = [
        ['c', 'a', 't'],
        ['d', 'o', 'g']
    ];
    const expected = [
        { letter: 'c', row: 0, col: 0 },
        { letter: 'd', row: 1, col: 0 }
    ];
    expect((0, utils_1.getInitialIndexes)(words, matrix)).toEqual(expected);
});
test('getInitialIndexes with invalid values', () => {
    const words = ['cat', 'dog'];
    const matrix = [
        ['a', 'b', 'c'],
        ['d', 'o', 'g']
    ];
    const expected = [{ letter: 'd', row: 1, col: 0 }];
    expect((0, utils_1.getInitialIndexes)(words, matrix)).toEqual(expected);
});
test('isCorrectWord with valid values', () => {
    const word = 'cat';
    const matrix = [
        ['c', 'a', 't'],
        ['d', 'o', 'g']
    ];
    const func = (row, col) => ({ row, col });
    const startingIndex = { row: 0, col: 0 };
    const expected = {
        isFound: true,
        startingPos: { row: 0, col: 0 },
        endingPos: { row: 0, col: 2 }
    };
    expect((0, utils_1.isCorrectWord)(word, matrix, func, startingIndex)).toEqual(expected);
});
test('isCorrectWord with invalid values', () => {
    const word = 'cat';
    const matrix = [
        ['c', 'a', 't'],
        ['d', 'o', 'g']
    ];
    const func = (row, col) => ({ row, col });
    const startingIndex = { row: 0, col: 0 };
    const expected = { isFound: false };
    expect((0, utils_1.isCorrectWord)(word, matrix, func, startingIndex)).toEqual(expected);
});
test('searchWord with valid values', () => {
    const word = 'cat';
    const matrix = [
        ['c', 'a', 't'],
        ['d', 'o', 'g']
    ];
    const startingIndex = { letter: 'c', row: 0, col: 0 };
    const expected = true;
    expect((0, utils_1.searchWord)(word, matrix, startingIndex)).toEqual(expected);
});
test('searchWord with invalid values', () => {
    const word = 'cat';
    const matrix = [
        ['c', 'a', 't'],
        ['d', 'o', 'g']
    ];
    const startingIndex = { letter: 'c', row: 0, col: 0 };
    const expected = false;
    expect((0, utils_1.searchWord)(word, matrix, startingIndex)).toEqual(expected);
});
