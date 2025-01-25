"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchWord = exports.isCorrectWord = exports.getInitialIndexes = exports.stringTo2DArray = exports.isPerfectSquare = void 0;
const isPerfectSquare = (num) => {
    const sqrt = Math.sqrt(num);
    return sqrt === Math.floor(sqrt);
};
exports.isPerfectSquare = isPerfectSquare;
const stringTo2DArray = (str) => {
    if (!str)
        return [];
    if (!(0, exports.isPerfectSquare)(str.length))
        throw new Error('Invalid input: string length is not a perfect square');
    const size = Math.sqrt(str.length);
    const matrix = [];
    for (let i = 0; i < size; i++) {
        matrix.push(str.slice(i * size, (i + 1) * size).split(''));
    }
    return matrix;
};
exports.stringTo2DArray = stringTo2DArray;
const getInitialIndexes = (words, matrix) => {
    const initials = words.map((word) => word[0]);
    const results = [];
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
exports.getInitialIndexes = getInitialIndexes;
const isCorrectWord = (word, matrix, func, startingIndex) => {
    let currentIndex = startingIndex;
    for (let letterIndex = 0; letterIndex < word.length - 1; letterIndex++) {
        if (word[letterIndex] !== matrix[currentIndex.row][currentIndex.col])
            return { isFound: false };
        if (letterIndex !== word.length - 1)
            currentIndex = func(currentIndex.row, currentIndex.col);
    }
    return { isFound: true, startingPos: startingIndex, endingPos: currentIndex };
};
exports.isCorrectWord = isCorrectWord;
const searchWord = (word, matrix, startingIndex) => {
    const directions = [
        {
            name: 'vertical reversed',
            func: (row, col) => ({ row: row - 1, col }),
            condition: () => startingIndex.row >= word.length - 1
        },
        {
            name: 'diagonal to top right',
            func: (row, col) => ({ row: row - 1, col: col + 1 }),
            condition: () => startingIndex.row >= word.length - 1 &&
                startingIndex.col + word.length - 1 <= matrix[0].length
        },
        {
            name: 'horizontal',
            func: (row, col) => ({ row, col: col + 1 }),
            condition: () => startingIndex.col + word.length - 1 <= matrix[0].length
        },
        {
            name: 'diagonal to bottom right',
            func: (row, col) => ({ row: row + 1, col: col + 1 }),
            condition: () => startingIndex.col + word.length - 1 <= matrix[0].length &&
                startingIndex.row + word.length - 1 <= matrix.length
        },
        {
            name: 'vertical',
            func: (row, col) => ({ row: row + 1, col }),
            condition: () => startingIndex.row + word.length - 1 <= matrix.length
        },
        {
            name: 'diagonal reverse to bottom left',
            func: (row, col) => ({ row: row + 1, col: col - 1 }),
            condition: () => startingIndex.row + word.length - 1 <= matrix.length &&
                startingIndex.col >= word.length - 1
        },
        {
            name: 'horizontal reversed',
            func: (row, col) => ({ row, col: col - 1 }),
            condition: () => startingIndex.col >= word.length - 1
        },
        {
            name: 'diagonal reverse to top left',
            func: (row, col) => ({ row: row - 1, col: col - 1 }),
            condition: () => startingIndex.row >= word.length - 1 &&
                startingIndex.col >= word.length - 1
        }
    ];
    for (const direction of directions) {
        if (direction.condition()) {
            const isCorrect = (0, exports.isCorrectWord)(word, matrix, direction.func, startingIndex);
            if (isCorrect.isFound) {
                console.log(`Word found! Direction: ${direction.name}`, startingIndex, isCorrect.endingPos);
                return true;
            }
        }
    }
    return false;
};
exports.searchWord = searchWord;
