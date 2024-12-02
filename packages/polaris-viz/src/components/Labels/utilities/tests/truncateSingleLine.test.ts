import {truncateSingleLine} from '../truncateSingleLine';
import characterWidths from '../../../../data/character-widths.json';

describe('truncateSingleLine()', () => {
  it.each`
    label                                  | targetWidth | expected
    ${'Long label that will truncate'}     | ${50}       | ${'Long la…'}
    ${'Long label that will truncate'}     | ${100}      | ${'Long label that w…'}
    ${'Long label that will NOT truncate'} | ${185}      | ${'Long label that will NOT truncate'}
  `(
    'truncates a label with a target width of $targetWidth',
    ({label, targetWidth, expected}) => {
      const actual = truncateSingleLine({label, targetWidth, characterWidths});

      expect(actual).toStrictEqual(expected);
    },
  );
});
