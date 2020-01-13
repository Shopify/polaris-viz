import tokens, {
  colorPurpleDark,
  colorBlue,
  colorTeal,
  colorSkyDark,
} from '@shopify/polaris-tokens';

import {ColorScheme, Color} from './types';

export function getColorPalette(colors: ColorScheme) {
  const colorMap = {
    classic: [colorPurpleDark, colorBlue, colorTeal, colorSkyDark],
    twentytwenty: ['#009DB2', '#2B3698', '#BD227F', '#D6630F'],
  };
  return colorMap[colors];
}

export function getTokensFromColors(colors: Color[]) {
  return colors.map((color) => tokens[color]);
}
