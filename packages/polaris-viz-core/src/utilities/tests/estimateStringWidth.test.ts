import characterWidths from '../../../../polaris-viz/src/data/character-widths.json';
import {estimateStringWidth} from '../estimateStringWidth';

describe('estimateStringWidth()', () => {
  it.each`
    string     | expected
    ${'W'}     | ${11.6171875}
    ${'Label'} | ${30.71875}
    ${' '}     | ${3.375}
    ${'…'}     | ${9.65625}
  `('return width for $string', ({string, expected}) => {
    const actual = estimateStringWidth(string, characterWidths);

    expect(actual).toStrictEqual(expected);
  });

  it('returns width of W character when character is unavailable', () => {
    // eslint-disable-next-line id-length
    const actual = estimateStringWidth('m', {W: characterWidths.W});
    expect(actual).toStrictEqual(11.6171875);
  });
});
