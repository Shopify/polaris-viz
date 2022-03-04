import {truncateSingleLine} from '../truncate-single-line';
import characterWidths from '../../../../data/character-widths.json';

describe('truncateSingleLine()', () => {
  it.each`
    label                                  | targetWidth | expected
    ${'Long label that will truncate'}     | ${50}       | ${'Long lab…'}
    ${'Long label that will truncate'}     | ${100}      | ${'Long label that wi…'}
    ${'Long label that will NOT truncate'} | ${200}      | ${'Long label that will NOT truncate'}
  `(
    'truncates a label with a target width of $targetWidth',
    ({label, targetWidth, expected}) => {
      const actual = truncateSingleLine({label, targetWidth, characterWidths});

      expect(actual).toStrictEqual(expected);
    },
  );
});
