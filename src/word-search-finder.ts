import { getInitialIndexes, searchWord, stringTo2DArray } from './lib/utils';
import { Index } from './types/types';

const [, , letterStringList, wordList] = process.argv;

const wordsList = wordList.split(',');
const letterMatrix = stringTo2DArray(letterStringList);

const findWord = (word: string, matrix: string[][], indexes: Index[]) => {
  for (const index of indexes) {
    const isFound = searchWord(word, matrix, index);
    if (isFound) break;
  }
};

const findWords = (words: string[], matrix: string[][]) => {
  const initialsIndexes = getInitialIndexes(words, matrix);

  console.log(matrix)
  for (const word of words) {
    console.log('Searching for:', word)
    const wordInitialIndexes = initialsIndexes.filter(
      (index: Index) => index.letter === word[0]
    );

    findWord(word, matrix, wordInitialIndexes)
    console.log('-------------------')
  }
};

findWords(wordsList, letterMatrix);
