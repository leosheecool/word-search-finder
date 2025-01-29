"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./lib/utils");
const [, , letterStringList, wordList] = process.argv;
const wordsList = wordList.split(',');
const letterMatrix = (0, utils_1.stringTo2DArray)(letterStringList);
const findWord = (word, matrix, indexes) => {
    for (const index of indexes) {
        const isFound = (0, utils_1.searchWord)(word, matrix, index);
        if (isFound)
            break;
    }
};
const findWords = (words, matrix) => {
    const initialsIndexes = (0, utils_1.getInitialIndexes)(words, matrix);
    console.log(matrix);
    for (const word of words) {
        console.log('Searching for:', word);
        const wordInitialIndexes = initialsIndexes.filter((index) => index.letter === word[0]);
        findWord(word, matrix, wordInitialIndexes);
        console.log('-------------------');
    }
};
findWords(wordsList, letterMatrix);
