import characterWidths from '../../../../data/character-widths.json';
import {estimateStringWidth} from '../../../../utilities';

describe('estimateStringWidth()', () => {
  it.each`
    string     | expected
    ${'W'}     | ${12}
    ${'Label'} | ${33}
    ${' '}     | ${4}
    ${'…'}     | ${10}
  `('return width for $string', ({string, expected}) => {
    const actual = estimateStringWidth(string, characterWidths);

    expect(actual).toStrictEqual(expected);
  });

  it('returns width of W character when character is unavailable', () => {
    // eslint-disable-next-line id-length
    const actual = estimateStringWidth('m', {W: characterWidths.W});
    expect(actual).toStrictEqual(12);
  });
});
