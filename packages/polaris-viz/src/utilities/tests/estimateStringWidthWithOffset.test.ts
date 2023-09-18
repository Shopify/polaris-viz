import characterWidths from '../../../../polaris-viz/src/data/character-widths.json';
import {estimateStringWidthWithOffset} from '../estimateStringWidthWithOffset';

describe('estimateStringWidthWithOffset()', () => {
  describe('fontSize', () => {
    it.each`
      fontSize | expected
      ${4}     | ${23.79}
      ${10}    | ${56.16}
      ${12}    | ${66.07}
      ${15}    | ${81.27}
      ${20}    | ${105.05}
      ${40}    | ${206.14}
    `(`returns width with $fontSize offset`, ({fontSize, expected}) => {
      const actual = estimateStringWidthWithOffset(
        'Hello World',
        fontSize,
        400,
      );

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('fontWeight', () => {
    it.each`
      fontWeight | expected
      ${100}     | ${63.43}
      ${300}     | ${65.41}
      ${600}     | ${70.03}
      ${900}     | ${78.62}
    `('returns width with $fontWeight offset', ({fontWeight, expected}) => {
      const actual = estimateStringWidthWithOffset(
        'Hello World',
        12,
        fontWeight,
      );

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('fontSize & fontWeight', () => {
    it.each`
      fontSize | fontWeight | expected
      ${4}     | ${100}     | ${22.83}
      ${10}    | ${300}     | ${55.6}
      ${16}    | ${600}     | ${91.04}
      ${20}    | ${900}     | ${125.01}
    `(
      'returns width with $fontWeight offset',
      ({fontSize, fontWeight, expected}) => {
        const actual = estimateStringWidthWithOffset(
          'Hello World',
          fontSize,
          fontWeight,
        );

        expect(actual).toStrictEqual(expected);
      },
    );
  });
});
