import tokens from '@shopify/polaris-tokens';
import {ColorScheme, Color} from './types';

export function getColorPalette(colors: ColorScheme) {
  const colorMap = {
    [ColorScheme.Classic]: [
      tokens.colorPurpleDark,
      tokens.colorBlue,
      tokens.colorTeal,
      tokens.colorSkyDark,
    ],
    [ColorScheme.TwentyTwenty]: ['#009DB2', '#2B3698', '#BD227F', '#D6630F'],
  };
  return colorMap[colors];
}

export function getTokensFromColors(colors: Color[]) {
  return colors.map((color) => tokens[color]);
}
