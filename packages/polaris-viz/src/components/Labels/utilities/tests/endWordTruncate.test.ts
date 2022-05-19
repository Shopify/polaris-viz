import characterWidths from '../../../../data/character-widths.json';
import {endWordTruncate} from '../endWordTruncate';

describe('endWordTruncate()', () => {
  it.each`
    word           | targetWidth | expected
    ${'Wednesday'} | ${40}       | ${'Wed…'}
    ${'Wednesday'} | ${60}       | ${'Wedne…'}
    ${'Wednesday'} | ${68}       | ${'Wednesd…'}
    ${'Wednesday'} | ${100}      | ${'Wednesday'}
  `(
    'truncates word at target width of $targetWidth',
    ({word, targetWidth, expected}) => {
      const actual = endWordTruncate({word, targetWidth, characterWidths});

      expect(actual).toStrictEqual(expected);
    },
  );
});
