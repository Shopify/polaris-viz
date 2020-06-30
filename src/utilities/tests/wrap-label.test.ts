import {wrapLabel} from '../wrap-label';

// Measuring text doesn't work in tests
jest.mock('../get-text-width', () => {
  return {
    getTextWidth: ({text}: {text: string}) => {
      return text.length * 4;
    },
  };
});

describe('wrapLabel', () => {
  it('returns the string in one item when it fits under the limit', () => {
    const actual = wrapLabel({
      label: 'Short string',
      maxWidth: 100,
      fontSize: 12,
    });

    expect(actual).toStrictEqual(['Short string']);
  });

  it('hyphenates long words', () => {
    const actual = wrapLabel({
      label: 'supercalifragilistic',
      maxWidth: 40,
      fontSize: 12,
    });

    expect(actual).toStrictEqual(['supercalif', 'ragilistic']);
  });

  it('separates words when adding them to the existing string would exceed the limit', () => {
    const actual = wrapLabel({
      label: 'A longish series of words',
      maxWidth: 32,
      fontSize: 12,
    });

    expect(actual).toStrictEqual(['A', 'longish', 'series', 'of', 'words']);
  });
});
