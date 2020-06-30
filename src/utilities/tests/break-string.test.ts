import {breakString} from '../break-string';

// Measuring text doesn't work in tests
jest.mock('../get-text-width', () => {
  return {
    getTextWidth: ({text}: {text: string}) => {
      return text.length * 4;
    },
  };
});

describe('breakString', () => {
  it('breaks up long words into hyphenated and next line sections', () => {
    const actual = breakString({
      word: 'supercalifragilistic',
      maxWidth: 36,
      fontSize: 12,
    });

    expect(actual).toStrictEqual({
      hyphenatedStrings: ['supercali', 'fragilist'],
      remainingWord: 'ic',
    });
  });

  it('does not break up words under the limit', () => {
    const actual = breakString({
      word: 'supercalifragilistic',
      maxWidth: 1000,
      fontSize: 12,
    });

    expect(actual).toStrictEqual({
      hyphenatedStrings: [],
      remainingWord: 'supercalifragilistic',
    });
  });
});
