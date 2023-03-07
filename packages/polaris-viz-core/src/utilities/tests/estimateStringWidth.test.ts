import characterWidths from '../../../../polaris-viz/src/data/character-widths.json';
import {estimateStringWidth} from '../estimateStringWidth';

describe('estimateStringWidth()', () => {
  it.each`
    string     | expected
    ${'W'}     | ${11.63}
    ${'Label'} | ${30.75}
    ${' '}     | ${3.38}
    ${'…'}     | ${9.66}
  `('return width for $string', ({string, expected}) => {
    const actual = estimateStringWidth(string, characterWidths);

    expect(actual).toStrictEqual(expected);
  });

  it('returns width of W character when character is unavailable', () => {
    // eslint-disable-next-line id-length
    const actual = estimateStringWidth('m', {W: characterWidths.W});
    expect(actual).toStrictEqual(11.63);
  });

  it('returns hardcode default when characterWidths is unavailable', () => {
    const actual = estimateStringWidth('m', {});
    expect(actual).toStrictEqual(11.63);
  });
});
