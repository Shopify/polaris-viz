import {truncateLastLine} from '../truncateLastLine';
import characterWidths from '../../../../data/character-widths.json';

const TARGET_WIDTH = 50;

describe('truncateLastLine()', () => {
  it.each`
    label                         | targetHeight | expected
    ${'Monday pickles and stuff'} | ${14}        | ${'Monda…'}
    ${'Monday pickles and stuff'} | ${80}        | ${'Monday pickles and s…'}
    ${'Monday pickles and stuff'} | ${100}       | ${'Monday pickles and stuff'}
  `(
    'truncates a label with a target height of $targetHeight',
    ({label, targetHeight, expected}) => {
      const actual = truncateLastLine({
        label,
        targetWidth: TARGET_WIDTH,
        targetHeight,
        characterWidths,
      });

      expect(actual).toStrictEqual(expected);
    },
  );
});
