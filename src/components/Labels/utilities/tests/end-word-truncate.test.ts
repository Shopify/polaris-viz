import characterWidths from '../../../../data/character-widths.json';
import {endWordTruncate} from '../end-word-truncate';

describe('endWordTruncate()', () => {
  it.each`
    word           | targetWidth | expected
    ${'Wendesday'} | ${40}       | ${'We…'}
    ${'Wendesday'} | ${60}       | ${'Wende…'}
    ${'Wendesday'} | ${68}       | ${'Wendes…'}
    ${'Wendesday'} | ${100}      | ${'Wendesday'}
  `(
    'truncates word at target width of $targetWidth',
    ({word, targetWidth, expected}) => {
      const actual = endWordTruncate({word, targetWidth, characterWidths});

      expect(actual).toStrictEqual(expected);
    },
  );
});
