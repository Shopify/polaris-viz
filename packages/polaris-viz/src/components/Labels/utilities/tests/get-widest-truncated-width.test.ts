import {getWidestTruncatedWidth} from '../get-widest-truncated-width';

const DATA = [
  {
    text: 'Short String',
    words: [
      {word: 'Short', wordWidth: 33},
      {word: 'String', wordWidth: 34},
    ],
    truncatedWords: ['Short', 'String'],
    truncatedName: 'Short String',
    truncatedWidth: 71,
  },
  {
    text: 'This is a really long string',
    words: [
      {word: 'This', wordWidth: 26},
      {word: 'is', wordWidth: 10},
      {word: 'a', wordWidth: 7},
      {word: 'really', wordWidth: 34},
      {word: 'long', wordWidth: 26},
      {word: 'string', wordWidth: 33},
    ],
    truncatedWords: ['This', 'is', 'a', 'really', 'long', 'string'],
    truncatedName: 'This is a really long string',
    truncatedWidth: 156,
  },
  {
    text: 'Medium String',
    words: [
      {word: 'Medium', wordWidth: 45},
      {word: 'String', wordWidth: 34},
    ],
    truncatedWords: ['Medium', 'String'],
    truncatedName: 'Medium String',
    truncatedWidth: 83,
  },
];

describe('getWidestTruncatedWidth()', () => {
  it('returns 0 when array is empty', () => {
    expect(getWidestTruncatedWidth([])).toStrictEqual(0);
  });

  it('returns widest label width', () => {
    expect(getWidestTruncatedWidth(DATA)).toStrictEqual(156);
  });
});
