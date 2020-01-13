import tokens from '@shopify/polaris-tokens';

import {ColorScheme, Color} from './types';

export function getColorPalette(colors: ColorScheme) {
  const {colorPurpleDark, colorBlue, colorTeal, colorSkyDark} = tokens;

  const colorMap = {
    [ColorScheme.Classic]: [
      colorPurpleDark,
      colorBlue,
      colorTeal,
      colorSkyDark,
    ],
    [ColorScheme.TwentyTwenty]: ['#009DB2', '#2B3698', '#BD227F', '#D6630F'],
  };
  return colorMap[colors];
}

export function getTokensFromColors(colors: Color[]) {
  return colors.map((color) => tokens[color]);
}
