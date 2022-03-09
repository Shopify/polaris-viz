import characterWidths from '../../../../data/character-widths.json';
import {estimateTextHeight} from '../estimate-text-height';

describe('estimateTextHeight()', () => {
  it.each`
    string                               | targetWidth | expected
    ${'Single'}                          | ${100}      | ${14}
    ${'Two Lines'}                       | ${100}      | ${28}
    ${'Multiple lines from this string'} | ${100}      | ${84}
  `('return width for $string', ({string, targetWidth, expected}) => {
    const actual = estimateTextHeight({
      characterWidths,
      targetWidth,
      label: string,
    });

    expect(actual).toStrictEqual(expected);
  });
});
