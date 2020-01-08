import {getColorPalette, getTokensFromColors} from '../utilities';
import {ColorScheme} from '../types';

describe('utilities', () => {
  describe('getColorPalette', () => {
    it('returns an array of colors', () => {
      const actual = getColorPalette(ColorScheme.Classic);

      expect(actual).toStrictEqual([
        'rgb(80, 36, 143)',
        'rgb(0, 111, 187)',
        'rgb(71, 193, 191)',
        'rgb(196, 205, 213)',
      ]);
    });
  });

  describe('getTokensFromColors', () => {
    it('returns an array of colors', () => {
      const actual = getTokensFromColors(['colorBlack', 'colorBlue']);
      expect(actual).toStrictEqual(['rgb(0, 0, 0)', 'rgb(0, 111, 187)']);
    });
  });
});
